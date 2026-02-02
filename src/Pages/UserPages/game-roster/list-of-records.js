import OnePlayer from "./one-player";
import axios from "axios";
import {useState,Fragment,  useEffect} from 'react';

export default function ListOfRecords({
    setNumberPlayers,
    whichGameID,
    setUpdateRoster,
    updateRoster,
    disableUpdateButton
})
{
    let defaultPercents=[30, 20, 10, 20, 20,]
    const [currentRoster, setCurrentRoster]=useState([])
    const [currentDirection, setCurrentDirection]=useState('name')
    const [direction, setDirection]=useState({
        'name':'forward',
        'position':'forward'
    })
    const [otherEvents, setOtherEvents]=useState([])
    const [gridTemplatePercents, setGridTemplatePercents]=useState([30, 20, 10, 20, 20,])

    useEffect(()=>{
        if (whichGameID!==-1) {
            GetRoster();
            GetOtherEvents();
        } else {
            setCurrentRoster([])
            setOtherEvents([])
        }
    },[whichGameID])

    useEffect(()=>{
        if (updateRoster){
            UpdateRoster();
            setUpdateRoster(false);
        }
        
    },[updateRoster])    

    const UpdateRoster=async ()=>{

        try{
            const response = await axios.post("http://127.0.0.1:8000/gameresults/update_roster/",{allUsers:currentRoster});
        }catch(err){

            if (err.response.data['result']==='problem') {
                let playerList = '';
                err.response.data['problem_players'].map((onePlayer)=> playerList=playerList + '\n ' +  onePlayer);
                alert(`Issues with updating positions on the following players ${playerList}`);
            } else {alert(`There was an issue with updating the results.  Error code ${err.status}`);}
            
        }        
    }

    const GetOtherEvents=async()=>{
        if (whichGameID !== undefined && whichGameID!==-1) {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/games/played_games_events/${whichGameID}`,);
               // console.log(response.data)   
                setOtherEvents(response.data);
                let numberOtherEvents = response.data.length;
                //console.log(gridTemplatePercents)
                if (numberOtherEvents>0){
                    let newArray=[];
                    
                    let eventButtonLength=0;
                    defaultPercents.map((oneValue)=>{
                        //console.log(oneValue)
                        if (oneValue>10) {
                            eventButtonLength += Math.floor(oneValue*0.1);
                            oneValue = Math.floor(oneValue*0.9);
                        }
                        //console.log(oneValue)
                        newArray.push(oneValue);
                    })
                    for (let i=0;i<numberOtherEvents;i++){
                        newArray.push(eventButtonLength/numberOtherEvents);
                    }
                    //console.log('here')
                    setGridTemplatePercents(newArray);  
                    //console.log(newArray)                
                } else setGridTemplatePercents(defaultPercents)

                }catch(err){
                    alert(`There was an issue with getting the other events.  Error code ${err.status}`)
                }
            }
    }

    const GetRoster=async()=>{

        if (whichGameID !== undefined && whichGameID!==-1) {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/game_roster/game_roster/${whichGameID}`,);
                console.log(response.data)   
                setNumberPlayers(response.data.length);
                setCurrentRoster(response.data.sort((a,b)=>a.player_name.localeCompare(b.player_name)));
                }catch(err){
                    alert(`There was an issue with getting the current roster.  Error code ${err.status}`)
                }
            }
    }
    const orderPlayers=(which)=>{
        if (currentDirection===which){
            if (direction[which]==='forward'){
                setCurrentRoster(currentRoster.sort((a,b)=>a[which].localeCompare(b[which])))
            } else {
                setCurrentRoster(currentRoster.sort((a,b)=>b[which].localeCompare(a[which])))
            }
            setDirection({
                ...direction,
                ...{which:(currentDirection[which]==='forward')?'backward':'forward'}
            })
        } else {
            setCurrentDirection(which)
            if (direction[which]==='forward'){
                setCurrentRoster(currentRoster.sort((a,b)=>a[which].localeCompare(b[which])))
            } else {
                setCurrentRoster(currentRoster.sort((a,b)=>b[which].localeCompare(a[which])))
            }            
        }

    }    

    const IsOutSetPosition=(player_name)=>{
        let thisPlayer = currentRoster.find((onePlayer)=>onePlayer.player_name===player_name)
        if (thisPlayer.position>0) return

        for (let i=currentRoster.length;i>0;i--) {
            if(currentRoster.find((onePlayer)=>onePlayer.position===i)===undefined){
                setPosition({
                target:{
                    name:player_name,
                    value:i
                    }
                });
                break;
            }
        }
        UpdateRoster();
    }
    
    const setPosition=(e)=>{
        let thisPlayer = currentRoster.find((onePlayer)=>onePlayer.player_name===e.target.name)

        thisPlayer.position =e.target.value

        let newRoster = [
            ...currentRoster.filter((onePlayer)=>onePlayer.player_name!==thisPlayer.player_name),
            thisPlayer
        ]
        setCurrentRoster(newRoster.sort((a,b)=>a.player_name.localeCompare(b.player_name)))
    }

    const Test=()=>{
        console.log(currentRoster)
    }

    return(
        <div
            style={{
                display:'grid',
                gridTemplateColumns:gridTemplatePercents.join('% ')+'%'  ,
                //gridTemplateColumns:'200px 100px 50px 100px 100px',
                rowGap:'10px',
                border:'1px solid black',
                width:"80%",
                padding:'10px', 
                margin:"auto"
            }}>
                <div
                    onClick={()=>orderPlayers('name')}
                    //onClick={Test}
                    style={{
                        textAlign:'left',
                        paddingLeft:'15%',
                        cursor:'pointer',
                    }}>
                    Player
                </div>

                <div                
                    style={{
                        textAlign:'left',
                    }}>
                    Registration Time
                </div>
                    <div
                    onClick={()=>orderPlayers('position')}
                    style={{
                        textAlign:'left',
                        cursor:'pointer'
                    }}
                >
                    Position
                </div> 
                <div
                    style={{
                        textAlign:'left',
                        cursor:'pointer'
                    }}>
                    Remove Player
                </div>
                <div
                    style={{
                        textAlign:'left',
                        cursor:'pointer',
                    }}>
                    Player is Out
                </div>     
                {otherEvents.map((oneEvent)=>(
                    <div
                    style={{
                        textAlign:'left',
                        cursor:'pointer'
                    }}>
                        {oneEvent.event_name}
                    </div>
                ))}               
                {currentRoster.map((onePlayer)=>(
                    <Fragment key={onePlayer.id}>
                        <OnePlayer
                            thisPlayer={onePlayer}
                            setPosition={setPosition}
                            GetRoster={GetRoster}
                            otherEvents={otherEvents}
                            IsOutSetPosition={IsOutSetPosition}
                            disableUpdateButton={disableUpdateButton}
                            />
                    </Fragment>
                ))} 
        </div>  
    )
}
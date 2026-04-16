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
    
    const [currentRoster, setCurrentRoster]=useState([])
    const [currentDirection, setCurrentDirection]=useState('name')
    const [direction, setDirection]=useState({
        'name':'forward',
        'position':'forward'
    })

    const gridTemplatePercents =[20, 20, 10,10, 20, 20,]

    useEffect(()=>{

        if (whichGameID!==-1) {
            GetRoster();
            //GetOtherEvents();
        } else {
            setCurrentRoster([])

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
            const response = await axios.post("http://127.0.0.1:8000/gameresults/update_roster_only_position/",{allUsers:currentRoster});
            //console.log(response.data)
            setCurrentRoster(response.data.sort((a,b)=>a.player_name.localeCompare(b.player_name)))
        }catch(err){

            if (err.response.data['result']==='problem') {
                let playerList = '';
                err.response.data['problem_players'].map((onePlayer)=> playerList=playerList + '\n ' +  onePlayer);
                alert(`Issues with updating positions on the following players ${playerList}`);
            } else {alert(`There was an issue with updating the results.  Error code ${err.status}`);}
            
        }        
    }

    const GetRoster=async()=>{

        if (whichGameID !== undefined && whichGameID!==-1) {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/gameresults/game_roster/${whichGameID}`,);
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
                    name:'position'+player_name,
                    value:i
                    }
                });
                break;
            }
        }
        UpdateRoster();
    }
    
    const setPosition=(e)=>{
        console.log(e.target.name.slice(8))
        let thisPlayer = currentRoster.find((onePlayer)=>onePlayer.player_name===e.target.name.slice(8))

        thisPlayer.position =e.target.value

        let newRoster = [
            ...currentRoster.filter((onePlayer)=>onePlayer.player_name!==thisPlayer.player_name),
            thisPlayer
        ]
        setCurrentRoster(newRoster.sort((a,b)=>a.player_name.localeCompare(b.player_name)))
    }

    const setPoints=(e)=>{
        console.log(e.target.name.slice(6))
        let thisPlayer = currentRoster.find((onePlayer)=>onePlayer.player_name===e.target.name.slice(6))

        thisPlayer.points =e.target.value

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
                    }}
                >
                    Points
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
              
                {currentRoster.map((onePlayer)=>(
                    <Fragment key={onePlayer.id}>
                        <OnePlayer
                            thisPlayer={onePlayer}
                            setPosition={setPosition}
                            setPoints={setPoints}
                            GetRoster={GetRoster}
                            IsOutSetPosition={IsOutSetPosition}
                            disableUpdateButton={disableUpdateButton}
                            />
                    </Fragment>
                ))} 
        </div>  
    )
}
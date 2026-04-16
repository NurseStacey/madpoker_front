import {useState, useEffect,Fragment} from 'react';
import OnePlayer from './one-player';
import axios from 'axios';
import Headers from './list-of-records-headers';

export default function ListOfRecords({
    tournamentID,
    setNumberPlayers,
    finalize,
    setFinalize,
    setUpdateTournamentList
})
{
    const [currentRoster, setCurrentRoster]=useState([])    
    const [currentDirection, setCurrentDirection]=useState('player_name') ;
    const [direction, setDirection]=useState({
        'player_name':'forward',
        'position':'forward'
    })
    const gridTemplatePercents =[25,25,25,25]

    const LoadRoster = async ()=>{
        try{

            let response = await axios.get(`http://127.0.0.1:8000/tournaments/this_roster/${tournamentID}/`,);
            setCurrentRoster(response.data)
            if (response.status===400) {
                alert('Problem loading roster.')
                return
            }
            setNumberPlayers(response.data.length)
        } catch(err){console.log(err)}
       
        try{}catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{

        const finalizeTournament = async()=>{
            try {
                const response = await axios.post(`http://127.0.0.1:8000/tournaments/finalize_roster/${tournamentID}/`);

                if (response.status===400) {
                    alert('Not able to finalize game.')
                    return
                }
                setUpdateTournamentList(true)
            } catch(err) {
                console.log(err)
            }
            setCurrentRoster([])
        }
        if (finalize) {
            finalizeTournament()
            setFinalize(false)
        }
        
    },[finalize])

    useEffect(()=>{
        console.log(tournamentID)
        if (tournamentID>-1) LoadRoster()
    },[tournamentID])

    const orderPlayers=(which, change)=>{
        let localDirection = direction
        let localCurrentDirection = currentDirection
        if (change) {
            if (currentDirection===which) 
                localDirection = {
                    ...direction,
                    ...{[which]:(direction[which]==='forward')?'backward':'forward'}
                }
            else localCurrentDirection=which
        }

        if (localCurrentDirection==='player_name')
            if (localDirection[which]==='forward') setCurrentRoster(currentRoster.sort((a,b)=>a[localCurrentDirection].localeCompare(b[localCurrentDirection])).toReversed())
                else setCurrentRoster(currentRoster.sort((a,b)=>a[localCurrentDirection].localeCompare(b[localCurrentDirection])))
        else if (localDirection[which]==='forward') {
            console.log(currentRoster.sort((a,b)=>a[localCurrentDirection]-(b[localCurrentDirection])))
            setCurrentRoster(currentRoster.sort((a,b)=>a[localCurrentDirection]-(b[localCurrentDirection])))
        }
            else  setCurrentRoster(currentRoster.sort((a,b)=>b[localCurrentDirection]-a[localCurrentDirection]))            

        setCurrentDirection(localCurrentDirection)
        setDirection(localDirection)
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
        setDirection({
            ...direction,
            ...{currentDirection:(direction[currentDirection]==='forward')?'backward':'forward'}
        });
        if (currentDirection==='position')  orderPlayers(currentDirection, false)   
    }

    const UpdateRoster=async ()=>{

        try{
            const response = await axios.post("http://127.0.0.1:8000/tournaments/update_roster/",{allUsers:currentRoster});
            console.log(direction[currentDirection])
            if (direction[currentDirection]==='forward') {
                setCurrentRoster(response.data.sort((a,b)=>a[currentDirection].localeCompare(b[currentDirection])))
            } else {
                setCurrentRoster(response.data.sort((a,b)=>a[currentDirection].localeCompare(b[currentDirection])).toReversed())
            }
            
        }catch(err){

            if (err.response.data['result']==='problem') {
                let playerList = '';
                err.response.data['problem_players'].map((onePlayer)=> playerList=playerList + '\n ' +  onePlayer);
                alert(`Issues with updating positions on the following players ${playerList}`);
            } else {alert(`There was an issue with updating the results.  Error code ${err.status}`);}
            
        }        
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
                <Headers
                    orderPlayers={orderPlayers}
                />
                {currentRoster.map((onePlayer)=>(
                    <Fragment key={onePlayer.id}>
                        <OnePlayer
                            thisPlayer={onePlayer}
                            setPosition={setPosition}
                            GetRoster={LoadRoster}
                            IsOutSetPosition={IsOutSetPosition}
                            />
                    </Fragment>
                ))}                    
        </div>
    )
}
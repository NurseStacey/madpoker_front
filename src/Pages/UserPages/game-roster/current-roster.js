import My_Button from '../../../Components/Widgets/my-button'
import OnePlayer from './one-player'
import {useState, useEffect} from 'react'
import axios from 'axios';

export default function CurrentRoster({
    which_game
})
{
    const [numberPlayers, setNumberPlayers]=useState(0)
    const [positionDirection, setPositionDirection]= useState('forward')
    const [direction, setDirection]=useState({
        'name':'forward',
        'position':'forward'
    })
    const [currentDirection, setCurrentDirection]=useState('name')
    const [currentRoster, setCurrentRoster]=useState([])
    const Test=()=>{console.log(currentRoster)}

    const UpdateRoster=async ()=>{
        //let formData={}
        try{
            
            const response = await axios.post("http://127.0.0.1:8000/games/update_roster/",{allUsers:currentRoster});


        }catch(err){

            if (err.response.data['result']==='problem') {
                let playerList = '';
                err.response.data['problem_players'].map((onePlayer)=> playerList=playerList + '\n ' +  onePlayer);
                //playerList=playerList.slice(2,playerList.length)
                alert(`Issues with updating positions on the following players ${playerList}`);
            } else {alert(`There was an issue with updating the results.  Error code ${err.status}`);}
            
        }        
    }
    const setPosition=(e)=>{
        
        let thisPlayer = currentRoster.find((onePlayer)=>onePlayer.name===e.target.name)
        console.log(e.target.name)
        console.log(e.target.value)
        
        thisPlayer.position =e.target.value
        console.log(thisPlayer)

        let newRoster = [
            ...currentRoster.filter((onePlayer)=>onePlayer.name!==thisPlayer.name),
            thisPlayer
        ]

        setCurrentRoster(newRoster.sort((a,b)=>a.name.localeCompare(b.name)))
    }

    const GetRoster=async()=>{
        //console.log(which_game)
        if (which_game.id !== undefined) {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/games/game_roster/${which_game.id}`,);    
                setNumberPlayers(response.data.PlayersArray.length);
                setCurrentRoster(response.data.PlayersArray.sort((a,b)=>a.name.localeCompare(b.name)));
                }catch(err){
                    alert(`There was an issue with getting the current roster.  Error code ${err.status}`)
                }
            }
    }
    useEffect(()=>{
        GetRoster();
    },[which_game])

    const orderPlayers=(which)=>{
        if (currentDirection===which){
            if (direction[which]==='forward'){
                setCurrentRoster(currentRoster.sort((a,b)=>a[which].localeCompare(b[which])))
            } else {
                setCurrentRoster(currentRoster.sort((a,b)=>b[which].localeCompare(a[which])))
            }
            setDirection({
                ...positionDirection,
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

    return(
        <div
            style={{
                display:'block',
                margin:'25px'
            }}>
           <div 
                style={{
                    display:'flex',
                    justifyContent:'center',
                    fontSize:'18px',
                    margin:'5px 0px'
                }}
                >             
                {numberPlayers>0 ? `${numberPlayers} Players Registerd` :''  } 
            </div>   
            <div 
                style={{
                    display:'flex',
                    justifyContent:'center',
                    margin:'5px 0px'
                }}
                >
                <My_Button
                    button_function={UpdateRoster}
                    button_text="Update Roster"
                    button_style={{
                        height:'50px',
                        width:'150px'
                    }}
                    disable={false}
                />
            </div>
            <div
                style={{
                    display:'block',
                    border:'1px solid black',
                    margin:'3% 20%'
                }}>
                <div
                    style={{
                        display:'flex',
                        justifyContent:'space-between',
                        font:'arial',
                        fontSize:'18px',
                        border:'1px solid black',
                        width:'100%',
                        //margin:'10px auto',
   
                        
                    }}>
                    <div
                        onClick={()=>orderPlayers('name')}
                        style={{
                            width:'30%',
                            textAlign:'left',
                            paddingLeft:'15%',
                            cursor:'pointer' 
                        }}>
                        Player
                    </div>
                    <div                
                        style={{
                            width:'25%',
                            textAlign:'left',
                        }}>
                        Registration Time
                    </div>
                    <div
                        onClick={()=>orderPlayers('position')}
                        style={{
                            width:'10%',
                            paddingRight:'15%',
                            textAlign:'right',
                            cursor:'pointer'   
                        }}
                    >
                        Position
                    </div>
                            
                </div>
                {currentRoster.map((onePlayer)=>(
                    <div
                        key={onePlayer.id}
                    >
                        <OnePlayer
                            thisPlayer={onePlayer}
                            setPosition={setPosition}
                            />
                    </div>
                ))}
            </div>

            <button onClick={Test}>Test</button>
        </div>
    )
}
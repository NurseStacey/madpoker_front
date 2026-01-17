import My_Button from '../../../Components/Widgets/my-button'
import OnePlayer from './one-player'
import {useState, useEffect} from 'react'
import axios from 'axios';

export default function CurrentRoster({
    which_game
})
{
    const [nameDirection, setNameDirection]= useState('forward')
    const [positionDirection, setPositionDirection]= useState('forward')
    const [direction, setDirection]=useState({
        'name':'forward',
        'position':'forward'
    })
    const [currentDirection, setCurrentDirection]=useState('name')
    const [currentRoster, setCurrentRoster]=useState([])
    const Test=()=>{console.log(currentRoster)}
    const UpdateRoster=()=>{}
    const setPosition=(e)=>{
        
        let thisPlayer = currentRoster.find((onePlayer)=>onePlayer.name===e.target.name)

        thisPlayer.position =e.value
        let newRoster = [
            ...currentRoster.filter((onePlayer)=>onePlayer.name!==thisPlayer.name),
            thisPlayer
        ]

        setCurrentRoster(newRoster.sort((a,b)=>a.name.localeCompare(b.name)))
    }

    const GetRoster=async()=>{
        
        if (which_game.id !== undefined) {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/games/game_roster/${which_game.id}`,);    
                setDirection(response.data.PlayersArray.sort((a,b)=>a.name<b.name));
                }catch(err){
                    console.log(err);
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
                    margin:'5px 0px'
                }}
                >
                <My_Button
                    button_function={UpdateRoster}
                    button_text="Update Roster"
                    button_style={{}}
                    disable={false}
                />
            </div>
            <div
                style={{
                    display:'flex',
                    justifyContent:'space-between',
                    font:'arial',
                    fontSize:'18px',
                    margin:'10px auto',
                    width:'50%',
                    alignItems:'center'
                }}>
                <div
                    onClick={()=>orderPlayers('name')}
                    style={{
                        width:'50%',
                        textAlign:'left',
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
                        width:'25%',
                        textAlign:'left',
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

            <button onClick={Test}>Test</button>
        </div>
    )
}
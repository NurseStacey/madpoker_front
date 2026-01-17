import My_Button from '../../../Components/Widgets/my-button'
import OnePlayer from './one-player'
import {useState, useEffect} from 'react'
import axios from 'axios';

export default function CurrentRoster({
    which_game
})
{
    const [currentRoster, setCurrentRoster]=useState([])
    const Test=()=>{console.log(currentRoster)}

    const UpdateRoster=()=>{}

    const setPosition=(e)=>{
        let thisPlayer = currentRoster.find((onePlayer)=>onePlayer.id==e.target.name)
        thisPlayer.position=e.value
        let newRoster = [
            ...CurrentRoster.map((onePlayer)=>onePlayer.id!==thisPlayer.id),
            thisPlayer
        ]
        newRoster.sort((a,b)=>a.name<b.name)
        setCurrentRoster(newRoster)
    }

    const GetRoster=async()=>{
        try{

            const response = await axios.get(`http://127.0.0.1:8000/games/game_roster/${which_game.id}`,);    
            setCurrentRoster(response.data.PlayersArray.sort((a,b)=>a.name<b.name));
            }catch(err){
                console.log(err);
            }
    }
    useEffect(()=>{

        GetRoster();

    },[which_game])

    return(
        <div
            style={{
                display:'block'
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
                {currentRoster.map((onePlayer)=>(

                        <OnePlayer
                            thisPlayer={onePlayer}
                            setPosition={setPosition}
                            />

                ))}
{/* 
            <button onClick={Test}>Test</button> */}
        </div>
    )
}
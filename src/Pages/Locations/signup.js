import {useState, useEffect} from 'react';
import MyButton from '../../Components/Widgets/my-button'
import MyDropdownText from '../../Components/Widgets/my-dropdown-text'
import axios from 'axios'


export default function Signup({
    setPlayer,
    player,
    setOpenModal,
    SignupForGame, 
    setPlayerID,
    venueName,
    time,
    section
})
{
    const [allPlayers, setAllPlayers]=useState([]);

    const LoadPlayers = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/players/players/",);
            console.log(response.data)
            setAllPlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))

        }catch(err){
            console.log(err);
        } 
    }    
    useEffect(()=>{
        LoadPlayers();
    },[])    

    const NameSelected=(e)=>{
        
        setPlayer(allPlayers.find((onePlayer)=>onePlayer.player===e.target.value))
        setPlayerID(allPlayers.find((onePlayer)=>onePlayer.player===e.target.value).id)
    }

    return(
        <div
            style={{
                height:"40%",
            }}
        >                
            <div
                style={{
                    fontSize:'20px',
                    marginTop:'30px'
                }}>
            Registration for {section} at {time} at {venueName}
            </div>

                <MyDropdownText
                    optionsList={allPlayers.map((onePlayer)=>onePlayer.player)}
                    setSelectedOption={NameSelected}
                    selection={player.player}
                    style={{
                        height:"100px",
                        margin:"10px auto"
                    }}
                    disable={false}
                    name="all_players"
                />

                <div
                    style={{
                        display:"flex",
                        justifyContent:"center"
                    }}
                >
                
                            
                    <MyButton
                        button_function={()=>setOpenModal(false)}
                        button_text="Cancel"
                        button_style={{
                            margin:"10px  50px",
                            width:"100px",
                            height:"80px"}}
                        disable={false}
                    />
                    <MyButton
                        button_function={SignupForGame}
                        button_text="Sign up for Game"
                        button_style={{
                            margin:"10px  50px",
                            width:"100px",
                            height:"80px"}}
                        disable={false}
                    />        
                </div>                      
        </div>        
    )
}
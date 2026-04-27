import {useState, useEffect} from 'react';
import MyButton from '../../Components/Widgets/my-button'
import MyDropdownText from '../../Components/Widgets/my-dropdown-text'
import axios from 'axios'
import './location.css'
import {DjangoAddress} from '../../data-files/django-addres';


export default function Signup({
    setPlayer,
    player,
    setOpenModal,
    SignupForGame, 
    setPlayerID,
    gameInfo
})
{
    const [allPlayers, setAllPlayers]=useState([]);

    const LoadPlayers = async()=>{
        try{
            let url= DjangoAddress + `/games/players/`;
            const response = await axios.get(url,);              

            setAllPlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))
        }catch(err){
            console.log(err);
            alert('Problem loading players.')
        } 
    }    
    useEffect(()=>{
        LoadPlayers();
    },[])    

    const NameSelected=(e)=>{
        try{
            let thisPlayer=allPlayers.find((onePlayer)=>onePlayer.player===e.target.value)
            setPlayer(thisPlayer.player)
            setPlayerID(thisPlayer.id)            
        } catch{}
    }

    const ButtonStyle = {
        margin:"10px  50px",
        width:"100px",
        height:"80px"
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
                Registration for  {gameInfo.game} on {gameInfo.date} at {gameInfo.time} at {gameInfo.venueName}
            </div>

                <MyDropdownText
                    optionsList={allPlayers.map((onePlayer)=>onePlayer.player)}
                    setSelectedOption={NameSelected}
                    selection={player}
                    style={{
                        height:"100px",
                        margin:"10px auto"
                    }}
                    disable={false}
                    name="all_players"
                />

                <div
                    className='buttonBox'
                >
                    <MyButton
                        button_function={()=>setOpenModal(false)}
                        button_text="Cancel"
                        button_style={ButtonStyle}
                        disable={false}
                    />
                    <MyButton
                        button_function={SignupForGame}
                        button_text="Sign up for Game"
                        button_style={ButtonStyle}
                        disable={false}
                    />        
                </div>                      
        </div>        
    )
}
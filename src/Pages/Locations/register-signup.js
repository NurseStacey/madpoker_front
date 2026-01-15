import {useState, useEffect} from 'react'
import axios from 'axios'
import Signup from './signup'
import Register from './register'

export default function GameRegistrationAndSignup({
    setOpenModal,
    gameID
})
{
    const [player, setPlayer]=useState({
        player:"",
        email:"",
        phone:""
    })
    const [playerID, setPlayerID]=useState(-1)


    const RegisterNewPlayer = async ()=>{

        try{
            let data_to_send = {
                new_player:player,
                WhichGame:gameID
            }
            const response = await axios.post("http://127.0.0.1:8000/games/register_new_player_for_game/",data_to_send).then(

                setPlayer({
                    player:"",
                    email:"",
                    phone:"",
                    id:response.data.id
                })
                
            )
            
        }
        catch(error){
           console.log(error)

        }        
        setOpenModal(false)
    }

    const RegisterAndSignUp=()=>{
        RegisterNewPlayer()
    }
    
    const SignupForGame=async(localPlayerID)=>{
        let data_to_send={
            WhichPlayer:localPlayerID,
            WhichGame:gameID
        }
        try{
            const response = await axios.post(`http://127.0.0.1:8000/games/register_player_for_game/`,data_to_send)
            setPlayer({
                player:"",
                email:"",
                phone:""
            })

        }
        catch(error){
           console.log(error)

        }    
    }
    return(
        <div
            style={{
                position:'fixed',
                border:'1px solid black',
                backgroundColor:'#FADADD',
                width:'800px',
                height:'700px',
                zIndex:'1000'
            }}>
            <Signup
                setPlayer={setPlayer}
                player={player}
                setOpenModal={setOpenModal}
                SignupForGame={()=>SignupForGame(playerID)}
                setPlayerID={setPlayerID}
            />
            <Register
                setNewPlayer={setPlayer}
                newPlayer={player}
                RegisterAndSignUp={RegisterAndSignUp}
            />
            </div>

    )
}
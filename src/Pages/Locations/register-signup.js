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
            const response = await axios.post("http://127.0.0.1:8000/players/players/",player)
            console.log(response.data)
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
    const RegisterAndSignUp=()=>{
        RegisterNewPlayer()
        SignupForGame()
    }
    
    const SignupForGame=async()=>{
        let data_to_send={
            WhichPlayer:playerID,
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
                SignupForGame={SignupForGame}
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
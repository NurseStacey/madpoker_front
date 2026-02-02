import {useState, useEffect} from 'react'
import axios from 'axios'
import Signup from './signup'

export default function GameRegistrationAndSignup({
    setOpenModal,
    gameID,
    venueName,
    time,
    section
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
                which_game:gameID
            }
            const response = await axios.post("http://127.0.0.1:8000/games/register_new_player_for_game/",data_to_send);
                setPlayer({
                    player:"",
                    email:"",
                    phone:"",
                    id:response.data.id
                })                
            
        } catch(err){
            if (err.response.data['status']==='problem') {
                alert('Not able to create new user.  Please contact a director');
            } else if (err.response.data['status']==='duplicit username'){alert('That user name is already in use.');            
            }else{ alert('There was an issue with registration.  Please let a director know.');}

        }        
        setOpenModal(false)
    }

    const RegisterAndSignUp=()=>{
        RegisterNewPlayer()
    }
    
    const SignupForGame=async(localPlayerID)=>{
        let data_to_send={
            which_player:localPlayerID,
            which_game:gameID
        }
        try{
            const response = await axios.post(`http://127.0.0.1:8000/gameresults/register_player_for_game/`,data_to_send)
            console.log(response)
            if(response.status===201) alert('You are registered for this game.')
                else  alert('There was an issue with registration.  Please let a director know.');

            setPlayer({
                player:"",
                email:"",
                phone:""
            })

        }
        catch(error){
            if (error.response.status===409) {
                alert("You've already registered")
            }else if (error.response.status===423) {
                alert("Not able to register, game is locked.")
            } else {
                alert('There was a problem with signing up up.  Please contact a director')
            }
           console.log(error)
           

        }    

        setOpenModal(false)
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
                venueName={venueName}
                time={time}
                section={section}
            />
            </div>

    )
}
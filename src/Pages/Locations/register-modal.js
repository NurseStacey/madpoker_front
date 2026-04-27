import {useState, useEffect} from 'react'
import axios from 'axios'
import Signup from './signup'
import './location.css';
import {DjangoAddress} from '../../data-files/django-addres';

export default function SignupModal({
    setOpenModal,
    gameID,
    gameInfo
})
{
    const [player, setPlayer]=useState("")
    const [playerID, setPlayerID]=useState(-1)

    const SignupForGame=async(localPlayerID)=>{
        let data_to_send={
            which_player:localPlayerID,
            which_game:gameID
        }
        try{
            let url= DjangoAddress + `/gameresults/register_player_for_game/`;
          
            const response = await axios.post(url,data_to_send);
            if(response.status===201) alert('You are registered for this game.')
                else  alert('There was an issue with registration.  Please let a director know.');

            setPlayer("")

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
            className='SignUpClass'
        >
            <Signup
                setPlayer={setPlayer}
                player={player}
                setOpenModal={setOpenModal}
                SignupForGame={()=>SignupForGame(playerID)}
                setPlayerID={setPlayerID}
                gameInfo={gameInfo}
            />
        </div>

    )
}
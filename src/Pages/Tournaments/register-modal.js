import {useState, useEffect} from 'react'
import axios from 'axios'
import MyButton from '../../Components/Widgets/my-button'
import MyDropdownText from '../../Components/Widgets/my-dropdown-text'

export default function SignupModal({
    CloseModal,
    tournamentID,
    tournamentInfo
})
{
    const [player, setPlayer]=useState("")
    const [playerID, setPlayerID]=useState(-1)

    const [allPlayers, setAllPlayers]=useState([]);

    const LoadPlayers = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/players/players/",);
            setAllPlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))
        }catch(err){
            console.log(err);
        } 
    }    
    useEffect(()=>{
        LoadPlayers();
    },[]) 

    const NameSelected=(thisPlayer)=>{
        setPlayer(thisPlayer.target.value)
        setPlayerID(allPlayers.find((onePlayer)=>onePlayer.player===thisPlayer.target.value).id)

    }

    const SignupForTournament=async(localPlayerID)=>{
        let data_to_send={
            which_player:playerID,
            which_tournament:tournamentInfo.tournamentID
        }
        console.log(data_to_send)
        try{
            const response = await axios.post(`http://127.0.0.1:8000/tournaments/register_player_for_tournament/`,data_to_send)
            if(response.status===201) alert('You are registered for this tournament.')
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

        CloseModal(false)
    }

    const Test = () =>{console.log(tournamentInfo)}
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
                {tournamentInfo.tournamentName}
                <MyDropdownText
                    optionsList={allPlayers.map((onePlayer)=>onePlayer.player)}
                    setSelectedOption={NameSelected}
                    selection={player}
                    style={{
                        height:"200px",
                        margin:"10px auto"
                    }}
                    disable={false}
                    name="all_players"
                />
                <button onClick={Test}>test</button>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"center",
                        margin:'4% auto'
                    }}
                >                            
                    <MyButton
                        button_function={()=>CloseModal(false)}
                        button_text="Cancel"
                        button_style={{
                            margin:"10px  50px",
                            width:"120px",
                            height:"80px"}}
                        disable={false}
                    />
                    <MyButton
                        button_function={SignupForTournament}
                        button_text="Sign up for Tournament"
                        button_style={{
                            margin:"10px  50px",
                            width:"120px",
                            height:"80px"}}
                        disable={false}
                    />        
                </div>                  
            </div>

    )
}
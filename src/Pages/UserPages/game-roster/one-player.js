import MyButton from "../../../Components/Widgets/my-button"
import axios from 'axios'

export default function OnePlayer({
    thisPlayer,
    setPosition,
    GetRoster,
    otherEvents,
    IsOutSetPosition,
    disableUpdateButton
})
{

    const AddTo=async(id)=>{
        let data_to_send={
            which_player:thisPlayer.id,
            which_game:id
        }
        try{
            console.log(data_to_send)
            const response = await axios.post(`http://127.0.0.1:8000/games/register_player_for_game/`,data_to_send)
            console.log(response)
            if(response.status===201) alert('You are registered for this game.')
                else  alert('There was an issue with registration.  Please let a director know.');

        }
        catch(error){
            if (error.response.status===409) {
                alert("You've already registered.")
            }else if (error.response.status===423) {
                alert("Not able to register, game is locked.")
            } else {
                alert('There was a problem with signing up up.  Please contact a director.')
            }
           console.log(error)
           

        }    
    }

    const Test=()=>{console.log(otherEvents)}

    const IsOut=()=>{
        IsOutSetPosition(thisPlayer.player_name)
    }


    const RemovePlayer=async(id)=>{
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/games/remove_layer_from_game/${id}/`,);
            GetRoster()
        }catch(err){
            alert('Error deleting venue')
        }      
    }

    return(
        <>
            <div
                style={{
                    textAlign:'left',
                    paddingLeft:'15%',
                }}>
                {thisPlayer.player_name}
            </div>
            <div                
                style={{
                    textAlign:'left',
                }}>
                {thisPlayer.registration_date_time_str}
            </div>
            <div
                style={{
                    paddingRight:'5%',
                    textAlign:'left',
                    cursor:'pointer',
                    alignItems:"left",
                }}
                >
                <input
                style={{
                    width:"30px",
                    marginRight:"10%",
                }}
                name={thisPlayer.player_name}
                onChange={setPosition}  
                type="number"
                
                disabled={disableUpdateButton}
                value={thisPlayer.position}>                    
                </input>

            </div> 
            <div
                style={{
                    paddingRight:'15%',
                    textAlign:'right',
                    cursor:'pointer',   
                }}>
                <MyButton
                    button_function={()=>RemovePlayer(thisPlayer.id)}
                    button_text="Remove Player"
                    button_style={{
                        width:"100px",
                        height:"100%",
                        fontSize:"15px",
                    }}
                    disable={disableUpdateButton}
                />
            </div>    
            <div
                style={{
                    paddingRight:'15%',
                    textAlign:'right',
                    cursor:'pointer',
                }}>           
                <MyButton
                    button_function={IsOut}
                    button_text="Is Out"
                    button_style={{
                        width:"100px",
                        height:"100%",
                        fontSize:"15px",
                    }}
                    disable={disableUpdateButton}
                /> 
                </div>
               
             {otherEvents.map((oneEvent)=>(
                <div
                    key={oneEvent.event_name}
                    style={{
                        paddingRight:'15%',
                        textAlign:'right',
                        cursor:'pointer',
                    }}>
                       
                    <MyButton
                        button_function={()=>AddTo(oneEvent.id)}
                        button_text={oneEvent.event_name}
                        button_style={{
                            width:"100px",
                            height:"100%",
                            fontSize:"15px",
                        }}
                        disable={false}
                        />                        
                </div>                 
            ))}                  
       
        </>
    )
}
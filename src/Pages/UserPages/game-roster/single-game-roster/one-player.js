import MyButton from "../../../../Components/Widgets/my-button"
import axios from 'axios'

export default function OnePlayer({
    thisPlayer,
    setPosition,
    setPoints,
    GetRoster,
    IsOutSetPosition,
    disableUpdateButton
})
{
    const Test=()=>{}

    const IsOut=()=>{
        IsOutSetPosition(thisPlayer.player_name)
    }


    const RemovePlayer=async(id)=>{
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/gameresults/remove_player_from_game/${id}/`,);
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
                name={'position'+thisPlayer.player_name}
                onChange={setPosition}  
                type="number"
                
                disabled={disableUpdateButton}
                value={thisPlayer.position}>                    
                </input>

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
                    name={'pomts-' + thisPlayer.player_name}
                    onChange={setPoints}  
                    type="number"
                    
                    disabled={true}
                    value={thisPlayer.points}>                    
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
        </>
    )
}
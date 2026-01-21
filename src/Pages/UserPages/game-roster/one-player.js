import MyButton from "../../../Components/Widgets/my-button"
import axios from 'axios'

export default function OnePlayer({
    thisPlayer,
    setPosition,
    GetRoster
})
{

    const RemovePlayer=async(id)=>{
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/games/remove_layer_from_game/${id}/`,);
            GetRoster()
        }catch(err){
            alert('Error deleting venue')
        }      
    }

    return(
        <div
            style={{

                display:'flex',
                justifyContent:'left',
                font:'arial',
                fontSize:'18px',
                width:'100%',      
                alignItems:'center'       
            }}>
            <div
                style={{
                    width:'30%',
                    textAlign:'left',
                    paddingLeft:'15%',
                }}>
                {thisPlayer.name}
            </div>
          <div                
                style={{
                    width:'25%',
                    textAlign:'left',
                }}>
                {thisPlayer.registration_time}
            </div>
             <div
                style={{
                    width:'5%',
                    paddingRight:'5%',
                    textAlign:'right',
                    cursor:'pointer',
                }}
                >
                <input
                style={{
                    width:"30px",
                    marginRight:"10%",
                    textAlign:"right",
                    
                }}
                name={thisPlayer.name}
                onChange={setPosition}  
                type="number"
                value={thisPlayer.position}></input>

            </div> 
            <div
                style={{
                    width:'10%',
                    paddingRight:'15%',
                    textAlign:'right',
                    cursor:'pointer',   
                }}>
                <MyButton
                    button_function={()=>RemovePlayer(thisPlayer.id)}
                    button_text="Remove Player"
                    button_style={{
                        width:"100px",
                        height:"50%",
                        fontSize:"15px",
                    }}
                    disable={false}
                />

            </div>            
        </div>
    )
}
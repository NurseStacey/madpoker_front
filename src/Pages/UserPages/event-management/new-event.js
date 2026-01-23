import MyButton from "../../../Components/Widgets/my-button"
import MyInput from "../../../Components/Widgets/my-input"
import axios from "axios"

export default function NewEvent({
    fetchData,
    event,
    setEvent    
})
{
    
    const handleChange = (e)=>{setEvent({
        event:e.target.value,
        id:event.id
    })}

    const AddEvent = async()=>{        
        try{
            const response = (await axios.post(`http://127.0.0.1:8000/games/sections/`,{'name':event.event}));
            fetchData();
            setEvent({
                event:"",
                id:-1
            })
        }catch(err){
            if(err.response.status===400) {alert('Error creating event')
            } else if(err.response.status===409) {alert('An event with that name exists already.') }
        }
    }

    return(
        <div
            style={{
                display:"block",
                width:"40%",
                margin:"5%",
                border:'1px solid black',
                padding:'40px'
            }}>
            
            <MyInput
                labelText="New Venue Name"
                handleChange={handleChange}
                inputValue={event.event}
                inputName="event_name"
                inputType="text"
            />
            <MyButton
                button_function={AddEvent}
                button_text="Add Event"
                button_style={{
                    height:"50px",
                    width:"100px",
                    margin:"auto"
                }}
                disable={false}
            />                
        </div>
    )
}
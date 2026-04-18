import MyButton from '../../../Components/Widgets/my-button'
import axios from 'axios'

export default function OneVenue({
    ThisVenue,
    fetchData,
    EditVenue
})
{
    const RemoveVenue=async(id)=>{
        try{
            const response = (await axios.delete(`http://127.0.0.1:8000/venues/update_venue/${ThisVenue.id}/`,))
            fetchData();
        }catch(err){    
            alert('Error deleting venue')
        }
    }

    return(
        <div
            style={{
                fontSize:'20px',
                font:'arial',
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-around",
                width:'80%',
                margin:'1% auto'
            }}
        >
            <div
                style={{
                    padding:'1%',
                    width:'25%',
                    textWrap:'wrap',
                    border:'1px solid black'
                }}
            >
                {ThisVenue.venue_name} 
            </div>
            <div
                style={{
                    padding:'1%',
                    width:'25%',
                    overflowWrap:'break-word',
                    border:'1px solid black'
                }}
            >
                {ThisVenue.display_label} 
            </div>
            <img src={`http://127.0.0.1:8000/${ThisVenue.image}`} width="100" height="100"/>

            <MyButton
                button_function={RemoveVenue}
                button_text={"Remove Venue"}  
                button_style={{
                    height:"50px",
                    width:"100px",
                    fontSize:'20px',
                }}
                disable={false}              
            />  
            <MyButton
                button_function={()=>EditVenue(ThisVenue.id)}
                button_text={"Edit Venue"}  
                button_style={{
                    height:"50px",
                    width:"100px",
                    fontSize:'20px',
                }}
                disable={false}              
            />              
        </div>
    )
}
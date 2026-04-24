import MyButton from '../../../Components/Widgets/my-button'
import axios from 'axios'

export default function OneDirector({
    ThisDirector,
    fetchData,
    EditDirector
})
{
    const RemoveDirector=async(id)=>{
        try{
            const response = (await axios.delete(`http://127.0.0.1:8000/login_api/update_director/${ThisDirector.id}/`,))
            fetchData();
        }catch(err){    

            alert('Error deleting director')
           
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
                    width:'20%',
                    textWrap:'wrap',
                    border:'1px solid black'
                }}
            >
                {ThisDirector.username} 
            </div>
            <div
                style={{
                    padding:'1%',
                    width:'20%',
                    overflowWrap:'break-word',
                    border:'1px solid black'
                }}
            >
                {ThisDirector.email} 
            </div>
            <div
                style={{
                    padding:'1%',
                    width:'20%',
                    overflowWrap:'break-word',
                    border:'1px solid black'
                }}
            >
                {ThisDirector.display_name} 
            </div>            
            <img src={`http://127.0.0.1:8000/${ThisDirector.image}`} width="100" height="100"/>
            <MyButton
                button_function={RemoveDirector}
                button_text={"Remove Director"}  
                button_style={{
                    height:"50px",
                    width:"100px",
                    fontSize:'20px',
                }}
                disable={false}              
            />  
            <MyButton
                button_function={()=>EditDirector(ThisDirector.id)}
                button_text={"Edit Director"}  
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
import MyButton from '../../../Components/Widgets/my-button'
import axios from 'axios'

export default function OneDirector({
    ThisDirector,
    fetchData
})
{
    const RemoveDirector=async(id)=>{
        try{
            const response = (await axios.delete(`http://127.0.0.1:8000/login_api/remove_director/${ThisDirector.id}/`,))
            fetchData();
        }catch(err){    

            if(err.response.status===400) {alert('Error deleting venue')
            } 
        }
    }

    return(
        <div
            style={{
                fontSize:'20px',
                font:'arial',
               // border:'1px solid black',
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-around",
                width:'80%',
                margin:'1% auto'
            }}
        >
            <div
                style={{

                    width:'30%'
                }}
            >
                {ThisDirector.username} 
            </div>
            <div
                style={{

                    width:'30%'
                }}
            >
                {ThisDirector.email} 
            </div>
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
        </div>
    )
}
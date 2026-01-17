import axios from 'axios';
import OneMessage from './one-message';


export default function CurrentMessages({
    Messages,
    fetchData,
    Reset,
    setRecordToEdit,
    setEditText,
})
{
    const EditMessage =(id)=>{
        console.log(Messages.find((one_message)=>one_message.id==id))
        setEditText(true)
        setRecordToEdit(Messages.find((one_message)=>one_message.id==id))
    }

    const DeleteMessage = async (id) =>{

        try{

            const response = await axios.delete(`http://127.0.0.1:8000/website_data/homepagetext/${id}/`,);

            fetchData()
            Reset()

        }catch(err){
            console.log(err);
        }
    }

    return(
    <div>
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                margin:"1% 5%",
                font:"arial",
                fontSize:"20px",                
            }}>
            <div
                style={{
                    width:"10%"
                }}
                >
                    
            </div>
            <div
                style={{
                    width:"10%"
                }}
                >
                    
            </div>
            <div
                style={{
                    width:"10%"
                }}
                >
                    Order
            </div>
            <div
                style={{
                    width:"10%"
                }}
                >
                    Color
            </div>  
            <div
                style={{
                    width:"10%"
                }}
                >
                    Font Size
            </div>                        
            <div
                style={{
                    width:"70%"
                }}
                >
                    Text
            </div>                                              
        </div>
        {Messages.map((one_message)=>
            <div
                key={one_message.id}>
                <OneMessage
                    thisMessage={one_message}
                    deleteFunction = {DeleteMessage}
                    editFunction = {EditMessage}
                    />        
            </div>
        )} 
    </div>
     
    )
}
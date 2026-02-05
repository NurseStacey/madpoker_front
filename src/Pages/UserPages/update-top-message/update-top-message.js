import {useState,useEffect} from 'react';
import axios from 'axios';
import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import NewMessage from './new-message'
import UpdateMessage from './one-message-edit'
import CurrentMessages from './current-messages'


export default function UpdateTopMessage()
{
    const [formData, setFormData]=useState({
        order:"",
        text:"",
        color:"#000000",
    });    

    const [editText, setEditText]=useState(false)
    const [RecordToEdit, setRecordToEdit]=useState({
        order:"",
        text:"",
        color:"#000000",        
    })    
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const [Messages,setMessages]=useState([]);

    
    const Reset = () =>{
        setEditText(false)
        setRecordToEdit({
        order:"",
        text:"",
        color:"#000000",        
        })
    }




    const fetchData = async ()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/website_data/homepagetext",);

            setFormData({
                    order:Math.max(...response.data.map((one_record)=>one_record.order))+1,
                    text:"",
                    color:"#000000",        
                }
            )
            setMessages(response.data)

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        setWidth(width)
        setHeight(height)
        fetchData()
    },[]);

    const Test =  ()=>{
      
    }

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>

            <Title
                TitleText = "Update Top Message on Home Page"
                />                 
            <div
                style={{
                    display:"block"
                }}>
                {editText ? 
                <UpdateMessage
                    fetchData={fetchData}

                    Reset={Reset}
                    thisRecord={RecordToEdit}
                    editText={editText}
                />:
                <NewMessage
                    formData={formData}
                    setFormData={setFormData}                    
                    fetchData={fetchData}
                    Reset={Reset}/>}
                <CurrentMessages
                    Messages={Messages}
                    fetchData={fetchData}
                    Reset={Reset}
                    setRecordToEdit={setRecordToEdit}
                    setEditText={setEditText}
                    
                />
             </div>  

                    {/* <button onClick={Test}>test</button> */}
        </div>
    )
}
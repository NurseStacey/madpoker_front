import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import OneMessage from './one-message'
import NewMessage from './new-message'
import UpdateMessage from './one-message-edit'
import MyButton from '../../../Components/Widgets/my-button'
import TodayDate from '../../../utils/today-date';

export default function UpdateSpecialMessage()
{

    const [formData, setFormData]=useState({
        date:TodayDate(),
        text:"",
        color:"#000000",
    });    
    const navigate = useNavigate();
    const [editText, setEditText]=useState(false)
    const [RecordToEdit, setRecordToEdit]=useState({
        date:"",
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
        date:TodayDate(),
        text:"",
        color:"#000000",        
        })
    }
    const DeleteMessage = async (id) =>{

        try{

            const response = await axios.delete(`http://127.0.0.1:8000/website_data/specialmessages/${id}/`,);

            fetchData()
            Reset()

        }catch(err){
            console.log(err);
        }

        
    }

    const EditMessage =(id)=>{
        console.log(Messages.find((one_message)=>one_message.id==id))
        setEditText(true)
        setRecordToEdit(Messages.find((one_message)=>one_message.id==id))
    }

    const fetchData = async ()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/website_data/specialmessages",);
            console.log(response.data)
            setFormData({
                    date:TodayDate(),
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
      console.log(formData)
    }

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>

            <Title
                TitleText = "Update Special Message"
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
                <div
                    style={{
                        display:"flex",
                        flexDirection:"row",
                        margin:"5% 5%",
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
                                Date
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
                <MyButton
                    button_function={()=>navigate("/admin")}
                    button_text={"Return to Admin"}
                    button_style={{
                        height:"100px",
                        width:"100px",
                        margin:"auto"
                    }}
                />
                    {/* <button onClick={Test}>test</button>  */}
        </div>
    )
}
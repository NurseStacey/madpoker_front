import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import ColorSelector from '../../../Components/Widgets/my-color-selector'
import OneMessage from './one-message'
import MyButton from '../../../Components/Widgets/my-button'

export default function UpdateTopMessage()
{
    const navigate = useNavigate();
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const [Messages,setMessages]=useState([]);

    const DeleteMessage = (id) =>{
        console.log(id)
    }

    const EditMessage =(id)=>{
        console.log(id)
    }

    useEffect(()=>{
        setWidth(width)
        setHeight(height)

        const fetchData = async ()=>{
            try{
                console.log("Here")
                const response = await axios.get("http://127.0.0.1:8000/website_data/homepagetext",);
                setMessages(response.data)
                console.log(response)
            }catch(err){
                console.log(err);
            }
        }

        fetchData()
    },[]);

    const Test = async ()=>{
        console.log(Messages)
        // let data = {
        //     "text":"another test"
        // }
        //     try{
        //         const response = await axios.post("http://127.0.0.1:8000/website_data/homepagetext",data);
                
        //         console.log(response);
        //     }catch(err){
        //         console.log(err);
        //     }        
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
                    <div>
                        <OneMessage
                            thisMessage={one_message}
                            deleteFunction = {DeleteMessage}
                            editFunction = {EditMessage}
                            />
                            
                        </div>
                )}     
         
            <button onClick={Test}>test</button>     
        </div>
    )
}
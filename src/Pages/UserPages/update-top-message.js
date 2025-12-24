import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../utils/window-dimensions';
import Title from './Componenets/Title';

export default function UpdateTopMessage()
{
    const navigate = useNavigate();
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    
    useEffect(()=>{
        setWidth(width)
        setHeight(height)
    },[]);

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
        </div>
    )
}
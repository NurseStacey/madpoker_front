import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import MyButton from '../../../Components/Widgets/my-button';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';
import {WeekDays}  from '../../../Components/weekdays'
import SelectGame from './select-game'


export default function GameRoster()
{

    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const navigate = useNavigate();

    const [whichGame, setWhichGame]=useState({Text:""});
    const [whichUser, setWhichUser]=useState({
        username:"",
        id:-1,
        email:""
    });

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
    },[]);

    useEffect(()=>{
        
    },[whichGame])

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>

            <Title
                TitleText = "View Game Roster"
            />  
            <SelectGame
                whichGame={whichGame}
                setWhichGame={setWhichGame}
                whichUser={whichUser}
                setWhichUser={setWhichUser}
            />

            <MyButton
                button_function={()=>navigate("/admin")}
                button_text={"Return to Admin"}
                button_style={{
                    height:"100px",
                    width:"100px",
                    margin:"auto"
                }}
                disable={false}
            />               
        </div>
    )
}
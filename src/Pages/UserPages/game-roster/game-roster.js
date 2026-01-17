import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import MyButton from '../../../Components/Widgets/my-button';
import SelectGame from './select-game'
import CurrentRoster from './current-roster'

export default function GameRoster()
{

    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  

    const navigate = useNavigate();

    const [which_game, setwhich_game]=useState({Text:""});
    const [whichUser, setWhichUser]=useState({
        username:"",
        id:-1,
        email:""
    });

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
    },[]);



    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                display:"block"
        }}>
   
            <Title
                TitleText = "View Game Roster"
            />  
            <MyButton
                button_function={()=>navigate("/admin")}
                button_text={"Return to Admin"}
                button_style={{
                    height:"70px",
                    width:"150px",
                    margin:"20px auto"
                }}
                disable={false}
            />               
            <SelectGame
                which_game={which_game}
                setwhich_game={setwhich_game}
                whichUser={whichUser}
                setWhichUser={setWhichUser}
            />
            <CurrentRoster
                which_game={which_game}
                />
         
        </div>
    )
}
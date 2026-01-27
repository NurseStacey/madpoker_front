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


    const [whichDate, setWhichDate]=useState({
        date:'01/01',
        id:-1
    })

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
                setWhichDate={setWhichDate}
                whichDate={whichDate}
            />
            <CurrentRoster
                //which_game={which_game}
                whichGameID={whichDate.id}
                />
         
        </div>
    )
}
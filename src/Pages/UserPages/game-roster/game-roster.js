import {useState,useEffect} from 'react';
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

    const [whichDate, setWhichDate]=useState({
        date:'01/01',
        id:-1,
        canUpdate:false
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
               
            <SelectGame
                setWhichDate={setWhichDate}
                whichDate={whichDate}
            />
            <CurrentRoster
                whichGameID={whichDate.id}
                />
         
        </div>
    )
}
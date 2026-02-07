import {useState,useEffect} from 'react';
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import SelectGame from '../Componenets/select-game';
import CurrentRoster from '../Componenets/single-game-roster/current-roster';

export default function FinalizeGame()
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
                TitleText = "Finalize Game"
            />  
            <SelectGame
                setWhichDate={setWhichDate}
                whichDate={whichDate}
                
            />
            <CurrentRoster
                whichGameID={whichDate.id}
                includeFinalizeButton={true}
                />            
        </div>
    )
}    
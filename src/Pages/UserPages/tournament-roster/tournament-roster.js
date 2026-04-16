import {useState,useEffect} from 'react';
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import SeclectTournament from './select-tournament';
import CurrentRoster from './current-roster';


export default function TournamentRoster()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const [tournamentID, setTournamentID]=useState(-1)
    const [updateTournamentList, setUpdateTournamentList]=useState(false)
    const Test=(oneID)=>{
        console.log(oneID)
    }
    useEffect(()=>{
        setWidth(width);
        setHeight(height);
    },[width,height]);  

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>
            <Title
                TitleText = "Tournament Roster"
            />  
            <SeclectTournament
                setTournamentID={setTournamentID}
                updateTournamentList={updateTournamentList}
                setUpdateTournamentList={setUpdateTournamentList}
            />
            <CurrentRoster
                tournamentID={tournamentID}
                setUpdateTournamentList={setUpdateTournamentList}
            />
        </div>
    )
}
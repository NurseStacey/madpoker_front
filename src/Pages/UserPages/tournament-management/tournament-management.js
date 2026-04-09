import TourmanentList from './tournament-list'
import TournamentInputs from './tournament-inputs';
import {useState,useEffect} from 'react';
import axios from 'axios';
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';


export default function TournamentManagement()
{

    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const [update, setUpdate]=useState(-1)
    const [updateTournamentList, setUpdateTournamentList]=useState(true)

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
                TitleText = "Tournament Management"
            />  
            <TournamentInputs
                update={update}
                setUpdateTournamentList={setUpdateTournamentList}
            />
            <TourmanentList
                setUpdate={setUpdate}
                updateTournamentList={updateTournamentList}
                setUpdateTournamentList={setUpdateTournamentList}
            />
        </div>
    )
}
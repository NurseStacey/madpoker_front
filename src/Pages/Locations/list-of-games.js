import axios from 'axios';
import { WeekDays } from '../../Components/weekdays';
import {useEffect, useState} from 'react';
import OneWeekDay from './one-week-day';
import {DefaultGames} from './default-games';

export default function ListOfGames({
    RegisterForGame
}){
    const [localWeekDays, setLocalWeekDays]=useState([])
    const [allGames, setAllGames]=useState(DefaultGames)

    useEffect(()=>{
  
        const InfoForLocations = async()=>{
            try{
                const response=await axios.get("http://127.0.0.1:8000/games/info_for_locations_page/")
                setAllGames(response.data.data)
                if(response.data.status==="problem") {
                    alert('Problem loading games');
                    setAllGames(DefaultGames)
                }

                console.log(response.data.data)
            }catch(err){
                alert('Problem loading events.');
            }
        }
        InfoForLocations()

        let now = new Date()
        setLocalWeekDays([...WeekDays.slice(now.getDay(),WeekDays.length),...WeekDays.slice(0,now.getDay())])

    },[])    

    const Test=()=>{
        console.log(allGames);
    }
    
    return(
        <div
            style={{
                marginTop:"25px",
                width:"600px"

            }}>         
            {localWeekDays.map((oneWeekDay)=>(
                <div
                    key={oneWeekDay}
                    style={{
                        fontSize:"22px",
                        fontFamily:"averia sans libre",
                        fontWeight:"bold",
                        textAlign:"left",
                        marginTop:"15px"
                    }}>
                        <OneWeekDay
                            weekDay={oneWeekDay}
                            theseGames={allGames[oneWeekDay]}
                            RegisterForGame={RegisterForGame}
                            />  

                </div>
            ))} 
            <button onClick={Test}>test</button>
            </div>
    )
}
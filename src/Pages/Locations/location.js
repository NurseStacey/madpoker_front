import {VenuePics} from '../../data-files/venue-pictures';
import VerticalDeck from '../../Components/VerticalSlideShow/VerticalDeck';
import WindowDimensions from '../../utils/window-dimensions'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { WeekDays } from '../../Components/weekdays';
import '@fontsource/averia-sans-libre/700.css';  
import GameRegisteration from './register';


export default function Locations(){
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)
    const [playerGames, setPlayerGames]=useState([])
    const [localWeekDays, setLocalWeekDays]=useState([])
    const [openModal, setOpenModal]=useState(false)

    useEffect(()=>{
        setWidth(width*0.60)
        setLeftMargin(width*.0)
        setHeight(height)
        LoadGamesForPlayers()
        let now = new Date()
        setLocalWeekDays([...WeekDays.slice(now.getDay(),WeekDays.length),...WeekDays.slice(0,now.getDay())])

    },[])

    const LoadGamesForPlayers =async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/games/games_for_player/",);
            setPlayerGames(response.data)

            console.log(response.data)
        }catch(err){
            console.log(err);
        }        
    }

    const RegisterForGame=(id)=>{
        setOpenModal(true)
        console.log(id)
    }

    const Test=()=>{
        console.log(openModal)
        console.log(playerGames)
    }
    return(
        <div
            style={{
                width:`${Width}px`,
                height:`${Height}px`,  
                marginLeft:'125px'        
            }}
            >




                    {(openModal) ?  
                        <div
                            style={{
                                marginTop:"50px",
//                                marginLeft:"50px",
                                width:"600px",
                                height:"400px",              
                               // border:'1px solid black'                  
                            }}
                        >
                        <GameRegisteration
                            setOpenModal={setOpenModal}
                        /> 
                    </div>:
                    <div
                        style={{
                            marginTop:"150px",
                            marginLeft:"100px",
                            width:"400px",
                            height:"300px",
                            position: "relative",
    
                        }}
                        id="location_slide_show"
                    >
                        <VerticalDeck
                            All_Images={VenuePics}/>
                    </div> }
                    

                <div
                    style={{
                        color:"red",
                        fontSize:"25px",
                        fontFamily:"averia sans libre",
                        fontWeight:"bold", 
                        textDecoration:"underline",  
                        marginTop:"25px",
                        marginLeft:"100px",
                        width:"400px",
                        textAlign:"center"                                   
                    }}>
                        Locations
                </div>                
                <div
                    style={{
                        // border:"1px solid black",
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

                                {oneWeekDay}
                                {playerGames.map((oneGame)=>((oneGame.WeekDay===oneWeekDay)?
                                    <div
                                        onClick={()=>RegisterForGame(oneGame.id)}
                                        key={oneGame.id}
                                        style={{
                                            fontSize:"18px",
                                            display:'flex',
                                            flexWrap:'wrap',
                                            cursor:"pointer"
                                        }}
                                        >
                                            <p>
                                                <span style={{color:'red'}}>{oneGame.VenueName}</span>{", " + oneGame.Description}
                                            </p>                                
                                    </div>
                                    :<></>
                                ))}
                     
                            
                        </div>
                    ))}
                <button onClick={Test}>Test</button>
                </div>

        </div>
    )
}
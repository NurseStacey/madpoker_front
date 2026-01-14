import {VenuePics} from '../../data-files/venue-pictures';
import VerticalDeck from '../../Components/VerticalSlideShow/VerticalDeck';
import WindowDimensions from '../../utils/window-dimensions'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { WeekDays } from '../../Components/weekdays';
import '@fontsource/averia-sans-libre/700.css';  
import GameRegistrationAndSignup from './register-signup';
import OneGame from './one-game';


export default function Locations(){
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [gameID, setGameID]=useState(-1)
    const [playerGames, setPlayerGames]=useState([])
    const [localWeekDays, setLocalWeekDays]=useState([])
    const [openModal, setOpenModal]=useState(false)

    useEffect(()=>{
        setWidth(width*0.60)
       
        setHeight(height)
        LoadGamesForPlayers()
        let now = new Date()
        setLocalWeekDays([...WeekDays.slice(now.getDay(),WeekDays.length),...WeekDays.slice(0,now.getDay())])

    },[])

    const LoadGamesForPlayers =async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/games/games_for_player/",);
            console.log(response.data);
            setPlayerGames(response.data);

        }catch(err){
            console.log(err);
        }        
    }

    const RegisterForGame=(id)=>{
        setGameID(id)
        setOpenModal(true)

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
                        <GameRegistrationAndSignup
                            setOpenModal={setOpenModal}
                            gameID={gameID}
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
                                {playerGames.map((oneGame)=>(<div key={`${oneGame.id}${oneWeekDay}`}>
                                    <OneGame
                                        thisGame={oneGame}
                                        thisWeekDay={oneWeekDay}
                                        RegisterForGame={RegisterForGame}
                                    />
                                    </div>
                                ))} 

                     
                            
                        </div>
                    ))}
                <button onClick={Test}>Test</button>
                </div>

        </div>
    )
}


                                {/* {playerGames.map((oneGame)=>((oneGame.WeekDay===oneWeekDay)?
                                    <div
                                        onClick={()=>RegisterForGame(oneGame.id)}
                                        key={`${oneGame.id}${oneWeekDay}`}
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
                                    :<div key={`${oneGame.id}${oneWeekDay}`}></div>
                                ))} */}
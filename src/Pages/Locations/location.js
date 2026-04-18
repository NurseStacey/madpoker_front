//import {VenuePicsData} from '../../data-files/venue-pictures';
import VerticalDeck from '../../Components/VerticalSlideShow/VerticalDeck';
import WindowDimensions from '../../utils/window-dimensions'
import {useEffect, useState} from 'react'
import '@fontsource/averia-sans-libre/700.css';  
import SignupModal from './register-modal';
import ListOfGames from './list-of-games';
import {BlankGame} from './blank-game';
import axios from 'axios';

export default function Locations(){
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [gameID, setGameID]=useState(-1);
    const [gameInfo, setGameInfo]=useState(BlankGame);
    const [openModal, setOpenModal]=useState(false);
    const [venuePics, setVenuePics]=useState([]);

    useEffect(()=>{


        const getVenues = async()=>{
            try{
 
                const response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
                let newVenuePics=[];
                
                response.data.map((oneVenue)=>newVenuePics.push({
                    img_link:`http://127.0.0.1:8000/${oneVenue.image}`,
                    name:oneVenue.display_label
                }));
                console.log(newVenuePics)
                setVenuePics(newVenuePics)
            }catch(err){
                alert('Error loading venues')
            }
        }

        setWidth(width*0.60)
        setHeight(height)
        getVenues()

    },[]);

    useEffect(()=>{
        if (gameInfo.id!==-1)
            setOpenModal(true);
    },[gameInfo])

    const RegisterForGame=(thisGame)=>{

        setGameID(thisGame.played_game_id);


        let tempTime= parseInt(thisGame.time);
        let AMPM='AM'
        if (tempTime>1200) {
            tempTime-=1200;
            AMPM='PM';
        };

        let tempHour=parseInt(tempTime/100);
        let tempMinute = tempTime - (100*tempHour)
        setGameInfo({
            venueName:thisGame.venue_name,
            date:thisGame.date,
            time:`${tempHour}:${String(tempMinute).padStart(2,'0')} ${AMPM}`,
            game:thisGame.game_type,
            id:thisGame.id
        })
    }

    const Test=()=>{
        console.log(openModal)
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
                                width:"600px",
                                height:"400px",                          
                            }}
                        >
                        <SignupModal
                            setOpenModal={setOpenModal}
                            gameID={gameID}
                            gameInfo={gameInfo}
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
                        {(venuePics.length!==0) ?
                            <VerticalDeck
                            All_Images={venuePics}/> :<></>
                                }
                        
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
                <ListOfGames
                    RegisterForGame={RegisterForGame}
                    setGameInfo={setGameInfo}
                />
        </div>
    )
}

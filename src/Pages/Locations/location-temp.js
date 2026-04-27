
import VerticalDeck from '../../Components/VerticalSlideShowOld/VerticalDeck';
import WindowDimensions from '../../utils/window-dimensions'
import {useEffect, useState} from 'react'
import '@fontsource/averia-sans-libre/700.css';  
import SignupModal from './register-modal';
import ListOfGames from './list-of-games';
import {BlankGame} from './blank-game';
import axios from 'axios';
import './location.css';
import {DjangoAddress} from '../../data-files/django-addres';
import SlideShow from '../../Components/SlideShowVertical/slide-show';

export default function LocationsTemp(){
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
                let url= DjangoAddress + `/venues/venues/`;
                const response = await axios.get(url,);

                let newVenuePics=[];
                
                response.data.map((oneVenue)=>newVenuePics.push({
                    image:`${DjangoAddress}/${oneVenue.image}`,
                    display_text:oneVenue.display_label
                }));
                //console.log(newVenuePics)
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
                <div
                    style={{
                        marginTop:'400px'
                    }}
                >
                    {(venuePics.length!==0) ?
                        <SlideShow
                            allImages={venuePics}
                            width={300}
                            height={300}
                            />:<></>
                    }                    
                </div>

  
           
        </div>
    )
}

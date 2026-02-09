import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import axios from 'axios';
import DropDown from '../../Components/Widgets/drop-down/drop-down'
import PlayerSearch from './player-search/player-search'


export default function LinkToPoints()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)
    const [allSeasons,  setAllSeasons]=useState([])
    const[allVenues, setAllVenues]=useState([])

    const[selectedSeason, setSelectedSeason]=useState({
        season:"-- All Sesaons --",
        id:-1
    });
    const[selectedVenue, setSelectedVenue]=useState({
        venue_name:"-- All Venues --",
        id:-1
    });
    const [selectedPlayer, setSelectedPlayer]=useState({
        id:-1,
        player:""
    });

    const getDataToSend=()=>{
        let dataToSend = {
            playerID:selectedPlayer.id,
            venue:selectedVenue.id,
            season:selectedSeason.id
        }
        return dataToSend
    }

    const pullGames  = async()=>{
        
        let response = await axios.post("http://127.0.0.1:8000/games/get_these_game_dates/",getDataToSend());
        console.log(response.data)
    }  

    useEffect(()=>{
        pullGames()
    },[selectedSeason,selectedVenue,selectedPlayer])

    useEffect(()=>{
        setWidth(width*0.60);
        setLeftMargin(width*.0);
        setHeight(height);

        const fetchData = async() =>{
            try {
                let response = await axios.get("http://127.0.0.1:8000/seasons/seasons/",);
                setAllSeasons(response.data)
                setSelectedSeason({
                    season:"--All Sesaons--",
                    id:response.data[0].id
                })

                response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
                setAllVenues(response.data)
               
            } catch(err){
                
            }
        }

        fetchData()

    },[])

    const findSelectedVenue=(venueName)=>{
        try{
            setSelectedVenue(allVenues.find((oneVenue)=>oneVenue.venue_name===venueName))
        }catch{
            setSelectedVenue({
                venue_name:"-- All Venues --",
                id:-1
            })
        }
    }

    const findSelectedSeason=(season)=>{
        setSelectedSeason(allSeasons.find((oneSeason)=>oneSeason.season===season))
    }

    const Test=()=>{console.log(selectedVenue)}

    return(
         <div
            className='RightSide'
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                marginLeft:`${LeftMargin}px`,
            }}
            >
            <div
                style={{
                    marginTop:"25%",
                    width:'60%',
                    marginLeft:'10%',
                    // border:'1px solid black'
                }}
                >
                <div
                    style={{
                        font:'arial',
                        fontSize:'30px',
                        fontWeight:'bold',
                        margin:'2%',
                    }}>
                    Link to points
                </div>
                <div
                    style={{
                        backgroundColor:'#d7d7ce',
                        width:`${0.3*Width}px`,
                        height:'225px',
                        margin:'auto',
                        display:'block',
                        border:'1px solid black',
                        position:'relative'
                    }}>

                    <PlayerSearch
                        width={0.3*Width}
                        top={0}
                        selectedPlayer={selectedPlayer}
                        setSelectedPlayer={setSelectedPlayer}        
                    />                         
                    <DropDown
                        selectedItem={selectedSeason.season}
                        width={0.3*Width}
                        allItems={["-- All Sesaons --",...allSeasons.map((oneSeason)=>oneSeason.season)]}
                        setSelectedItem={findSelectedSeason}
                        title="SEASON"
                        top={80}
                        DropDownStyle={{
                            zIndex:2
                        }}                        
                    />
                    <DropDown
                        selectedItem={selectedVenue.venue_name}
                        width={0.3*Width}
                        allItems={["-- All Venues --",...allVenues.map((oneVenue)=>oneVenue.venue_name)]}
                        setSelectedItem={findSelectedVenue}
                        title="VENUE"
                        top={140}
                        DropDownStyle={{
                            zIndex:1
                        }}
                    />       

                </div>
                <button onClick={Test}>test</button>
                
            </div>
        
        </div>
    )
}

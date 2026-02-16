import DropDown from '../../Components/Widgets/drop-down/drop-down';
import {useState,useEffect} from 'react';
import axios from 'axios';

export default function SelectionBox({
    Width,
})
{
    const[selectedSeason, setSelectedSeason]=useState('');
    const[selectedVenue, setSelectedVenue]=useState('');    
    const[selectedGame, setSelectedGame]=useState('');
    const [allSeasons,  setAllSeasons]=useState([]);
    const[allVenues, setAllVenues]=useState([]);
    const[allGames,setAllGames]=useState([]);

    const[gamesToShow, setGamesToShow]=useState([]);
    const[seasonsToShow, setSeasonsToShow]=useState([]);
    const[venuesToShow, setVenuesToShow]=useState([]);

    const[allGameInfo, setAllGameInfo]=useState([]);


    useEffect(()=>{

        const fetchData = async() =>{
            try {
                let response = await axios.get("http://127.0.0.1:8000/seasons/seasonforgameresults/",);
                setAllVenues(response.data['venues']);
                setVenuesToShow(["-- All Venues --", ...response.data['venues']]);
                setAllGames(response.data['games']);
                setGamesToShow(['-- All Games --', ...response.data['games'].map((oneGame)=>oneGame.title)]);
                let seasonNames=response.data['all_data'].map((oneSeason)=>oneSeason.season_name);
                setAllSeasons(seasonNames);
                setSeasonsToShow(['-- All Seasons --',...seasonNames]);

                setSelectedSeason('-- All Seasons --');
                setSelectedVenue("-- All Venues --");
                setSelectedGame('-- All Games --');
                
                response = await axios.get("http://127.0.0.1:8000/games/gameinfo_for_review/",);
                setAllGameInfo(response.data)
            } catch(err){
                console.log(err.status)
            }
        }
        
        fetchData()
    },[])

    const SeasonChosen=(thisSeason)=>{
        setSelectedSeason(thisSeason);
        let thisSeasonData=allSeasons.find((oneSeason)=>oneSeason.season_name===thisSeason);
        setGamesToShow(['-- All Games --', ...thisSeasonData['games']]);
        setVenuesToShow(['-- All Venues --', ...thisSeasonData['venues']]);
    }

    const VenueChosen=(thisVenue)=>{
        setSelectedVenue(thisVenue)
        let theseSeasons = allSeasons.filter((oneSeason)=>oneSeason['venues'].includes(thisVenue));
        let theseGames=['-- All Games --']
        theseSeasons.map((oneSeason)=>oneSeason.games.map((oneGame)=>theseGames.push(oneGame)));
        setGamesToShow([new Set(theseGames)]);
        setSeasonsToShow(['-- All Seasons --',...theseSeasons.map((oneSeason)=>oneSeason.season)]);
    }

    const GameChosen=(thisGame)=>{
        setSelectedGame(thisGame)
        let theseSeasons = allSeasons.filter((oneSeason)=>oneSeason['games'].includes(thisGame));
        let theseGames=['-- All Games --']
        theseSeasons.map((oneSeason)=>oneSeason.games.map((oneGame)=>theseGames.push(oneGame)));
        setGamesToShow([new Set(theseGames)]);
        setSeasonsToShow(['-- All Seasons --',...theseSeasons.map((oneSeason)=>oneSeason.season)]);  
    }

    return(
        <div
            style={{
                backgroundColor:'#d7d7ce',
                width:`${0.35*Width}px`,
                height:'225px',
                margin:'auto',
                display:'block',
                border:'1px solid black',
                position:'relative'
            }}>
            <DropDown
                selectedItem={selectedSeason}
                width={0.3*Width}
                allItems={seasonsToShow}
                setSelectedItem={SeasonChosen}
                title="SEASON"
                top={0}
                DropDownStyle={{
                    zIndex:6,
                }}                        
            />   
            <DropDown
                selectedItem={selectedVenue}
                width={0.3*Width}
                allItems={venuesToShow}
                setSelectedItem={VenueChosen}
                title="VENUE"
                top={60}
                DropDownStyle={{
                    zIndex:5
                }}
            />     
            <DropDown
                selectedItem={selectedGame}
                width={0.3*Width}
                allItems={gamesToShow}
                setSelectedItem={GameChosen}
                title="GAME"
                top={60}
                DropDownStyle={{
                    zIndex:5
                }}
            />                                                
        </div>              
    )
}
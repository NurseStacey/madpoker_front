import {useState,useEffect} from 'react';
import axios from 'axios';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';

export default function SelectGame({
    setWhichDate,
    whichDate
})
{
    let blankGame={title:""}
    const [allGames, setAllGames]=useState([]);
    const [allDirectors,setAllDirectors]=useState([]);
    const [directorsToShow, setDirectorsToShow]=useState([])
    const [allVenues, setAllVenues]=useState([]);
    const [venuesToShow, setVenuesToShow]=useState([])
    const [allDates, setAllDates]=useState([])
    const [whichGame, setWhichGame]=useState({title:""});
    const [whichUser, setWhichUser]=useState("");
    const [whichVenue, setWhichVenue]=useState("");

    const [gamesToShow, setGamesToShow]=useState([]);
    const [datesToShow, setDatesToShow]=useState([]);

    useEffect(()=>{
        GetGames();
    },[]);

    const userSelected=(thisUser)=>{
        setWhichUser(thisUser);
        if (thisUser==='All Directors'){
            setVenuesToShow(allVenues);
            setGamesToShow(allGames.map((oneGame)=>oneGame.title));  
            setWhichVenue('All Venues');
            setWhichGame('');
            return;          
        }

        let theseGames=allGames.filter((oneGame)=>oneGame.director===thisUser);
        if (theseGames.length===0) return
        if (whichUser===undefined || allGames==[]) return  //shouldn't ever happen but just in case
        setVenuesToShow(['All Venues', ...new Set(theseGames.map((oneGame)=>oneGame.venue))]);
        let theseGameTitles=theseGames.map((oneGame)=>oneGame.title)
        setGamesToShow(theseGameTitles);
        if (!theseGameTitles.includes(whichGame.title))
            setWhichGame(blankGame)        
    }

    const venueSelected=(thisVenue)=>{
        setWhichVenue(thisVenue)
        if (thisVenue==='All Venues'){

            setDirectorsToShow(allDirectors);
            setGamesToShow(allGames.map((oneGame)=>oneGame.title));
            setWhichUser('All Directors');
            setWhichGame('');
            return;       
        }
        let theseGames=allGames.filter((oneGame)=>oneGame.venue===thisVenue);
        if (theseGames.length===0) return 
        if (thisVenue===undefined || allGames==[]) return  //shouldn't ever happen but just in case
        setDirectorsToShow(['All Directors', ...new Set(theseGames.map((oneGame)=>oneGame.director))]);
        
        let theseGameTitles=theseGames.map((oneGame)=>oneGame.title)
        setGamesToShow(theseGameTitles);
        if (!theseGameTitles.includes(whichGame.title))
            setWhichGame(blankGame)
    }

    const gameSelected=(thisGame)=>{
        
        setDatesToShow(thisGame.dates.sort((a,b)=>b.id-a.id))
        setWhichGame(thisGame)
        //setAllDirectors(['All Directors', thisGame.director])
        setWhichUser(thisGame.director)
        setAllVenues(['All Venues', thisGame.venue])
        setWhichVenue(thisGame.venue)
    }

    const GetGames = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/games/games_for_roster/",);
            console.log(response.data)
            setAllGames(response.data['all_game_data']);
            setAllDirectors(['All Directors',...response.data['directors']]);
            setDirectorsToShow(['All Directors',...response.data['directors']]);
            let thisUser=response.data['directors'].find((oneUser)=>oneUser===localStorage.getItem('current_user'))
            if (thisUser===undefined) thisUser='All Directors'
            setWhichUser(thisUser);
            
            if (response.data['directors'].find((oneUser)=>oneUser===thisUser)!==undefined){
                let theseGames = response.data['all_game_data'].filter((oneGame)=>oneGame.director===thisUser);
                setGamesToShow(theseGames.map((oneGame)=>oneGame.title));
            }
            else
                setGamesToShow(response.data['all_game_data'].map((oneGame)=>oneGame.title));

            setAllVenues(response.data['venues']);
            if (thisUser==='All Directors') {
                setVenuesToShow(['All Venues',...response.data['venues']]);
            } else {
                console.log('two')
                let theseGames = response.data['all_games_data'].filter((oneGame)=>oneGame.director===thisUser)
                setVenuesToShow(['All Venues', ...new Set(theseGames.map((oneGame)=>oneGame.venue))]);
            }

            setAllDates(response.data['all_dates'])

        }catch(err){
            console.log(err)
            alert('Problem with loading games.')
        }
    }   

    const HandelChange=(e)=>{
        if (e.target.name==="Director"){
            userSelected(e.target.value);
        }

        if(e.target.name==='Venue'){
            venueSelected(e.target.value);
        }


        if (e.target.name==="Game") {
            let thisGame = allGames.find((oneGame)=>oneGame.title===e.target.value)
            gameSelected(thisGame)
        }
        if (e.target.name==="Date") {
            let thisDate=whichGame.dates.find((oneDate)=>oneDate.date===e.target.value)
            console.log(thisDate)
            setWhichDate(thisDate)
        }
    }
    
    return(

        <div
            style={{
                display:'flex',
                justifyContent:'center',
                margin:'auto',
                marginTop:'30px',
                height:'175px',
            }}
        >
            <MyDropdownText
                optionsList={directorsToShow}
                setSelectedOption={HandelChange}
                selection = {whichUser}
                name="Director"
                disable={false}
                style={{
                    width:'200px',
                    margin:'0px 20px',
                    height:'100%'
                }}
            />     
            <MyDropdownText
                optionsList={venuesToShow}             
                setSelectedOption={HandelChange}
                selection = {whichVenue}
                name="Venue"
                disable={false}
                style={{
                    width:'600px',
                    margin:'0px 20px',
                    height:'100%'
                }}
            />              
            <MyDropdownText
                optionsList={gamesToShow}
                setSelectedOption={HandelChange}
                selection = {whichGame.title}
                name="Game"
                disable={false}
                style={{
                    width:'600px',
                    margin:'0px 20px',
                    height:'100%'
                }}
            />  
            <MyDropdownText
                optionsList={datesToShow.map((oneDate)=>oneDate.date)}
                setSelectedOption={HandelChange}
                selection = {whichDate.date}
                name="Date"
                disable={false}
                style={{
                    width:'600px',
                    margin:'0px 20px',
                    height:'100%'
                }}
            /> 

        </div>               
    )
}

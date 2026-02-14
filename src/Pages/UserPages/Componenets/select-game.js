import {useState,useEffect} from 'react';
import axios from 'axios';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';
import {WeekDays}  from '../../../Components/weekdays'


export default function SelectGame({
    setWhichDate,
    whichDate
})
{
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

    const Test=()=>{
       
    }

    useEffect(()=>{
        GetGames();
    },[]);

    useEffect(()=>{

        if (whichUser==='All Directors'){
            setVenuesToShow(['All Venues', ...allVenues]);
            setGamesToShow(allGames.map((oneGame)=>oneGame.title));            
        }
        let theseGames=allGames.filter((oneGame)=>oneGame.director===whichUser);
        if (theseGames.length===0) return        
        if (whichUser===undefined || allGames==[]) return  //shouldn't ever happen but just in case
        setVenuesToShow(['All Venues', ...new Set(theseGames.map((oneGame)=>oneGame.venue))]);
        setGamesToShow(theseGames.map((oneGame)=>oneGame.title));
       
    }, [whichUser])

    useEffect(()=>{

        if (whichVenue==='All Venues'){
            setDirectorsToShow(['All Directors',...allDirectors]);
            setGamesToShow(allGames.map((oneGame)=>oneGame.title));            
        }
        let theseGames=allGames.filter((oneGame)=>oneGame.venue===whichVenue);
        if (theseGames.length===0) return 
        if (whichVenue===undefined || allGames==[]) return  //shouldn't ever happen but just in case
        setDirectorsToShow(['All Directors', ...new Set(theseGames.map((oneGame)=>oneGame.director))]);
        setGamesToShow(theseGames.map((oneGame)=>oneGame.title));
       
    }, [whichVenue])

    useEffect(()=>{
        // let dates = []
        // allGames.filter((oneGame)=>oneGame.game_text===whichGame.game_text).map((oneGame)=>oneGame.all_dates.map((oneDate)=>dates.push(oneDate.date)));
        // setDatesToShow(dates);
    },[whichGame])

    const GetGames = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/games/games_for_roster/",);
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
            //setDatesToShow(dates)
            //setGamesToShow(response.data.filter((oneGame)=>oneGame.game_text!=='default'));            
            // if (whichUser.username==="All Directors") {
            //     const response = await axios.get("http://127.0.0.1:8000/games/get_all_sections/",);
            //     console.log(response.data)
            //     setAllGames(response.data.filter((oneGame)=>oneGame.game_text!=='default'));
            //     setGamesToShow(response.data.filter((oneGame)=>oneGame.game_text!=='default'));
            //     //console.log(response.data.filter((oneGame)=>oneGame.game_text!=='default'))
            // }else{
            //     if (whichUser.id>0){
            //         const response = await axios.get(`http://127.0.0.1:8000/games/games_by_director/${whichUser.id}/`,);

            //         setAllGames(response.data);
            //         if (response.data.length>0){
            //             let thisWeekDay=(new Date()).getDay()
            //             let WeekDayArray = [...Array.from(Array(7).keys()).slice(thisWeekDay,7),
            //                 ...Array.from(Array(thisWeekDay).keys())];

            //             for (let index=0;index<7;index++){
            //                 let nextGame=response.data.find((oneGame)=>oneGame.WeekDay===WeekDays[WeekDayArray[index]]);

            //                 if (nextGame!==undefined){
            //                     setWhichGame(nextGame);
            //                     break;
            //                 }
            //             }
            //         }     
            //     }           
            // }
        }catch(err){
            console.log(err)
            alert('Problem with loading games.')
        }
    }   

    const HandelChange=(e)=>{
        if (e.target.name==="Director"){
            setWhichUser(e.target.value);
            setWhichDate({
                date:'01/01',
                id:-1
            })
        }

        if(e.target.name==='Venue'){
            setWhichVenue(e.target.value);
        }


        // if (e.target.name==="Game") {
        //     let thisGame=allGames.find((oneGame)=>oneGame.game_text===e.target.value)
        //     setWhichGame(thisGame);
        //     let tempDateArray=[];
        //     thisGame.all_dates.map((oneDate)=>tempDateArray.push(oneDate));
        //     setAllDates(tempDateArray);
        //     setWhichDate({
        //         date:'01/01',
        //         id:-1,
        //         canUpdate:false
        //     })            
        //}
        if (e.target.name==="Date") setWhichDate(allDates.find((oneDate)=>oneDate.date===e.target.value))
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
            <button onClick={Test}>test</button>
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
            {/* <MyDropdownText
                optionsList={datesToShow.map((oneDate)=>oneDate)}
                setSelectedOption={HandelChange}
                selection = {whichDate.date}
                name="Date"
                disable={false}
                style={{
                    width:'600px',
                    margin:'0px 20px',
                    height:'100%'
                }}
            />  */}

        </div>               
    )
}

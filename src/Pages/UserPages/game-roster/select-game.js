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
    const [allDates, setAllDates]=useState([])
    const [whichGame, setWhichGame]=useState({Text:""});
    const [whichUser, setWhichUser]=useState({
        username:"All Directors",
        id:-1,
        email:""
    });

    const Test=()=>{
        let X=allGames.map((oneGame)=>oneGame.game_text)
        console.log(allGames.map((oneGame)=>oneGame.game_text))
        console.log(X.map((oneGame)=>oneGame.slice(0,10)))}
    useEffect(()=>{
        GetDirectors();
    },[]);

    const GetDirectors = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
            setAllDirectors([{username:'All Directors'},...response.data])
            setWhichUser(response.data.find((oneUser)=>oneUser.username===localStorage.getItem('current_user')))
        }catch(err){
            console.log(err);
        }
    }    

    useEffect(()=>{
        GetGames();
    }, [whichUser])

    const GetGames = async()=>{
        try{
            if (whichUser.username==="All Directors") {
                const response = await axios.get("http://127.0.0.1:8000/games/get_all_sections/",);
                setAllGames(response.data.filter((oneGame)=>oneGame.game_text!=='default'));
                //console.log(response.data.filter((oneGame)=>oneGame.game_text!=='default'))
            }else{
                if (whichUser.id>0){
                    const response = await axios.get(`http://127.0.0.1:8000/games/games_by_director/${whichUser.id}/`,);

                    setAllGames(response.data);
                    if (response.data.length>0){
                        let thisWeekDay=(new Date()).getDay()
                        let WeekDayArray = [...Array.from(Array(7).keys()).slice(thisWeekDay,7),
                            ...Array.from(Array(thisWeekDay).keys())];

                        for (let index=0;index<7;index++){
                            let nextGame=response.data.find((oneGame)=>oneGame.WeekDay===WeekDays[WeekDayArray[index]]);

                            if (nextGame!==undefined){
                                setWhichGame(nextGame);
                                break;
                            }
                        }
                    }     
                }           
            }
        }catch(err){
            console.log(err)
            alert('Problem with loading games.')
        }
    }   

    const HandelChange=(e)=>{
        if (e.target.name==="Director"){
            setWhichUser(allDirectors.find((oneUser)=>oneUser.username===e.target.value))
            setWhichDate({
                date:'01/01',
                id:-1
            })
        }

        if (e.target.name==="Game") {
            let thisGame=allGames.find((oneGame)=>oneGame.game_text===e.target.value)
            setWhichGame(thisGame);
            let tempDateArray=[];
            thisGame.all_dates.map((oneDate)=>tempDateArray.push(oneDate));
            setAllDates(tempDateArray);
            setWhichDate({
                date:'01/01',
                id:-1,
                canUpdate:false
            })            
        }
        if (e.target.name==="Date") setWhichDate(allDates.find((oneDate)=>oneDate.date===e.target.value))
    }
    
    return(

        <div
            style={{
                display:'flex',
                justifyContent:'center',
                margin:'auto',
                marginTop:'30px'

            }}
        >
            <button onClick={Test}>test</button>
            <MyDropdownText
                optionsList={allDirectors.map((oneDirector)=>oneDirector.username)}
                setSelectedOption={HandelChange}
                selection = {whichUser.username}
                name="Director"
                disable={false}
                style={{
                    width:'200px',
                    margin:'0px 20px'
                }}
            />     
            <MyDropdownText
                optionsList={allGames.map((oneGame)=>oneGame.game_text)}
                setSelectedOption={HandelChange}
                selection = {whichGame.game_text}
                name="Game"
                disable={false}
                style={{
                    width:'600px',
                    margin:'0px 20px'
                }}
            />  
            <MyDropdownText
                optionsList={allDates.map((oneDate)=>oneDate.date)}
                setSelectedOption={HandelChange}
                selection = {whichDate.date}
                name="Date"
                disable={false}
                style={{
                    width:'600px',
                    margin:'0px 20px'
                }}
            /> 

        </div>               
    )
}

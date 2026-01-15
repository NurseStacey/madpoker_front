import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import MyButton from '../../../Components/Widgets/my-button';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';
import {WeekDays}  from '../../../Components/weekdays'



export default function GameRoster()
{

    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const navigate = useNavigate();
    const [allGames, setAllGames]=useState([]);
    const [allDirectors,setAllDirectors]=useState([]);
    const [whichGame, setWhichGame]=useState({Text:""});
    const [whichUser, setWhichUser]=useState({
        username:"",
        id:-1,
        email:""
    });

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        GetDirectors();

       
    },[]);

    useEffect(()=>{
        GetCurrentGameRoster()
    },[whichGame])

    const GetCurrentGameRoster = async()=>{
        try{
            const response = await axios.get(`http://127.0.0.1:8000/games/game_roster/${whichGame.id}`,);
            console.log(response.data)
            //setAllDirectors(response.data)
            //setWhichUser(response.data.find((oneUser)=>oneUser.username===localStorage.getItem('current_user')))

        }catch(err){
            console.log(err);
        }        
    }

    useEffect(()=>{GetGames()}, [whichUser])

    const GetDirectors = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
            //console.log(response.data)
            setAllDirectors(response.data)
            setWhichUser(response.data.find((oneUser)=>oneUser.username===localStorage.getItem('current_user')))

        }catch(err){
            console.log(err);
        }
    }

    const GetGames = async()=>{
        try{
            if (whichUser.username==="") {
                const response = await axios.get("http://127.0.0.1:8000/games/games/",);
                setAllGames(response.data.filter((oneGame)=>oneGame.Text!=='default'));
                
            }else{
                
                const response = await axios.get(`http://127.0.0.1:8000/games/games_by_director/${whichUser.id}`,);
                setAllGames(response.data.filter((oneGame)=>oneGame.Text!=='default'));

                if (response.data.length>0){
                    let thisWeekDay=(new Date()).getDay()
                    let WeekDayArray = [...Array.from(Array(7).keys()).slice(thisWeekDay,7),
                        ...Array.from(Array(thisWeekDay).keys())];
                    //console.log(WeekDayArray)
                    
                    for (let index=0;index<7;index++){
                        let nextGame=response.data.find((oneGame)=>oneGame.WeekDay===WeekDays[WeekDayArray[index]]);

                        if (nextGame!==undefined){
                            setWhichGame(nextGame);
                            break;
                        }
                    }

                }

                
            }

        }catch(err){
            console.log(err);
        }
    }   

    const HandelChange=(e)=>{
        
        if (e.target.name==="Director") setWhichUser(allDirectors.find((oneUser)=>oneUser.username===e.target.value))
    }

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>

            <Title
                TitleText = "View Game Roster"
            />  

            <div
                style={{
                    display:'flex',
                    justifyContent:'center',
                    margin:'auto',
                    marginTop:'30px'

                }}
            >
                <MyDropdownText
                    optionsList={allDirectors.map((oneDirector)=>oneDirector.username)}
                    setSelectedOption={HandelChange}
                    selection = {whichUser.username}
                    name="Director"
                    disable={false}
                    style={{
                        width:'600px',
                        margin:'0px 20px'
                    }}
                />     
                <MyDropdownText
                    optionsList={allGames.map((oneGame)=>oneGame.Text)}
                    setSelectedOption={HandelChange}
                    selection = {whichGame.Text}
                    name="Select a Game"
                    disable={false}
                    style={{
                        width:'600px',
                        margin:'0px 20px'
                    }}
                />                     
            </div>       

            <MyButton
                button_function={()=>navigate("/admin")}
                button_text={"Return to Admin"}
                button_style={{
                    height:"100px",
                    width:"100px",
                    margin:"auto"
                }}
                disable={false}
            />               
        </div>
    )
}
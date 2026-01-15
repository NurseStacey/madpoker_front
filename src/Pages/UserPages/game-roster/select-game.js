import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import MyButton from '../../../Components/Widgets/my-button';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';
import {WeekDays}  from '../../../Components/weekdays'



export default function SelectGame({
    whichGame,
    setWhichGame,
    whichUser,
    setWhichUser
})
{
    const [allGames, setAllGames]=useState([]);
    const [allDirectors,setAllDirectors]=useState([]);

    useEffect(()=>{
        GetDirectors();
    },[]);

    const GetDirectors = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
            setAllDirectors(response.data)
            setWhichUser(response.data.find((oneUser)=>oneUser.username===localStorage.getItem('current_user')))
        }catch(err){
            console.log(err);
        }
    }    


    useEffect(()=>{GetGames()}, [whichUser])


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

        if (e.target.name==="Game") setWhichGame(allGames.find((oneGame)=>oneGame.Text===e.target.value))
        
        console.log(allGames.find((oneGame)=>oneGame.Text===e.target.value))
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
                name="Game"
                disable={false}
                style={{
                    width:'600px',
                    margin:'0px 20px'
                }}
            />                     
        </div>               
    )
}

import {useState,useEffect} from 'react';
import axios from 'axios';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';
import {WeekDays}  from '../../../Components/weekdays'


export default function SelectGame({
    which_game,
    setwhich_game,
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
                const response = await axios.get("http://127.0.0.1:8000/games/games/",);
                console.log(response.data)
                setAllGames(response.data.filter((oneGame)=>oneGame.Text!=='default'));
                
            }else{
                if (whichUser.id>0){
                    console.log( whichUser)
                    const response = await axios.get(`http://127.0.0.1:8000/games/games_by_director/${whichUser.id}/`,);
                    console.log(response.data);
                    setAllGames(response.data.filter((oneGame)=>oneGame.Text!=='default'));

                    if (response.data.length>0){
                        let thisWeekDay=(new Date()).getDay()
                        let WeekDayArray = [...Array.from(Array(7).keys()).slice(thisWeekDay,7),
                            ...Array.from(Array(thisWeekDay).keys())];

                        for (let index=0;index<7;index++){
                            let nextGame=response.data.find((oneGame)=>oneGame.WeekDay===WeekDays[WeekDayArray[index]]);

                            if (nextGame!==undefined){
                                setwhich_game(nextGame);
                                break;
                            }
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

        if (e.target.name==="Game") setwhich_game(allGames.find((oneGame)=>oneGame.Text===e.target.value))
        
        //console.log(allGames.find((oneGame)=>oneGame.Text===e.target.value))
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
                selection = {which_game.Text}
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

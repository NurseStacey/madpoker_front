import {useEffect, useState} from 'react'
import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import axios from 'axios';
import MyButton from '../../../Components/Widgets/my-button';
import CurrentGamesListBox from '../../../Components/Widgets/current_games-listbox';
import GameDates from './GameDates';


export default function CancelGame()
{
    const [activeGames, setActiveGames]=useState([])
    const [whichDates, setWhichDates]=useState([])
    const [selectedGame, setSelectedGame]=useState(-1)
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);     
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(()=>{
        const fetchData = async()=>{
            try{

                const response = await axios.get("http://127.0.0.1:8000/games/basic_games/",);
                let tempActiveGames=[]
                console.log(response.data)
                setActiveGames(
                    response.data.filter((oneGame)=>oneGame.active===true).map(
                    (oneGame)=>tempActiveGames.push(oneGame)
                )
                );
                setActiveGames(tempActiveGames)
            }catch(err){
                alert('Problem loading games.');
            }
        }   
        setWidth(width);
        setHeight(height);
        fetchData()

    },[])

    const test=()=>{console.log(activeGames)}
    const GameSelected=(id)=>{
        const today = new Date(); 
        let tempWhichDates = []
        let thisGame = activeGames.find((oneGame)=>oneGame.id===id);
        // console.log(daysOfWeek.indexOf(thisGame.week_day));
        // console.log(today.getDay());

        let offSet=daysOfWeek.indexOf(thisGame.week_day)-today.getDay();
        if (offSet<0) {offSet=offSet+7}
        console.log(offSet)
        for (let i=0;i<10;i++){
            let newDate = new Date();
            newDate.setDate(today.getDate() + offSet + 7*i);
            tempWhichDates.push(newDate.toLocaleDateString());
        }
        setWhichDates(tempWhichDates)
        setSelectedGame(id)
    }

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>
            <Title
                TitleText = "Cancel Upcoming Game"
            /> 
            <div
                style={{
                    display:'flex',
                    justifyContent:'center',

                }}
            >
                <CurrentGamesListBox
                    allGames={activeGames}
                    GameSelected={GameSelected}
                    selectedGame={selectedGame}
                    ListBoxStyle={{
                        width:'30%',
                        height:'150px'
                    }}
                />
            </div>

            {(selectedGame===-1)?<></>:
                <GameDates
                    thisGame={activeGames.find((oneGame)=>oneGame.id===selectedGame)}
                    whichDates={whichDates}
                />
            }
                   
        </div>
    )
}
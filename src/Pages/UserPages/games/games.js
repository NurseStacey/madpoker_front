import NewGame from './new-game'
import CurrentGames from './current-games';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import MyButton from '../../../Components/Widgets/my-button';


export default function EditGames()
{

    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const navigate = useNavigate();
    const [allGames, setAllGames]=useState([])
    const [selectedGame,setSelectedGame]=useState(null)
    const [formData, setFormData]=useState({
        WeekDay:"Monday",
        Time:"6:00",
        Director:-1,
        DirectorUserName:"",
        Venue:-1,
        VenueName:"",
        Description:"",
        active:false,
    });

    
    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[width,height]);    


    const fetchData = async()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/games/games/",);
            setAllGames(response.data.filter((oneGame)=>oneGame.Text!=='default'));

        }catch(err){
            console.log(err);
        }
    }    

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>

            <Title
                TitleText = "Edit Games"
            />   
            <MyButton
                button_function={()=>navigate("/admin")}
                button_text={"Return to Admin"}
                button_style={{
                    height:"75px",
                    width:"100px",
                    margin:"2% auto"
                }}
                disable={false}
            />   
            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    //marginTop:"50px"
                }}
            >
                <NewGame
                    formData={formData}
                    setFormData={setFormData}
                    fetchData={fetchData}
                    selectedGame={selectedGame}
                />
                <CurrentGames
                    formData={formData}
                    fetchData={fetchData} 
                    allGames={allGames}  
                    selectedGame={selectedGame}     
                    setSelectedGame={setSelectedGame}        
                />
            </div>
             
        </div>
    )
}
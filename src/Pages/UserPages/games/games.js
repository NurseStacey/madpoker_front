import NewGame from './new-game'
import CurrentGames from './current-games';
import {useState,useEffect} from 'react';
import axios from 'axios';
import AdminButton from '../../../Components/admin-button';
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import { BlankFormData } from './blank-form-data';

export default function EditGames()
{

    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const [allGames, setAllGames]=useState([]);
    const [selectedGame,setSelectedGame]=useState(null);
    const [formData, setFormData]=useState(BlankFormData);

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
    },[width,height]);    

    useEffect(()=>{fetchData();},[])

    const Test=()=>{
        console.log(formData)
    }

    const fetchData = async()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/games/games/",);
            setAllGames(response.data);

        }catch(err){
            alert('Problem loading games.');
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
            <AdminButton/>
            {/* <button onClick={Test}>test</button> */}
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
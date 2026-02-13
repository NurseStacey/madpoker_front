import {useState,useEffect} from 'react';
import axios from 'axios';
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import NewGameType from './new-game-type';
import CurrentGameTypes from './current-game-type';

export default function EditGames()
{

    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [selectedGameType, setSelectedGameType]=useState(null)
    const [allGameTypes, setAllGameTypes]=useState([]) 
    const [formData, setFormData]=useState({
        name:"",
    });  

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[width,height]);    

    const fetchData = async()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/games/get_game_types/",);
            setAllGameTypes(response.data)
            setFormData({
                name:""
            })
        }catch(err){
            alert('Error loading venues')
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
                TitleText = "Edit Games Types"
            />   

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    marginTop:"50px"
                }}
            >

                <NewGameType
                    fetchData={fetchData}
                    setFormData={setFormData}
                    formData={formData}
                    selectedGameType={selectedGameType}
                    />

                <CurrentGameTypes
                    fetchData={fetchData}
                    allGameTypes={allGameTypes}
                    selectedGameType={selectedGameType}
                    setSelectedGameType={setSelectedGameType}
                    formData={formData}                    
                />

            </div>              
        </div>
    )
}
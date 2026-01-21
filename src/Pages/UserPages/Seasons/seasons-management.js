import {useState,useEffect} from 'react';
import axios, { all } from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';
import NewSeason from './new-season'
import CurrentSeasons from './current-seasons';


export default function SeasonManagement()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const navigate = useNavigate();
    const [allSeasons, setAllSeasons]=useState([])

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[]);
    
    const fetchData =async () =>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/games/seasons/",);
            setAllSeasons(response.data)
            console.log(response.data)

        }catch(err){
            alert('Problem getting current seasons')
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
                TitleText = "Season Management"
            />  
            <div
                style={{
                    display:'flex',
                    justifyContent:'space-evenly'
                }}
                >
                <NewSeason
                    fetchData={fetchData}/>
                
                <CurrentSeasons
                    allSeasons={allSeasons}
                    fetchData={fetchData}
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
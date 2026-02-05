import {useState,useEffect} from 'react';
import axios from 'axios';
import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import NewSeason from './new-season'
import CurrentSeasons from './current-seasons';


export default function SeasonManagement()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const [seasonTypes, setSeasonTypes]=useState([])    
    const [allSeasons, setAllSeasons]=useState([])

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[]);
    
    const fetchData =async () =>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/seasons/seasons/",);
            setAllSeasons(response.data)
            //console.log(response.data)

        }catch(err){
            alert('Problem getting current seasons')
        }        
        try{

            const response = await axios.get("http://127.0.0.1:8000/seasons/seasontypes/",);
            setSeasonTypes(response.data)
            console.log(response.data)

        }catch(err){
            alert('Problem getting season types')
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
                    seasonTypes={seasonTypes}
                    fetchData={fetchData}/>
                
                <CurrentSeasons
                    allSeasons={allSeasons}
                    seasonTypes={seasonTypes}
                    fetchData={fetchData}
                />
            </div>

               
        </div>
    )
}
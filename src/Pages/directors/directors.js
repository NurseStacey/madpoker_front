import {useEffect, useState} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import '@fontsource/averia-sans-libre';
import axiosInstance from 'axios';


export default function DirectorsPage({})
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [allDirectors, setAllDirectors]=useState([]);
    
    
    useEffect(()=>{
        setWidth(width*0.60)
        setHeight(height)
        fetchData()
    },[]);

    const fetchData = async ()=>{
        try{

            const response = await axiosInstance.get("http://127.0.0.1:8000/login_api/all_user/",);
            //setAllDirectors(response.data)
            console.log(response.data)
        }catch(err){
            alert('Problem retrieving directors.')
        }
    }    
    
    return(
        <div
            style={{
                width:`${Width}px`,
                height:`${Height}px`,  
                marginLeft:'125px',
                display:'block'
            }}
            >
                <div
                    style={{
                        fontSize:'25px',
                        fontFamily:"averia sans libre",
                        width:'80%',
                        marginTop:'20%',
                        border:'1px solid black',
                        color:'red',
                        textDecoration:'underline'
                    }}
                >
                    Our Family of Directors
                </div>


        </div>
    )
}
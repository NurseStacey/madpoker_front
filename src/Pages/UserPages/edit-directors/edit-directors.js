import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import {useState,useEffect} from 'react';
import axios from 'axios';
import OneDirector from './one-director';
import AdminButton from '../../../Components/admin-button';

export default function EditDirectors()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);      
    const [allDirectors, setAllDirectors]=useState([]);

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[]);

    const fetchData = async ()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
            setAllDirectors(response.data)
            console.log(response.data)
        }catch(err){
            console.log(err)
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
                TitleText = "Edit Directors"
            />
            <AdminButton/>
            <div
                style={{
                    display:'block',
                    margin:'100px auto'
                }}
            >
                {allDirectors.map((ThisDirector)=>(
                    <div
                        key={OneDirector.id}
                        style={{
                        }}>
                            <OneDirector
                                ThisDirector={ThisDirector}
                                fetchData={fetchData}
                            />
                        
                    </div>
                ))}                
            </div>
        </div>
    )
}
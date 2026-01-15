import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import MyButton from '../../../Components/Widgets/my-button';
import NewVenue from './new-venue';
import CurrentVenues from './current-venues';

export default function EditVenues()
{

    const [selectedVenue, setSelectedVenue]=useState(null)    
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const navigate = useNavigate();
    const [allVenues, setAllVenues]=useState([]);
    const [formData, setFormData]=useState({
        VenueName:"",
        active:true
    });  

    const fetchData = async()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
            setAllVenues(response.data)
            setFormData({
                VenueName:""
            })
        }catch(err){
            console.log(err);
        }
    }

    const Test=()=>{console.log(allVenues)}

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[]);

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>

            <Title
                TitleText = "Edit Venues"
            />   

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    marginTop:"50px"
                }}
            >
                <NewVenue
                    fetchData={fetchData}
                    setFormData={setFormData}
                    formData={formData}
                    selectedVenue={selectedVenue}
                    />

                <CurrentVenues
                    fetchData={fetchData}
                    allVenues={allVenues}
                    selectedVenue={selectedVenue}
                    setSelectedVenue={setSelectedVenue}
                    formData={formData}                    
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
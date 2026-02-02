import {useState,useEffect} from 'react';
import axios from 'axios';
import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import NewVenue from './new-venue';
import CurrentVenues from './current-venues';
import AdminButton from '../../../Components/admin-button';


export default function EditVenues()
{

    const [selectedVenue, setSelectedVenue]=useState(null)    
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const [allVenues, setAllVenues]=useState([]);
    const [formData, setFormData]=useState({
        venue_name:"",
        active:true
    });  

    const fetchData = async()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
            setAllVenues(response.data)
            setFormData({
                venue_name:""
            })
        }catch(err){
            alert('Error loading venues')
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
                <AdminButton/>
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

        </div>
    )
}
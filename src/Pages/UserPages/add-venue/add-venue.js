import VenueForm from '../Componenets/venue-form';
import {useState,useEffect} from 'react';
import axiosInstance from 'axios';
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';

export default function AddVenue()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [formData, setFormData]=useState({
        venue_name:"",
        active:true,
        image:"",
        display_label:"",
    });

    useEffect(()=>{
        setWidth(width)
        setHeight(height)
    },[]);
    

    const handlesubmit = async (e) =>{
        
        let formToSend = new FormData();

        if (formData.image)
            formToSend.append("image", formData.image, formData.image.name);
        formToSend.append("venue_name", formData.venue_name);
        formToSend.append("active", true);
        formToSend.append("display_label", formData.display_label);     

        console.log(formToSend)
        try{
            const response = await axiosInstance.post("http://127.0.0.1:8000/venues/venues/",formToSend, {
                headers: { 'Content-Type': 'multipart/form-data'}})
            setFormData({
                venue_name:"",
                active:true,
                image:"",
                display_label:"",
            })
            alert("Venue added successfully.")
        }
        catch(error){
            alert("Trouble adding venue.")
        }
    }
    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>
            {/* <button onClick={test}>test</button> */}

            <Title
                TitleText = "MAD Poker New Venue Registration Page"
                />          

            <VenueForm
                formData={formData}
                setFormData={setFormData}
                buttonFunction={handlesubmit}
                buttonText='Add Venue'
            />            
        </div>        
    )
}
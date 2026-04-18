import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import {useState,useEffect} from 'react';
import axiosInstance from 'axios';
import OneVenue from './one-venue';
import VenueForm from '../Componenets/venue-form'

export default function EditVenues()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);      
    const [allVenues, setAllVenues]=useState([]);
    const [formData, setFormData]=useState({
        venue_name:"",
        active:true,
        image:"",
        display_label:"",
    });
    const [idToEdit, setIdToEdit]=useState(-1)

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[]);

    const fetchData = async ()=>{
        try{

            const response = await axiosInstance.get("http://127.0.0.1:8000/venues/venues/",);
            setAllVenues(response.data)
            console.log(response.data)
        }catch(err){
            alert('Problem retrieving venues.')
        }
    }

    const EditVenue=(id)=>{
        console.log(id)
        setIdToEdit(id)
        let thisVenue=allVenues.find((oneVenue)=>oneVenue.id===id)
        console.log(thisVenue)
        setFormData({
            venue_name:thisVenue.venue_name,
            active:thisVenue.active,
            display_label:thisVenue.display_label,
            image:"",
        });
    }

    const UpdateVenue=async ()=>{
        try{
            let formToSend = new FormData();

            if (formData.image)
                formToSend.append("image", formData.image, formData.image.name);
            formToSend.append("venue_name", formData.venue_name);
            formToSend.append("display_label", formData.display_label);
            formToSend.append("active", formData.active);     

            const response = await axiosInstance.patch(`http://127.0.0.1:8000/venues/update_director/${idToEdit}/`,formToSend, {
                headers: { 'Content-Type': 'multipart/form-data'}});
            setFormData({
                username:"",
                email:"",
                password1:"",
                password2:"",
                image:'',
                phone:""
            });
            setIdToEdit(-1);
            fetchData()
        }catch(err){
            alert("Can't update user information")
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
            <div
                style={{
                    display:'flex'
                }}
            >
                <div
                    style={{
                        display:'block',
                        margin:'100px auto',
                        width:'50%',
                        height:'650px',
                        overflowY:'scroll'
                    }}
                >
                    {allVenues.map((thisVenue)=>(
                        <div
                            key={thisVenue.id}
                            style={{
                            }}>
                                <OneVenue
                                    ThisVenue={thisVenue}
                                    fetchData={fetchData}
                                    EditVenue={EditVenue}
                                />
                            
                        </div>
                    ))}                
                </div>
                <div
                    style={{
                        display:'block',
                        margin:'100px auto',
                        width:'50%',
                        fontSize:'25px'
                    }}
                >
                    <div
                        style={{
                            display:'block'
                        }}
                    >
                        <div
                            // style={{
                            //     fontSize:'25px'
                            // }}
                        >
                            Edit Venue Information
                        </div>
                        <VenueForm
                            formData={formData}
                            setFormData={setFormData}
                            buttonFunction={UpdateVenue}
                            buttonText='Update Venue'
                        />                        
                    </div>
                </div>                
            </div>
        </div>
    )
}
import {useState,useEffect} from 'react';
import axios from 'axios';
import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';


export default function NewVenue({
    fetchData,
    setFormData,
    formData,
    selectedVenue
})
{

    const [buttonText, setButtonText]=useState("Add Venue")

    useEffect(()=>{
        if (selectedVenue===null) setButtonText("Add Venue")
            else setButtonText("Update Venue")
    },[selectedVenue])

    const handleChange = (e)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })        
    }

    const AddVenue = async () =>{
        try{

            const response = await axios.post("http://127.0.0.1:8000/venues/venues/",formData);
            
            fetchData()
        }catch(err){
            console.log(err);
        }
    }
    
    return(
        <div
            style={{
                display:"block",
                width:"40%",
                margin:"5%",
                border:'1px solid black',
                padding:'40px'
            }}>
            
            <MyInput
                labelText="New Venue Name"
                handleChange={handleChange}
                inputValue={formData.VenueName}
                inputName="VenueName"
                inputType="text"
            />
            <MyButton
                button_function={AddVenue}
                button_text={buttonText}
                button_style={{
                    height:"50px",
                    width:"100px",
                    margin:"auto"
                }}
            />                
        </div>
    )
}
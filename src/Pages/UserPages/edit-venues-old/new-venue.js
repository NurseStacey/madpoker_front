import {useState,useEffect} from 'react';
import axiosInstance from 'axios';
import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';


export default function NewVenue({
    fetchData,
    setFormData,
    formData,
    selectedVenue
})
{

    //const [buttonText, setButtonText]=useState("Add Venue")
    const [enableButton, setEnableButton]=useState(false)

    useEffect(()=>{
        if (selectedVenue===null) setEnableButton(false)//setButtonText("Add Venue")
            else setEnableButton(true)//setButtonText("Update Venue")
    },[selectedVenue])

    const handleChange = (e)=>{
        if (e.target.name==='image') {
            setFormData({
                ...formData,
                [e.target.name]:e.target.files[0]
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]:e.target.value
            })
        }
    }

    const AddVenue = async () =>{
        try{
            let formToSend = new FormData();

            if (formData.image)
                formToSend.append("image", formData.image, formData.image.name);
            formToSend.append("venue_name", formData.venue_name);
            formToSend.append("active", true);
            console.log(formToSend)
            const response = await axiosInstance.post("http://127.0.0.1:8000/venues/venues/",formToSend, {
                headers: { 'Content-Type': 'multipart/form-data'}})            
            console.log(response)
            fetchData()
        }catch(err){
            alert('Error creating new venue')
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
                inputValue={formData.venue_name}
                inputName="venue_name"
                inputType="text"
            />
            <MyInput
                labelText="Venue Image"
                handleChange={handleChange}
                
                inputName="image"
                inputType="file"
            />                 
            <MyButton
                button_function={AddVenue}
                button_text={"Add Venue"}
                button_style={{
                    height:"50px",
                    width:"100px",
                    margin:"auto"
                }}
                disable={enableButton}
            />                
        </div>
    )
}
import {useState,useEffect} from 'react';
import axiosInstance from 'axios';
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import UserForm from '../Componenets/user-form'

export default function Register(){
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [formData, setFormData]=useState({
        username:"",
        email:"",
        password1:"",
        password2:"",
        image:"",
        phone:""
    });

    useEffect(()=>{
        setWidth(width)
        setHeight(height)
    },[]);

    const[isLoading, setisLoading]=useState(false)
    const [successMessage, setsuccessMessage]=useState(null);
    const [ error, seterror]=useState(null);

    const handlesubmit = async (e) =>{
        
        console.log(isLoading)
        //e.preventDefault();
        if(isLoading){
            return
        }
        
        let formToSend = new FormData();

        if (formData.image)
            formToSend.append("image", formData.image, formData.image.name);
        formToSend.append("username", formData.username);
        formToSend.append("email", formData.email);
        formToSend.append("password1", formData.password1);     
        formToSend.append("password2", formData.password2);     
        formToSend.append("phone", formData.phone); 
        console.log(formToSend)
        setisLoading(true)
        try{
            const response = await axiosInstance.post("http://127.0.0.1:8000/login_api/register/",formToSend, {
                headers: { 'Content-Type': 'multipart/form-data'}})
            setFormData({
                username:"",
                email:"",
                password1:"",
                password2:"",
                image:'',
                phone:""
            })
            setsuccessMessage("Registration Successful")
            seterror(null)
        }
        catch(error){
           // console.log(error)
            if(error.response && error.response.data){
                
                Object.keys(error.response.data).forEach(field=>{
                    
                    const errorMessages = error.response.data[field];
                    //console.log(errorMessages.length)
                    if(errorMessages && errorMessages.length>0) seterror(errorMessages[0])
                })
            }
        }
        finally{
            setisLoading(false)
        }
    }


    const test =()=>{
        console.log(formData)
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
                TitleText = "MAD Poker New Director Registration Page"
                />          
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <UserForm
                formData={formData}
                setFormData={setFormData}
                buttonFunction={handlesubmit}
                buttonText='Add Director'
            />
       
            
        </div>
    )
}
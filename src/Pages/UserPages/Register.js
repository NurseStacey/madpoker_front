import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../utils/window-dimensions';
import Title from './Componenets/Title';
import MyButton from '../../Components/Widgets/my-button';
import MyInput from '../../Components/Widgets/my-input';


export default function Register(){
    const navigate = useNavigate();
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [formData, setFormData]=useState({
        username:"",
        email:"",
        password1:"",
        password2:"",
    });

    useEffect(()=>{
        setWidth(width)
        setHeight(height)
    },[]);

    const[isLoading, setisLoading]=useState(false)
    const [successMessage, setsuccessMessage]=useState(null);
    const [ error, seterror]=useState(null);

    const handlesubmit = async (e) =>{
        
        e.preventDefault();
        if(isLoading){
            return
        }

        setisLoading(true)
        try{
            const response = await axios.post("http://127.0.0.1:8000/login_api/register/",formData)
            setFormData({
                username:"",
                email:"",
                password1:"",
                password2:"",
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

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const test =()=>{
        console.log(error)
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
            <div
                style={{
                    display:"block",
                    width:"40%",
                    border:"3px solid blue",
                    margin:"100px auto"

                }}>
                <MyInput
                    labelText="Username"
                    handleChange={handleChange}
                    inputValue={formData.username}
                    inputName="username"
                />
                <MyInput
                    labelText="Email"
                    handleChange={handleChange}
                    inputValue={formData.email}
                    inputName="email"
                />
                <MyInput
                    labelText="Password"
                    handleChange={handleChange}
                    inputValue={formData.password1}
                    inputName="password1"
                    inputType="password"                    
                />
                <MyInput
                    labelText="Confirm Password"
                    handleChange={handleChange}
                    inputValue={formData.password2}
                    inputName="password2"
                    inputType="password"
                />
                <div
                    style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-around"
                    }}>
                    <MyButton
                        button_function={handlesubmit}
                        button_text={"Add Director"}  
                        button_style={{
                            margin:"25px auto",
                            height:"75px",
                            width:"100px"
                        }}              
                    />
                    <MyButton
                        button_function={()=>navigate("/admin",)}
                        button_text={"Return to Admin Page"}  
                        button_style={{
                            margin:"25px auto",
                            height:"75px",
                            width:"100px"
                        }}              
                    />                    
                </div>                                     
            </div>
            
        </div>
    )
}
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Title from './Componenets/Title'
import WindowDimensions from '../../utils/window-dimensions'
import MyButton from '../../Components/Widgets/my-button';
import MyInput from '../../Components/Widgets/my-input';

export default function Login(){
    const navigate = useNavigate();
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)

    const [formData, setFormData]=useState({
        email:"",
        password:"",
    });
    const[isLoading, setisLoading]=useState(false)
    const [successMessage, setsuccessMessage]=useState(null);
    const [ error, seterror]=useState(null);

    useEffect(()=>{
        setWidth(width)
        setHeight(height)

    },[])
    //useEffect(()=>{alert('test')},[])
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handlesubmit = async (e) =>{
        
        e.preventDefault();
        if(isLoading){
            return
        }

        setisLoading(true)
        try{
            const response = await axios.post("http://127.0.0.1:8000/login_api/login/",formData)
            //console.log(response)
            setsuccessMessage("Login Successful")
            localStorage.setItem("accessToken",response.data.tokens.access);
            localStorage.setItem("refreshToken",response.data.tokens.refresh);
            seterror(null)
            navigate("/admin",)
        }
        catch(error){
            console.log(error)

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
        console.log(Height)
    }
    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>
            <Title
                TitleText = "MAD Poker Director Login Page"
                />
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}            

            <div
                style={{
                    width:"400px",
                    border:"3px solid blue",
                    margin:"200px auto 0px",
                    fontSize:"20px",
                    
                }}>
                <MyInput
                    labelText="Email"
                    handleChange={handleChange}
                    inputValue={formData.email}
                    inputName="email"
                />
                <MyInput
                    labelText="Password"
                    handleChange={handleChange}
                    inputValue={formData.password}
                    inputName="password"
                    inputType="password"
                />                
              
                <div
                    style={{
                        display:"flex",
                        justifyContent:"center",
                        marginBottom:"50px"
                    }}
                    >
                    <MyButton
                        button_function={handlesubmit}
                        button_text={"Login"}
                        />
                </div>
        
            </div>
        {/* <button onClick={test}>test</button> */}
        </div>
    )
}
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import WindowDimensions from '../../utils/window-dimensions'
import Title from './Componenets/Title'
import MyButton from '../../Components/Widgets/my-button'
import Operations from './Componenets/Operations'

export default function Admin(){
    const navigate = useNavigate();
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [username, setusername]=useState("")
    const [isLoggedIn, setisLoggedIn]=useState(false)

    useEffect(()=>{
        setWidth(width)
        setHeight(height)
        
        const checkLoggedInUser=async()=>{
            try{
                const token=localStorage.getItem("accessToken");
                
                if (token){
                    const config={
                        headers:{
                            'Authorization':`Bearer ${token}`
                        }
                    };

                    const response = await axios.get("http://127.0.0.1:8000/login_api/user/", config);
                    setisLoggedIn(true);
                    setusername(response.data.username);
                }
                else {
                    setisLoggedIn(false);
                    setusername("");
                    navigate("/login",)
                }
            }
            catch{
                navigate("/login",)
            }

        }
        checkLoggedInUser()
    },[])

    const NavigationFunction = (whereTo)=>{
        navigate(whereTo,)  
    }

    const handleLogout = async () =>{
        try{
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if(accessToken && refreshToken) {
                const config = {
                headers: {
                    "Authorization":`Bearer ${accessToken}`
                }
                };

                await axios.post("http://127.0.0.1:8000/login_api/logout/", {"refresh":refreshToken}, config)
                
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                    setisLoggedIn(false);
                    setusername("");    
                navigate("/login",)            
            }
        }
        catch(error){console.log(error)}
    }

    const test = () =>{
         axios.get('http://localhost:8000/react_test/')
    }
            // AxiosInstance.get('http://localhost:8000/react_test/')
        // .then(res => {
        //     console.log(res)
        //     })
        // .catch(err => {})
    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>
            <Title
                TitleText = "MAD Poker Admin Page"
                />
            <div
                style={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                <div
                    style={{
                        margin:"20px",
                        fontSize:"20px"
                    }}>
                        Welcome {username.charAt(0).toUpperCase()+ username.slice(1)}
                    </div>
                <MyButton
                    button_function={handleLogout}
                    button_text={"Logout"}
                    disable={false}
                    />

            </div>
            <Operations
                NavigationFunction={NavigationFunction}
            />

        </div>)
    
}
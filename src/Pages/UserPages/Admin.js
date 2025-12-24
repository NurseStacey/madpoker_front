import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Admin(){

    const [username, setusername]=useState("")
    const [isLoggedIn, setisLoggedIn]=useState(false)

    useEffect(()=>{
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
                }
            }
            catch{

            }

        }
        checkLoggedInUser()
    },[])

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

                console.log(refreshToken)
                console.log(config)
                await axios.post("http://127.0.0.1:8000/login_api/logout/", {"refresh":refreshToken}, config)
                
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                    setisLoggedIn(false);
                    setusername("");                
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
        <div>
        {isLoggedIn ? (
            <>
                <h2>Hi, {username}</h2> 
                <button onClick={handleLogout}>Logout</button>
            </>):(
                <>
            <h2>Please Login</h2>
            <button onClick={test}>Test</button>
            </>
            )}
        </div>
    )
}
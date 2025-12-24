import React from 'react';
import {useState} from 'react';
import axios from 'axios';


export default function Login(){
    const [formData, setFormData]=useState({
        email:"",
        password:"",
    });
    const[isLoading, setisLoading]=useState(false)
    const [successMessage, setsuccessMessage]=useState(null);
    const [ error, seterror]=useState(null);

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
            console.log(response)
            setsuccessMessage("Login Successful")
            localStorage.setItem("accessToken",response.data.tokens.access);
            localStorage.setItem("refreshToken",response.data.tokens.refresh);
            seterror(null)
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

    return(
        <div>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}            
            <form>            
                <label>email:</label>
                <input
                    onChange={handleChange}  
                    type="text" 
                    name="email" 
                    value={formData.email}></input>
                <br/>
                <br/>
                <label>password:</label>
                <input  
                    onChange={handleChange}
                    type="password" 
                    name="password" 
                    value={formData.password}></input>
                <br/>
                <br/>
        
                <button type="submit" onClick={handlesubmit} disabled={isLoading}>Login</button>

            </form>            
        </div>
    )
}
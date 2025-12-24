import React from 'react';
import {useState} from 'react';
import axios from 'axios';

export default function Register(){

    const [formData, setFormData]=useState({
        username:"",
        email:"",
        password1:"",
        password2:"",
    });
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
            console.log(response)
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
        <div>
            {/* <button onClick={test}>test</button> */}
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <form>
                <label>username:</label>
                <input 
                    onChange={handleChange}
                    type="text" 
                    name="username"
                    value={formData.username}></input>
                <br/>
                <br/>
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
                    name="password1" 
                    value={formData.password1}></input>
                <br/>
                <br/>
                <label>confirm password:</label>
                <input  
                    onChange={handleChange}
                    type="password" 
                    name="password2" 
                    value={formData.password2}></input>
                <br/>
                <br/>
                <button type="submit" onClick={handlesubmit} disabled={isLoading}>Register</button>

            </form>
        </div>
    )
}
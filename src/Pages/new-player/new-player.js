import WindowDimensions from '../../utils/window-dimensions';
import {useEffect, useState} from 'react';
import axios from 'axios';
import MyInput from './../../Components/Widgets/my-input';
import MyButton from '../../Components/Widgets/my-button';
import {CreateFormObj} from './blank-obj'

export default function NewPlayer(){
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)    
    const [formObj, setFormObj]=useState(CreateFormObj())
    const [confirmedPassword, setConfirmedPassword]=useState("")
    const [regisrationMessage, setRegistrationMessage]=useState("")

    useEffect(()=>{
        setWidth(width*0.40)
        setHeight(height)
    },[])    

    const handleChange=(e)=>{
        setFormObj({
            ...formObj,
            formData:{
                ...formObj.formData,
                [e.target.name]:e.target.value
            }
        })
    }

    const Test=()=>{
        console.log(formObj)
    }

    const handleConfirmedPassword=(e)=>{setConfirmedPassword(e.target.value)}

    const AddUser = async()=>{
        try{
            console.log(formObj.formData)
            const response = axios.post("http://127.0.0.1:8000/players/players/",formObj.formData)
            setRegistrationMessage("You've been successfully registered!")
            setFormObj(CreateFormObj())

        }catch(err){
            console.log(err)
            if (err.response.status===409) {
                alert('That user name is already being used.  Please choose another')
                return
            } else {
                alert('Error creating user.  Please contact a director')
                return
            }
            
        }
    }

    return(
        <div
            style={{
                width:`${Width}px`,
                height:`${Height}px`,  
                marginLeft:'125px',
                border:'1px solid black'     
            }}
            >
                <div
                    style={{
                        width:'100%',
                        marginTop:'100px',
                        fontSize:'30px',
                        textAlign:'center'
                    }}
                >
                    New player Registration
                </div>
                <MyInput
                    labelText="First Name"
                    handleChange={handleChange}
                    inputValue={formObj.formData.first_name}
                    inputName="first_name"
                    inputType='text'
                    inputStyle={{
                        fontSize:"20px"
                    }}
                />
                <MyInput
                    labelText="Last Name"
                    handleChange={handleChange}
                    inputValue={formObj.formData.last_name}
                    inputName="last_name"
                    inputType='text'
                    inputStyle={{
                        fontSize:"20px"
                    }}
                />       
                <MyInput
                    labelText="Username"
                    handleChange={handleChange}
                    inputValue={formObj.formData.player}
                    inputName="player"
                    inputType='text'
                    inputStyle={{
                        fontSize:"20px"
                    }}
                />    
                <MyInput
                    labelText="Phone Number"
                    handleChange={handleChange}
                    inputValue={formObj.formData.phone}
                    inputName="phone"
                    inputType='text'
                    inputStyle={{
                        fontSize:"20px"
                    }}
                />     
                <MyInput
                    labelText="Password"
                    handleChange={handleChange}
                    inputValue={formObj.formData.password}
                    inputName="phone"
                    inputType='password'
                    inputStyle={{
                        fontSize:"20px"
                    }}
                />
                <MyInput
                    labelText="Confirm Password"
                    handleChange={handleConfirmedPassword

                    }
                    inputValue={confirmedPassword}
                    inputName="password"
                    inputType='password'
                    inputStyle={{
                        fontSize:"20px"
                    }}
                /> 
                <div
                    style={{
                        display:'flex',
                        justifyContent:'center'
                    }}>
                    <MyButton
                        button_function={AddUser}
                        button_text="Register"
                        button_style={{
                            
                        }}
                        disable={false}
                    />
                </div>  
                <div
                    style={{
                        fontSize:'30px',
                        textAlign:'center'
                    }}>
                        {regisrationMessage}
                </div>
                {/* <button onClick={Test}>test</button> */}
        </div>
    )
}
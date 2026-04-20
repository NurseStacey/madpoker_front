import MyInput from '../../../Components/Widgets/my-input';
import MyButton from '../../../Components/Widgets/my-button';
import { useState } from 'react';


export default function UserForm({
    formData,
    setFormData,
    buttonFunction,
    buttonText
})
{
    const [fileKey,setFileKey]=useState(Date.now())

    const localButtonFunction=()=>{
        setFileKey(Date.now())
        buttonFunction()
    }


    const handleChange = (e) =>{

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
    return(
        <div
            style={{
                display:"block",
                width:"80%",
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
            <MyInput
                labelText="Phone"
                handleChange={handleChange}
                inputValue={formData.phone}
                inputName="phone"
                inputType="tel"
            />                        
            <MyInput
                labelText="Profile Image"
                handleChange={handleChange}
                inputKey={fileKey}
                inputName="image"
                inputType="file"
            />          
            <MyButton
                button_function={localButtonFunction}
                button_text={buttonText}  
                button_style={{
                    height:"100px",
                    width:"100px",
                    margin:"1% auto"
                }}
                disable={false}              
            />            
        </div>
    )
}
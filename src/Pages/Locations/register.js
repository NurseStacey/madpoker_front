import {useState,useEffect} from 'react'
import MyButton from '../../Components/Widgets/my-button'
import MyInput from '../../Components/Widgets/my-input'


export default function Register({
    setNewPlayer,
    newPlayer,
    RegisterAndSignUp
})
{
    const [disableButton, setDisableButton]=useState(true)
    useEffect(()=>{

        setDisableButton((newPlayer.player.length<4))

    },[newPlayer])    

    const handleChange = (e) =>{
        setNewPlayer({
            ...newPlayer,
            [e.target.name]:e.target.value
        })
    }    
    return(
        <div
            style={{
                height:"40%",
            }}
        >             
            <div
                style={{
                    fontSize:'20px',
                    marginTop:'30px'
                }}>
            New User
            </div>   
            <div
                style={{
                    border:'1px solid black',
                    margin:'0px auto',
                    width:'300px'
                }} 
            >
                <MyInput
                    labelText="UserName"
                    handleChange={handleChange}
                    inputValue={newPlayer.player}
                    inputName="player"
                    inputType="text"
                />
                <MyInput
                    labelText="email"
                    handleChange={handleChange}
                    inputValue={newPlayer.email}
                    inputName="email"
                    inputType="text"
                />
                <MyInput
                    labelText="Phone"
                    handleChange={handleChange}
                    inputValue={newPlayer.phone}
                    inputName="phone"
                    inputType="text"
                />   
                <MyButton
                    button_function={RegisterAndSignUp}
                    button_text="Register and Sign up for Game"
                    button_style={{
                        fontSize:'15px',
                        margin:"50px auto",
                        width:"100px",
                        height:"80px"}}
                    disable={disableButton}
                />                                                               
            </div>                    
        </div>
    )
}
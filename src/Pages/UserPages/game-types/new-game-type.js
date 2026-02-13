import {useState,useEffect} from 'react';
import axios from 'axios';
import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';

export default function NewGameType({    
    fetchData,
    setFormData,
    formData,
    selectedGameType    
})
{

    //const [buttonText, setButtonText]=useState("Add Game Type")
    const [enableButton, setEnableButton]=useState(false)

    useEffect(()=>{
        if (selectedGameType===null) setEnableButton(false)//setButtonText("Add Venue")
            else setEnableButton(true)//setButtonText("Update Venue")
    },[selectedGameType])


    const handleChange = (e)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })        
    }

    const AddGameType = async () =>{
        try{

            const response = await axios.post("http://127.0.0.1:8000/games/get_game_types/",formData);
            
            fetchData()
        }catch(err){
            alert('Error creating new Game Type')
        }
    }    
    return(
        <div
            style={{
                display:"block",
                width:"40%",
                margin:"5%",
                border:'1px solid black',
                padding:'40px'
            }}>
            
            <MyInput
                labelText="New Game Type Name"
                handleChange={handleChange}
                inputValue={formData.name}
                inputName="name"
                inputType="text"
            />
            <MyButton
                button_function={AddGameType}
                button_text={"Add Game Type"}
                button_style={{
                    height:"50px",
                    width:"100px",
                    margin:"auto"
                }}
                disable={enableButton}
            />                
        </div>
    )
}
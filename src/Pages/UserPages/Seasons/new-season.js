import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';
import axios from 'axios'
import { useEffect, useState} from 'react';

export default function NewSeason({
    fetchData
}){
    const [formData, setFormData]=useState({
        SeasonNumber:"",
        StartDate:"2026-01-01"
    })

    const handleChange = (e)=>{
        console.log(e.target)
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })        
    }

    const AddSeason = async()=>{
        try{

            const response = await axios.post("http://127.0.0.1:8000/games/seasons/",formData);
            
            fetchData()
            setFormData({
                SeasonNumber:"",
                StartDate:"2026-01-01"
            })
        }catch(err){
            alert('Problem creating season')
        }        
    }
    
    return(
        <div
            style={{
                display:"block",
                border:'1px solid black',
                margin:"5% auto",
                padding:"3%",
                width:'50%',
                fontSize:'20px',
                alignItems:'center'
            }}

        >
            <div>
                Add a New Season
            </div>
            <MyInput
                labelText="Season Number"
                handleChange={handleChange}
                inputValue={formData.SeasonNumber}
                inputName="SeasonNumber"
                inputType="text"
            />
            <MyInput
                labelText="Start Date"
                handleChange={handleChange}
                inputValue={formData.StartDate}
                inputName="StartDate"
                inputType="date"
            />
            <MyButton
                button_function={AddSeason}
                button_text={"Add Season"}
                button_style={{
                    height:"100px",
                    width:"100px",
                    margin:"auto"
                }}
                disable={false}
            />               
        </div>
    )
}
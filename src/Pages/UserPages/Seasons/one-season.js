import {useState,useEffect} from 'react';
import axios, { all } from 'axios';
import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';

export default function OneSeason({
    oneSeason,
    fetchData
})
{
    const [formData, setFormData]=useState({
        SeasonNumber:oneSeason.SeasonNumber,
        StartDate:oneSeason.StartDate,
        id:oneSeason.id
    })

    const handleChange = (e)=>{
        console.log(e.target)
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })        
    }
    
    const UpdateSeason = async()=>{
        try{
            
            const response = await axios.patch(`http://127.0.0.1:8000/games/oneseason/${formData.id}/`,formData);
            console.log(response)
            fetchData()
            setFormData({
                SeasonNumber:oneSeason.SeasonNumber,
                StartDate:oneSeason.StartDate,
                id:oneSeason.id
            })

        }catch(err){
            console.log(err);
        }              
    }


    return(
        <div
            style={{
                display:'flex',
                justifyContent:'space-around'
            }}>
            <div    
                style={{
                    width:'30%',
                }}
            >
                <MyInput
                    labelText="Season Number"
                    handleChange={handleChange}
                    inputValue={formData.SeasonNumber}
                    inputName="SeasonNumber"
                    inputType="text"
                />
            </div>
            <div    
                style={{
                    width:'40%',
                }}
            >         
                <MyInput
                    labelText="Start Date"
                    handleChange={handleChange}
                    inputValue={formData.StartDate}
                    inputName="StartDate"
                    inputType="date"
                />
            </div>   
            <MyButton
                button_function={UpdateSeason}
                button_text={"Update Season"}
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
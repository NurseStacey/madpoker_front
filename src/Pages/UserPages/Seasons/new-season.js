import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';
import axios from 'axios'
import {useEffect, useState} from 'react';

export default function NewSeason({
    seasonTypes,
    fetchData
}){
    const [formData, setFormData]=useState({
        season:"",
        start_date:"2026-01-01",
        end_date:"2026-03-31",
        season_type:'In Person'
    })
    const [seasonTypeText, setSeasonTypeText]=useState('');

    const seasonTypeClicked = (oneSeasonType)=>{setFormData({
        ...formData,
        season_type:oneSeasonType
        });
    }

    const handleChange = (e)=>{

        if (e.target.name==="season_type"){
            
            seasonTypeClicked(seasonTypes.find((oneSeason)=>oneSeason.season_type.toLowerCase()===e.target.value.toLowerCase()).id);
            setSeasonTypeText(e.target.value);
            return;
        }
        if (e.target.name==="start_date") {
            let futureDate = new Date(e.target.value);
            
            futureDate.setMonth(futureDate.getMonth()+3)       
            futureDate.setDate(futureDate.getDate()-1)
            setFormData({
                ...formData,
                [e.target.name]:e.target.value,
                "end_date":futureDate.toISOString().split('T')[0]
            })            
        } else {
            setFormData({
                ...formData,
                [e.target.name]:e.target.value
            })
        }

    }

    const AddSeason = async()=>{
        try{
            let data_to_send=formData
            if (formData.season_type===undefined){
                data_to_send={
                    ...formData,
                    season_type_text:seasonTypeText
                }
            }

            const response = await axios.post("http://127.0.0.1:8000/seasons/seasons/",formData);
            
            fetchData()
            setFormData({
                season:"",
                start_date:"2026-01-01",
                end_date:"2026-03-31"
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
                margin:"1% auto",
                padding:"3%",
                width:'40%',
                fontSize:'20px',
                alignItems:'center'
            }}

        >
            <div>
                Add a New Season
            </div>
            <MyInput
                labelText="Season"
                handleChange={handleChange}
                inputValue={formData.season}
                inputName="season"
                inputType="text"
            />
            <MyInput
                labelText="Start Date"
                handleChange={handleChange}
                inputValue={formData.start_date}
                inputName="start_date"
                inputType="date"
            />
            <MyInput
                labelText="End Date"
                handleChange={handleChange}
                inputValue={formData.end_date}
                inputName="end_date"
                inputType="date"
            />            
            <div
                style={{
                    display:'flex',
                    justifyContent:'center'
                }}
            >
                <div
                    style={{
                        display:'block',
                        border:'1px solid black',
                        height:'150px',
                        width:'100px',
                        overflowY: 'scroll', 
                        fontSize:'20px'
                    }}
                >
                    {seasonTypes.map((oneType)=>(
                        <div
                            key={oneType.id}
                            onClick={()=>seasonTypeClicked(oneType.id)}
                            style={{
                                backgroundColor:(formData.season_type===oneType.id)?'limegreen':'white'
                            }}
                            >
                            {oneType.season_type}
                        </div>
                    ))}
                </div>
                <MyInput
                    labelText="New Season Type"
                    handleChange={handleChange}
                    inputValue={seasonTypeText}
                    inputName="season_type"
                    inputType="text"
                    inputStyle={{
                        height:'25px'
                    }}
                />                
            </div>
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
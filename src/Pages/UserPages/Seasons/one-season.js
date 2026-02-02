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
        season:oneSeason.season,
        start_date:oneSeason.start_date,
        end_date:oneSeason.end_date,
        id:oneSeason.id
    })

    useEffect(()=>{
        setFormData({
            season:oneSeason.season,
            start_date:oneSeason.start_date,
            end_date:oneSeason.end_date,
            id:oneSeason.id
        })
    },[oneSeason])

    const handleChange = (e)=>{
        console.log(e.target)
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })        
    }
    
    const UpdateSeason = async()=>{
        try{
            
            const response = await axios.patch(`http://127.0.0.1:8000/seasons/oneseason/${formData.id}/`,formData);
            console.log(response)
            fetchData()
            setFormData({
                season:oneSeason.season,
                start_date:oneSeason.start_date,
                end_date:oneSeason.end_date,
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
                justifyContent:'space-around',
                fontSize:'16px',
                marginTop:'10px',
                border:'1px solid black'
            }}>
                <div
                    style={{
                        display:'block',
                        width:'80%',
                        paddingTop:'10px'
                    }}
                >
                    <div>
                        <MyInput
                            labelText="Season"
                            handleChange={handleChange}
                            inputValue={formData.season}
                            inputName="season"
                            inputType="text"
                            inputStyle={{
                                margin:'0px'
                            }}
                        />                    
                    </div> 
                    <div
                        style={{
                            display:'flex',
                            justifyContent:'space-around',
                        }}
                    >
                        <MyInput
                            labelText="Start Date"
                            handleChange={handleChange}
                            inputValue={formData.start_date}
                            inputName="start_date"
                            inputType="date"
                            inputStyle={{
                                width:'40%'
                            }}                            
                            />
                            
                        <MyInput
                            labelText="End Date"
                            handleChange={handleChange}
                            inputValue={formData.end_date}
                            inputName="end_date"
                            inputType="date"
                            inputStyle={{
                                width:'50%'
                            }}
                        />

                    </div>                            
                </div>
       
                    
            <MyButton
                button_function={UpdateSeason}
                button_text={"Update Season"}
                button_style={{
                    height:"50px",
                    width:"70px",
                    margin:"auto",
                    fontSize:'16px'
                }}
                disable={false}            
            />
        </div>
    )
}
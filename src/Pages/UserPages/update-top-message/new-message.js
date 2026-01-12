import MyInputColumn from '../../../Components/Widgets/my-input-column';
import MyButton from '../../../Components/Widgets/my-button';
import {useState,useEffect} from 'react';
import ColorSelector from '../../../Components/Widgets/my-color-selector';
import axios from 'axios';
import '../../../App.css';

export default function NewMessage({
    fetchData,
    Reset,
    formData,
    setFormData
}){

    const AddText = async () =>{
        console.log(formData)
        try{

            const response = await axios.post("http://127.0.0.1:8000/website_data/homepagetext/",formData);
            
            fetchData()
            Reset()


        }catch(err){
            console.log(err);
        }
    }

    const setColor = (value)=>{
        setFormData({
            ...formData,
            color:value
        })        
    }
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })        
    }

    const Test =()=>{
        console.log(formData)
    }
    return (
        <div
            style={{
                display:"block"
            }}
            >
            <div
                className="SubTitle"
            >
                    Add New Text
                </div>
            <div
                style={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    margin:"40px 15%",
                    border:"1px solid black"
                }}>
                
                <MyInputColumn
                    labelText="Order"
                    handleChange={handleChange}
                    inputValue={formData.order}
                    inputName="order"
                    inputType="number"
                />
                <MyInputColumn
                
                    labelText="Text"
                    handleChange={handleChange}
                    inputValue={formData.text}
                    inputName="text"
                    inputType="textarea"
                /> 
                <ColorSelector
                    currentValue={formData.color}
                    setValue={setColor}/> 
                <MyButton
                    button_function={AddText}
                    button_text="Add Text"
                    button_style={{
                        margin:"15px",
                        height:"80px",
                        width:"120px"
                    }}  
                    disable={false} 
                />
                {/* <button onClick={Test}>Test</button> */}
            </div>
        </div>
    )
}
import MyInputColumn from '../../../Components/Widgets/my-input-column';
import MyButton from '../../../Components/Widgets/my-button';
import {useState,useEffect} from 'react';
import ColorSelector from '../../../Components/Widgets/my-color-selector';
import axios from 'axios';
import '../../../App.css';

export default function UpdateMessage({
    fetchData,
    Reset,
    thisRecord
}){

    const [formData, setFormData]=useState({
        order:"",
        text:"",
        color:"#000000",
        id:-1
    });

    useEffect(()=>{

        setFormData(thisRecord)
    },[thisRecord]);

    const Cancel = () =>{
        Reset()
    }

    const UpdateText = async () =>{
        console.log(formData)
        try{

            const response = await axios.patch(`http://127.0.0.1:8000/website_data/homepagetext/${formData.id}/`,formData);
            
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
    
    const Test = () =>{
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
                    Update Text
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
                <div
                    style={{
                        display:"block",

                    }}>
                    <MyButton
                        button_function={UpdateText}
                        button_text="Update Text"
                        button_style={{
                            margin:"15px",
                            height:"80px",
                            width:"120px"
                        }}
                        disable={false}   
                    />
                    <MyButton
                        button_function={Cancel}
                        button_text="Cancel"
                        button_style={{
                            margin:"15px",
                            height:"80px",
                            width:"120px"
                        }} 
                        disable={false}  
                    />
                </div>                
            </div>
        </div>    
    )
}
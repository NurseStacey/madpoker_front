import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import MyButton from '../../../Components/Widgets/my-button';
import NewSection from './new-sections';
import CurrentSection from './current-sections';
import {BlankFormData} from './blank-form-data';

export default function GameSection(){
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const navigate = useNavigate();
    const [formData, setFormData]=useState(BlankFormData)
    const [allSections, setAllSections]=useState([])
    const [selectedSection,setSelectedSection]=useState(null)

    useEffect(()=>{

        setWidth(width);
        setHeight(height);
        fetchData();
    },[width,height]);       

    const fetchData = async()=>{
        try{
            const response = (await axios.get(`http://127.0.0.1:8000/games/sectionthrough/`,));
            setAllSections(response.data)

        }catch(err){
            
            alert('Trouble getting all sections')
        }           
    }

    const Test=()=>{
        console.log(allSections)
    }

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>

            <Title
                TitleText = "Edit Game Sections"
            />   
            <button onClick={Test}>Test</button>
            <MyButton
                button_function={()=>navigate("/admin")}
                button_text={"Return to Admin"}
                button_style={{
                    height:"75px",
                    width:"100px",
                    margin:"2% auto"
                }}
                disable={false}
            />               
            <div
                style={{
                    display:'flex',
                    justifyContent:'space-around'
                }}
                >
                <NewSection
                    setFormData={setFormData}
                    formData={formData}
                />                    
                <CurrentSection
                    setFormData={setFormData}   
                    allSections={allSections}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    fetchData={fetchData}   
                />

            </div>
        </div>
    )
}
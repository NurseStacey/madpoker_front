import {useState,useEffect} from 'react';
import axios from 'axios';
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import NewSection from './new-sections';
import CurrentSection from './current-sections';
import  {CreateFormObj,BlankFormData} from './blank-form-data';

export default function GameSection(){
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);  
    const [formObj, setFormObj]=useState(CreateFormObj())
    const [allSections, setAllSections]=useState([])
    const [selectedSection,setSelectedSection]=useState(null)

    useEffect(()=>{
        
    },[])
    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[width,height]);       

    useEffect(()=>{
         if(selectedSection===null) {
         setFormObj({
             ...formObj,
                formData: BlankFormData 
            })
            return
         }else{
         setFormObj({
             ...formObj,
                formData: allSections.find((oneSection)=>oneSection.id===selectedSection)  
            })
         }
    },[selectedSection])

    const fetchData = async()=>{
        try{
            const response = (await axios.get(`http://127.0.0.1:8000/games/sectionthrough/`,));
            setAllSections(response.data)
            //console.log(response.data)
        }catch(err){
            
            alert('Trouble getting all sections')
        }        
    }
    const fetchSections = async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/games/sections/",);
                setFormObj({
                    ...formObj,
                    AllSections:response.data
                }) 
            }catch(err){
                alert('Problem getting sections.');
            }
        }      
    const fetchDirectors = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
            setFormObj({
                ...formObj,
                AllDirectors:response.data
            }) 
        }catch(err){
            alert('Problem getting directors.');
        }
    }
    
    const fetchGames=async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/games/games/",)
            setFormObj({
                ...formObj,
                AllGames:response.data
            }) 

        }catch(err){
            console.log(err)
            alert('Problem loading games.');
        }    
    }

    useEffect(()=>{
        try {
            if (formObj.AllGames===null)
            {
                fetchGames()
            }
        }catch(err){console.log(err)}

        try {
            if (formObj.AllDirectors===null)
            {
                fetchDirectors()
            }
        }catch(err){console.log(err)}
        
        try {
            if (formObj.AllSections===null)
            {
                fetchSections()
            }
        }catch(err){console.log(err)}

    },[formObj])

    const Test=()=>{
        console.log(formObj.getAllGamesText())
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
            
            <button onClick={Test}>test</button>
            <div
                style={{
                    display:'flex',
                    justifyContent:'space-around'
                }}
                >
                <NewSection
                    // setFormData={setFormData}
                    // formData={formData}
                    allSections={allSections}
                    fetchData={fetchData}
                    selectedSection={selectedSection}
                    formObj={formObj}
                    setFormObj={setFormObj}
                />                    
                <CurrentSection
                    //setFormData={setFormData}   
                    allSections={allSections}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    fetchData={fetchData}  
                    formObj={formObj} 
                    setFormObj={setFormObj}
                />

            </div>
        </div>
    )
}
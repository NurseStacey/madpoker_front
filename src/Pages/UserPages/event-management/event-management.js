import MyButton from '../../../Components/Widgets/my-button';
import CurrentEvent from './current-events';
import NewEvent from './new-event';
import Title from '../Componenets/Title';
import axios from 'axios';
import {useState, useEffect} from 'react';
import WindowDimensions from '../../../utils/window-dimensions';
import { useNavigate } from "react-router-dom";

export default function EventManagement()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);     
    const [allEvents, setAllEvents]=useState([])
    const [event, setEvent]=useState({
        name:"",
        id:-1
    });
    const navigate = useNavigate();    

    const fetchData = async()=>{
        try{
            const response = (await axios.get(`http://127.0.0.1:8000/games/sections/`,));
            setAllEvents(response.data)
            setEvent(response.data.find((oneEvenet)=>oneEvenet.name==='Texas Holdem'))
        }catch(err){
            alert('Trouble getting all events')
        }   
    }

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[]);

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>

            <Title
                TitleText = "Edit Events"
            />   

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    marginTop:"50px"
                }}
            >
                <NewEvent
                    fetchData={fetchData}
                    setEvent={setEvent}
                    event={event}
                    />

                <CurrentEvent
                    fetchData={fetchData}
                    allEvents={allEvents}
                    event={event}
                    setEvent={setEvent}           
                />

            </div>
            <MyButton
                button_function={()=>navigate("/admin")}
                button_text={"Return to Admin"}
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
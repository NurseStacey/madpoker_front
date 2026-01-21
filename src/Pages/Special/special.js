import { useEffect, useState } from "react";
import axios from 'axios'
import OneMessage from "./one-message";


export default function SpecialMessages(){
    const [specialMessages,setSpecialMessages]=useState([])

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async ()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/website_data/specialmessages",);

            setSpecialMessages(response.data.slice(0,10))

        }catch(err){
            alert('Error loading special messages')
        }
    }    


    const Test=()=>{console.log(specialMessages);}

    return(

        
        <div
            style={{
                width:"50%",
                marginTop:"5%",

                border:"1px solid black"
            }}>
            {specialMessages.map((oneRecord)=>
                <div
                    style={{
                        margin:"5%"
                    }}>
  
                <OneMessage
                    thisRecord={oneRecord}
            />  
            </div>
        )}
            
        </div>
    )
}
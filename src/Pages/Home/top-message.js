import {MESSAGE} from './notice'
import '@fontsource/open-sans'
import {useEffect,useState} from 'react'
import axios from 'axios';

export  default function TopMessage()
{
    const test = ()=>{console.log(messages)}
    const [messages, setMessages]=useState([])

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async ()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/website_data/homepagetext",);

            setMessages(response.data.sort((a,b)=>a.order=b.order))

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div
            style={{
                display:'block',
                width:'100%',
                // height:'80%',
                border:'3px solid #3f007f',
                marginTop:'5%',
                paddingBottom:'20px'
            }}>
                {/* <button onClick={test}>test</button> */}
               {messages.map((one_line,index)=>
               <div
                    style={{
                        fontWeight:'bold',
                        display:'flex',
                        width:'90%',
                        fontFamily:'open sans',
                        fontSize:'18px',
                        lineHeight:'1.6',
                        color:one_line['color'],
                        // textAlign:'center',
                        justifyContent:'center',
                        // marginTop:(index>0) ? '20px' : '0px',
                        marginTop:'20px',
                        marginLeft:'5%',
                        marginRight:'5%',
                    }}
                    key={one_line['id']}
                >
                {one_line['text']}
                </div>)}  
        </div>
    )
}
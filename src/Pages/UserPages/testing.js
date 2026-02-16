import {useEffect} from 'react';
import axios from 'axios';

export default function TestingPage(){

    useEffect(()=>{

        const testingFunction = async ()=>{
            const response=await axios.get("http://127.0.0.1:8000/games/test/")
        }

        testingFunction()
    },[])
    return(
        <></>
    )
}
import AxiosInstance from '../../utils/axios'
import '../../App.css';
import Left_Side from '../../Components/left-side'
import {useState, useEffect} from 'react'
import WindowDimensions from '../../utils/window-dimensions'
import HomeScreen from '../Home/home'


export default function Index(){
    const [RightSideKey, setRighSideKey]=useState('home')

    const { Height, Width } = WindowDimensions();

    useEffect(()=>{

    }, [RightSideKey])

    const test =()=>{
        console.log(Height)
    }

    return (
        <>
                
        <Left_Side
        
        setRightSideKey={setRighSideKey}
        RightSideKey={RightSideKey}
        />

        
        {(RightSideKey=='home') ? 
        <HomeScreen/> :
        <></>}
        </>
    )
}
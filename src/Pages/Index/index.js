import AxiosInstance from '../../utils/axios'
import '../../App.css';
import Left_Side from '../../Components/left-side'
import {useState, useEffect} from 'react'
import WindowDimensions from '../../utils/window-dimensions'
import HomeScreen from '../Home/home'
import Merch from '../Merch/merch'
import SpecialMessages from '../Special/special';
import Locations from '../Locations/location';
import NewPlayer from '../new-player/new-player';
import LinkToPoints from '../link-to-points/link-to-points';


export default function Index(){
    const [RightSideKey, setRighSideKey]=useState('locations')
    const [pageTitle, setPageTitle]=useState('MAD Poker | Free Poker Leage')
    const { Height, Width } = WindowDimensions();

    useEffect(()=>{
        if (RightSideKey=='home') {document.title ='MAD Poker | Free Poker Leage'}
        else if (RightSideKey=='shop') {document.title ='MERCH SHOP'}
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
        (RightSideKey=='shop') ?  <Merch/> :
        (RightSideKey=='special') ?  <SpecialMessages/> :
        (RightSideKey=='locations') ? <Locations/> :
        (RightSideKey=='new_player')? <NewPlayer/>:
        (RightSideKey=='points')? <LinkToPoints/>:
        <></>}
        </>
    )
}
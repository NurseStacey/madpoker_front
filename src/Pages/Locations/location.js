import {VenuePics} from '../../data-files/venue-pictures';
import VerticalDeck from '../../Components/VerticalSlideShow/VerticalDeck';
import WindowDimensions from '../../utils/window-dimensions'
import {useEffect, useState} from 'react'

export default function Locations(){
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)

    useEffect(()=>{
        setWidth(width*0.60)
        setLeftMargin(width*.0)
        setHeight(height)
    },[])

    return(
        <div
            style={{
                width:`${Width}px`,
                height:`${Height}px`,          
            }}
            >
                <div
                    style={{
                        marginTop:"300px",
                        marginLeft:"200px",
                        width:"350px",
                        height:"250px",
                        position: "relative",
 
                    }}
                >
                    <VerticalDeck
                        All_Images={VenuePics}
                        WindowWidth={350}
                        WindowHeight={250}/> 
                </div>

        </div>
    )
}
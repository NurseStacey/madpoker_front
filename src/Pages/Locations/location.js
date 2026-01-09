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
                marginLeft:'125px'        
            }}
            >
                <div
                    style={{
                        marginTop:"150px",
                        //marginLeft:"200px",
                        width:"400px",
                        height:"300px",
                        position: "relative",
 
                    }}
                    id="location_slide_show"
                >
                    <VerticalDeck
                        All_Images={VenuePics}/> 
                </div>

        </div>
    )
}
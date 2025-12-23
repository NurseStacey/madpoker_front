import '../../App.css'
import TopMessage from './top-message'
import Award from './award'
import Contact from './contact'
import Merchandise from './merchandise'
import FaceBook from './face-book'
import {Winners} from '../../data-files/images'
import Deck from '../../Components/SlideShow/Deck'
import WindowDimensions from '../../utils/window-dimensions'
import {useEffect, useState} from 'react'


export default function HomeScreen()
{
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
            className='RightSide'
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                marginLeft:`${LeftMargin}px`,
            }}
            >
                <div
                    style={{
                        display:'block',
                        width:'80%',
                                             
                    }}
                    >
                    <div
                        style={{
                            height:'30%',
                        }}
                    >
                        <TopMessage/>
                        <Award/> 
                    </div>    
 
                    <div
                        style={{
                            position: 'relative',
                            width:'100%',
                            height:'70%',
                    }}>
                        <Deck
                            All_Images={Winners}
                            Percent_of_Window={30}/>
                    </div> 
                </div>
                 <div
                    style={{
                        display:'block',
                        width:'35%',
                    }}
                    >
                    <Contact/>
                    <div
                        className='MyLink'
                    >
                        <Merchandise/>
                    </div>
                    <div
                        className='MyLink'
                    >
                        <FaceBook/>
                    </div>
                </div> 
            </div>
    )
}
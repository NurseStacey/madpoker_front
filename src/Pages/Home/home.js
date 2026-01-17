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

    const Test=()=>{
        console.log(Height)
    }
    return(

         <div
            className='RightSide'
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                marginLeft:`${LeftMargin}px`,
            }}
            >
                {/* <button onClick={Test}>test</button> */}
                <div
                    style={{
                        display:'block',
                        width:`${0.8*Width}px`,
                        //border:'1px solid black'                   
                    }}
                    >
                    <div
                        style={{
                            height:`${0.30*Height}px`,   
                            width:`${0.65*Width}px`,              
                        }}
                    >
                        <TopMessage
                            LocalHeight={Math.floor(0.30*Height)}
                            LocalWidth={Math.floor(0.65*Width)}
                            />
                        <Award/> 
                    </div>    
 
                    <div
                        style={{
                            position: 'relative',
                            width:'100%',
                            height:'70%',  
                            marginTop:'100px'                          
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
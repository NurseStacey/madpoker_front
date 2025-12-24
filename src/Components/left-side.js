import MDLogo from '../Pictures/MD_Logo1.jpg'
import {MD_LINKS} from '../data-files/links'
import '@fontsource/averia-sans-libre'
import '../App.css'
import {APPLICATION_COLORS} from '../Components/application-colors'
import WindowDimensions from '../utils/window-dimensions'
import {useEffect, useState} from 'react'

export default function Left_Side({
    setRightSideKey,
    RightSideKey
})
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [TopMargin, setTopMargin]=useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)

    const SetLinkKey = (which) => {
        setRightSideKey(which)
    }

    useEffect(()=>{
        setWidth(width*0.20)
        setHeight(height)
        setTopMargin(height*.05)
        setLeftMargin(width*.15)
    },[])
    
    const Test=()=>{
        console.log(Width)
    }
    return (
        <div
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                marginTop:`${TopMargin}px`,
                marginLeft:`${LeftMargin}px`,
                display:'block',

            }} >
{/* <button onClick={Test}>test</button> */}
            <div
                style={{
                    display:'flex',
                    justifyContent:'flex-start',
                    marginBottom:'50px',
                }}
                >
                    <img src={MDLogo} alt="Mad Logo"  width={250} />
            </div>
            {MD_LINKS.map((one_link)=>
                <div
                    className='MyLink'
                    style={{fontFamily:'Averia Sans Libre',
                        color: (RightSideKey==one_link['id']) ? APPLICATION_COLORS['link-colors']['clicked'] :APPLICATION_COLORS['link-colors']['unclicked']
                    }}
                    key={one_link['id']}
                    onClick={()=>SetLinkKey(one_link['id'])}
                >
                    {one_link['text']}
                </div>
            )}       
        </div>
    )
}
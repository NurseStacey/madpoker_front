import LeftChev from '../ClipArt/left-chevron.png';
import RightChev from '../ClipArt/right-chevron.png';
import './slide-show.css'

export default function OneImage({
    index,
    topPosition,
    height,
    width,
    oneImage,
    CycleForward,
    CycleBackward
})
{

    return(
        <div
            style={{
                
            }}>
            <div
                className='button-box'
            >
                <img src={LeftChev} 
                    onClick={()=>CycleBackward(true)}
                    className='cheveron'
                />
                <img src={RightChev} 
                    onClick={()=>CycleForward(true)}
                    className='cheveron'
                />
            </div>
            <img src={oneImage.image} 
                style={{
                    height:`${height}px`,
                    width:`${width}px`,
                    position:'absolute',
                    top:`${topPosition}px`,
                    transitionDuration:'1.0s',
                    opacity:`oneImage.zIndex`,
                    visibility:`${oneImage.isVisible}`
                }}
                width={`${width}px`}
                height='300px'
                key={index} />
            
            <div
                style={{
                    position:'absolute',
                    bottom:`${10-topPosition}px`,
                    border:'2px solid green',
                    width:`${width}px`,
                    height:'20px',
                    textAlign:'center',
                    color:'white',
                    
                    transitionDuration:'1.4s',                    
                    fontSize:'20px',
                    backgroundColor:'black',
                    opacity:'60%',
                    visibility:`${oneImage.isVisible}`
                }}
                >
                {oneImage.display_text}
            </div>
        </div>
    )
}
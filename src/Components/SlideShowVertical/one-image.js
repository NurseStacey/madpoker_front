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
            <div
                style={{
                    position:'absolute',
                    top:`${topPosition}px`,
                    height:`${height}px`,
                    width:`${width}px`,   
                    visibility:`${oneImage.isVisible}`,
                    transitionDuration:'1.7s',
                    
                }}
            >
                <div
                    style={{
                        position:'relative',
                        height:'100%',
                        width:'100%',
                    }}
                >   
                    <img src={oneImage.image} 
                        width={`${width}px`}
                        height={`${height}px`}
                        key={index} />
                </div>
                <div
                    style={{
                        position:'absolute',
                        bottom:`${10}px`,
                        width:`${width}px`,
                        height:'75px',
                        textAlign:'center',
                        color:'white',                
                        fontSize:'20px',
                        backgroundColor:'black',
                        opacity:'80%',
                    }}
                    >
                    {oneImage.display_text}
                </div>                
            </div>
            
        </div>
    )
}
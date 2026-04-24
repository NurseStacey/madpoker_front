import LeftChev from '../ClipArt/left-chevron.png';
import RightChev from '../ClipArt/right-chevron.png';

export default function Buttons({
    MoveForward,
    MoveBackward
})
{
    return(
        <>
            <div
                style={{
                    position:'absolute',
                    bottom:'50%',   
                    left:'0%',
                    zIndex:'3',            
                }}
                onClick={MoveBackward}
            >
                <img src={LeftChev} width='30px' height='30px'/>
            </div>
            <div
                style={{
                    position:'absolute',
                    bottom:'50%',       
                    right:'0%',
                    zIndex:'3',     
                }}
                onClick={MoveForward}
            >
                <img src={RightChev} width='30px' height='30px'/>
            </div>           
        </>
    )
}
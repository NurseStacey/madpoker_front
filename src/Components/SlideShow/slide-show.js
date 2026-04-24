import {useEffect, useState} from 'react';
import './slide-show.css';
import LeftChev from '../ClipArt/left-chevron.png';
import RightChev from '../ClipArt/right-chevron.png';

export default function SlideShow({
    allImages,
    height,
    width
})
{
    const [currentIndex,setCurrentIndex]=useState(-1);
    const [currentImage, setCurrentImage]=useState('');
    const [localImageArray, setLocalImageArray]=useState([]);

    useEffect(()=>{
        let newArray=[]
        let midPoint=Math.floor((allImages.length)/2) ///3
        if (allImages.length>0) {
            allImages.map((oneImage,index)=>{
                let position=   index-midPoint
                newArray.push({
                    image:oneImage.image,
                    left: position*width,    //-2100,-1400,-700,0,700,1400
                    position:position
                    })
            })
            setCurrentIndex(0);
            setLocalImageArray(newArray);
        }
    },[allImages]);

    useEffect(()=>{
        if (allImages.length>0){

            let thisTimeOut=setTimeout(()=>{
                CycleForward()
            },1000);
        }
    },[currentIndex])


    const CycleForward = () =>{
        let newStart = (currentIndex===(allImages.length-1)?0:currentIndex+1);
    
        let newArray=[];
        let midPoint=Math.floor((allImages.length)/2);

        if (allImages.length>0) {
            
            localImageArray.map((oneImage,index)=>{
                let indexFactor=oneImage.position-newStart
                if (indexFactor<(-midPoint)) indexFactor=(indexFactor+allImages.length)
                newArray.push({
                    image:oneImage.image,
                    left: indexFactor*width,
                    position:oneImage.position
                    })
            })
            setCurrentIndex(newStart);
            setLocalImageArray(newArray);
        }
    }
    return(
            <div 
                style={{
                    display:'flex',
                    position:'relative',
                    width:`${width}px`,
                    border:'1px solid black',
                    overflow:'hidden'
                }}
            >
                    {localImageArray.map((oneImage, idx)=>(
                            <img src={oneImage.image} 
                                style={{
                                    width:`${width}px`,
                                    position:'absolute',
                                    left:`${oneImage.left}px`,
                                    transitionDuration:'.25s'
                                }}
                                width={`${width}px`}
                                key={idx} />
                        ))}                    
            </div>
    )
}
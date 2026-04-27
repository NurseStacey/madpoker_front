import {useEffect, useState} from 'react';
import './slide-show.css';
import OneImage from './one-image';

export default function SlideShow({
    allImages,
    height,
    width
})
{

    const [localImageArray, setLocalImageArray]=useState([]);
    const [theTimer,  setTheTimer]=useState(null);
    const [positions, setPositions]=useState([]);

    useEffect(()=>{
        let newArray=[]
        let positionArray=[]
        let midPoint=Math.floor((allImages.length)/2) ///3
        if (allImages.length>0) {
            allImages.map((oneImage,index)=>{
                let position=   index-midPoint
                positionArray.push(position);
                newArray.push({
                    image:oneImage.image,
                    display_text:oneImage.display_text,
                    isVisible:'visible'
                    })
            })
            setLocalImageArray(newArray);
            setPositions(positionArray);
        }
    },[allImages]);

    useEffect(()=>{
        if (allImages.length>0){

            let thisTimeOut=setTimeout(()=>{
                CycleForward(false)
            },2000);

            setTheTimer(thisTimeOut)
        }

        return ()=>clearTimeout(theTimer)
    },[positions])


    const CycleBackward=(buttonPressed)=>{
        let newPositions=[...positions.slice(1),positions[0],]
        setPositions(newPositions)
        if (buttonPressed) clearTimeout(theTimer);
        let newArray=[];

        if (allImages.length>0) {
            localImageArray.map((oneImage,index)=>{
                let isVisible=(newPositions[index]===0) ? 'visible' : 'hidden';
                newArray.push({
                    image:oneImage.image,
                    display_text:oneImage.display_text,
                    isVisible:isVisible
                    })
            })
            setLocalImageArray(newArray);
        }
    }

    const CycleForward=(buttonPressed)=>{
        if (buttonPressed) clearTimeout(theTimer);
        let newPositions=[positions[positions.length-1],...positions.slice(0,positions.length-1)]
        setPositions(newPositions)  
        let newArray=[];
        if (allImages.length>0) {
            localImageArray.map((oneImage,index)=>{
                let isVisible=(newPositions[index]===0) ? 'visible' : 'hidden';
                newArray.push({
                    image:oneImage.image,
                    display_text:oneImage.display_text,
                    isVisible:isVisible
                    })
            })
            setLocalImageArray(newArray);
        }
    }

    return(
            <div 
                style={{
                    display:'flex',
                    position:'relative',
                    width:`${width}px`,
                    height:`${height}px`,
                    border:'10px solid gray',
                    overflow:'hidden'
                }}
                >
                {localImageArray.map((oneImage, idx)=>(
                    <OneImage
                        topPosition={positions[idx]*height}
                        oneImage={oneImage}
                        index={idx}
                        width={width}
                        height={height}
                        CycleForward={CycleForward}
                        CycleBackward={CycleBackward}
                    />))}

            </div>
    )
}
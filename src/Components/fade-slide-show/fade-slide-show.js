import {useEffect, useState} from 'react';

import ImageDiv from'./image-div';
import OnePair from './one-pair';
import Buttons from './buttons';


export default function FadeSlideShow({
    allImages,
    height,
    width
})
{
    const [allPairs, setAllPairs]=useState([]);
    const [currentPair, setCurrentPair] = useState(0);
    const [isVisible, setIsVisible]=useState(true);
    const [timeOut, setTimeOut] = useState(null)

    useEffect(()=>{
        let newPairs=[]
        allImages.map((oneImage,index)=>{
            
            let bottomIndex = index-1;
            if (bottomIndex===-1) {
                bottomIndex=allImages.length-1

            }
            //console.log(allImages[bottomIndex].image)
            newPairs.push({
                bottomImage:allImages[bottomIndex].image,
                topImage:oneImage.image,
                displayName:oneImage.displayName,
                showThis:(bottomIndex===0)?true:false
            })
            
        })
        setAllPairs(newPairs)
    },[allImages])

    const UpdatePairs = (currentPair, nextCurrentPair) => {
        let newPairs = []       

        allPairs.map((onePair,index)=>{
            if (index===currentPair) newPairs.push({
                bottomImage:onePair.bottomImage,
                topImage:onePair.topImage,
                displayName:onePair.displayName,
                showThis:false                    
            });
             else if (index===nextCurrentPair) newPairs.push({
                bottomImage:onePair.bottomImage,
                topImage:onePair.topImage,
                displayName:onePair.displayName,
                showThis:true       
            });
            else newPairs.push(onePair);

        })        
        setAllPairs(newPairs);
    }
    const MoveForward = ()=>{
        clearTimeout(timeOut)
        let nextCurrentPair=currentPair+1;
        if (nextCurrentPair===allPairs.length) nextCurrentPair=0;

        UpdatePairs(currentPair, nextCurrentPair)
        setCurrentPair(nextCurrentPair)
    }

    const MoveBackward =()=>{
        clearTimeout(timeOut);
        let nextCurrentPair=currentPair-1;
        if (currentPair===0) nextCurrentPair=allPairs.length-1;

        UpdatePairs(currentPair, nextCurrentPair)
        setCurrentPair(nextCurrentPair)
    }


    useEffect(()=>{
        if (allImages.length<2) return

        if (isVisible) {
           let thisTimeOut=setTimeout(()=>{        
                let nextCurrentPair=currentPair+1;
                if (nextCurrentPair===allPairs.length) nextCurrentPair=0;                    
                UpdatePairs(currentPair, nextCurrentPair)   
                setCurrentPair(nextCurrentPair)
                setIsVisible(false)
            },1500)
            setTimeOut(thisTimeOut);
        } else {
            let thisTimeOut=setTimeout(()=>{
                setIsVisible(true)
            },500);
            setTimeOut(thisTimeOut);
        }

        return ()=>clearTimeout(timeOut);
    },[isVisible, currentPair,allImages]) 

    return(
        <div
            style={{
                border:'10px solid gray',
                height:height,
                width:width,
                position:'relative'
            }}>
        
        {allPairs.map((onePair)=>(
             (onePair.showThis) ?     
                <OnePair
                    bottomImage={onePair.bottomImage}
                    topImage={onePair.topImage}
                    displayName={onePair.displayName}
                    isVisible={isVisible}
                    height={height}
                    width={width}
            /> : <></>)
        )}
        <Buttons
            MoveForward={MoveForward}
            MoveBackward={MoveBackward}
        />
        </div>        
    )
}
import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import SelectGame from './select-game';
import OneGameModal from './one-game-modal';

export default function ViewResults()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [LeftMargin, setLeftMargin]=useState(0);
    const [openModal, setOpenModal]=useState(false);
    const [thisGameTitle, setThisGameTitle]=useState("");
    const [thisGameID, setThisGameID]=useState(-1);

    useEffect(()=>{
        setWidth(width*0.60);
        setHeight(height);
        setLeftMargin(width*.0);        
    },[]);

    const Test=()=>{console.log(openModal)}

    return (
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
                    height:'750px',
                    border:'1px solid black',
                    marginLeft:'10%',
                    marginTop:'5%'
                }}
            >
                {(openModal) ?  
                    <>
                        <OneGameModal
                            setOpenModal={setOpenModal}
                            thisGameTitle={thisGameTitle}
                            thisGameID={thisGameID}
                            setThisGameID={setThisGameID}
                        />
                    </>
                    :
                    <>
                        <SelectGame
                            setOpenModal={setOpenModal}
                            setThisGameTitle={setThisGameTitle}
                            setThisGameID={setThisGameID}
                        /> 
                    </>
            
                }
            </div>
            
        </div>        
    )
}
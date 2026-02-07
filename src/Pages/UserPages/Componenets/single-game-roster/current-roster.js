import My_Button from '../../../../Components/Widgets/my-button';
import {useState, useEffect} from 'react';
import ListOfRecords from './list-of-records';
import axios from 'axios';


export default function CurrentRoster({
    whichGameID,
    includeFinalizeButton,
})
{
    const [numberPlayers, setNumberPlayers]=useState(0);
    const [updateRoster,  setUpdateRoster]=useState(false);
    const [ disableFinalizedButton, setDisableFinalizedButton]=useState(true);
    const [disableUpdateButton, setDisableUpdateButton]=useState(false);
    const [buttonVisibility, setButtonVisibility]=useState('visible');

    useEffect(()=>{
        setDisableFinalizedButton(whichGameID===-1 || whichGameID===undefined)
    },[whichGameID])

    const setVisibility = () =>{

        if (buttonVisibility==='visible') setButtonVisibility('hidden')
            else setButtonVisibility('visible')
    }

    const finalizeResults = async()=>{

        try{
            
            const response = (await axios.patch(`http://127.0.0.1:8000/games/played_games_events/${whichGameID}/`,{finalized:true}))
            console.log(response)
            setDisableUpdateButton(true)
            alert('Event results have been finalized.')
        }catch(err){
            if(err.response.status===400) {alert('Error finalizing event')}
        }    
    }

    const Test=()=>{console.log(includeFinalizeButton)}

    const buttonStyle={
            height:'50px',
            width:'150px',
            margin: '0px 10px',
            visibility:buttonVisibility
    }

    return(
        <div
            style={{
                display:'block',
                margin:'25px',
            }}>
           <div
                style={{
                    display:'flex',
                    justifyContent:'center',
                    fontSize:'18px',
                    margin:'5px 0px',
                    height:'35px'
                }}
                >
                {numberPlayers>0 ? `${numberPlayers} Players Registerd` :''  }
            </div>
            <div
                style={{
                    display:'flex',
                    justifyContent:'center',
                    margin:'10px 0px'
                }}
                >
               
                <My_Button
                    button_function={()=>setUpdateRoster(true)}
                    button_text="Update Roster"
                    button_style={buttonStyle}
                    disable={disableUpdateButton}
                />
                <My_Button
                    button_function={setVisibility}
                    button_text="Hide Buttons"
                    button_style={{
                        height:'50px',
                        width:'150px',
                        margin: '0px 10px'}}
                    disable={false}
                />                     
                {(includeFinalizeButton)?
                <My_Button
                    button_function={finalizeResults}
                    button_text="Finalize Results"
                    button_style={buttonStyle}
                    disable={disableFinalizedButton} />:
                    <></>
                }
                              
            </div>
            <ListOfRecords
                setNumberPlayers={setNumberPlayers}
                whichGameID={whichGameID}
                setUpdateRoster={setUpdateRoster}
                updateRoster={updateRoster}
                disableUpdateButton={disableUpdateButton}
                />
            <button onClick={Test}>Test</button>
        </div>
    )
}
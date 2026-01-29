import My_Button from '../../../Components/Widgets/my-button';
import {useState, useEffect} from 'react';
import ListOfRecords from './list-of-records';

export default function CurrentRoster({
    whichGameID
})
{
    const [numberPlayers, setNumberPlayers]=useState(0)
    const [updateRoster,  setUpdateRoster]=useState(false)


    const Test=()=>{console.log()}

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
                    margin:'5px 0px'
                }}
                >
                {numberPlayers>0 ? `${numberPlayers} Players Registerd` :''  }
            </div>
            <div
                style={{
                    display:'flex',
                    justifyContent:'center',
                    margin:'5px 0px'
                }}
                >
                <My_Button
                    button_function={()=>setUpdateRoster(true)}
                    button_text="Update Roster"
                    button_style={{
                        height:'50px',
                        width:'150px'
                    }}
                    disable={false}
                />
            </div>
            <ListOfRecords
                setNumberPlayers={setNumberPlayers}
                whichGameID={whichGameID}
                setUpdateRoster={setUpdateRoster}
                updateRoster={updateRoster}
                />
            <button onClick={Test}>Test</button>
        </div>
    )
}
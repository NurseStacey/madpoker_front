import {useState, useEffect} from'react';
import ListOfRecords from './list-of-records';
import MyButton from '../../../Components/Widgets/my-button';


export default function CurrentRoster({
    tournamentID,
    setUpdateTournamentList
})
{
    const [finalize, setFinalize]=useState(false)
    const [numberPlayers, setNumberPlayers]=useState(0);

    const buttonStyle={
            height:'50px',
            width:'150px',
            margin: '0px 10px',
    }

    return(
        <div
            style={{
                width:'100%',
                margin:'2%, auto',
                border:'1px solid black',
                fontSize:'20px'
            }}>
                <div>
                    {numberPlayers + ' players registered'}
                </div>
                <div
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        margin:'10px 0px'
                    }}
                    >
                
                    <MyButton
                        button_function={()=>setFinalize(true)}
                        button_text="Finalize Roster"
                        button_style={buttonStyle}
                    />
                                
                </div>                
                <ListOfRecords
                    finalize={finalize}
                    setFinalize={setFinalize}
                    setNumberPlayers={setNumberPlayers}
                    tournamentID={tournamentID}
                    setUpdateTournamentList={setUpdateTournamentList}
                />
        </div>
    )
}
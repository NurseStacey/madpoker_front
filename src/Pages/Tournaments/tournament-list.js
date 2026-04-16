import axios from 'axios';
import {useEffect, useState} from  'react';


export default function TournamentList({
    setSelectedTournament
})
{
    const [tournamentList, setTournamentList]=useState([]);
    let oneLine={
        marginTop:'10px',
    }
    useEffect(()=>{

        const getTournaments = async()=>{
            try{
                let response=await axios.get(`http://127.0.0.1:8000/tournaments/info_for_tournament_player_page/`)
                setTournamentList(response.data);
                //console.log(response.data);
            }catch(err){
                console.log(err);
                alert('Error loading tournaments.')
            }            
        }
        getTournaments()
    },[])

    return(
        <>
            <div
                style={{
                    width:'100%',
                    textAlign:'center',
                    margin:'20px 0px',
                    fontSize:'30px',
                    color:'red',
                    fontFamily:'Averia Sans Libre',
                    textDecoration:'underline'
                }}
            >
                Major Tournaments Dates & Qualifications
            </div>
            <div
                style={{
                    width:'100%',
                    textAlign:'left',
                    margin:'20px 0px',
                    fontSize:'22px',
                    color:'blue',
                    fontFamily:'Averia Sans Libre',
                }}
            >
                <div style={{...oneLine, textDecoration:'underline'}}>Qualifications: </div>
                <div style={oneLine}>Quarterly tournaments are open to the top 200 players per quarter. (7/1/25 - 6/30/26) </div>
                <div style={oneLine}>Main Event tournament is open to the top 250* players in the year. (7/1/25 - 6/30/26)</div>
                <div style={oneLine}>*As space allows.  This number may change depending on venue.</div>
            </div>    
            <div
                style={{
                    width:'80%',
                    display:'block',
                    margin:'2% auto',
                    fontSize:'22px',
                }}>
                    {tournamentList.map((oneTournament)=>(
                        <div
                            style={{
                                margin:'10px 0px',
                                cursor:(oneTournament.action==='noresults'?'default':'pointer')
                            }}
                            onClick={()=>setSelectedTournament({
                                    id:oneTournament.id,
                                    dowhat:oneTournament.action,
                                    name:oneTournament.name
                                })}>
                            {oneTournament.display_text}
                        </div>
                    ))}
            </div>                
        </>
       
            

    )
}
import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import '@fontsource/averia-sans-libre';
import axios from 'axios';
//503-812-7242  Ken
export default function Tournaments()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [LeftMargin, setLeftMargin]=useState(0);
    const [tournamentList, setTournamentList]=useState([]);
    
    let oneLine={
        marginTop:'10px',
    }
    useEffect(()=>{

        const getTournaments = async()=>{
            try{
                let response=await axios.get(`http://127.0.0.1:8000/tournaments/tournament/`)
                setTournamentList(response.data)
            }catch(err){
                console.log(err)
            }            
        }

        getTournaments()

        setWidth(width*0.60);
        setHeight(height);
        setLeftMargin(width*.1);        
    },[]);

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
                    marginTop:'15%'
                }}
            >
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
                        fontSize:'18px',
                        color:'blue',
                        fontFamily:'Averia Sans Libre',
                    }}
                >
                    <div style={{...oneLine, textDecoration:'underline'}}>Qualifications: </div>
                    <div style={oneLine}>Quarterly tournaments are open to the top 200 players per quarter. (7/1/25 - 6/30/26) </div>
                    <div style={oneLine}>Main Event tournament is open to the top 250* players in the year. (7/1/25 - 6/30/26)</div>
                    <div style={oneLine}>*As space allows.  This number may change depending on venue.</div>
                </div>
                {tournamentList.map((oneTournament)=>(<div>{oneTournament.name}</div>))}                
            </div>
            
        </div>        
    )
}
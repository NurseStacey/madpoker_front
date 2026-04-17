import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import axios from 'axios';
import TournamentList from './tournament-list';
import SignupModal from './register-modal';
import SeeResults from './see-results';


export default function Tournaments()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [LeftMargin, setLeftMargin]=useState(0);

    const [tournamentClicked, setTournamentClicked]=useState(false);
    const [thisTournamentInfo, setThisTournamentInfo]=useState({
        tournamentName:'',
        tournamentID:-1
    })
    const [signUp, setSignUp]=useState(false)
    const [seeResults, setSeeResults]=useState(false)


    useEffect(()=>{

        setWidth(width*0.60);
        setHeight(height);
        setLeftMargin(width*.1);        
    },[]);

    const setSelectedTournament = (tournamentInfo)=>{
        //console.log(tournamentInfo)
        if (tournamentInfo.dowhat==='results') setSeeResults(true)
        else if (tournamentInfo.dowhat==='signup') setSignUp(true)

        setThisTournamentInfo({
            tournamentName:tournamentInfo.name,
            tournamentID:tournamentInfo.id            
        })
    }

    const CloseModal=()=>{
        setSeeResults(false)
        setSignUp(false)
    }

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
                    //border:'1px solid black',
                    marginTop:'15%'
                }}
            >
                {signUp ? 
                    <>
                        <SignupModal
                            CloseModal={CloseModal}
                            tournamentInfo={thisTournamentInfo}
                            />
                    </> :
                seeResults ? 
                    <>
                        <SeeResults/>
                    </> :
                    <>
                        <TournamentList
                            setSelectedTournament={setSelectedTournament}
                        />
                    </>
                }
           
            </div>
            
        </div>        
    )
}
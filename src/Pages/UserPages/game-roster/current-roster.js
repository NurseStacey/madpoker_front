import My_Button from '../../../Components/Widgets/my-button'
import OnePlayer from './one-player'
import {useState, useEffect} from 'react'
import axios from 'axios';
import Fragment from 'react'

export default function CurrentRoster({
   // which_game,
    whichGameID
})
{
    const [numberPlayers, setNumberPlayers]=useState(0)
    const [direction, setDirection]=useState({
        'name':'forward',
        'position':'forward'
    })
    const [currentDirection, setCurrentDirection]=useState('name')
    const [currentRoster, setCurrentRoster]=useState([])
    const Test=()=>{console.log(currentRoster)}

    const UpdateRoster=async ()=>{

        try{
            const response = await axios.post("http://127.0.0.1:8000/games/update_roster/",{allUsers:currentRoster});
        }catch(err){

            if (err.response.data['result']==='problem') {
                let playerList = '';
                err.response.data['problem_players'].map((onePlayer)=> playerList=playerList + '\n ' +  onePlayer);
                alert(`Issues with updating positions on the following players ${playerList}`);
            } else {alert(`There was an issue with updating the results.  Error code ${err.status}`);}
            
        }        
    }
    const setPosition=(e)=>{
        
        let thisPlayer = currentRoster.find((onePlayer)=>onePlayer.name===e.target.name)
        console.log(e.target.name)
        console.log(e.target.value)
        
        thisPlayer.position =e.target.value
        console.log(thisPlayer)

        let newRoster = [
            ...currentRoster.filter((onePlayer)=>onePlayer.name!==thisPlayer.name),
            thisPlayer
        ]

        setCurrentRoster(newRoster.sort((a,b)=>a.name.localeCompare(b.name)))
    }

    const GetRoster=async()=>{

        if (whichGameID !== undefined && whichGameID!==-1) {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/games/game_roster/${whichGameID}`,); 
                console.log(response.data)   
                setNumberPlayers(response.data.length);
                setCurrentRoster(response.data.sort((a,b)=>a.player_name.localeCompare(b.player_name)));
                }catch(err){
                    alert(`There was an issue with getting the current roster.  Error code ${err.status}`)
                }
            }
    }
    useEffect(()=>{
        GetRoster();
    },[whichGameID])

    const orderPlayers=(which)=>{
        if (currentDirection===which){
            if (direction[which]==='forward'){
                setCurrentRoster(currentRoster.sort((a,b)=>a[which].localeCompare(b[which])))
            } else {
                setCurrentRoster(currentRoster.sort((a,b)=>b[which].localeCompare(a[which])))
            }
            setDirection({
                ...direction,
                ...{which:(currentDirection[which]==='forward')?'backward':'forward'}
            })
        } else {
            setCurrentDirection(which)
            if (direction[which]==='forward'){
                setCurrentRoster(currentRoster.sort((a,b)=>a[which].localeCompare(b[which])))
            } else {
                setCurrentRoster(currentRoster.sort((a,b)=>b[which].localeCompare(a[which])))
            }            
        }

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
                    button_function={UpdateRoster}
                    button_text="Update Roster"
                    button_style={{
                        height:'50px',
                        width:'150px'
                    }}
                    disable={false}
                />
            </div>
            <div
                style={{
                   // display:'block',
                    display:'grid',
                    gridTemplateColumns:'30% 20% 10% 20% 20%',
                    border:'1px solid black',
                    width:"80%",
                    padding:'10px', 
                    margin:"auto"
                    //margin:'3% 20%'
                }}>
                {/* <div
                    style={{
                        display:'flex',
                        justifyContent:'left',
                        font:'arial',
                        fontSize:'18px',
                       // width:'100%',
                    }}> */}
                    <div
                        onClick={()=>orderPlayers('name')}
                        style={{
                           // width:'30%',
                            textAlign:'left',
                            paddingLeft:'15%',
                            cursor:'pointer',
                        }}>
                        Player
                    </div>
                    <div                
                        style={{
                           // width:'25%',
                            textAlign:'left',
                        }}>
                        Registration Time
                    </div>
                     <div
                        onClick={()=>orderPlayers('position')}
                        style={{
                           // width:'5%',
                          //  paddingRight:'5%',
                            textAlign:'left',
                            cursor:'pointer'
                        }}
                    >
                        Position
                    </div> 
                    <div
                        style={{
                          //  width:'10%',
                           // paddingRight:'15%',
                            textAlign:'left',
                            cursor:'pointer'
                        }}>
                        Remove Player
                    </div>
                    <div
                        style={{
                          //  width:'10%',
                          //  paddingRight:'15%',
                            textAlign:'left',
                            cursor:'pointer',
                        }}>
                        Player is Out
                    </div>                    

                {/* </div> */}

                    {currentRoster.map((onePlayer)=>(
                        <Fragment key={onePlayer.id}>
                            <OnePlayer
                                thisPlayer={onePlayer}
                                setPosition={setPosition}
                                GetRoster={GetRoster}
                                />
                        </Fragment>
                    ))} 

            </div>

            <button onClick={Test}>Test</button>
        </div>
    )
}
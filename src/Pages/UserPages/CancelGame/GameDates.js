import axios from 'axios';
import {useEffect, useState} from 'react';

export default function GameDates({
    thisGame,
    whichDates
})
{
    const [currentCanceledGames, setCurrentCanceledGames]=useState([])

    useEffect(()=>{
        GetCurrentCanceledGameList()
    },[thisGame])

    const GetCurrentCanceledGameList = async()=>{
        try {
            const response = await axios.get("http://127.0.0.1:8000/games/canceled_game_list/",);
            console.log(response)
            let tempCurrentCanceldGames = []
            response.data.map((oneCancelation)=>{
                if (oneCancelation.which_game===thisGame.id) {
                    let thisDateArray=oneCancelation.date.split('-')
                    if (thisDateArray[1][0]=='0') thisDateArray[1]=thisDateArray[1][1]
                    if (thisDateArray[2][0]=='0') thisDateArray[2]=thisDateArray[2][1]                    
                    let thisDate=thisDateArray[1] + '/' + thisDateArray[2] + '/' + thisDateArray[0]
                    tempCurrentCanceldGames.push({
                        id:oneCancelation.id,
                        date:thisDate
                    })
                }

                
            })
            setCurrentCanceledGames(tempCurrentCanceldGames)

        }catch(err){
            console.log(err)
            alert('Problem getting canceled games.');
        } 
    }

    const UncancelGame=async(date)=>{
        
        try {
            let thisDateRecord =currentCanceledGames.find((oneRecord)=>oneRecord.date===date);
            console.log(thisDateRecord);
            const response = await axios.delete(`http://127.0.0.1:8000/games/uncancel_game/${thisDateRecord.id}/`,);
            GetCurrentCanceledGameList();
        }catch(err){
            console.log(err);
            alert('Problem uncanceling games.');
        }        
    }

    const CancelGame = async(date)=>{
        let dateList = date.split('/')

        let formData={
            which_game:thisGame.id,
            date:dateList[2]+'-'+dateList[0]+'-'+dateList[1]
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/games/canceled_game_list/",formData);
            GetCurrentCanceledGameList();
        }catch(err){
            alert('Problem canceling games.');
        }        
    }
    const ChangeStatus = (date)=>{
        if (CurrentlyCanceled(date)) UncancelGame(date)
            else CancelGame(date)

        
    }

    const CurrentlyCanceled = (date)=>{
        return(currentCanceledGames.map((oneCancelation)=>oneCancelation.date).includes(date))
    }

    const Test=()=>{
        whichDates.map((oneDate)=>{
            if (currentCanceledGames.includes(oneDate)) console.log(oneDate)
        })
        console.log(whichDates)
        console.log(currentCanceledGames)}

    return(
        <div>
            <div
                style={{
                    margin:'1%',
                    fontSize:'20px'
                }}>
                Canceling/Uncanceling games for {thisGame.game_text}
            </div>
            <div
                style={{
                    width:'15%',
                    margin:'auto'
                }}>
                {whichDates.map((oneDate)=>(
                    <div
                        key={oneDate}
                        style={{
                            display:'flex',
                            justifyContent:'space-around',
                            margin:'1%',
                            fontSize:'18px'
                        }}                    
                    >
                        <div
                            style={{
                                display:'flex',
                                justifyContent:'flex-start',
                                textDecoration: CurrentlyCanceled(oneDate)?'line-through':'none',                               
                                width:'50%'}}
                        >
                            {oneDate}
                        </div>
                        <div
                            onClick={()=>ChangeStatus(oneDate)}
                            style={{
                                display:'flex',
                                justifyContent:'flex-end',
                                width:'50%',
                                border:'1px solid black',
                                backgroundColor:'limegreen'
                            }}
                            >
                            {(CurrentlyCanceled(oneDate))?<>Uncancel</>:<>Cancel</>}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={Test}>test</button>
        </div>
    )
}
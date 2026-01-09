import axios from 'axios'
import {useState, useEffect} from 'react'
import CurrentGamesButton from './current-games-buttons'

export default function CurrentGames({
        fetchData,
        formData,
        allGames,
        selectedGame,
        setSelectedGame
})
{

    const [buttonText, setButtonText]=useState("Deactivate")    

    const ChangeActive=()=>{}
    const Delete=()=>{}
    const Update=()=>{}

    const getGame = () =>{
        return allGames.find((oneGame)=>oneGame.id===selectedGame)
    }    
    const GameSelected=(id)=>{
        if (selectedGame===null) {
            setSelectedGame(id)
            return
        }
        if (getGame().active) setSelectedGame(null)
            else setSelectedGame(id)        
    }

    const Test=()=>{
        console.log(allGames)
    }
    return(
        <div
            style={{
                display:"block",
                width:"40%",
                margin:"5%",
                border:'1px solid black',
                padding:'40px'
            }}>
                <CurrentGamesButton
                    selectedGame={selectedGame}
                    setSelectedGame={setSelectedGame}
                    ChangeActive={ChangeActive}
                    Delete={Delete}
                    Update={Update}
                    buttonText={buttonText}
                />
                {allGames.map((oneGame)=>(
                    <div
                        onClick={GameSelected}
                        key={oneGame.id}
                        style={{
                            margin:"5px",
                            backgroundColor:(oneGame.id===selectedGame) ? "pink" :"white",
                        }}
                        >{(oneGame.active) ?oneGame.Text : oneGame.Text + ' - inactive'}</div>
                ))}
                <button onClick={Test}>test</button>
        </div>
    )
}
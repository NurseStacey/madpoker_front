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

    const ChangeActive=async()=>{

        try{

            console.log(formData)
            let updatedData={
                ...formData,
                ...{active:!formData.active}
            }
            console.log(updatedData)
            const response = await axios.patch(`http://127.0.0.1:8000/games/onegame/${selectedGame}/`,updatedData);
            
            fetchData()
            setSelectedGame(null)

        }catch(err){
            alert('Problem changing status of games.');
        }
    }

    const Delete=async()=>{

        try{
            const response = await axios.delete(`http://127.0.0.1:8000/games/onegame/${selectedGame}/`,);
            
            fetchData()
            setSelectedGame(null)

        }catch(err){
            alert('Problem deleting games.');
        }             
    }
    const Update=async()=>{
        try{
            
            let updatedData={
                ...formData,
                ...{active:true}
            }
            console.log(formData)
            const response = await axios.patch(`http://127.0.0.1:8000/games/onegame/${selectedGame}/`,updatedData);
            
            fetchData()
            setSelectedGame(null)

        }catch(err){
            alert('Problem updating games.');
        }            
    }

    const getGame = (id) =>{

        return allGames.find((oneGame)=>oneGame.id===id)
    }    

    const GameSelected=(id)=>{
        let thisGame=getGame(id)     

        if (selectedGame===null) {
            setSelectedGame(id)
            
            if (thisGame.active) setButtonText("Deactivate")
                else setButtonText("Activate")            
            return
        }

        if (selectedGame===id) {
            setSelectedGame(null)
            return
        }
        setSelectedGame(id)        
    }

    const Test=()=>{
        console.log(allGames)
    }
    return(
        <div
            style={{
                display:"block",
                width:"40%",
                margin:"2% 5%",
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
                        onClick={()=>GameSelected(oneGame.id)}
                        key={oneGame.id}
                        style={{
                            margin:"10px 5px",
                            textAlign:"left",
                            fontSize:"18px",
                            backgroundColor:(oneGame.id===selectedGame) ? "pink" :"white",
                        }}
                        >{(oneGame.active) ? oneGame.Text : oneGame.Text + ' - inactive'}</div>
                ))}
            <button onClick={Test}>test</button> 
        </div>
    )
}
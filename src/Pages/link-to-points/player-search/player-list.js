import {useEffect, useState} from 'react'
import axios from 'axios'

export default function PlayerList({
    dropDownClicked,
    setDropDownClicked,
    searchBarInput,
    setSelectedPlayer,
})
{
    const [allPlayers, setAllPlayers]=useState([])
    const [thesePlayers, setThesePlayers]=useState([])

    const playerClicked=(id)=>{
        setSelectedPlayer(allPlayers.find((onePlayer)=>onePlayer.id===id))
        setDropDownClicked(false)
    }

    useEffect(()=>{
        if (searchBarInput==="Search player") setThesePlayers(allPlayers);

        let newPlayerList = allPlayers.filter((onePlayer)=>onePlayer.player.toUpperCase().includes(searchBarInput.toUpperCase()));
        setThesePlayers(newPlayerList);

    },[searchBarInput])
    useEffect(()=>{
        const LoadPlayers = async ()=>
            {
                try{
                    const response = await axios.get("http://127.0.0.1:8000/players/players/",);
                    console.log(response.data)
                    setAllPlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))
                    setThesePlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))
                }catch(err){
                    console.log(err);
                } 
        }
        LoadPlayers()
    },[])
    
    return(
        <div
            style={{
                    display:(dropDownClicked) ? 'block' : 'none',
                    marginLeft:'20%',
                    width:'75%',
                    height:'250px',
                    backgroundColor:'white',
                    border:'1px solid black',
                    zIndex:'5',
                    overflowY:'scroll'
            }}
        >
            {thesePlayers.map((onePlayer)=>(
                <div
                    key={onePlayer.id}
                    onClick={()=>playerClicked(onePlayer.id)}
                    style={{
                        textAlign:'left',
                        paddingLeft:'5px',
                    }}
                >
                    {onePlayer.player}
                </div>
            ))}
        </div>
    )
}
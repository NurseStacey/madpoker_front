import GameListBox from './game-list-box'
import SearchBox from './search-box';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function SelectGame({
    setOpenModal,
    setThisGameTitle,
    setThisGameID
})
{
    const [filteredPlayedGameList,setFilteredPlayedGameList]=useState([]);    
    const [playedGameList,setPlayedGameList]=useState([]);
    const [selectedSeason, setSelectedSeason]=useState({
        id:-1,
        season:""
    });    
    const [selectedVenue, setSelectedVenue]=useState({
        id:-1,
        venue_name:""
    });  


    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const url=`http://127.0.0.1:8000/games/played_game_list/${selectedSeason.id}/${selectedVenue.id}/`
                const response = await axios.get(url)
                setPlayedGameList(response.data.these_played_games_list)
                setFilteredPlayedGameList(response.data.these_played_games_list)                
            }catch(err){
                console.log(err)
            }  
        }

        fetchData()
    },[])
    

    const FilterGames = ()=>{
        console.log(selectedSeason)
        console.log(selectedVenue)
        let newFilteredPlayedGameList=[]
        playedGameList.map((onePlayedGame)=>{
            if((onePlayedGame.season===selectedSeason.season || selectedSeason.id===-1) && (onePlayedGame.venue===selectedVenue.venue_name || selectedVenue.id===-1)) newFilteredPlayedGameList.push(onePlayedGame)
        })
        setFilteredPlayedGameList(newFilteredPlayedGameList)
    }

    return (
        <div
            style={{
                    height:'100%'
            }}>
            <div
                style={{
                    font:'arial',
                    fontSize:'30px',
                    fontWeight:'bold',
                    margin:'2%'
                }}>
                View Game Results
            </div>
            <SearchBox
                FilterGames={FilterGames}
                selectedSeason={selectedSeason}
                setSelectedSeason={setSelectedSeason}
                selectedVenue={selectedVenue}
                setSelectedVenue={setSelectedVenue}
            />
            <GameListBox
                filteredPlayedGameList={filteredPlayedGameList}
                setOpenModal={setOpenModal}
                setThisGameTitle={setThisGameTitle}
                setThisGameID={setThisGameID}
            />
            {/* <button onClick={Test}>test</button> */}

        </div>    
    )
}
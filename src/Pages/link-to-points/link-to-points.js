import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import axios from 'axios';
import SearchBox from './search-box';
import ResultsBox from './results';

export default function LinkToPoints()
{

    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)

    const[allResults, setAllResults]=useState({
        individual_game_results:[],
        season_stats:[]
    })

    const [selectedPlayer, setSelectedPlayer]=useState({
        id:-1,
        player:""
    });
    const [selectedSeason, setSelectedSeason]=useState({
        id:-1,
        season:""
    });    
    const [selectedVenue, setSelectedVenue]=useState({
        id:-1,
        venue_name:""
    });   

    const PullData = async() =>{
        if(selectedPlayer.id===-1){
            alert("Must Select A  Player")
            return
        }

        try{

            const response = await axios.get(`http://127.0.0.1:8000/gameresults/pull_data_for_points/${selectedPlayer.id}/${selectedSeason.id}/${selectedVenue.id}/`)
            if (response.status===404 || response.status===400) {
                alert('Difficulty getting player information')
                return
            }
            setAllResults(response.data)
        }catch(err){
            console.log('error here')
            if (err.status===404) {
                alert("Problem getting player data.")
            } else if (err.staus===400) {
                alert("Problem summarizing player data.")
            }
            console.log(err)}
    }

    useEffect(()=>{
        setWidth(width*0.60);
        setLeftMargin(width*.0);
        setHeight(height);
    },[])

    return(
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
                    marginTop:"10%",
                    width:'80%',
                    marginLeft:'10%',
                }}
                >
                <div
                    style={{
                        font:'arial',
                        fontSize:'30px',
                        fontWeight:'bold',
                        margin:'2%',
                    }}>
                    View Players Points
                </div>
                <SearchBox
                    setSelectedPlayer={setSelectedPlayer}
                    setSelectedSeason={setSelectedSeason}
                    setSelectedVenue={setSelectedVenue}
                    PullData={PullData}
                    selectedPlayer={selectedPlayer}
                    selectedSeason={selectedSeason}
                    selectedVenue={selectedVenue}
                />
                <ResultsBox
                    allResults={allResults}
                />
                </div>
        </div>
    )
}
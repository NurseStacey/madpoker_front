import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import axios from 'axios';
import DropDown from '../../Components/Widgets/drop-down/drop-down'
import PlayerSearch from './player-search/player-search'
import MyMultiListBox from '../../Components/Widgets/my-multilistbox'

export default function LinkToPoints()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)
    const [allSeasons,  setAllSeasons]=useState([])
    const[allVenues, setAllVenues]=useState([])

    const[playersGamesToShow, setPlayersGamesToShow]=useState([])
    const[playersGames, setPlayersGames]=useState([])
    const[playersVenues, setPlayersVenues]=useState([])
    const[playersSeasons, setPlayersSeasons]=useState([])

    const [selectedSeasonsArray, setSelectedSeasosnArray]=useState([])
    const [selectedVenuesArray, setSelectedVenuesArray]=useState([])    
    // const[selectedSeason, setSelectedSeason]=useState({
    //     season:"-- All Sesaons --",
    //     id:-1
    // });
    // const[selectedVenue, setSelectedVenue]=useState({
    //     venue_name:"-- All Venues --",
    //     id:-1
    // });
    const [selectedPlayer, setSelectedPlayer]=useState({
        id:-1,
        player:""
    });

    // const getDataToSend=()=>{
    //     let dataToSend = {
    //         playerID:selectedPlayer.id,
    //         venueID:selectedVenue.id,
    //         seasonID:selectedSeason.id
    //     }
    //     return dataToSend
    // }

    const pullGames  = async()=>{
        if(selectedPlayer.id===-1) return
       // console.log(getDataToSend())
        let response = await axios.get(`http://127.0.0.1:8000/games/get_this_player_results/${selectedPlayer.id}`,);
        setPlayersGames(response.data['all_results'])
        setPlayersGamesToShow(response.data['all_results'])
        setPlayersVenues(response.data['the_venues'])
        setPlayersSeasons(response.data['the_seasons'])
        console.log(response.data)
    }  

    useEffect(()=>{
        pullGames()
        setSelectedSeasosnArray([])
        setSelectedVenuesArray([])
    },[selectedPlayer])
    //},[selectedSeason,selectedVenue,selectedPlayer])

    useEffect(()=>{
        setWidth(width*0.60);
        setLeftMargin(width*.0);
        setHeight(height);

        const fetchData = async() =>{
            try {
                let response = await axios.get("http://127.0.0.1:8000/seasons/seasons/",);
                setAllSeasons(response.data)

                response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
                setAllVenues(response.data)
               
            } catch(err){
                
            }
        }

        fetchData()

    },[])

    // const findSelectedVenue=(venueName)=>{
    //     try{
    //         setSelectedVenue(allVenues.find((oneVenue)=>oneVenue.venue_name===venueName))
    //     }catch{
    //         setSelectedVenue({
    //             venue_name:"-- All Venues --",
    //             id:-1
    //         })
    //     }
    // }

    // const findSelectedSeason=(season)=>{
    //     setSelectedSeason(allSeasons.find((oneSeason)=>oneSeason.season===season))
    // }

    const Test=()=>{
        console.log("here")
        console.log(playersGamesToShow)
    }

    const venueSelected=(venueName, chooseOrNot)=>{
        let newSelectedVenuesArray=[]
        if (chooseOrNot){
            newSelectedVenuesArray = [...selectedVenuesArray.map((oneVenue)=>oneVenue),allVenues.find((oneVenue)=>oneVenue.venue_name===venueName)]
        } else{
            newSelectedVenuesArray = selectedVenuesArray.filter((oneVenue=>oneVenue.venue_name!==venueName))            
        }
        setSelectedVenuesArray(newSelectedVenuesArray)
        let resultsToShow=[]
        playersGames.map((oneResult)=>{
            if (newSelectedVenuesArray.map((oneVenue)=>oneVenue.venue_name).includes(oneResult.venue )) 
                resultsToShow.push(oneResult)})
            
        setPlayersGamesToShow(resultsToShow)
    }

    const seasonSelected=(seasonName, chooseOrNot)=>{
        let newSelectedSeasonsArray=[]
        if (chooseOrNot){
            newSelectedSeasonsArray = [...selectedSeasonsArray.map((oneSeason)=>oneSeason),allSeasons.find((oneSeason)=>oneSeason.season===seasonName)]
        } else{
            newSelectedSeasonsArray = selectedSeasonsArray.filter((oneSeason=>oneSeason.season!==seasonName))            
        }
        setSelectedSeasosnArray(newSelectedSeasonsArray)
        let resultsToShow=[]
        playersGames.map((oneResult)=>{
            if (newSelectedSeasonsArray.map((oneSeason)=>oneSeason.season).includes(oneResult.season )) 
                resultsToShow.push(oneResult)})
            
        setPlayersGamesToShow(resultsToShow)
    }

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
                    border:'1px solid black'
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
                <div
                    style={{
                        backgroundColor:'#d7d7ce',
                        //width:`${0.3*Width}px`,
                        width:'100%',
                        height:'205px',
                        margin:'auto',
                        display:'flex',
                        justifyContent:'space-between',
                        border:'1px solid black',
                        position:'relative'
                    }}>

                    <PlayerSearch
                        //width={0.3*Width}
                        selectedPlayer={selectedPlayer}
                        setSelectedPlayer={setSelectedPlayer}        
                    />     
                    <MyMultiListBox
                        theList={playersVenues.sort((a,b)=>a.localeCompare(b))}
                        title="Venues Played At"
                        titleColor="blue"
                        direction="vertical"
                        ListBoxStyle={{
                            marginLeft:"5%",
                            width:"25%",
                            height:"200px"
                        }}
                        selectedItems={selectedVenuesArray.map((oneVenue)=>oneVenue.venue_name)}
                        setSelection={venueSelected}
                    />  
                    <MyMultiListBox
                        theList={playersSeasons.sort((a,b)=>a.localeCompare(b))}
                        title="Seasons Played At"
                        titleColor="blue"
                        direction="vertical"
                        ListBoxStyle={{
                            marginRight:"5%",
                            width:"25%",
                            height:"200px"
                        }}
                        selectedItems={selectedSeasonsArray.map((oneSeason)=>oneSeason.season)}
                        setSelection={seasonSelected}
                    />                                                              
   {/*                 <DropDown
                        selectedItem={selectedSeason.season}
                        width={0.3*Width}
                        allItems={["-- All Sesaons --",...allSeasons.map((oneSeason)=>oneSeason.season)]}
                        setSelectedItem={findSelectedSeason}
                        title="SEASON"
                        top={80}
                        DropDownStyle={{
                            zIndex:2
                        }}                        
                    />
                    <DropDown
                        selectedItem={selectedVenue.venue_name}
                        width={0.3*Width}
                        allItems={["-- All Venues --",...allVenues.map((oneVenue)=>oneVenue.venue_name)]}
                        setSelectedItem={findSelectedVenue}
                        title="VENUE"
                        top={140}
                        DropDownStyle={{
                            zIndex:1
                        }}
                    />       */}

                </div>


 
                <button onClick={Test}>test</button>
                
            </div>
        
        </div>
    )
}

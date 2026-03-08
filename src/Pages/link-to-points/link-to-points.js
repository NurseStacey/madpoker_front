import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import axios from 'axios';
import MyListBoxSearch from '../../Components/Widgets/my-listbox-search/my-listbox-search';
import MyButton from '../../Components/Widgets/my-button';
import {APPLICATION_COLORS} from '../../Components/application-colors';


export default function LinkToPoints()
{
    const [allPlayers, setAllPlayers]=useState([])    
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)
    const [allSeasons,  setAllSeasons]=useState([])
    const [allVenues, setAllVenues]=useState([])

    const[playersGamesToShow, setPlayersGamesToShow]=useState([])
    const[playersGames, setPlayersGames]=useState([])
    const[playersVenues, setPlayersVenues]=useState([])
    const[playersSeasons, setPlayersSeasons]=useState([])

    const [selectedSeasonsArray, setSelectedSeasosnArray]=useState([])
    const [selectedVenuesArray, setSelectedVenuesArray]=useState([])    

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

        console.log(selectedSeason.id)
        try{
            const url=`http://127.0.0.1:8000/consolidated_data/pull_data_for_points/${selectedPlayer.id}/${selectedSeason.id}/${selectedVenue.id}/`
            console.log(url)
            const response = await axios.get(url)
            console.log(response.data)
        }catch(err){
            console.log('error here')
            if (err.status===404) {
                alert("Problem getting player data.")
            } else if (err.staus===400) {
                alert("Problem summarizing player data.")
            }
            console.log(err)}
    }

    const PlayerChosenFromBox = (thisPlayer)=>{
        //console.log(thisPlayer)
        if (thisPlayer===""){
            setSelectedPlayer({
                id:-1,
                player:""
            });
        } else {
        let thisPlayerObj=allPlayers.find((onePlayer)=>onePlayer.player===thisPlayer)
        setSelectedPlayer(thisPlayerObj)
        }
    }

    const SeasonChosenFromBox =(thisSeason)=>{
        if (thisSeason===""){
            setSelectedSeason({
                id:-1,
                season:""
            });
        } else {
        let thisSeasonObj=allSeasons.find((oneSeason)=>oneSeason.season===thisSeason)
        setSelectedSeason(thisSeasonObj)
        }
    }

    const VenueChosenFromBox =(thisVenue)=>{
        if (thisVenue===""){
            setSelectedVenue({
                id:-1,
                venue_name:""
            });
        } else {
        let thisVenueObj=allVenues.find((oneVenue)=>oneVenue.venue_name===thisVenue)
        setSelectedVenue(thisVenueObj)
        }
    }    
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

    },[])

    // useEffect(()=>{


    //     pullGames()
    //     setSelectedSeasosnArray([])
    //     setSelectedVenuesArray([])
    // },[selectedPlayer])
    
    //},[selectedSeason,selectedVenue,selectedPlayer])

    useEffect(()=>{
        setWidth(width*0.60);
        setLeftMargin(width*.0);
        setHeight(height);

        const fetchData = async() =>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/players/players/",);
                
                setAllPlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))
                //setThesePlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))
            }catch(err){
                console.log(err);
            }             
            try {
                let response = await axios.get("http://127.0.0.1:8000/seasons/seasons/",);
                setAllSeasons(response.data)

                response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
                setAllVenues(response.data)
                console.log(response.data)
               
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
                    //border:'1px solid black',
                    
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
                        backgroundColor:APPLICATION_COLORS['player-interface']['background'],
                        width:'100%',
                        height:'150px',
                        margin:'auto',
                        display:'block',
                        border:'1px solid black',
                        color:APPLICATION_COLORS['player-interface']['font_color'], 
                        
                    }}>
                    <div
                        style={{
                            marginTop:'15px'
                        }}
                    >
                        <MyButton
                            button_function={PullData}
                            button_text={"Get Patient Summary"}
                            button_style={{
                                height:"50px",
                                width:"100px",
                                margin:"auto",
                                color:APPLICATION_COLORS['player-interface']['button_font_color'],
                                backgroundColor:APPLICATION_COLORS['player-interface']['button_background'],
                            }}
                            disable={false}
                        />
                    </div>                        
                    <div
                        style={{
                            display:'flex',
                            justifyContent:'center',
                            position:'relative'
                        }}
                    >
                        <MyListBoxSearch
                            selection={selectedPlayer.player}
                            setSelection={PlayerChosenFromBox}
                            title={"Player"}
                            theList={allPlayers.map((onePlayer)=>onePlayer.player)}
                            MyListBoxSearchStyle={{
                                padding:"0px 25px",
                                width:'25%',
                                left:"20%",
                                translate:'-50%'
                            }}
                        />   
                        <MyListBoxSearch
                            selection={selectedSeason.season}
                            setSelection={SeasonChosenFromBox}
                            title={"Season"}
                            theList={allSeasons.map((oneSeason)=>oneSeason.season)}
                            MyListBoxSearchStyle={{
                                padding:"0px 25px",
                                width:'25%',
                                left:"50%",
                                translate:'-50%'
                            }}
                        /> 
                    
                        <MyListBoxSearch
                            selection={selectedVenue.venue_name}
                            setSelection={VenueChosenFromBox}
                            title={"Venue"}
                            theList={allVenues.map((oneVenue)=>oneVenue.venue_name)}
                            MyListBoxSearchStyle={{
                                padding:"0px 25px",
                                width:'25%',
                                left:"80%",
                                translate:'-50%'
                            }}
                        />                   
            
                    </div>

                    <div
                        style={{
                            marginTop:'125px',
                            height:'500px',
                            backgroundColor:APPLICATION_COLORS['player-interface']['background_two'],
                            overflowY:'scroll'
                        }}
                    >

                    </div>  
                </div>


 
                {/* <button onClick={Test}>test</button> */}
                
            </div>
        
        </div>
    )
}

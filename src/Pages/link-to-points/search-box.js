import {useEffect, useState} from 'react';
import axios from 'axios';
import MyListBoxSearch from '../../Components/Widgets/my-listbox-search/my-listbox-search';
import MyButton from '../../Components/Widgets/my-button';
import {APPLICATION_COLORS} from '../../Components/application-colors';

export default function SearchBox({
    setSelectedPlayer,
    setSelectedSeason,
    setSelectedVenue,
    PullData,
    selectedPlayer,
    selectedSeason,
    selectedVenue
})
{
    const [allPlayers, setAllPlayers]=useState([]);
    const [allSeasons,  setAllSeasons]=useState([]);
    const [allVenues, setAllVenues]=useState([]);   

    useEffect(()=>{

        const fetchData = async() =>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/players/players/",);               
                setAllPlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))
            }catch(err){
                console.log(err);
            }             
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

    return(
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
                    button_text={"Get Player Summary"}
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
        </div>  
    )
}
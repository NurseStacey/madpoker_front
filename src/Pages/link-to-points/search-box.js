import {useEffect, useState} from 'react';
import axios from 'axios';
import MyListBoxSearch from '../../Components/Widgets/my-listbox-search/my-listbox-search';
import MyButton from '../../Components/Widgets/my-button';
import {APPLICATION_COLORS} from '../../Components/Constants/application-colors';
import {DjangoAddress} from '../../data-files/django-addres';

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
                let url= DjangoAddress + `/players/players/`;
                const response = await axios.get(url,);        
                setAllPlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))
            }catch(err){
                console.log(err);
                alert('Problem loading players')
                return                
            }             
            try {
                let url= DjangoAddress + `/seasons/seasons/`;
                const response = await axios.get(url,);                     
      
                setAllSeasons(response.data)
                }catch(err){
                        alert('Problem loading seasons information')
                        return                
                }
            try{ 
                let url= DjangoAddress + `/venues/venues/`;
                const response = await axios.get(url,);                     

                setAllVenues(response.data)
               
            } catch(err){
                    alert('Problem loading venus')
                    return
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
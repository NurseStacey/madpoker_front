import {useEffect, useState} from 'react';
import axios from 'axios';
import MyListBoxSearch from '../../Components/Widgets/my-listbox-search/my-listbox-search';
import MyButton from '../../Components/Widgets/my-button';
import {APPLICATION_COLORS} from '../../Components/Constants/application-colors';

export default function SearchBox({
    setSelectedSeason,
    setSelectedVenue,
    FilterGames,
    selectedSeason,
    selectedVenue,
})
{
    const [allSeasons,  setAllSeasons]=useState([]);
    const [allVenues, setAllVenues]=useState([]);       

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


    useEffect(()=>{

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

    return(
        <div
            style={{
                backgroundColor:APPLICATION_COLORS['player-interface']['background'],
                width:'100%',
                height:'20%',
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
                    button_function={FilterGames}
                    button_text={"Filter Games"}
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
                    selection={selectedSeason.season}
                    setSelection={SeasonChosenFromBox}
                    title={"Season"}
                    theList={allSeasons.map((oneSeason)=>oneSeason.season)}
                    MyListBoxSearchStyle={{
                        padding:"0px 25px",
                        width:'25%',
                        left:"30%",
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
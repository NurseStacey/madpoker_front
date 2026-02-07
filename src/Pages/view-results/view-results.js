import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import axios from 'axios';
import DropDown from '../../Components/Widgets/drop-down/drop-down'

export default function ViewResults()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [allSeasons,  setAllSeasons]=useState([])
    const[allVenues, setAllVenues]=useState([])

    const[selectedSeason, setSelectedSeason]=useState('')
    const[selectedVenue, setSelectedVenue]=useState('')
    const[allData, setAllData]=useState([])

    useEffect(()=>{
        setWidth(width*0.60);
        setHeight(height);

        const fetchData = async() =>{
            try {
                let response = await axios.get("http://127.0.0.1:8000/seasons/seasons/",);
                setAllSeasons(response.data)
                setSelectedSeason(response.data[0].season)

                response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
                setAllVenues(response.data)
                setSelectedVenue("-- All Venues --")
                
                response = await axios.get("http://127.0.0.1:8000/games/get_all_infor_for_game_view/",);
                console.log(response.data)
            } catch(err){
                
            }
        }
        
        fetchData()
    },[])

    return (
         <div
            className='RightSide'
            style={{
                width:`${Width}px`,
                height:`${Height}px`,                
            }}
        >
            <div
                style={{
                    marginTop:"25%",
                    width:'60%',
                    marginLeft:'10%',
                    // border:'1px solid black'
                }}
                >
                <div
                    style={{
                        font:'arial',
                        fontSize:'30px',
                        fontWeight:'bold',
                        margin:'2%',
                    }}>
                    View Game Results
                </div>                    
                <div
                    style={{
                        backgroundColor:'#d7d7ce',
                        width:`${0.35*Width}px`,
                        height:'225px',
                        margin:'auto',
                        display:'block',
                        border:'1px solid black',
                        position:'relative'
                    }}>
                    <DropDown
                        selectedItem={selectedSeason}
                        width={0.3*Width}
                        allItems={['-- All Seasons -- ', ...allSeasons.map((oneSeason)=>oneSeason.season)]}
                        setSelectedItem={setSelectedSeason}
                        title="SEASON"
                        top={0}
                        DropDownStyle={{
                            zIndex:6,
                        }}                        
                    />   
                    <DropDown
                        selectedItem={selectedVenue}
                        width={0.3*Width}
                        allItems={["-- All Venues --",...allVenues.map((oneVenue)=>oneVenue.venue_name)]}
                        setSelectedItem={setSelectedVenue}
                        title="VENUE"
                        top={60}
                        DropDownStyle={{
                            zIndex:5
                        }}
                    />                                  
                </div>           
            </div>            
            
        </div>        
    )
}
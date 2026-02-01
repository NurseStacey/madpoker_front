import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import axios from 'axios';
import DropDown from '../../Components/Widgets/drop-down/drop-down'
import PlayerSearch from './player-search/player-search'


export default function LinkToPoints()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)
    const [allSeasons,  setAllSeasons]=useState([])
    const[allVenues, setAllVenues]=useState([])

    const[selectedSeason, setSelectedSeason]=useState('')
    const[selectedVenue, setSelectedVenue]=useState('')

    useEffect(()=>{
        setWidth(width*0.60);
        setLeftMargin(width*.0);
        setHeight(height);

        const fetchData = async() =>{
            try {
                let response = await axios.get("http://127.0.0.1:8000/games/seasons/",);
                setAllSeasons(response.data)
                setSelectedSeason(response.data[0].season)

                response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
                setAllVenues(response.data)
                setSelectedVenue("-- All Venues --")                
            } catch(err){
                
            }
        }

        fetchData()

    },[])

    const Test=()=>{console.log(allSeasons)}

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
                    Link to points
                </div>
                <div
                    style={{
                        backgroundColor:'#d7d7ce',
                        width:`${0.3*Width}px`,
                        height:'225px',
                        margin:'auto',
                        display:'block',
                        border:'1px solid black',
                        position:'relative'
                    }}>
                    <DropDown
                        selectedItem={selectedSeason}
                        width={0.3*Width}
                        allItems={allSeasons.map((oneSeason)=>oneSeason.season)}
                        setSelectedItem={setSelectedSeason}
                        title="SEASON"
                        top={0}
                    />
                    <DropDown
                        selectedItem={selectedVenue}
                        width={0.3*Width}
                        allItems={["-- All Venues --",...allVenues.map((oneVenue)=>oneVenue.venue_name)]}
                        setSelectedItem={setSelectedVenue}
                        title="VENUE"
                        top={60}
                    />       

                    <PlayerSearch
                        width={0.3*Width}
                        top={120}                    
                    />
                </div>
                <button onClick={Test}>test</button>
                
            </div>
        
        </div>
    )
}

  {/* <select name='season'
                                size='1'
                                style={{
                                // width:'400px',
                                // padding:'10px',
                                height:'20px',
                                overflowY:'scroll',
                                //display:'none'
                            }}>
                            {allSeasons.map((oneSeason)=>(
                                <option
                                    key={oneSeason.season}
                                    value={oneSeason.season}

                                >

                                    {oneSeason.season}

                                    
                                </option>
                            ))}
                        </select> */}
                    
                    {/* <MyListBox
                        theList={allSeasons}
                        title="SEASON"
                        titleColor="#70727b"
                        direction="horizontal"
                    /> */}
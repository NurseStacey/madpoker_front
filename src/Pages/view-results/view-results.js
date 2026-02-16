import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import axios from 'axios';
import SelectionBox from './selection-box';

export default function ViewResults()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);



    const[allData, setAllData]=useState([])

    useEffect(()=>{
        setWidth(width*0.60);
        setHeight(height);
    },[]);

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
                <SelectionBox
                    Width={Width}
                />               
                {/* <div
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
                </div>            */}
            </div>            
            
        </div>        
    )
}
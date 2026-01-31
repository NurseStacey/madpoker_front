import {useState, useEffect} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import axios from 'axios';
import MyListBox from '../../Components/Widgets/my-listbox';


export default function LinkToPoints()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)
    const [allSeasons,  setAllSeasons]=useState([])

    useEffect(()=>{
        setWidth(width*0.60);
        setLeftMargin(width*.0);
        setHeight(height);

        const fetchData = async() =>{
            try {
                const response = await axios.get("http://127.0.0.1:8000/games/seasons/",);
                setAllSeasons(response.data)
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
                        width:'50%',
                        height:'225px',
                        margin:'auto',
                        display:'block'
                    }}>
                    <div
                        style={{
                            display:'flex',
                            justifyContent:'center'
                        }}>
                        <div
                            style={{
                                color:"#70727b",
                                padding:'10px',
                                fontSize:'12px  '
                            }}
                        >
                            SEASON
                        </div>
                        <select name='season'
                                style={{
                                width:'400px',
                                padding:'10px'
                            }}>
                            {allSeasons.map((oneSeason)=>(
                                <option
                                    key={oneSeason.season}
                                    value={oneSeason.season}

                                >

                                    {oneSeason.season}

                                    
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* <MyListBox
                        theList={allSeasons}
                        title="SEASON"
                        titleColor="#70727b"
                        direction="horizontal"
                    /> */}
                </div>
                <button onClick={Test}>test</button>
                
            </div>
        
        </div>
    )
}
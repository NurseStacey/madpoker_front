import {APPLICATION_COLORS} from '../../Components/Constants/application-colors';

export default function ResultsBox(
    {allResults}
)
{

    return(
        <div
            style={{
                marginTop:'125px',
                height:'500px',
                backgroundColor:APPLICATION_COLORS['player-interface']['background_two'],
                overflowY:'scroll'
            }}
        >
            {allResults['season_stats'].map((one_season)=>(
                <div
                    style={{
                        width:'90%',
                        padding:'5%',
                        fontSize:'18px'
                    }}
                    key={one_season['season_name']}
                >
                    <div
                        style={{
                            borderBottom:'1px dashed black'
                        }}
                    >
                        {one_season['season_name']}
                    </div>
                    <div
                        style={{
                            display:'flex',
                            justifyContent:'space-between',
                            margin:'3%'
                        }}
                    >
                        <div>Overall Position:{one_season['position']}</div>
                        <div>Average Score:{one_season['average_points']}</div>
                        <div>Average Position:{one_season['average_position']}</div>

                    </div>
                    <div
                        style={{
                            display:'flex',
                            justifyContent:'space-between',
                            marginLeft:'3%',
                            marginRight:'3%',
                            borderBottom:'1px dashed black'          
                        }}
                    >               
                        <div style={{width:'25%'}}>Venue</div>
                        <div style={{width:'17%'}}>Date</div>
                        <div style={{width:'17%'}}>Game</div>
                        <div style={{width:'17%'}}>Position</div>
                        <div style={{width:'17%'}}>Score</div>
                    </div>                             
                    {allResults['individual_game_results'].filter((one_result)=>one_result['season_name']===one_season['season_name']
                    ).map((one_result)=>(
                        <div
                            key={one_result['id']}
                            style={{
                                paddingTop:'3px',
                                fontSize:'15px'
                            }}
                        >
                            <div
                                style={{
                                    display:'flex',
                                    justifyContent:'space-between',
                                    marginLeft:'3%'                                                  
                                }}
                            >
                                <div style={{width:'30%'}}>{one_result['venue']}</div>
                                <div style={{width:'20%'}}>{one_result['date']}</div>
                                <div style={{width:'20%'}}>{one_result['game_type']}</div>
                                <div style={{width:'20%'}}>{one_result['position']}</div>
                                <div style={{width:'20%'}}>{one_result['points']}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>          
    )
}
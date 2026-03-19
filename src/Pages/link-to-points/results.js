import {APPLICATION_COLORS} from '../../Components/application-colors';

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
            {allResults['what_seasons'].map((one_season)=>(
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
                        {one_season['season_title']}
                    </div>
                    <div
                        style={{
                            display:'flex',
                            justifyContent:'space-between',
                            margin:'3%'
                        }}
                    >
                        <div>Overall Position:{allResults['season_summaries'][one_season['season_name']]['season_position']}</div>
                        <div>Average Score:{allResults['season_summaries'][one_season['season_name']]['average_points']}</div>
                        <div>Average Position:{allResults['season_summaries'][one_season['season_name']]['average_position']}</div>

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
                        <div style={{width:'30%'}}>Venue</div>
                        <div style={{width:'20%'}}>Date</div>
                        <div style={{width:'20%'}}>Position</div>
                        <div style={{width:'20%'}}>Score</div>
                    </div>                             
                    {allResults['individual_game_results'][one_season['season_name']].map((one_result)=>(
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
                                <div style={{width:'30%'}}>{one_result['display_pieces']['venue']}</div>
                                <div style={{width:'20%'}}>{one_result['display_pieces']['date']}</div>
                                <div style={{width:'20%'}}>{one_result['display_pieces']['position']}</div>
                                <div style={{width:'20%'}}>{one_result['display_pieces']['points']}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>          
    )
}
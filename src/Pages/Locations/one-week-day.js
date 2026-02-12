

export default function OneWeekDay({
    weekDay,
    theseGames,
    RegisterForGame
})
{
    return(
        <div
            key={weekDay}
            style={{
                fontSize:"22px",
                fontFamily:"averia sans libre",
                fontWeight:"bold",
                textAlign:"left",
                marginTop:"15px",
                width:'100%',
            }}>
                {weekDay}
                {theseGames.map((oneGame)=>(
                     <div
                        key={oneGame.venue_name}
                        style={{
                            display:'flex',
                            width:'100%',
                            margin:'10px 0px',
                        }}>
                        <div
                                    onClick={()=>RegisterForGame(
                                        oneGame.id, 
                                        oneGame.venue_name, 
                                        oneGame.time, 
                                       // oneSection.section,
                                        oneGame.date
                                    )}                        
                            style={{
                                width:'100%',
                                color:'red',
                                fontSize:'16px',
                                cursor:'pointer'
                            }}>
                                <span style={{color:'red'}}>
                                    {oneGame.venue_name}
                                </span>
                                {" - "} 
                                <span style={{color:'black'}}>{oneGame.description}</span>                                
                                    
                        </div>
                        {/* <div
                            style={{
                                display:'block',
                                width:'74%',
                                marginLeft:'1%'
                            }}>
                            {oneGame.sections.map((oneSection,index)=>(
                                <div
                                    key={oneSection.id}
                                    onClick={()=>RegisterForGame(
                                        oneSection.played_game_id, 
                                        oneGame.venue_name, 
                                        oneGame.time, 
                                       // oneSection.section,
                                        oneSection.date
                                    )}
                                    style={{
                                        fontSize:'16px',
                                        marginBottom:'10px',
                                        cursor:'pointer'
                                    }}>
                                        {oneSection.description}
                                </div>
                            ))}
                        </div>  */}
                    </div>))}
        </div>        
    )
}
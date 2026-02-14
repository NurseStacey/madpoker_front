

export default function OneGameOld({
    thisGame,
    thisWeekDay,
    RegisterForGame
})
{
    return(
        (thisGame.week_day===thisWeekDay)?
            <div
                onClick={()=>RegisterForGame(thisGame.NextPlayerGameID)}
                style={{
                    fontSize:"18px",
                    display:'flex',
                    flexWrap:'wrap',
                    cursor:"pointer",
                    border:'1px solid black'
                }}
                >
                    <p>
                        <span style={{color:'red'}}>{thisGame.venue_name}</span>
                        {" - "} 
                         <span style={{color:'black'}}>{thisGame.description}</span>
                    </p> 
            </div>
        :<></>
    )
}


export default function OneGame({
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
                    cursor:"pointer"
                }}
                >
                    <p>
                        <span style={{color:'red'}}>{thisGame.venue_name}</span>{", " + thisGame.description}
                    </p> 
            </div>
        :<></>
    )
}
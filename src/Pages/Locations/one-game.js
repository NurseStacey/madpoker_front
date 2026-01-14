

export default function OneGame({
    thisGame,
    thisWeekDay,
    RegisterForGame
})
{
    return(
        (thisGame.WeekDay===thisWeekDay)?
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
                        <span style={{color:'red'}}>{thisGame.VenueName}</span>{", " + thisGame.Description}
                    </p> 
            </div>
        :<></>
    )
}
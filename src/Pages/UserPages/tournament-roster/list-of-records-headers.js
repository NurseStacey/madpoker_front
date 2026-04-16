

export default function Headers({
    orderPlayers
})
{
    return(
        <>
            <div
                onClick={()=>orderPlayers('player_name',true)}
                //onClick={Test}
                style={{
                    textAlign:'left',
                    paddingLeft:'15%',
                    cursor:'pointer',
                }}>
                Player
            </div>
            <div
                onClick={()=>orderPlayers('position',true)}
                style={{
                    textAlign:'left',
                    cursor:'pointer'
                }}
            >
                Position
            </div>                
            <div
                style={{
                    textAlign:'left',
                    cursor:'pointer'
                }}>
                Remove Player
            </div>                
            <div
                style={{
                    textAlign:'left',
                    cursor:'pointer',
                }}>
                Player is Out
            </div>                          
        </>
    )
}
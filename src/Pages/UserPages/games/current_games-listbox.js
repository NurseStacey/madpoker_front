

export default function CurrentGamesListBox({
    allGames,
    GameSelected,
    selectedGame
})
{
    return(
        <div
            style={{
                border:'1px solid black',
                overflowY:'scroll',
                height:'300px'
            }}>
            {allGames.map((oneGame)=>(
                <div
                    onClick={()=>GameSelected(oneGame.id)}
                    key={oneGame.id}
                    style={{
                        margin:"0px 5px",
                        textAlign:"left",
                        fontSize:"18px",
                        backgroundColor:(oneGame.id===selectedGame) ? "pink" :"white",
                    }}
                    >{(oneGame.active) ? oneGame.game_text : oneGame.game_text + ' - inactive'}</div>
            ))}
        </div>
    )
}
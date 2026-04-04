

export default function CurrentGamesListBox({
    allGames,
    GameSelected,
    selectedGame,
    ListBoxStyle,
})
{
    return(
        <div
            style={{
                border:'1px solid black',
                overflowY:'scroll',
                height:'300px',
                ...ListBoxStyle
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
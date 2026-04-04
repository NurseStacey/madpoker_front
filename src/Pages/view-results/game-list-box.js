import {APPLICATION_COLORS} from '../../Components/Constants/application-colors';

export default function GameListBox({
    filteredPlayedGameList,
    setOpenModal,
    setThisGameTitle,
    setThisGameID
})

{
    let OneRowStyle={
        display:'grid',
        gridTemplateColumns: '34% 22% 22% 22%',
        margin:'3%',
        fontSize:'20px',
        cursor:'pointer'
    }    

    const GameClicked =(id)=>{
        let thisGame = filteredPlayedGameList.find((onePlayedGame)=>onePlayedGame.id===id);
        setThisGameTitle(thisGame.venue + " - " + thisGame.gametype + " - " + thisGame.weekday  + " - " + thisGame.date );
        setThisGameID(thisGame.id)
        setOpenModal(true);
    }

    const Test=()=>{
        console.log(filteredPlayedGameList)
        }
    return(
        <div
            style={{
                marginTop:'125px',
                height:'60%',
                backgroundColor:APPLICATION_COLORS['player-interface']['background_two'],
                overflowY:'scroll'
            }}
        >
            <div
                style={OneRowStyle}
            >
                <div>Venue</div>
                <div>Game Type</div>
                <div>Weekday</div>
                <div>Date</div>
            </div>            
            {/* <button onClick={Test}>test</button> */}
            {filteredPlayedGameList.map((onePlayedGame)=>(
                <div
                    key={onePlayedGame.id}
                    style={OneRowStyle}
                    onClick={()=>GameClicked(onePlayedGame.id)}
                >
                    <div>{onePlayedGame.venue}</div>
                    <div>{onePlayedGame.game_type}</div>
                    <div>{onePlayedGame.week_day}</div>
                    <div>{onePlayedGame.date}</div>
                </div>                 
            ))}
        </div>        
    )
}
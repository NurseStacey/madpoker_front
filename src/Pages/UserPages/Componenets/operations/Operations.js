import OneOperationButton from './one-operation-button'

export default function Operations({
    NavigationFunction
}){
    return(
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                flexWrap:'wrap',
                justifyContent:"space-around",
                width:"60%",
                marginLeft:'20%',
                marginRight:'20%',
                backgroundColor:'salmon'
            }}>
            <OneOperationButton
                buttonText="Add Director"
                buttonLink="/register"
                NavigationFunction={NavigationFunction}
            />
            <OneOperationButton
                buttonText="Update Top Message"
                buttonLink="/update_top"
                NavigationFunction={NavigationFunction}
            />
            <OneOperationButton
                buttonText="Update Special Messages"
                buttonLink="/update_special"
                NavigationFunction={NavigationFunction}
            />
             <OneOperationButton
                buttonText="Edit Venues"
                buttonLink="/edit_venues"
                NavigationFunction={NavigationFunction}
            />
            <OneOperationButton
                buttonText="Edit Games"
                buttonLink="/edit_games"
                NavigationFunction={NavigationFunction}
            />
            <OneOperationButton
                buttonText="Edit Sections"
                buttonLink="/game_sections"
                NavigationFunction={NavigationFunction}
            />
            <OneOperationButton
                buttonText="Season Management"
                buttonLink="/season_management"
                NavigationFunction={NavigationFunction}
            />
            <OneOperationButton
                buttonText="View Game Roster"
                buttonLink="/game_roster"
                NavigationFunction={NavigationFunction}
            />
            <OneOperationButton
                buttonText="Event Management"
                buttonLink="/event_management"
                NavigationFunction={NavigationFunction}
            />                                    
        </div>
    )
}
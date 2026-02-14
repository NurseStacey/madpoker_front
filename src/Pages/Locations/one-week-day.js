import { Fragment } from 'react'
import  OneGame from './one-game'


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
                    <Fragment
                        key={oneGame.id}>
                        <OneGame
                            thisGame={oneGame}
                            RegisterForGame={RegisterForGame}
                            />
                    </Fragment>
                ))}
        </div>        
    )
}
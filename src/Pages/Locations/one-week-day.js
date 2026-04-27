import { Fragment } from 'react'
import  OneGame from './one-game'
import './location.css'

export default function OneWeekDay({
    weekDay,
    theseGames,
    RegisterForGame
})
{

    return(
        <div
            key={weekDay}
            className='OneWeekDay'
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
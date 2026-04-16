import  { Fragment} from 'react'

export default function OneGame({
    thisGame,
    RegisterForGame
})

{
    const GameClicked = ()=>{
        if (!thisGame.canceled) RegisterForGame(thisGame)
    }    

    return(
        <div
            onClick={GameClicked}
            style={{
                display:'flex',
                width:'100%',
                margin:'10px 0px',
                fontSize:'16px',
        }}>
            <div
                style={{
                    width:'20%',
                    color:'red',
                    cursor: thisGame.canceled ? 'default' : 'pointer'
            }}>
                {thisGame.venue_name}
            </div>
            <div
                style={{
                    color:'black',
                    width:'2%'
                }}>
                -
            </div>
            <div
                style={{
                    width:'68%',
                    
                }}
            >
                    {thisGame.description.map((onePiece)=>(
                        <Fragment
                            key={onePiece['index']}>
                            <span
                                
                                style={{
                                    color:onePiece['color'],
                                    textDecoration: thisGame.canceled ? 'line-through' : 'none',
                                    cursor: thisGame.canceled ? 'default' : 'pointer'
                                }}> 
                                {onePiece['text']}
                            </span>
                        </Fragment>
                    ))}
            </div>
        </div>
    )
}
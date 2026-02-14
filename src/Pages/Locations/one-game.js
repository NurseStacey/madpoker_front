import  { Fragment} from 'react'

export default function OneGame({
    thisGame,
    RegisterForGame
})
{
    return(
        <div
            // key={thisGame.id}
            onClick={()=>RegisterForGame(thisGame)}         
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
                    cursor:'pointer',
                    // display:'inline-block',
                    // verticalAlign:'text-top',
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
                                    color:onePiece['color']
                                }}> 
                                {onePiece['text']}
                            </span>
                        </Fragment>
                    ))}
            </div>
        </div>
    )
}
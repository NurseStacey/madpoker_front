import React from 'react'

function CardSmall(props){
    return(
        <div style={style.card} id={props.id}>
            <img style={style.card_img} onClick={()=>props.onclick(props.id)} src={props.picsum} alt=""/>
        </div>
    )
}

const style={
    card:{
        margin:0,
        padding:0,
        boxSizing:'border-box',
        width:'inherit',
        height:'inherit',
        position:'absolute',
        top:'0%',
        left:'50%',
        transform:'translate(-50%,0%)',      
    },
    card_img:{
        height:'100%',
        width:'100%',
        maxWidth:'100%',
        maxHeight:'100%',
        position:'relative',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',              
    }
}
export default React.memo(CardSmall);
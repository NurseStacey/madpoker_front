import React from 'react'

function Card(props){
    return(
        <div style={style.card} id={props.id}>
            <img style={style.card_img} src={props.picsum} alt=""/>
        </div>
    )
}

const style={
    card:{
        margin:0,
        padding:0,
        width:'inherit',
        height:'inherit',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',              
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
export default React.memo(Card);
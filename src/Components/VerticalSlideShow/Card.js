import React from 'react'
            {/*  */}
function Card(props){
    return(
        <>
            <div style={style.card} id={props.id}>
                
                <img style={style.card_img} src={props.picsum.img_link} alt=""/>
                <div style={style.label}>
                    {props.picsum.venue_name}
                </div>                
            </div>

        </>
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
    },
    label:{
        height:'15%',
        width:'100%',
        position:'absolute',
        top:'80%',
        //left:'50%',
        transform:'translate(0%,10%)', 
        backgroundColor:'black',
        color:'white',
        opacity:0.75,  
    }
}
export default React.memo(Card);
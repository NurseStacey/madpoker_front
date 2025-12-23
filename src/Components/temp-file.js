import React, {Component, Fragment} from 'react'

class Deck extends Component {
    constructor(props){
        super(props)
        this.state={
    
        }
    }


    render(){
        return(
            <Fragment>
                <div ref={ref_id=>this.big_box=ref_id} style={{width:"100%", height:"100%",}}>
                    <div ref={ref_id=>this.nav_buttons_container=ref_id} style={styles.nav_buttons_container}>

                    </div>
                    <div ref={ref_id=>this.view_port = ref_id} style={styles.view_port}>
                        <div ref={ref_id=>this.images= ref_id} style={styles.images_container}>
                        </div>
                    </div>
                </div> 
                     <div style={styles.selection_row}>
                        <div style={styles.selection_prev_button}></div>
                        <div ref={ref_id=>this.small_images= ref_id } style={styles.selection_images}>
                        </div>
                        <div style={styles.selection_next_button}></div>
                    

                </div>
            </Fragment>
        )
    }
}



const styles={
    view_port:{
        margin:0,
        padding:0,
        width:'100%',
        height:'90%',
        position:'absolute',
        top:'40%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        overflow:'hidden',
        //border:'1px solid red'
    },
    images_container:{
        margin:0,
        padding:0,
        width:'inherit',
        height:'100%',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        border:'1px solid red'
    },
    selection_row:{
        border:'1px solid blue',
        overflow:'hidden',
        margin:0,
        padding:0,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        // justifyContent:'space-around',
        height:'10%',
        position:'absolute',
        top:'90%',
        left:'50%',
        transform:'translate(-50%,-50%)',
    },
    selection_images:{
        //visibility:'hidden',
        border:'1px solid red',
        overflow:'hidden',
        width:'60%',
        height:'100%',
        position:'absolute',
        // top:'100%',
        left:'50%',
        transform:'translate(-50%,0%)',
    },
    selection_next_button:{
        position:'absolute',
        right:'0%',
        height:'100%',
        transform:'translate(0%,0%)',
        width:'10%',
        border:'4px solid black'
    },
    selection_prev_button:{
        position:'absolute',
        left:'0%',
        width:'10%',
        height:'100%',
        transform:'translate(0%,0%)',
        border:'4px solid black'
    },
    nav_buttons_container:{
        margin:0,
        padding:0,
        width:'100%',
        height:'10%',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        pointerEvents:'none',
        border:'1px solid green',
        zIndex:9999
    },
    nav_button:{
       // visibility:'hidden',
       opacity:0.1,
        width:'50%',
        height:'auto',
        pointerEvents:'all',
        cursor:'pointer',
        borderRadius:'50%'
    },
    selection_buttons_container:{
        margin:0,
        padding:0,
        width:'fit-content',
        height:'fit-content',
        position:'absolute',
        bottom:0,
        left:'50%',
        transform:'translateX(-50%)',
        backgroundColor:'rgba(0,0,255,0.4)',
        pointerEvents:'none',
        zIndex:9999,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    selection_button:{
        width:'20px',
        height:'20px',
        padding:0,
        margin: '0px 15px 0px 0px',
        backgroundColor:'gray',
        pointerEvents:'all',
        pointer:'cursor',
        borderRadius:'50%'
    }
}
export default Deck;
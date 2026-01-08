import React, {Component, Fragment} from 'react'
import Card from './Card'
import LeftChev from './left-chevron.png'
import RightChev from './right-chevron.png'

class VerticalDeck extends Component {
    constructor(props){
        super(props)
        this.state={
            //percent_of_window:props['Percent_of_Window'],
            WindowWidth:props['WindowWidth'],
            WindowHeight:props['WindowHeight'],
            cards:props['All_Images'].map((one_link,index)=><Card picsum={one_link} id={index} key={index} />),
        }
    }

    componentDidMount(){
        //return;
        this.number_of_cards_by_index = this.images.children.length-1;
        this.middle_card_by_index = Math.floor(this.number_of_cards_by_index/2);

        let img_width_as_percentage=0.85
        //this.new_width=  (img_width_as_percentage/100)*window.innerWidth*(this.state.percent_of_window/100);
        this.new_width= this.state.WindowWidth*img_width_as_percentage;
        
        //this.new_height=  2*(img_width_as_percentage/100)*window.innerHeight*(this.state.percent_of_window/100);
        this.new_height = this.state.WindowHeight*img_width_as_percentage;

        this.view_port.style.width=`${this.new_width}px`;
        this.view_port.style.height=`${this.new_height}px`;

        this.current_card=1
        
        this.last_position=[];

        this.bottom_boundary = parseFloat(this.images.children[this.number_of_cards_by_index].style.top)+this.new_height
        this.top_boundary = parseFloat(this.images.children[0].style.top)-this.new_height

        this.order_cards();

        for (let i=0;i<this.images.children.length;i++){
            this.last_position.push(parseFloat(this.images.children[i].style.top))
        }
        
        this.scroll_in_progress=false;

        this.start_autoplay();
    }

    order_cards=()=>{

        let counter_for_bottom=1,
            counter_for_top=this.middle_card_by_index
        
        for (let i=0; i<this.images.children.length; i++){
            this.images.children[i].style.transitionDuration='0.25s';

            if (i<this.middle_card_by_index){
                this.images.children[i].style.top = `-${(counter_for_top*this.new_height) + this.new_height/2}px`
                //this.images.children[i].style.top = `-${(counter_for_top*this.new_height- this.new_height) }px`
                counter_for_top--;
            }else if (i>this.middle_card_by_index){
                this.images.children[i].style.top = `${(counter_for_bottom*this.new_height) + 3*this.new_height/2}px`
                //this.images.children[i].style.top = `${(counter_for_bottom*this.new_height) }px`
                counter_for_bottom++;

            }else{
                this.images.children[i].style.top =`${3*this.new_height/2}px`
                //this.images.children[i].style.top =`${-this.new_height}px`
            }
        }


    }

    handle_prev = ()=>{
        if (this.scroll_in_progress) return;

        this.scroll_in_progress=true;

        this.current_card--
        for(let i=0; i<this.images.children.length; i++) {
            this.images.children[i].style.transitionDuration='0.25s';
            const updated_position = this.last_position[i] + this.new_height;

            this.images.children[i].style.top = `${updated_position}px`;
            this.last_position[i]=updated_position;
        }

        setTimeout(()=>{
                    this.scroll_in_progress=false;
                    this.start_autoplay();
        },200);        
    }

    handle_next=()=>{
        if (this.scroll_in_progress) return;

        this.scroll_in_progress=true;

        this.current_card++
        for(let i=0; i<this.images.children.length; i++) {
            this.images.children[i].style.transitionDuration='0.25s';
            const updated_position = this.last_position[i] - this.new_height;

            this.images.children[i].style.top = `${updated_position}px`;
            this.last_position[i]=updated_position;
        }
        setTimeout(()=>{
                    this.scroll_in_progress=false;
                    this.start_autoplay();
        },200);        
    }

    handle_boundaries=()=>{

        if (this.current_card>this.number_of_cards_by_index) {
            this.current_card=0
        }

        if(this.current_card<0) {
            this.current_card=this.number_of_cards_by_index
        }
        

        if (this.last_position[0]<=this.top_boundary){
            const end_of_deck = this.last_position[this.number_of_cards_by_index] + this.new_height;
  
            this.images.children[0].style.top = `${end_of_deck}px`;

            this.last_position[0]=end_of_deck;

            this.images.appendChild(this.images.children[0],this.images.children[this.number_of_cards_by_index]);
            this.last_position.splice(this.number_of_cards_by_index, 0, this.last_position.shift());

        }

    }


    Test = ()=>{

            console.log(this.new_height)
        }

    start_autoplay = () =>{
       //return;
        try {
            clearTimeout(this.autoplay_timeout_id)
            clearInterval(this.autoplay_interval_id)

            this.autoplay_timeout_id = setTimeout(()=>{
                this.autoplay_interval_id = setInterval(()=>{
                    this.current_card++;
                    
                    if (this.images!==null){
                        for(let i=0; i<this.images.children.length; i++) {
                            this.images.children[i].style.transitionDuration='0.25s';
                            //const updated_position = this.last_position[i] - this.new_width;
                            const updated_position = this.last_position[i] - this.new_height;

                            //this.images.children[i].style.left = `${updated_position}px`;
                            this.images.children[i].style.top = `${updated_position}px`;
                            this.last_position[i]=updated_position;
                        }
                    }
                                   
                    this.handle_boundaries();

                }, 1100);
            }, 1200);
        }catch{console.log('problem')}

    }

    render(){
        return(
            <Fragment>
                    <div style={{
                            backgroundColor:'lightGrey',      
                            height:'100%',
                    }}
                    >
                        <div ref={ref_id=>this.nav_buttons_container=ref_id} style={styles.nav_buttons_container}>
                            <img onClick={this.handle_prev} ref={ref_id=>this.button_prev = ref_id} style={styles.nav_button} src={LeftChev} alt="prev" id="prev"/>
                            <img onClick={this.handle_next}  ref={ref_id=>this.button_next = ref_id}  style={styles.nav_button}  src={RightChev}  alt="next" id="next"/>                            
                       
                        </div>
                        <div ref={ref_id=>this.view_port = ref_id} style={styles.view_port}>
                            <div ref={ref_id=>this.images= ref_id} style={styles.images_container}>
                                {this.state.cards}
                            </div>                    

                    </div>
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
        height:'100%',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',        
        overflow:'hidden',
    },
    images_container:{
        margin:0,
        padding:0,
        width:'inherit',
        height:'100%',
        position:'absolute',
        top:'50%',
        left:'50%',
        zIndex:10,        
        transform:'translate(-50%,-50%)',
    },
    nav_buttons_container:{
        margin:0,
        padding:0,
        width:'100%',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        pointerEvents:'none',

        display:'flex',

    },
    nav_button:{

        width:'30px',
        height:'30px',
        pointerEvents:'all',
        cursor:'pointer',
        borderRadius:'50%',
        zIndex:2,
    },   
}
export default VerticalDeck;
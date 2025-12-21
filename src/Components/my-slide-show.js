import React, {Component, Fragment} from 'react'
import Card from './Card'
import LeftChev from './left-chevron.png'
import RightChev from './right-chevron.png'

class Deck extends Component {
    constructor(props){
        super(props)

        console.log(props['All_Images'])
        this.state={
            cards:props['All_Images'].map((one_link,index)=><Card picsum={one_link} id={index} key={index} />)
    
        }
    }

    componentDidMount(){

        this.number_of_cards_by_index = this.images.children.length-1;
        this.middle_card_by_index = Math.floor(this.number_of_cards_by_index/2);

        let img_width_as_percentage=50;

        let nav_button_placement_as_percentage=60;
        nav_button_placement_as_percentage=window.innerWidth<768 ? 100 : nav_button_placement_as_percentage
        this.new_width=  (img_width_as_percentage/100)*window.innerWidth;


        this.view_port.style.width=`${this.new_width}px`;
        this.nav_buttons_container.style.width=`${nav_button_placement_as_percentage}vw`;
        this.button_prev.style.width=`${this.new_width/2 * 0.30}px`;
        this.button_next.style.width=`${this.new_width/2 * 0.30}px`;
        this.current_card=1
        
        this.selection_buttons_container.style.bottom = `${this.view_port.getBoundingClientRect().top}px`
        for (let i=0; i<this.images.children.length; i++){
            this.selection_buttons_container.children[i].transitionDuration='0.25s';
            this.selection_buttons_container.children[i].style.width=`${this.new_width*.05}px`;
            this.selection_buttons_container.children[i].style.height=`${this.new_width*.05}px`;
        }

        this.order_cards();
        this.update_selection();

        
        // window.addEventListener('resize', ()=>{
        //     let img_width_as_percentage=50;

        //         this.new_width=(img_width_as_percentage/100)*window.innerWidth;

        //         this.view_port.style.width=`${this.new_width}px`
        //         this.nav_buttons_container.style.width=`${nav_button_placement_as_percentage}vw`;

        //     this.selection_buttons_container.style.bottom = `${this.view_port.getBoundingClientRect().top}px`
        //     for (let i=0; i<this.images.children.length; i++){
        //         this.selection_buttons_container.children[i].transitionDuration='0.25s';
        //         this.selection_buttons_container.children[i].style.width=`${this.new_width*.05}px`;
        //         this.selection_buttons_container.children[i].style.height=`${this.new_width*.05}px`;
        //     }

        //     this.order_cards();  
        //     this.update_selection();
                
        //     this.right_boundary = parseFloat(this.images.children[this.number_of_cards_by_index].style.left)+this.new_width
        //     this.leftt_boundary = parseFloat(this.images.children[0].style.left)-this.new_width

        //     for (let i=0;i<this.images.children.length;i++){
        //         this.last_position[i]=parseFloat(this.images.children[i].style.left);
        //     }               

        //     this.autoplay_timeout_id = null;
        //     this.autoplay_interval_id = null;
        // });

        this.last_position=[];
        this.right_boundary = parseFloat(this.images.children[this.number_of_cards_by_index].style.left)+this.new_width
        this.left_boundary = parseFloat(this.images.children[0].style.left)-this.new_width

        for (let i=0;i<this.images.children.length;i++){
            this.last_position.push(parseFloat(this.images.children[i].style.left))
        }

        this.scroll_in_progress=false;
        this.start_autoplay();
    }

    update_selection = () => {
        
        for (let i=0; i<this.images.children.length; i++){

            if(i==this.current_card) {
                this.selection_buttons_container.children[i].style.backgroundColor='red';
            } else {
                this.selection_buttons_container.children[i].style.backgroundColor='grey';
            }
        }
    }
    order_cards=()=>{
        
        //const card_width=parseFloat(getComputedStyle(this.images.children[0]).width);
        let counter_for_right=1,
            counter_for_left = this.middle_card_by_index;

        for (let i=0; i<this.images.children.length; i++){
            this.images.children[i].style.transitionDuration='0.25s';

            if (i<this.middle_card_by_index){
                this.images.children[i].style.left =`-${(counter_for_left * this.new_width) - (this.new_width/2) }px`
                counter_for_left--;
            }else if (i>this.middle_card_by_index){
                this.images.children[i].style.left =`${(counter_for_right * this.new_width) + (this.new_width/2) }px`
                counter_for_right++
            }else{
                this.images.children[i].style.left =`${this.new_width/2 }px`
            }
        }
        

    }

    handle_prev=()=>{
        if (this.scroll_in_progress) return;

        this.scroll_in_progress=true;

        this.current_card--
        for(let i=0; i<this.images.children.length; i++) {
            this.images.children[i].style.transitionDuration='0.25s';
            const updated_position = this.last_position[i] + this.new_width;
            
            this.images.children[i].style.left = `${updated_position}px`;
            this.last_position[i]=updated_position;
        }
        this.handle_boundaries();
        this.update_selection();
        setTimeout(()=>{
                    this.scroll_in_progress=false;
                    this.start_autoplay();
        },200);        
    }    

    handle_next=()=>{
        if (this.scroll_in_progress) return;

        this.scroll_in_progress=true;

        this.current_card++;

        for(let i=0; i<this.images.children.length; i++) {
            this.images.children[i].style.transitionDuration='0.25s';
            const updated_position = this.last_position[i] - this.new_width;

            this.images.children[i].style.left = `${updated_position}px`;
            this.last_position[i]=updated_position;
        }
        this.handle_boundaries();
        this.update_selection();

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

        if (this.last_position[0]<=this.left_boundary){
            
            const end_of_deck = this.last_position[this.number_of_cards_by_index] + this.new_width;

            this.images.children[0].style.left = `${end_of_deck}px`;
            this.last_position[0]=end_of_deck;           
            
            this.images.appendChild(this.images.children[0],this.images.children[this.number_of_cards_by_index]);
            this.last_position.splice(this.number_of_cards_by_index, 0, this.last_position.shift());
        }

        if (this.last_position[this.number_of_cards_by_index]>=this.right_boundary){
           
            const beginning_of_deck = this.last_position[0] - this.new_width;

            this.images.children[this.number_of_cards_by_index].style.left = `${beginning_of_deck}px`;
            this.last_position[this.number_of_cards_by_index]=beginning_of_deck;           
            
            this.images.insertBefore(this.images.children[this.number_of_cards_by_index],this.images.children[0]);
            this.last_position.splice(0,0, this.last_position.pop());
        }        
    }

    handle_selection =event=>{
        if (event.target == this.selection_buttons_container) return

        let new_card=null;

        for (let i=0;i<this.images.children.length; i++){
            if (event.target==this.selection_buttons_container.children[i]) new_card=i;
        }

        for (let i=0;i<this.images.children.length; i++){
            const updated_position=this.last_position[i] + ((this.current_card - new_card)*this.new_width);

            this.images.children[i].style.left = `${updated_position}px`;
            this.images.children[i].style.transitionDuration='0.25s';
            this.last_position[i]=updated_position;
        }        

        for (let i=0;i<Math.abs(this.current_card-new_card); i++){
            this.handle_boundaries()
        }

        this.current_card=new_card;
        this.update_selection();
        this.start_autoplay();
    }

    start_autoplay = () =>{
        return
        clearTimeout(this.autoplay_timeout_id)
        clearInterval(this.autoplay_interval_id)

        this.autoplay_timeout_id = setTimeout(()=>{
            this.autoplay_interval_id = setInterval(()=>{
                this.current_card++;    
                for(let i=0; i<this.images.children.length; i++) {
                    this.images.children[i].style.transitionDuration='0.25s';
                    const updated_position = this.last_position[i] - this.new_width;

                    this.images.children[i].style.left = `${updated_position}px`;
                    this.last_position[i]=updated_position;
                }
                this.handle_boundaries();
                this.update_selection();
            }, 1100);
        }, 1200);

    }
    button_clicked=(i)=>{
        //console.log(i)
        let counter=0
        while (this.current_card !== i) {

            //console.log(this.current_card);
            this.handle_next();
        }
        
    }

    render(){
        return(
            <Fragment>
                <div ref={ref_id=>this.nav_buttons_container=ref_id} style={styles.nav_buttons_container}>
                    <img onClick={this.handle_prev} ref={ref_id=>this.button_prev = ref_id} style={styles.nav_button} src={LeftChev} alt="prev" id="prev"/>
                    <img onClick={this.handle_next}  ref={ref_id=>this.button_next = ref_id}  style={styles.nav_button}  src={RightChev}  alt="next" id="next"/>
                </div>
                <div ref={ref_id=>this.view_port = ref_id} style={styles.view_port}>
                    <div ref={ref_id=>this.images= ref_id} style={styles.images_container}>
                        {this.state.cards}
                    </div>
                </div> 
                <div onClick={this.handle_selection }ref={ref_id=>this.selection_buttons_container = ref_id} style={styles.selection_buttons_container}>
                    {
                        this.state.cards.map((_,i)=>{
                            return( <div  ref={ref_id=>this.selection_button = ref_id} key={i} style={styles.selection_button}></div>)
                        })
                    }
                   
                </div>
            </Fragment>
        )
    }
}


const styles={
    view_port:{
        margin:0,
        padding:0,
        border:'1px solid green',
        width:'500px',
        height:'500px',
        position:'relative',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        overflow:'hidden'
    },
    images_container:{
        margin:0,
        padding:0,
        width:'inherit',
        height:'inherit',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',        
    },
    nav_buttons_container:{
        margin:0,
        padding:0,
        width:'100vw',
        position:'relative',
        top:'100%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        pointerEvents:'none',
        zIndex:9999
    },
    nav_button:{
        width:'50%',
        height:'auto',
        pointerEvents:'all',
        cursor:'pointer'
    },
    selection_buttons_container:{
        margin:0,
        padding:0,
        width:'fit-content',
        height:'fit-content',
        position:'relative',
        top:100,
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
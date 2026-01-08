import React, {Component, Fragment} from 'react'
import Card from './Card'
import CardSmall from './CardSmall'
import LeftChev from './left-chevron.png'
import RightChev from './right-chevron.png'

class Deck extends Component {
    constructor(props){
        super(props)
        this.state={
            percent_of_window:props['Percent_of_Window'],
            cards:props['All_Images'].map((one_link,index)=><Card picsum={one_link} id={index} key={index} />),
            cards_small:props['All_Images'].map((one_link,index)=><CardSmall picsum={one_link} id={index} key={index} onclick={this.selection_clicked} />)
        }
    }

    componentDidMount(){

        this.number_of_cards_by_index = this.images.children.length-1;
        this.middle_card_by_index = Math.floor(this.number_of_cards_by_index/2);

        let img_width_as_percentage=100;

        this.new_width=  (img_width_as_percentage/100)*window.innerWidth*(this.state.percent_of_window/100);

        this.view_port.style.width=`${this.new_width}px`;
        
        this.nav_buttons_container.style.width=`${this.new_width}px`;
        this.selection_row.style.width=`${this.new_width}px`;
        this.button_prev.style.width=`${this.new_width/2 * 0.15}px`;
        this.button_next.style.width=`${this.new_width/2 * 0.15}px`;
        this.current_card=1

        let selection_image_width_as_percentage=20;
        this.selection_image_width =  (selection_image_width_as_percentage/100)*this.small_images.offsetWidth;
        this.change_in_left_for_selection = 1.33*this.selection_image_width


        this.order_cards();
        

        this.big_box.addEventListener('mouseenter', (event)=>{

            this.button_prev.style.opacity=1.0;
            this.button_next.style.opacity=1.0;
        })

        this.big_box.addEventListener('mouseleave', (event)=>{
            this.button_prev.style.opacity=.10;
            this.button_next.style.opacity=.10 ;
        })
        
        this.last_position=[];
        this.right_boundary = parseFloat(this.images.children[this.number_of_cards_by_index].style.left)+this.new_width
        this.left_boundary = parseFloat(this.images.children[0].style.left)-this.new_width

        for (let i=0;i<this.images.children.length;i++){
            this.last_position.push(parseFloat(this.images.children[i].style.left))
        }

        this.last_position_selection_image=[]
        this.right_boundary_selection_image = parseFloat(this.small_images.children[this.number_of_cards_by_index].style.left)+this.new_width
        this.left_boundary_selection_image = parseFloat(this.small_images.children[0].style.left)-this.new_width

        for (let i=0;i<this.small_images.children.length;i++){
            this.last_position_selection_image.push(parseFloat(this.small_images.children[i].style.left))
        }

        this.create_small_image_border();
        this.scroll_in_progress=false;
        this.start_autoplay();
    }

    order_cards=()=>{

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

        
        let this_image_left =-1*(this.middle_card_by_index-2)*this.change_in_left_for_selection-.8*this.selection_image_width
        for (let i=0;i<this.small_images.children.length;i++){
            this.small_images.children[i].style.width=`${this.selection_image_width}px`;
            this.small_images.children[i].style.left=`${this_image_left}px`;
            this_image_left = this_image_left + this.change_in_left_for_selection;
        }

    }

    create_small_image_border = () =>{
        let which_card = this.middle_card_by_index + this.current_card-1

        if (this.small_images!==null){
            for(let i=0; i<this.small_images.children.length; i++) {
                if (i==5){
                    this.small_images.children[i].style.border = `4px solid blue`

                } else {
    
                    this.small_images.children[i].style.border = `0px solid blue`;
                }
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

        for(let i=0; i<this.small_images.children.length; i++) {
            this.small_images.children[i].style.transitionDuration='0.25s';

            const small_image_updated_position = this.last_position_selection_image[i] + this.change_in_left_for_selection;

            this.small_images.children[i].style.left = `${small_image_updated_position}px`;
            this.last_position_selection_image[i]=small_image_updated_position;
        }

        this.handle_boundaries();
        this.create_small_image_border();
        setTimeout(()=>{
                    this.scroll_in_progress=false;
                    this.start_autoplay();
        },200);
    }

    handle_next=()=>{
        //this.Test();
        if (this.scroll_in_progress) return;
        
        this.scroll_in_progress=true;

        this.current_card++;
        console.log(this.last_position)
        for(let i=0; i<this.images.children.length; i++) {
            this.images.children[i].style.transitionDuration='0.25s';
            const updated_position = this.last_position[i] - this.new_width;

            this.images.children[i].style.left = `${updated_position}px`;
            this.last_position[i]=updated_position;
        }

        for(let i=0; i<this.small_images.children.length; i++) {
            this.small_images.children[i].style.transitionDuration='0.25s';
            
            const small_image_updated_position = this.last_position_selection_image[i] - this.change_in_left_for_selection;

            this.small_images.children[i].style.left = `${small_image_updated_position}px`;
            this.last_position_selection_image[i]=small_image_updated_position;
        }

        this.handle_boundaries();
        this.create_small_image_border();

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

            const small_image_end_of_deck = this.last_position_selection_image[this.number_of_cards_by_index] + this.change_in_left_for_selection;

            this.small_images.children[0].style.left = `${small_image_end_of_deck}px`;
            this.last_position_selection_image[0]=small_image_end_of_deck;

            this.small_images.appendChild(this.small_images.children[0],this.small_images.children[this.number_of_cards_by_index]);
            this.last_position_selection_image.splice(this.number_of_cards_by_index, 0, this.last_position_selection_image.shift());            
        }

        if (this.last_position[this.number_of_cards_by_index]>=this.right_boundary){

            const beginning_of_deck = this.last_position[0] - this.new_width;

            this.images.children[this.number_of_cards_by_index].style.left = `${beginning_of_deck}px`;
            this.last_position[this.number_of_cards_by_index]=beginning_of_deck;

            this.images.insertBefore(this.images.children[this.number_of_cards_by_index],this.images.children[0]);
            this.last_position.splice(0,0, this.last_position.pop());

            const small_image_beginning_of_deck = this.last_position_selection_image[0] - this.change_in_left_for_selection;

            this.small_images.children[this.number_of_cards_by_index].style.left = `${small_image_beginning_of_deck}px`;
            this.last_position_selection_image[this.number_of_cards_by_index]=small_image_beginning_of_deck;

            this.small_images.insertBefore(this.small_images.children[this.number_of_cards_by_index],this.small_images.children[0]);
            this.last_position_selection_image.splice(0,0, this.last_position_selection_image.pop());                 
        }
    }

    selection_clicked =(i) =>{

        let shift=i-this.middle_card_by_index-this.current_card+1;

        for (let i=0;i<this.images.children.length; i++){
            const updated_position=this.last_position[i] - (shift*this.new_width);

            this.images.children[i].style.left = `${updated_position}px`;
            this.images.children[i].style.transitionDuration='0.25s';
            this.last_position[i]=updated_position;

            const small_image_updated_position=this.last_position_selection_image[i] - (shift*this.change_in_left_for_selection);

            this.small_images.children[i].style.left = `${small_image_updated_position}px`;
            this.small_images.children[i].style.transitionDuration='0.25s';
            this.last_position_selection_image[i]=small_image_updated_position;
        }         

        for (let i=0;i<Math.abs(shift); i++){
            this.handle_boundaries();
        }
        
        this.current_card=this.current_card+shift;

        this.create_small_image_border();

        this.start_autoplay();        
    }

    Test = ()=>{
            clearTimeout(this.autoplay_timeout_id)
            clearInterval(this.autoplay_interval_id)
            console.log()
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
                            const updated_position = this.last_position[i] - this.new_width;

                            this.images.children[i].style.left = `${updated_position}px`;
                            this.last_position[i]=updated_position;
                        }
                    }
                    if (this.small_images!==null){
                        for(let i=0; i<this.small_images.children.length; i++) {
                            this.small_images.children[i].style.transitionDuration='0.25s';
                            const small_image_updated_position = this.last_position_selection_image[i] - this.change_in_left_for_selection;

                            this.small_images.children[i].style.left = `${small_image_updated_position}px`;
                            this.last_position_selection_image[i]=small_image_updated_position;
                        }
                    }
                    
                    this.handle_boundaries();
                    this.create_small_image_border();
                }, 1100);
            }, 1200);
        }catch{console.log('problem')}

    }

    render(){
        return(
            <Fragment>
                 <button onClick={this.Test}>test</button>
                <div ref={ref_id=>this.big_box=ref_id} style={{width:`${this.new_width}px`, height:"100%"}}>
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
                     <div style={styles.selection_row} ref={ref_id=>this.selection_row = ref_id}>

                        <img onClick={this.handle_prev} ref={ref_id=>this.lower_button_prev = ref_id} style={styles.selection_prev_button} src={LeftChev} alt="prev" id="prev"/>

                        <div ref={ref_id=>this.small_images= ref_id } style={styles.selection_images}>
                            {this.state.cards_small}
                        </div>
                        

                        <img onClick={this.handle_next}  ref={ref_id=>this.lower_button_next = ref_id}  style={styles.selection_next_button}  src={RightChev}  alt="next" id="next"/>

                    

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
        //overflow:'hidden',
    },
    images_container:{
        margin:0,
        padding:0,
        width:'inherit',
        height:'90%',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
    },
    selection_row:{
        overflow:'hidden',
        margin:0,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        border:"1px solid black",
        // justifyContent:'space-around',
        height:'10%',
        position:'absolute',
        top:'85%',
        left:'50%',
        transform:'translate(-50%,-50%)',
    },
    selection_images:{
        //visibility:'hidden',
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
    },
    selection_prev_button:{
        position:'absolute',
        left:'0%',
        width:'10%',
        height:'100%',
        transform:'translate(0%,0%)',
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
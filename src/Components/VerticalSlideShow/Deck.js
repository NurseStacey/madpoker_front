import React, {Component, Fragment} from 'react'
import Card from './Card'


class VerticalDeck extends Component {
    constructor(props){
        super(props)
        this.state={
            percent_of_window:props['Percent_of_Window'],
            cards:props['All_Images'].map((one_link,index)=><Card picsum={one_link} id={index} key={index} />),
        }
    }

    componentDidMount(){

        this.number_of_cards_by_index = this.images.children.length-1;
        this.middle_card_by_index = Math.floor(this.number_of_cards_by_index/2);

        let img_width_as_percentage=90;

        this.new_width=  (img_width_as_percentage/100)*window.innerWidth*(this.state.percent_of_window/100);
        this.new_height=  (img_width_as_percentage/100)*window.innerHeight*(this.state.percent_of_window/100);

        this.view_port.style.width=`${this.new_width}px`;
        this.view_port.style.height=`${this.new_height}px`;

        this.current_card=1


      
        this.last_position=[];
        // this.right_boundary = parseFloat(this.images.children[this.number_of_cards_by_index].style.left)+this.new_width
        // this.left_boundary = parseFloat(this.images.children[0].style.left)-this.new_width
        this.bottom_boundary = parseFloat(this.images.children[this.number_of_cards_by_index].style.top)+this.new_height
        this.top_boundary = parseFloat(this.images.children[0].style.top)-this.new_height
        this.order_cards();

        for (let i=0;i<this.images.children.length;i++){
            //console.log(`${i} - ${this.images.children[i].style.top}`)
            this.last_position.push(parseFloat(this.images.children[i].style.top))
        }

        this.scroll_in_progress=false;
        this.start_autoplay();
    }

    order_cards=()=>{

        let counter_for_bottom=1,
            counter_for_top=this.middle_card_by_index-2

        for (let i=0; i<this.images.children.length; i++){
            this.images.children[i].style.transitionDuration='0.25s';

            if (i<this.middle_card_by_index){

                this.images.children[i].style.top = `-${this.top_boundary-(counter_for_top*this.new_height) - this.new_height/2+300}px`
                counter_for_top--;
                //console.log(this.images.children[i].style.top)
            }else if (i>this.middle_card_by_index){

                this.images.children[i].style.top = `${this.top_boundary+(counter_for_bottom*this.new_height) + this.new_height/2+300}px`
                counter_for_bottom--;
                //console.log(this.images.children[i].style.top)
            }else{

                this.images.children[i].style.top =`${this.top_boundary+this.new_height/2 +300}px`
                console.log(i)
                console.log(this.images.children[i].style.top)
                console.log(this.new_height)
                console.log(this.top_boundary)
            }
        }


    }


    handle_boundaries=()=>{

        if (this.current_card>this.number_of_cards_by_index) {
            this.current_card=0
        }

        if(this.current_card<0) {
            this.current_card=this.number_of_cards_by_index
        }

        // if (this.last_position[0]<=this.left_boundary){
        //     const end_of_deck = this.last_position[this.number_of_cards_by_index] + this.new_width;
        if (this.last_position[0]<=this.top_boundary){
            const end_of_deck = this.last_position[this.number_of_cards_by_index] + this.new_height;
  
            this.images.children[0].style.top = `${end_of_deck}px`;
            //this.images.children[0].style.left = `${end_of_deck}px`;
            this.last_position[0]=end_of_deck;

            this.images.appendChild(this.images.children[0],this.images.children[this.number_of_cards_by_index]);
            this.last_position.splice(this.number_of_cards_by_index, 0, this.last_position.shift());

        }

        // if (this.last_position[this.number_of_cards_by_index]>=this.right_boundary){

        //     const beginning_of_deck = this.last_position[0] - this.new_width;
        if (this.last_position[this.number_of_cards_by_index]>=this.bottom_boundary){

            const beginning_of_deck = this.last_position[0] - this.new_height;            

            this.images.children[this.number_of_cards_by_index].style.top = `${beginning_of_deck}px`;
            //this.images.children[this.number_of_cards_by_index].style.left = `${beginning_of_deck}px`;
            this.last_position[this.number_of_cards_by_index]=beginning_of_deck;

            this.images.insertBefore(this.images.children[this.number_of_cards_by_index],this.images.children[0]);
            this.last_position.splice(0,0, this.last_position.pop());
                
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
                 <button onClick={this.Test}>test</button>
                <div ref={ref_id=>this.big_box=ref_id} style={{width:`${this.new_width}px`, height:"100%"}}>
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
        height:'90%',
        position:'absolute',
        top:'40%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        border:'1px solid black',
        overflow:'hidden',
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
   
}
export default VerticalDeck;
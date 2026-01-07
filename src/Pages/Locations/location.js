import {VenuePics} from '../../data-files/venue-pictures';
import VerticalDeck from '../../Components/VerticalSlideShow/VerticalDeck';

export default function Locations(){

    return(
        <div
            style={{
                width:"600px",
                height:"2000px",
                border:'1px solid black'
            }}
            >

            <VerticalDeck
                All_Images={VenuePics}
                Percent_of_Window={40}/>

        </div>
    )
}
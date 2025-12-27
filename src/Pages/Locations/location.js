import {VenuePics} from '../../data-files/venue-pictures';
import VerticalDeck from '../../Components/VerticalSlideShow/Deck';

export default function Locations(){

    return(
        <div
            style={{
                width:"600px",
                height:"2000px"
            }}
            >

            <VerticalDeck
                All_Images={VenuePics}
                Percent_of_Window={30}/>

        </div>
    )
}
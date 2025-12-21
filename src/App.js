import './App.css';
import './styles.css'
import Deck from'./Components/Deck'
//import Deck from './Components/my-slide-show'

import {Winners} from './data-files/images'

 export default function App(){
    return (

        <div
            style={{
                width:'750px',
                height:'750px',
                
                marginLeft:'100px',
                position:'relative',
            }}>
            <Deck
                All_Images={Winners}/>
        </div>
    )
 }
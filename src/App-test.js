import './App.css';
import './styles.css'
import Deck from'./Components/Deck'
//import Deck from'./Components/temp-file'
//import Deck from './Components/my-slide-show'

import {Winners} from './data-files/images'

 export default function App(){
    return (
        <div
            style={{
                width:'300px',
                height:'500px',
                
                marginLeft:'100px',
                position:'relative',
            }}>
            <Deck
                All_Images={Winners}/>
        </div>
    )
 }
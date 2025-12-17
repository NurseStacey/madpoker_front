import '../../App.css'
import TopMessage from './top-message'
import Award from './award'
import Contact from './contact'
import Merchandise from './merchandise'
import Slider from '../../Components/slider'

export default function HomeScreen()
{
    return(
        <div
            className='RightSide'
            >
                <div
                    style={{
                        display:'block',
                        width:'60%',
                    }}
                    >
                    <TopMessage/>
                    <Award/>
                    <Slider/>
                </div>
                 <div
                    style={{
                        display:'block',
                        width:'35%',
                    }}
                    >
                    <Contact/>
                    <div
                        className='MyLink'
                    >
                        <Merchandise/>
                    </div>
                </div>
            </div>
    )
}
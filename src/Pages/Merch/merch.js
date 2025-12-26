import TopMessage from './top-message'
import PictureOne from './one-picture'
import thisPicFireMan from './Images/mad_poker_fireman_merch.jpg'
import thisPicEclipse from './Images/mad_poker_eclipse_merch.jpg'
import thisPicBullet from './Images/mad_poker_bullet_logo_merch.jpg'

export default function Merch(){
    return(
        <div
            style={{
                display:"block",
                width:"50%",
            }}>
            <TopMessage/>
            <div 
                style={{
                    display:"flex",
                    justifyContent:"center"
                }}
                >
                <div
                    style={{
                        display:"block"
                    }}
                >
                    <PictureOne
                        image={thisPicFireMan}/>
                    <PictureOne
                        image={thisPicEclipse}/>
                </div>
                <div
                    style={{
                        display:"block"
                    }}
                >
                    <PictureOne
                        image={thisPicBullet}/>                    
                </div>                
            </div>
        
        </div>
    )
}
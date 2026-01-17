import '@fontsource/open-sans'
import FaceBookImg from '../../data-files/FacebookImage.jpg'

export default function FaceBook()
{

    return(
        <div
            style={{
                width:'50%',
                marginTop:'30px',
                marginLeft:'auto',
                marginRight:'auto'
            }}
        >
        <a href="https://www.facebook.com/madpoker2015/?ref=embed_page#" target="_blank">
            <div
                style={{
                    display:'flex',
                    justifyContent:'center'
                }}

                >
                    <div>
                        <img src={FaceBookImg}></img>
                    
                    </div>
                    <div
                        style={{
                            display:'block'
                        }}
                        >
                        
                        <div
                            style={{
                                font:'Arial',
                                fontSize:'18px',
                                color:'blue'
                            }}
                        >
                            MAD Poker
                        </div>
                        <div
                            style={{
                                font:'Arial',
                                fontSize:'15px',
                                color:'black'
                            }}
                        >
                            1.3K followers
                        </div>
                    </div>

            </div>
        </a>

        </div>
    )
}
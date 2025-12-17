import '@fontsource/kaushan-script'
import '@fontsource/francois-one'

export default function Contact()
{
    return(
        <div
            style={{
                width:'80%',
                border:'3px solid #00007f',
                marginTop:'50%',
                marginLeft:'auto',
                marginRight:'auto',
                display:'block',
                boxShadow:'0 3px 2px rgba(0,0,0,0.7)'
            }}>
                <div
                    style={{
                        marginTop:'30px',
                        fontFamily:'Kaushan Script',
                        fontSize:'16px',
                        textAlign:'center'
                    }}>
                    Contact Us
                </div>
                <div
                    style={{
                        fontFamily:'francois One',
                        fontSize:'16px',
                        textAlign:'center',
                        
                    }}>
                    Marianne & David Foster 
                </div>    
                <div
                    style={{
                        fontFamily:'francois One',
                        fontSize:'16px',
                        textAlign:'center',   
                        marginBottom:'30px'
                    }}>
                    503-888-4977
                </div>                                    
        </div>
    )
}
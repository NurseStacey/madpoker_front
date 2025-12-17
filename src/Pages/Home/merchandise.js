import '@fontsource/open-sans'

export default function Merchandise()
{
    return(
        <div
            style={{
                borderRadius:'20px',
                backgroundColor:'#ff5658',
                width:'100%',
                border:'3px solid #00007f',
                marginTop:'30px',
                boxShadow:'0 3px 2px rgba(0,0,0,0.7)'
            }}
        >
            <div
                style={{
                    marginTop:'80px',
                    marginLeft:'12%',
                    marginRight:'12%',
                    fontFamily:'open sans',
                    fontSize:'14px',
                    lineHeight:'1.6'
                }}
                >
                    Shop for  MAD Poker Merchandise! Just click this button and go!
            </div>

            <div
                style={{
                    marginTop:'20px',
                    marginBottom:'80px',
                    marginLeft:'12%',
                    marginRight:'12%',
                    fontFamily:'open sans',
                    fontSize:'14px',
                    lineHeight:'1.6'
                }}
                >
                    Check out our new MERCHANDISE tab and see some of our many offerings
            </div>            

        </div>
    )
}
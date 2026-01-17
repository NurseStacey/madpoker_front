import '@fontsource/kaushan-script'

export default function Award()
{
    const AWARD ='$91,000'
    return(
        <div
            style={{
                'display':'block',
                //'height':'100px',
                'width':'100%',
                'border':'3px solid #3f007f',
                'marginTop':'2%'
            }}
        >
            <div
                style={{
                    fontFamily:'Kaushan Script',
                    fontSize:'16px'
                }}>
                
                MAD Poker has awarded more than {AWARD} in cash prizes to date!
            </div>
        </div>
    )
}
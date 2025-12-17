import MDLogo from '../Pictures/MD_Logo1.jpg'
import {MD_LINKS} from '../data-files/links'
import '@fontsource/averia-sans-libre'
import '../App.css'
import {APPLICATION_COLORS} from '../Components/application-colors'

export default function Left_Side({
    setRightSideKey,
    RightSideKey
})
{

    const SetLinkKey = (which) => {
        console.log(which)
        setRightSideKey(which)
    }

    return (
        <div
            style={{
                width:'15%',
                marginTop:'3%',
                marginLeft:'15%',
                display:'block',
            }} >

            <div
                style={{
                    display:'flex',
                    justifyContent:'flex-start',
                    marginBottom:'50px',
                }}
                >
                    <img src={MDLogo} alt="Mad Logo"  width={250} />
            </div>
            {MD_LINKS.map((one_link)=>
                <div
                    className='MyLink'
                    style={{fontFamily:'Averia Sans Libre',
                        color: (RightSideKey==one_link['id']) ? APPLICATION_COLORS['link-colors']['clicked'] :APPLICATION_COLORS['link-colors']['unclicked']
                    }}
                    key={one_link['id']}
                    onClick={()=>SetLinkKey(one_link['id'])}
                >
                    {one_link['text']}
                </div>
            )}       
        </div>
    )
}
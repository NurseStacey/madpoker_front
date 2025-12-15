import MDLogo from '../Pictures/MD_Logo1.jpg'
import {MD_LINKS} from '../data-files/links'
import '@fontsource/averia-sans-libre'
import '../App.css'

export default function Left_Side({
    setRighSideKey
})
{

    const SetLinkKey = (which) => {
        console.log(which)
        setRighSideKey(which)
    }

    return (
        <div
            style={{
                width:'15%',
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
                    key={one_link['id']}
                    onClick={()=>SetLinkKey(one_link['id'])}
                    style={{
                        fontFamily:'Averia Sans Libre',
                    }}>
                    {one_link['text']}
                </div>
            )}       
        </div>
    )
}
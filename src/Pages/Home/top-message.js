import {MESSAGE} from './notice'
import '@fontsource/open-sans'

export  default function TopMessage()
{
    const test = ()=>{console.log(MESSAGE)}

    return(
        <div
            style={{
                display:'block',
                width:'100%',
                height:'20%',
                border:'3px solid #3f007f',
                marginTop:'5%'
            }}>
               {MESSAGE.map((one_line,index)=><div
                style={{
                    fontWeight:'bold',
                    display:'flex',
                    width:'90%',
                    fontFamily:'open sans',
                    fontSize:'14px',
                    lineHeight:'1.6',
                    color:one_line['color'],
                    textAlign:'center',
                    marginTop:(index>0) ? '20px' : '0px',
                    marginLeft:'5%',
                    marginRight:'5%'
                }}>
                {one_line['text']}
                </div>)}  
        </div>
    )
}
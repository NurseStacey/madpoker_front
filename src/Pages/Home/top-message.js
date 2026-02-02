import {MESSAGE} from './notice'
import '@fontsource/open-sans'
import {useEffect,useState} from 'react'
import axios from 'axios';
import GetFont from '../../utils/get-font';


export default function TopMessage({
    LocalHeight,
    LocalWidth
})
{
    const test = ()=>{console.log(messages)}
    const [messages, setMessages]=useState([])
    const [fontSize, setfontSize]=useState(28)

    useEffect(()=>{
        //console.log(LocalHeight)
        if (LocalHeight>0) fetchData()
    },[LocalHeight])

    const fetchData = async ()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/website_data/homepagetext",);

            let finalMessageArray=[]
            let numberLines=0
            let numberOfMargins=0
            response.data.sort((a,b)=>a.order=b.order).map((oneMessage, messageIndex)=>{
                //console.log(oneMessage.text.split('<BR>'))
                oneMessage.text.split('<BR>').map((oneLine,lineIndex)=>{
                    numberLines+=1
                    let marginTop="0px"
                    if (lineIndex===0 && messageIndex!==0) {
                        numberOfMargins+=1
                        marginTop="Add_Margin"
                    }
                    finalMessageArray.push({
                        ...oneMessage,
                        'text':oneLine,
                        'marginTop':marginTop,
                        'key':`${oneMessage.id}-${lineIndex}`
                    })
                numberLines+=1
                })
            })
            let newFontSize=GetFont(LocalHeight,LocalWidth, finalMessageArray.map((oneLine)=>oneLine.text), numberOfMargins)

            setfontSize(newFontSize)

            finalMessageArray.map((oneLine)=>{
                if (oneLine.marginTop==='Add_Margin') oneLine.marginTop = `${newFontSize}px`
            })
            
            setMessages(finalMessageArray)

        }catch(err){
            alert('Problem loading Top Message')
            console.log(err);
        }
    }

    return(
        <div
            style={{
                display:'block',
                width:`${LocalWidth}px`,
                height:`${LocalHeight}px`,
                border:'3px solid #3f007f',
                marginTop:'5%',
                paddingBottom:'20px'
            }}>
                {/* <button onClick={test}>test</button> */}
               {messages.map((oneLine,index)=>
               <div
                    style={{
                        fontWeight:'bold',
                        display:'flex',
                        width:'90%',
                        fontFamily:'open sans',
                        fontSize:`${fontSize}px`,
                        lineHeight:'1.6',
                        color:oneLine['color'],
                        justifyContent:'center',
                        marginTop:oneLine['marginTop'],
                        marginLeft:'5%',
                        marginRight:'5%',
                    }}
                    key={oneLine['key']}
                >
                {oneLine['text']}
                </div>)}  
        </div>
    )
}
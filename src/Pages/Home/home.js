import '../../App.css';
import TopMessage from './top-message';
import Award from './award';
import Contact from './contact';
import Merchandise from './merchandise';
import FaceBook from './face-book';
import {Winners} from '../../data-files/images';
import SlideShow from '../../Components/SlideShow/slide-show';
import WindowDimensions from '../../utils/window-dimensions';
import {useEffect, useState} from 'react'
import {DjangoAddress} from '../../data-files/django-addres';
import axiosInstance from 'axios';
import './home.css';

export default function HomeScreen()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0)
    const [Height, setHeight] =  useState(0)
    const [LeftMargin, setLeftMargin]=useState(0)
    const [allImages, setAllImages]=useState([])

    useEffect(()=>{
        setWidth(width*0.60);
        setLeftMargin(width*.0);
        setHeight(height);

        const getWinners = async()=>{
            try{
                let url= DjangoAddress + `/players/winners/`;
                const response = await axiosInstance.get(url,);

                let thisArray=[]
                response.data.map((oneDirector)=>thisArray.push({
                    image:DjangoAddress+oneDirector.image,
                    display_text:oneDirector.display_text
                }))

                setAllImages(thisArray)
                console.log(thisArray)
            }catch(err){
                alert('Problem retrieving winners.')
            }
        }

        getWinners()
    },[])

    const Test=()=>{
        console.log(allImages)
    }
    return(

        <div
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                marginLeft:`${LeftMargin}px`,
                marginTop:'3%',                        
                display:'flex',
                justifyContent:'center',
            }}>
            <div
                className='LeftPiece'

                >
                <div
                    className='TopLeftPiece'
                >
                    <TopMessage
                        LocalHeight={Math.floor(0.30*Height)}
                        LocalWidth={Math.floor(0.60*Width)}
                        />
                    <Award/> 
                </div>
                <div
                    className='SlideShow'
                >
                    <SlideShow
                        allImages={allImages}
                        width={300}
                        height={300}
                    />

                </div>
            </div>
                 <div
                    className='RightPiece'
                    >
                    <Contact/>
                    <div
                        className='MyLink'
                    >
                        <Merchandise/>
                    </div>
                    <div
                        className='MyLink'
                    >
                        <FaceBook/>
                    </div>
                </div>             

        </div>
  
        

    )
}
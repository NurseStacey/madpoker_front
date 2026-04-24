import {useEffect, useState} from 'react';
import WindowDimensions from '../../utils/window-dimensions';
import '@fontsource/averia-sans-libre';
import axiosInstance from 'axios';
import FadeSlideShow from '../../Components/fade-slide-show/fade-slide-show';
import {DjangoAddress} from '../../data-files/django-addres';


export default function DirectorsPage({})
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [allDirectors, setAllDirectors]=useState([]);
    const [imageWidth, setImageWidth]=useState('00px');
    const [imageHeight, setImageHeight]=useState('00px')
    
    useEffect(()=>{
        setWidth(width*0.60)
        setHeight(height)
        setImageWidth(`${width*.35}px`)
        setImageHeight(`${width*.35}px`)
        fetchData()
    },[]);

    const fetchData = async ()=>{
        try{
            let url= DjangoAddress + `/login_api/all_user/`;
            const response = await axiosInstance.get(url,);

            let thisArray=[]
            response.data.map((oneDirector)=>thisArray.push({
                image:DjangoAddress+oneDirector.image,
                displayName:oneDirector.display_name
            }))
            setAllDirectors(thisArray)
            //console.log(thisArray)
        }catch(err){
            alert('Problem retrieving directors.')
        }
    }    
    
    return(
        <div
            style={{
                width:`${Width}px`,
                height:`${Height}px`,  
                marginLeft:'5%',
                display:'block'
            }}
            >
                <div
                    style={{
                        fontSize:'35px',
                        fontFamily:"averia sans libre",
                        width:'80%',
                        marginTop:'20%',
                        color:'red',
                        textDecoration:'underline'
                    }}
                >
                    Our Family of Directors
                </div>
                <div
                    style={{
                        width:'80%',
                        marginTop:'3%',                        
                        display:'flex',
                        justifyContent:'center'
                    }}
                >
                    <FadeSlideShow
                        allImages={allDirectors}
                        height={imageHeight}
                        width={imageWidth}
                    />
                </div>

        </div>
    )
}
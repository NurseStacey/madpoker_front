import { Slide } from "react-slideshow-image"
import image1 from '../Pictures/image1.jpg'
import image2 from '../Pictures/image2.jpg'
import image3 from '../Pictures/image3.jpg'
import image4 from '../Pictures/image4.jpg'
import image5 from '../Pictures/image5.jpg'
//import slideImages from "../data-files/images"

import "react-slideshow-image/dist/styles.css"
import styles from './slider.module.css'

export default function Slider() {

    const IMAGES = [image1,image2,image3, image4, image5]
    const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
    }
    const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px',
    width:'400px'
    }

    const slideImages = [
        {
            url: 'https://th.bing.com/th?id=ORMS.a5318bc223190af6f7fb33789d6fefb7&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.25&p=0',
            caption: 'Slide 1'
        },
        {
            url: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1Stnfb.img?w=768&h=402&m=6&x=902&y=170&s=59&d=59',
            caption: 'Slide 2'
        },
        {
            url: 'https://th.bing.com/th?id=ORMS.a5318bc223190af6f7fb33789d6fefb7&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.25&p=0',
            caption: 'Slide 3'
        },
    ];

  return (
    <div>
        <div style={{
            display:'flex',
            justifyContent:'center',
            fontSize:'20px'}}
            >Slide Show</div>
        <div className="slide-container">

        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                <span style={spanStyle}>{slideImage.caption}</span>
              </div>
            </div>
          ))} 
        </Slide>
        </div>
    </div>
  );
}
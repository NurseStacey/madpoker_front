import ImageDiv from'./image-div';

export default function OnePair({
    bottomImage,
    topImage,
    displayName,
    isVisible,
    width,
    height
})
{
    return (
        <div>
             <ImageDiv
                image={topImage}
                zindexvalue='2'
                visiblevalue={isVisible}
                opacityvalue={isVisible}
                width={width}
                height={height}
            />  
            <ImageDiv
                image={bottomImage}
                zindexvalue='1'
                visiblevalue={!isVisible}
                opacityvalue={isVisible}
                width={width}
                height={height}
            />
            <div
                style={{
                    position:'absolute',
                    bottom:'0px',
                    padding:'2px',
                    backgroundColor:'lightgray',
                    color:'white',
                    textAlign:'center',
                    zIndex:'3',
                    width:width,
                    fontSize:'20px'
                }}
            >
                {displayName}
            </div>            
        </div>
    )
}
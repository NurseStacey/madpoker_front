

export default function ImageDiv({
    image,
    zindexvalue,
    visiblevalue,
    opacityvalue,
    width,
    height
})
{
    return(
            <div
            style={{
                position:'absolute',
                top:'0px',
                left:'0px',
                zIndex:zindexvalue,
                opacity: visiblevalue ? 1 : 0,
                transition: opacityvalue ? 'opacity .5s ease-in-out' : 'opacity 0s ease-in-out',
                }}            
        >
            {(image!=='') ? <img src={image} width={width} height={height}/> : <></>}
        </div>          
    )
}
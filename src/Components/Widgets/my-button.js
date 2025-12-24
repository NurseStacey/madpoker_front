

export default function MyButton({
    button_function,
    button_text,
    button_style
})
{
    return(
        <div
            onClick={button_function}
            style={{
                
                width:'75px',
                height:'40px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                border:'1px  solid  black',
                cursor:'pointer',
                wrap:'wrap',
                font:'Arial',
                fontSize:'20px',
                backgroundColor:'aqua',
                ...button_style,
            }}
            >
                {button_text}
            </div>
    )
}
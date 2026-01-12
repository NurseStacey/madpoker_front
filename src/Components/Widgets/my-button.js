

export default function MyButton({
    button_function,
    button_text,
    button_style,
    disable
})
{
    const localFunctin=()=>{
        try{  
            if(disable) return

            button_function()

        } catch {button_function()}

    }
    return(
        <div
            onClick={localFunctin}
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
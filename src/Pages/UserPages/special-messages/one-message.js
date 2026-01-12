import MyButton from '../../../Components/Widgets/my-button'

export default function OneMessage({
    thisMessage,
    deleteFunction,
    editFunction
})
{
    return(
        <div
            style={{
                font:"arial",
                fontSize:"25px",
                margin:"5% 5%",
                color:thisMessage['color'],
                display:"flex",
                flexDirection:"row",                
            }}>
                    <MyButton
                        button_function={()=>deleteFunction(thisMessage.id)}
                        button_text={"Delete"}  
                        button_style={{
                            width:"6%",
                            margin:"0% 2%"
                        }}
                        disable={false}              
                    />      
                    <MyButton
                        button_function={()=>editFunction(thisMessage.id)}
                        button_text={"Edit"}  
                        button_style={{
                            width:"6%",
                            margin:"0% 2%"
                        }}
                        disable={false}                      
                    />                                   
                    <div
                        style={{
                            width:"10%"
                        }}
                        >
                            {thisMessage.date}
                        </div>
                    <div
                        style={{
                            width:"10%"
                        }}
                        >
                            {thisMessage.color}
                        </div>  
                    <div
                        style={{
                            width:"10%"
                        }}
                        >
                            {thisMessage.font_size}
                        </div>                        
                    <div
                        style={{
                            width:"70%",
                            color:thisMessage.color
                        }}
                        >
                            {thisMessage.text}
                        </div>                
            
        </div>
    )
}
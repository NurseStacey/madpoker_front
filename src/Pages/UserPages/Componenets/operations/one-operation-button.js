import MyButton from "../../../../Components/Widgets/my-button"

export default function OneOperationButton({
    buttonText,
    buttonLink,
    NavigationFunction
}){
    return(
        <MyButton
                    button_style={{
                        margin:'40px',
                        height:'100px',
                        width:'100px'
                    }}
                    button_function={()=>NavigationFunction(buttonLink)}
                    button_text={buttonText}
                    disable={false}
        />
    )
}
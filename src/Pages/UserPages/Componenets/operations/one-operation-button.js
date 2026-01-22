import MyButton from "../../../../Components/Widgets/my-button";
import GetFont from '../../../../utils/get-font';


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
                        width:'100px',
                        fontSize:`${GetFont(100, 100, [buttonText],0)}`
                    }}
                    button_function={()=>NavigationFunction(buttonLink)}
                    button_text={buttonText}
                    disable={false}
        />
    )
}
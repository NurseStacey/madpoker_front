import MyButton from './Widgets/my-button';
import { useNavigate } from "react-router-dom";

export default function AdminButton(){
    const navigate = useNavigate();
    
    return(
        <MyButton
            button_function={()=>navigate("/admin")}
            button_text={"Return to Admin"}
            button_style={{
                height:"80px",
                width:"100px",
                margin:"1% auto"
            }}
            disable={false}
        />          
    )
}
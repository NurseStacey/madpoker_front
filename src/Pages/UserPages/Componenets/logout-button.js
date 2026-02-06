import MyButton from '../../../Components/Widgets/my-button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LogoutButton(){
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try{
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if(accessToken && refreshToken) {
                const config = {
                headers: {
                    "Authorization":`Bearer ${accessToken}`
                }
                };

                await axios.post("http://127.0.0.1:8000/login_api/logout/", {"refresh":refreshToken}, config)
                
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                    // setisLoggedIn(false);
                    // setusername("");    
                navigate("/login",)            
            }
        }
        catch(error){console.log(error)}
    }
    return(
        <MyButton
            button_function={handleLogout}
            button_text={"Logout"}
            button_style={{
                height:"80px",
                width:"100px",
            }}
            disable={false}
        />          
    )
}
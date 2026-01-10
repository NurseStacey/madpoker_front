import MyInput from '../../Components/Widgets/my-input'
import MyButton from '../../Components/Widgets/my-button'
import MyDropdownText from '../../Components/Widgets/my-dropdown-text'
import {useState, useEffect} from 'react'
import axios from 'axios'


export default function GameRegisteration({
    setOpenModal
})
{
    const [allPlayers, setAllPlayers]=useState([])
    const [player, setPlayer]=useState("")

    const RegisterForGame=()=>{

        setOpenModal(false)
    }

    const NameSelected=(name)=>{

    }

    const LoadPlayers = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/players/players/",);
            setAllPlayers(response.data)

            console.log(response.data)
        }catch(err){
            console.log(err);
        } 
    }
    useEffect(()=>{
        LoadPlayers()
    },[])

    return(
        <div
            style={{
                position:'fixed',
                border:'1px solid black',
                backgroundColor:'#FADADD',
                width:'800px',
                height:'700px',
                // top:'50%',
                // left:'50%',
                // transform:'translate(-50%,-50%)',   
                zIndex:'1000'
            }}>
            <div
                style={{
                    height:"60%"
                }}
            >                
                <div
                    style={{
                        fontSize:'20px',
                        marginTop:'30px'
                    }}>
                Registration
                </div>


                <MyDropdownText
                    optionsList={allPlayers}
                    setSelectedOption={NameSelected}
                    selection={player}
                    style={{
                        height:"100px",
                        margin:"10px auto"
                    }}
                    disable="false"
                    name="all_players"
                />
                <div
                    style={{
                        fontSize:'20px',
                        marginTop:'30px'
                    }}>
                New User
                </div>                
            </div>

            <div
                style={{
                    display:"flex",
                    justifyContent:"center"
                }}
            >
                <MyButton
                    button_function={()=>setOpenModal(false)}
                    button_text="Cancel"
                    button_style={{
                        margin:"50px",
                        width:"100px",
                        height:"80px"}}
                />
                <MyButton
                    button_function={RegisterForGame}
                    button_text="Register for Game"
                    button_style={{
                        margin:"50px",
                        width:"100px",
                        height:"80px"}}
                />                
            </div>
        </div>

    )
}
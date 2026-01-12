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
    const [player, setPlayer]=useState({
        player:"",
        email:"",
        phone:""
    })
    const [newPlayer, setNewPlayer]=useState({
        player:"",
        email:"",
        phone:""
    })
    const [disableButton, setDisableButton]=useState(true)

    useEffect(()=>{

        setDisableButton((newPlayer.player.length<4))

    },[newPlayer])

    const handleChange = (e) =>{
        setNewPlayer({
            ...newPlayer,
            [e.target.name]:e.target.value
        })
    }

    const RegisterNewPlayer = async ()=>{
        console.log("here")
        try{
            const response = await axios.post("http://127.0.0.1:8000/players/players/",newPlayer)
            setNewPlayer({
                player:"",
                email:"",
                phone:""
            })

        }
        catch(error){
           console.log(error)

        }        
    }
    const RegisterAndSignUp=()=>{
        RegisterNewPlayer()
        SignupForGame()
    }
    
    const SignupForGame=()=>{
        console.log(disableButton)
        //setOpenModal(false)
    }

    const NameSelected=(e)=>{
        console.log(e)
        setPlayer(allPlayers.find((onePlayer)=>onePlayer.player===e.target.value))
    }

    const LoadPlayers = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/players/players/",);
            setAllPlayers(response.data)

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
                    optionsList={allPlayers.map((onePlayer)=>onePlayer.player)}
                    setSelectedOption={NameSelected}
                    selection={player.player}
                    style={{
                        height:"100px",
                        margin:"10px auto"
                    }}
                    disable={false}
                    name="all_players"
                />

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
                            margin:"10px  50px",
                            width:"100px",
                            height:"80px"}}
                        disable={false}
                    />
                    <MyButton
                        button_function={SignupForGame}
                        button_text="Sign up for Game"
                        button_style={{
                            margin:"10px  50px",
                            width:"100px",
                            height:"80px"}}
                        disable={false}
                    />        
                </div>             
                <div
                    style={{
                        fontSize:'20px',
                        marginTop:'30px'
                    }}>
                New User
                </div>   
                <div
                    style={{
                        border:'1px solid black',
                        margin:'0px auto',
                        width:'300px'
                    }} 
                >
                    <MyInput
                        labelText="UserName"
                        handleChange={handleChange}
                        inputValue={newPlayer.player}
                        inputName="player"
                        inputType="text"
                    />
                    <MyInput
                        labelText="email"
                        handleChange={handleChange}
                        inputValue={newPlayer.email}
                        inputName="email"
                        inputType="text"
                    />
                    <MyInput
                        labelText="Phone"
                        handleChange={handleChange}
                        inputValue={newPlayer.phone}
                        inputName="phone"
                        inputType="text"
                    />   
                    <MyButton
                        button_function={RegisterAndSignUp}
                        button_text="Register and Sign up for Game"
                        button_style={{
                            fontSize:'15px',
                            margin:"50px auto",
                            width:"100px",
                            height:"80px"}}
                        disable={disableButton}
                    />                                                               
                </div>            
            </div>

        </div>

    )
}
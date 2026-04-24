import {useState,useEffect} from 'react';
import axiosInstance from 'axios';
import WindowDimensions from '../../../utils/window-dimensions';
import Title from '../Componenets/Title';
import ListBoxSearch from '../../../Components/Widgets/my-listbox-search/my-listbox-search';
import MyInput from '../../../Components/Widgets/my-input';
import MyButton from '../../../Components/Widgets/my-button';
import axios from 'axios';

export default function AddWinner(){
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);
    const [formData, setFormData]=useState({
        player:"",
        image:"",
        display_text:"",
    });
    const [allPlayers, setAllPlayers]=useState([]);    
    const [selectedPlayer, setSelectedPlayer]=useState({
        id:-1,
        player:""
    });
    const [fileKey,setFileKey]=useState(Date.now())

    useEffect(()=>{
        setWidth(width)
        setHeight(height)

        const getPlayers = async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/players/players/",);        
                setAllPlayers(response.data.sort((a,b)=>a.player.localeCompare(b.player)))                
            }catch(err){
                console.log(err)
            }
        }

        getPlayers()

    },[]);

    const handlesubmit = async () =>{
        setFileKey(Date.now())
        let formToSend = new FormData();

        if (formData.image)
            formToSend.append("image", formData.image, formData.image.name);
        formToSend.append("player", formData.player);
        formToSend.append("display_text", formData.display_text);

        try{
            const response = await axiosInstance.post("http://127.0.0.1:8000/players/winners/",formToSend, {
                headers: { 'Content-Type': 'multipart/form-data'}})
            setFormData({
                player:"",
                image:"",
                display_text:"",
            })
            setSelectedPlayer({
                id:-1,
                player:""
            })
        }
        catch(error){
           console.log(error)
        }
    }

    const handleChange=(e)=>{
            if (e.target.name==='image') {
            setFormData({
                ...formData,
                [e.target.name]:e.target.files[0]
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]:e.target.value
            })
        }
    }

    const PlayerChosenFromBox = (thisPlayer)=>{
        //console.log(thisPlayer)
        if (thisPlayer===""){
            setSelectedPlayer({
                id:-1,
                player:""
            });
        } else {
        let thisPlayerObj=allPlayers.find((onePlayer)=>onePlayer.player===thisPlayer)
        setSelectedPlayer(thisPlayerObj)
        }
    }

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>
            {/* <button onClick={test}>test</button> */}

            <Title
                TitleText = "MAD Poker Add Winner"
                />          
            <div
                style={{
                    display:"block",
                    width:"80%",
                    border:"3px solid blue",
                    margin:"100px auto"

                }}
            >
                <div                
                    style={{
                        position:'relative',
                        height:'100px',
                    }}>
                    <ListBoxSearch
                        selection={selectedPlayer.player}
                        setSelection={PlayerChosenFromBox}
                        title={"Player"}
                        theList={allPlayers.map((onePlayer)=>onePlayer.player)}
                        MyListBoxSearchStyle={{
                            left:"50%",
                            translate:'-50%'
                        }}
                    />                     
                </div>  
                <div>
                    <MyInput
                        labelText = 'Display Text'
                        handleChange={handleChange}
                        inputValue={formData.display_text}
                        inputName='display_text'
                        inputType='text'
                        inputStyle={{
                            fontSize:'25px'
                        }}

                    />
                </div>
                <div>
                     <MyInput
                        labelText = 'Image'
                        handleChange={handleChange}
                        inputName='image'
                        inputType='file'
                        inputStyle={{
                            fontSize:'25px'
                        }}     
                        inputKey={fileKey}           
                    />
                </div>
              
                <div>
                    <MyButton
                        button_function={handlesubmit}
                        button_text='Add Winner' 
                        button_style={{
                            height:"100px",
                            width:"100px",
                            margin:"1% auto"
                        }}
                        disable={false}              
                    /> 
                </div>
            </div>

                              
            
        </div>
    )
}

                {/* <div>
                    <ListBoxSearch
                        selection={selectedPlayer.player}
                        setSelection={PlayerChosenFromBox}
                        title={"Player"}
                        theList={allPlayers.map((onePlayer)=>onePlayer.player)}
                        MyListBoxSearchStyle={{
                            padding:"0px 25px",
                            width:'25%',
                            left:"20%",
                            translate:'-50%'
                        }}
                    />   
                </div>
                <div>
                    
                <div>
                     <MyInput
                        labelText = 'Image'
                        handleChange={handleChange}
                        inputValue={formData.image}
                        inputName='image'
                        inputType='file'
                        inputStyle={{}}     
                        inputKey={fileKey}           
                    />
                </div>
               
     
            </div> */}
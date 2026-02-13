import CurrentGameTypesButton from './current-game-types-buttons';
import {useState} from 'react';
import axios from 'axios';


export default function CurrentGameType({
    fetchData,
    allGameTypes,
    selectedGameType,
    setSelectedGameType,
    formData
})
{
    const [buttonText, setButtonText]=useState("Deactivate")
    
    const getGameType = (id) =>{
        return allGameTypes.find((oneGameType)=>oneGameType.id===id)
    }

    const Delete= async ()=>{

        try{
            const response = (await axios.delete(`http://127.0.0.1:8000/games/one_game_type/${selectedGameType}/`,))
            fetchData();
            setSelectedGameType(null);
        }catch(err){    

            if(err.response.status===400) {alert('Error deleting game type')
            } else if(err.response.status===403) {alert('Cannot remove game type.  Games have been played here.') }
        }
    }

    const ChangeActive= async()=>{

        try{
            let thisVenue = getGameType(selectedGameType)
            let updatedData={
                venue_name:thisVenue.venue_name,
                active:!thisVenue.active                

            }
            console.log(updatedData)
            const response = await axios.patch(`http://127.0.0.1:8000/games/one_game_type/${selectedGameType}/`,updatedData);
            
            fetchData()
            setSelectedGameType(null)

        }catch(err){
            alert('Error changing status of venue')
        }             
    }

    const Update= async ()=>{
        try{
            
            let updatedData={
                name:formData.name,
            }

            const response = await axios.patch(`http://127.0.0.1:8000/games/one_game_type/${selectedGameType}/`,updatedData);
            
            fetchData()
            setSelectedGameType(null)

        }catch(err){
            alert('Error updating venue')
        }      
    }        

    const GameTypeSelected=(id)=>{
        let thisVenue=getGameType(id)

        if (selectedGameType===null) {
            setSelectedGameType(id)
            
            if (thisVenue.active) setButtonText("Deactivate")
                else setButtonText("Activate")            
            return
        }

        if (selectedGameType===id) {
            setSelectedGameType(null)
            return
        }
        setSelectedGameType(id)
        
    }

    const Test=()=>{
        console.log(allGameTypes)
    }

    return(
        <div
            style={{
                display:"block",
                width:"40%",
                margin:"5%",
                border:'1px solid black',
                padding:'40px'
            }}>
                <CurrentGameTypesButton
                    selectedGameType={selectedGameType}
                    setSelectedGameType={setSelectedGameType}
                    ChangeActive={ChangeActive}
                    Delete={Delete}
                    Update={Update}
                    buttonText={buttonText}
                />

            <div

                style={{
                    overflowY:"scroll",
                    display:"block"
                }}
            >
                {allGameTypes.map((oneGameType)=>(
                    <div
                        onClick={()=>GameTypeSelected(oneGameType.id)}
                        key={oneGameType.id}
                        style={{
                            backgroundColor:(oneGameType.id===selectedGameType) ? "pink" :"white",
                            fontSize:"18px",
                            textAlign:"left"
                        }}>
                        {oneGameType.name} 
                    </div>
                ))}
            </div>
            <button onClick={Test}>test</button>
        </div>
    )
}
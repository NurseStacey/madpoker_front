import CurrentVenuesButton from './current-venues-buttons'
import {useState,useEffect} from 'react';
import axios from 'axios';


export default function CurrentVenues({
    fetchData,
    allVenues,
    selectedVenue,
    setSelectedVenue,
    formData
})
{
    const [buttonText, setButtonText]=useState("Deactivate")
    
    const getVenue = (id) =>{
        return allVenues.find((oneVenue)=>oneVenue.id===id)
    }


    const Delete= async ()=>{

        try{
            //const response = await axios.delete(`http://127.0.0.1:8000/website_data/specialmessages/${id}/`,);
            const response = await axios.delete(`http://127.0.0.1:8000/venues/onevenue/${selectedVenue}/`,);
            
            fetchData()
            setSelectedVenue(null)

        }catch(err){
            console.log(err);
        }        
    }

    const ChangeActive= async()=>{

        try{
            let thisVenue = getVenue(selectedVenue)
            let updatedData={
                venue_name:thisVenue.venue_name,
                active:!thisVenue.active                

            }
            console.log(updatedData)
            const response = await axios.patch(`http://127.0.0.1:8000/venues/onevenue/${selectedVenue}/`,updatedData);
            
            fetchData()
            setSelectedVenue(null)

        }catch(err){
            console.log(err);
        }             
    }

    const Update= async ()=>{
        try{
            
            let updatedData={
                venue_name:formData.venue_name,
                active:true
            }

            const response = await axios.patch(`http://127.0.0.1:8000/venues/onevenue/${selectedVenue}/`,updatedData);
            
            fetchData()
            setSelectedVenue(null)

        }catch(err){
            console.log(err);
        }      
    }        

    const VenueSelected=(id)=>{
        let thisVenue=getVenue(id)

        if (selectedVenue===null) {
            setSelectedVenue(id)
            
            if (thisVenue.active) setButtonText("Deactivate")
                else setButtonText("Activate")            
            return
        }

        if (selectedVenue===id) {
            setSelectedVenue(null)
            return
        }
        setSelectedVenue(id)
        
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
                <CurrentVenuesButton
                    selectedVenue={selectedVenue}
                    setSelectedVenue={setSelectedVenue}
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
                {allVenues.map((oneVenue)=>(
                    <div
                        onClick={()=>VenueSelected(oneVenue.id)}
                        key={oneVenue.id}
                        style={{
                            backgroundColor:(oneVenue.id===selectedVenue) ? "pink" :"white",
                            fontSize:"18px",
                            textAlign:"left"
                        }}>
                        {(oneVenue.active) ? oneVenue.venue_name : oneVenue.venue_name + ' - inactive'} 
                    </div>
                ))}
            </div>
        </div>
    )
}
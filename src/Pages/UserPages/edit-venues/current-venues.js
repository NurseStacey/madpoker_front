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
    
    const getVenue = () =>{
        return allVenues.find((oneVenue)=>oneVenue.id===selectedVenue)
    }
    
    useEffect(()=>{
        if (selectedVenue===null) {
            let thisVenue=getVenue()
            if (thisVenue.active) setButtonText("Deactivate")
                else setButtonText("Activate")
        }
    },[selectedVenue])

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
            let thisVenue = getVenue()
            let updatedData={
                VenueName:thisVenue.VenueName,
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
                VenueName:formData.VenueName,
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
        //console.log(getVenue()) 

        if (selectedVenue===null) {
            setSelectedVenue(id)
            return
        }

        if (getVenue().active) setSelectedVenue(null)
            else setSelectedVenue(id)
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
                        }}>
                        {(oneVenue.active) ? oneVenue.VenueName : oneVenue.VenueName + ' - inactive'} 
                    </div>
                ))}
            </div>
        </div>
    )
}
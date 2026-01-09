import MyButton from '../../../Components/Widgets/my-button';
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
        console.log(getVenue())
      //  if (getVenue().active) setButtonText("Deactivate")
        //    else setButtonText("Activate")
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

    const Update= async ()=>{
        try{
            let thisVenue = getVenue()
            let updatedData={
                VenueName:thisVenue.VenueName,
                active:!thisVenue.VenueName
            }

            const response = await axios.patch(`http://127.0.0.1:8000/venues/onevenue/${selectedVenue}/`,updatedData);
            
            fetchData()
            setSelectedVenue(null)

        }catch(err){
            console.log(err);
        }      
    }        

    const VenueSelected=(id)=>{
        console.log(getVenue()) 

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
            <div
                style={{
                    width:"100%",
                    height:"100px",
                    display:"flex",
                    justifyContent:"space-around"
                }}>
                <MyButton
                    button_function={ChangeActive}
                    button_text={"Make Inactive"}
                    button_style={{
                        height:"50px",
                        width:"100px",
                        margin:"auto",
                        backgroundColor: (selectedVenue!==null) ? "#00FFFF" : "#088080"
                    }}
                />    
                <MyButton
                    button_function={Delete}
                    button_text={"Delete"}
                    button_style={{
                        height:"50px",
                        width:"100px",
                        margin:"auto",
                        backgroundColor: (selectedVenue!==null) ? "#00FFFF" : "#088080"
                    }}
                />    
                <MyButton
                    button_function={Update}
                    button_text={"Update"}
                    button_style={{
                        height:"50px",
                        width:"100px",
                        margin:"auto",
                        backgroundColor: (selectedVenue!==null) ? "#00FFFF" : "#088080"
                    }}
                />     
                <MyButton
                    button_function={()=>setSelectedVenue(null)}
                    button_text={"Unselect"}
                    button_style={{
                        height:"50px",
                        width:"100px",
                        margin:"auto",
                        backgroundColor: (selectedVenue===null) ? "#00FFFF" : "#088080"
                    }}
                />                                                    
            </div>

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
                            backgroundColor: ((oneVenue.active) ? ((oneVenue.id===selectedVenue) ? "pink" :"white") :"lightgray")
                        }}>
                        {oneVenue.VenueName}
                    </div>
                ))}
            </div>
        </div>
    )
}
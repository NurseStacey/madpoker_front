import {useState} from 'react'
import CurrentEventsButton from './current-events-buttons'
import axios from 'axios'

export default function CurrentEvent({
    allEvents,
    fetchData,
    event,
    setEvent
})
{


    const Delete=async()=>{
        try{
            const response = (await axios.delete(`http://127.0.0.1:8000/games/one_event/${event.id}/`,))
            fetchData();
            setEvent({
                event:"",
                id:-1
            });
        }catch(err){    

            if(err.response.status===400) {alert('Error deleting event')
            } else if(err.response.status===403) {alert('Cannot remove event.  Games have been played of this type.') }
        }        
    }

    const Update=async()=>{
        try{
            console.log(event)
            const response = (await axios.patch(`http://127.0.0.1:8000/games/one_event/${event.id}/`,event))
            fetchData();
            setEvent({
                event:"",
                id:-1
            });
        }catch(err){
            if(err.response.status===400) {alert('Error updateing event')}
        }         
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
            <CurrentEventsButton
                selectedEvent={Event}
                setSelectedEvent={setEvent}
                Delete={Delete}
                Update={Update}
            />
            <div

                style={{
                    overflowY:"scroll",
                    display:"block"
                }}
            >
                {allEvents.map((oneEvent)=>(
                    <div
                        onClick={()=>setEvent(oneEvent)}
                        key={oneEvent.id}
                        style={{
                            backgroundColor:(oneEvent.id===event.id) ? "pink" :"white",
                            fontSize:"18px",
                            textAlign:"left"
                        }}>
                        {oneEvent.name} 
                    </div>
                ))}
            </div>                       
        </div>
    )
}
import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text'
import MyTextArea from '../../../Components/Widgets/my-textarea'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {WeekDays} from '../../../Components/weekdays'
import MyCheckBoxes from '../../../Components/Widgets/my-checkboxes';


export default function NewGame({
    formData,
    setFormData,
    fetchData,
    selectedGame
})
{
         
    const [allDirectors, setAllDirectors]=useState([])
    const [allVenues, setAllVenues]=useState([])
    const [allEvents, setAllEvents]=useState([])

    useEffect(()=>{

        if (selectedGame===null)
            setFormData({
                week_day:"Monday",
                time:"6:00",
                // director:-1,
                // DirectorUserName:"",
                venue:-1,
                venue_name:"",
            //    description:"",
                active:false,
           //     all_events:[0]
            });
        else
            GetThisGame(selectedGame)
        
    },[selectedGame])

    const GetThisGame=async(id)=>{
        try{
            const response = await axios.get(`http://127.0.0.1:8000/games/onegame/${id}/`,);
            let thisVenue=allVenues.find((oneVenue)=>oneVenue.id===response.data.venue);
            //let thisDirector=allDirectors.find((oneDirector)=>oneDirector.id===response.data.director);
            setFormData({
                ...response.data,
              //  ...{director:thisDirector.id, DirectorUserName:thisDirector.username},
                ...{venue:thisVenue.id, venue_name:thisVenue.venue_name}
            });

        }catch(err){
            alert('Problem loading game');
        }
    }



    const GetVenues = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
            //console.log(response.data)
            setAllVenues(response.data)

        }catch(err){
            alert('Problem getting venues.');
        }
    }    
    
    // const GetEvents = async()=>{
    //     try{
    //         const response = await axios.get("http://127.0.0.1:8000/games/events/",);
    //         console.log(response.data)
    //         setAllEvents(response.data)

    //     }catch(err){
    //         alert('Problem getting venues.');
    //     }
    // }    

    useEffect(()=>{
        GetDirectors()
        GetVenues()
        //GetEvents()
    },[])

    const HandelChange = (e)=>{

        // if (e.target.name==="director"){
           
        //     DirectorSelected(e.target.value)
        //     return
        // }

        if (e.target.name==="week_day") {
            WeekDaySelected(e.target.value)
            return
        }

        if (e.target.name==="venues") {
            
            VenueSelected(e.target.value)
            return
        }
       // console.log(e.target)
        setFormData({...formData, ...{[e.target.name]:e.target.value}})      
    }

    const WeekDaySelected = (day) =>{
        setFormData({...formData, ...{week_day:day}})
    }

    // const DirectorSelected = (director)=>{
        
    //     let thisDirector=allDirectors.find((oneDirector)=>oneDirector.username===director)

        //console.log(director)
    //     if (thisDirector===undefined) return
        
    //     setFormData({...formData, ...{director:thisDirector.id, DirectorUserName:thisDirector.username}})
    // }

    const VenueSelected=(venue)=>{
        let thisVenue=allVenues.find((oneVenue)=>oneVenue.venue_name===venue)
        setFormData({...formData, ...{venue:thisVenue.id, venue_name:thisVenue.venue_name}})
    }

    const Test=()=>{
        //console.log(formData)
        console.log(formData)
    }

    const AddGame = async()=>{
        if (selectedGame!==null) return
        try {
            let DataToSend={
                week_day:formData.week_day,
                time:formData.time,
                director:formData.director,
                venue:formData.venue,
                description:formData.description
            }
            const response = await axios.post("http://127.0.0.1:8000/games/games/",DataToSend);
            fetchData()

            setFormData({
                week_day:"Monday",
                time:"6:00",
                // director:-1,
                // DirectorUserName:"",
                venue:-1,
                venue_name:"",
            //    description:"",
                active:false,
            //     all_events:[0]
            });
        }catch(err){
            alert('Problem creating games.');
        }
    }

    // const EventSelected=(theseEvents)=>{
    //     setFormData({
    //         ...formData,
    //         all_events:allEvents.filter((oneEvent)=>theseEvents.includes(oneEvent.event)).map((anotherEvent)=>anotherEvent.id)
    //     })
    // }


    return(
        <div
            style={{
                display:"block",
                width:"40%",
                margin:"0% 5%",
                border:'1px solid black',
                padding:'10px'
            }}>
                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-around",
                        height:'175px'
                    }}
                >
                    <MyDropdownText
                        optionsList={WeekDays}
                        setSelectedOption={HandelChange}
                        selection = {formData.week_day}
                        name="week_day"
                        disable={false}
                        style={{
                            height:'100%'
                        }}
                    />
                   {/* <MyDropdownText
                        optionsList={allDirectors.map((oneDirector)=>oneDirector.username)}
                        setSelectedOption={HandelChange}
                        selection = {formData.DirectorUserName}
                        name="director"
                        disable={false}
                        style={{
                            height:'100%'
                        }}                        
                    />    */}   
                    <MyDropdownText
                        optionsList={allVenues.map((oneVenue)=>oneVenue.venue_name)}
                        setSelectedOption={HandelChange}
                        selection = {formData.venue_name}
                        name="venues"
                        disable={false}
                        style={{
                            height:'100%'
                        }}                        
                    />         
                    <MyInput
                        labelText="Time"
                        handleChange={HandelChange}
                        inputValue={formData.time}
                        inputName="time"
                        inputType="Text"
                        inputStyle={{
                            height:'50px'
                        }}
                    />                    
                </div>
                {/* <div
                    style={{
                        display:'flex',
                        justifyContent:'space-around',
                        marginBottom:'10px',
                        marginTop:'10px'
                    }}>
                    <MyCheckBoxes
                        options={allEvents.map((oneEvent)=>oneEvent.event)}
                        setSelections={EventSelected}
                        selections={allEvents.filter(
                            (oneEvent)=>formData.all_events.includes(oneEvent.id)).
                            map((anotherEvent)=>anotherEvent.event)}
                        oneBoxStyle={{
                            height:'50px'
                        }}
                    /> *
                <div
                        style={{
                            display:'block',
                            width:'50%'
                        }}
                 >       
                    <MyInput
                        labelText="Time"
                        handleChange={HandelChange}
                        inputValue={formData.time}
                        inputName="time"
                        inputType="Text"
                    />
                    <MyTextArea
                        labelText="Text"
                        handleChange={HandelChange}
                        inputValue={formData.description}
                        inputName="description"
                        cols="20"
                        rows="6"
                    />
                    </div>
                </div> */}
                    
                <MyButton
                    button_function={AddGame}
                    disable={selectedGame!==null}
                    button_text={'Add Game'}
                    button_style={{
                        margin:"20px auto",
                        height:"75px"}}                     
                />
                {/* <button onClick={Test}>test</button> */}
        </div>
    )
}
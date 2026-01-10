import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text'
import MyTextArea from '../../../Components/Widgets/my-textarea'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {WeekDays} from '../../../Components/weekdays'

export default function NewGame({
    formData,
    setFormData,
    fetchData,
    selectedGame
})
{
    const [buttonText, setButtonText]=useState("Add Game")        
    const [allDirectors, setAllDirectors]=useState([])
    const [allVenues, setAllVenues]=useState([])


    useEffect(()=>{
        // if (selectedGame===null) setButtonText("Add Game")
        //     else setButtonText("Update Game")

        if (selectedGame===null)
            setFormData({
                WeekDay:"Monday",
                Time:"6:00",
                Director:-1,
                DirectorUserName:"",
                Venue:-1,
                VenueName:"",
                Description:"",
                active:false,
            });
        else
            GetThisGame(selectedGame)
        
    },[selectedGame])

    const GetThisGame=async(id)=>{
        try{
            const response = await axios.get(`http://127.0.0.1:8000/games/onegame/${id}/`,);
            console.log(response.data)
            let thisVenue=allVenues.find((oneVenue)=>oneVenue.id===response.data.Venue);
            console.log(thisVenue)
            let thisDirector=allDirectors.find((oneDirector)=>oneDirector.id===response.data.Director);
            setFormData({
                ...response.data,
                ...{Director:thisDirector.id, DirectorUserName:thisDirector.username},
                ...{Venue:thisVenue.id, VenueName:thisVenue.VenueName}
            });
            


        }catch(err){
            console.log(err);
        }
    }

    const GetDirectors = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
            //console.log(response.data)
            setAllDirectors(response.data)

        }catch(err){
            console.log(err);
        }
    }

    const GetVenues = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
            //console.log(response.data)
            setAllVenues(response.data)

        }catch(err){
            console.log(err);
        }
    }    
    useEffect(()=>{
        GetDirectors()
        GetVenues()
    },[])

    const HandelChange = (e)=>{

        if (e.target.name==="Director"){
           
            DirectorSelected(e.target.value)
            return
        }

        if (e.target.name==="Weekday") {
            WeekDaySelected(e.target.value)
            return
        }

        if (e.target.name==="Venues") {
            
            VenueSelected(e.target.value)
            return
        }
    
        setFormData({...formData, ...{[e.target.name]:e.target.value}})      
    }

    const WeekDaySelected = (day) =>{
        setFormData({...formData, ...{WeekDay:day}})
    }

    const DirectorSelected = (director)=>{
        
        let thisDirector=allDirectors.find((oneDirector)=>oneDirector.username===director)

        //console.log(director)
        if (thisDirector===undefined) return
        
        setFormData({...formData, ...{Director:thisDirector.id, DirectorUserName:thisDirector.username}})
    }

    const VenueSelected=(venue)=>{
        //console.log(venue)
        let thisVenue=allVenues.find((oneVenue)=>oneVenue.VenueName===venue)
        setFormData({...formData, ...{Venue:thisVenue.id, VenueName:thisVenue.VenueName}})
    }
    const Test=()=>{
        console.log(formData)
        //allDirectors.find((oneDirector)=>oneDirector.id===formData.Director).username
    }

    const AddGame = async()=>{
        if (selectedGame!==null) return
        try {
            console.log(formData)
            let DataToSend={
                WeekDay:formData.WeekDay,
                Time:formData.Time,
                Director:formData.Director,
                Venue:formData.Venue,
                Description:formData.Description
            }
            const response = await axios.post("http://127.0.0.1:8000/games/games/",DataToSend);
            //console.log(response)
            fetchData()
            setFormData({
                WeekDay:"Monday",
                Time:"6:00",
                Director:-1,
                DirectorUserName:"",
                Venue:-1,
                VenueName:"",
                Description:"",
                active:false,
            })
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div
            style={{
                display:"block",
                width:"40%",
                margin:"2% 5%",
                border:'1px solid black',
                padding:'40px'
            }}>
                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-around"
                    }}
                >
                    <MyDropdownText
                        optionsList={WeekDays}
                        setSelectedOption={HandelChange}
                        selection = {formData.WeekDay}
                        name="Weekday"
                        disable={false}
                    />
                    <MyDropdownText
                        optionsList={allDirectors.map((oneDirector)=>oneDirector.username)}
                        setSelectedOption={HandelChange}
                        selection = {formData.DirectorUserName}
                        name="Director"
                        disable={false}
                    />       
                    <MyDropdownText
                        optionsList={allVenues.map((oneVenue)=>oneVenue.VenueName)}
                        setSelectedOption={HandelChange}
                        selection = {formData.VenueName}
                        name="Venues"
                        disable={false}
                    />         
                </div>
                    <MyInput
                        labelText="Time"
                        handleChange={HandelChange}
                        inputValue={formData.Time}
                        inputName="Time"
                        inputType="Text"
                    />
                    <MyTextArea
                        labelText="Text"
                        handleChange={HandelChange}
                        inputValue={formData.Description}
                        inputName="Description"
                        cols="20"
                        rows="6"
                    />

                    
                <MyButton
                    button_function={AddGame}
                      disable={selectedGame!==null}
                    button_text={buttonText}
                    button_style={{
                        margin:"auto",
                        height:"75px"}}
                />
                <button onClick={Test}>test</button>
        </div>
    )
}
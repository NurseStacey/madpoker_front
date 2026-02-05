import MyButton from '../../../Components/Widgets/my-button';
import MyInput from '../../../Components/Widgets/my-input';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';
import MyTextArea from '../../../Components/Widgets/my-textarea';
import MyListBox from '../../../Components/Widgets/my-listbox';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {WeekDays} from '../../../Components/weekdays';
import {BlankFormData} from './blank-form-data';

export default function NewGame({
    formData,
    setFormData,
    fetchData,
    selectedGame
})
{
    const [allDirectors, setAllDirectors]=useState([]);
    const [allVenues, setAllVenues]=useState([]);
    const [allSeasonType, setAllSeasonStypes]=useState([]);
    const [seasonTypeText, setSeasonTypeText]=useState('In Person');

    useEffect(()=>{

        const GetThisGame=async(id)=>{
            try{
                const response = await axios.get(`http://127.0.0.1:8000/games/onegame/${id}/`,);
                let thisVenue=allVenues.find((oneVenue)=>oneVenue.id===response.data.venue);
                
                if (response.data['director']===null) response.data['director']=-1
                console.log(response.data);

                setFormData(response.data);

            }catch(err){
                alert('Problem loading game');
            }
        }

        if (selectedGame===null)
            setFormData(BlankFormData);
        else
            GetThisGame(selectedGame)
    },[selectedGame])


    useEffect(()=>{
        const fetchDirectors = async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
                //console.log(response.data)
                setAllDirectors(response.data)

            }catch(err){
                alert('Problem getting directors.');
            }
        }        

        const fetchVenues = async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/venues/venues/",);
                //console.log(response.data)
                setAllVenues(response.data)

            }catch(err){
                alert('Problem getting venues.');
            }
        } 
        
        const fetchSeasonTypes = async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/seasons/seasontypes/",);
                //console.log(response.data)
                setAllSeasonStypes(response.data)
                setFormData({
                    ...formData,
                    season_type:response.data.find((oneSeasonType)=>oneSeasonType.season_type==='In Person').id
                })  
            }catch(err){
                alert('Problem getting venues.');
            }            
        }
        fetchDirectors();
        fetchVenues();
        fetchSeasonTypes();
    },[])

    const HandelChange = (e)=>{
        setFormData({...formData, ...{[e.target.name]:e.target.value}})      
    }

    const SeasonTypeSelected=(thisType)=>{
        setSeasonTypeText(thisType);
        setFormData({
            ...formData,
            season_type:allSeasonType.find((oneSeason)=>oneSeason.season_type===thisType).id
        });        
    }
    const DirectorSelected=(e)=>{

        setFormData({
            ...formData,
            director:allDirectors.find((oneDirector)=>e.target.value===oneDirector.username).id
        });
    }    

    const VenueSelected=(e)=>{
        setFormData({
            ...formData,
            venue:allVenues.find((oneVenue)=>e.target.value===oneVenue.venue_name).id
        });
    }

    const Test=()=>{
        console.log(allSeasonType);
    }

    const AddGame = async()=>{
        if (selectedGame!==null) return
        try {
            console.log(formData)
            const response = await axios.post("http://127.0.0.1:8000/games/games/",formData);
            fetchData()

            setFormData(BlankFormData)

        }catch(err){
            alert('Problem creating games.');
        }
    }

    return(
        <div
            style={{
                display:"block",
                width:"40%",
                margin:"2   % 5%",
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
                   <MyDropdownText
                        optionsList={allDirectors.map((oneDirector)=>oneDirector.username)}
                        setSelectedOption={DirectorSelected}
                        //selection = {formData.DirectorUserName}
                        selection = {(formData.director!==-1) ? allDirectors.find((oneDirector)=>oneDirector.id===formData.director).username: ""}
                        name="director"
                        disable={false}
                        style={{
                            height:'100%'
                        }}                        
                    />   
                    <MyDropdownText
                        optionsList={allVenues.map((oneVenue)=>oneVenue.venue_name)}
                        setSelectedOption={VenueSelected}
                        selection = {(formData.venue!==-1) ? allVenues.find((oneVenue)=>oneVenue.id===formData.venue).venue_name: ""}
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
                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-around",
                        height:'175px',
                        border:'1px solid black',
                        
                    }}
                >
                    <MyTextArea
                        labelText="Game Description"
                        handleChange={HandelChange}
                        inputValue={formData.description}
                        inputName="description"
                        cols="20"
                        rows="6"
                        labelStyle={{
                            fontSize:'20px'
                        }}
                    />
                    <MyListBox
                        theList={allSeasonType.map((oneSeasonType)=>oneSeasonType.season_type)}
                        title="Type"
                        titleColor="black"
                        direction="vertical"
                        ListBoxStyle={{
                            width:'150px'
                        }}
                        selectedItem={seasonTypeText}
                        setSelection={SeasonTypeSelected}
                    />                     
                </div>    
                            
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
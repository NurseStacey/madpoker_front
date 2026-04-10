import MyInput from '../../../Components/Widgets/my-input';
import MyButton from '../../../Components/Widgets/my-button';
import MyListBox from '../../../Components/Widgets/my-listbox';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function TournamentInputs({
    update,
    setUpdateTournamentList
})
{
    let blankForm = {
        'name':'',
        'date':new Date().toISOString().split('T')[0],
        'location':-1,
        'game_type':-1,
        'time':'10:00'
    }

    let buttonRowStyle={
        'display':'flex',
        'justifyContent':'center',
        'fontSize':'20px',
        'gap':'2%',
        'width':'100%'
    }

    let buttonStyle={
        'width':'125px',
        'height':'75px'
    }
    const [formData, setFormData]=useState(blankForm);
    const [allVenues, setAllVenues]=useState([]);
    const [allGameTypes, setAllGameTypes]=useState([]);
    const [venueText, setVenueText]=useState('');
    const [gameTypeText, setGameTypeText]=useState('Texas Holdem');

    useEffect(()=>{

        const getInputs = async()=>{
            let Inputs = await axios.get(`http://127.0.0.1:8000/tournaments/info_for_tournament/`,);
            setAllVenues(Inputs['data']['venues'])
            setAllGameTypes(Inputs['data']['game_types'])

            console.log(Inputs)
        }
        try {
            
            getInputs()
        }catch(err){
            console.log(err)
        }

    },[])

    useEffect(()=>{
        const LoadThisTournament=async()=>{
            const Response=await axios.get(`http://127.0.0.1:8000/tournaments/onetournament/${update}/`);
            setFormData(Response.data);

            setGameTypeText(allGameTypes.find((oneGameType)=>oneGameType.id===Response.data.game_type).name);
            setVenueText(allVenues.find((oneVenue)=>oneVenue.id===Response.data.location).venue_name);

            console.log(Response.data)
        }

        if (update>-1){
            try{
                LoadThisTournament()
            }catch(err){console.log(err)}
        } else {
            ResetForm()
        }
    },[update])
    const HandelChange = (e)=>{
        setFormData({...formData, ...{[e.target.name]:e.target.value}})      
    }

    const GameTypeSelected = (gameType)=>{
        setGameTypeText(gameType);

        HandelChange({
            'target':{
                'name':'game_type',
                'value':allGameTypes.find((oneGameType)=>oneGameType.name===gameType).id
            }
        })
    }

    const VenueSelected = (venue)=>{
        setVenueText(venue);

        HandelChange({
            'target':{
                'name':'location',
                'value':allVenues.find((oneVenue)=>oneVenue.venue_name===venue).id
            }
        });
    }

    const getFormDataToSend = () =>{
            if (formData.game_type===-1) {
                return {
                    ...formData,
                    'game_type':allGameTypes.find((oneGameType)=>oneGameType.name==='Texas Holdem').id
                }
            } else return formData
    }
    const AddTournament = async()=>{

        if (formData.location===-1) {
            alert('You must select a location.');
            return;
        }

        if (formData.name==='') {
            alert('Tournament needs a name.');
            return;
        }

        try{            
            let response = await axios.post(`http://127.0.0.1:8000/tournaments/tournament/`,getFormDataToSend());
            setUpdateTournamentList(true)
        }catch(err){
            console.log(err);
                if (err.response.status===409) {
                    alert('That tournament name is already being used.  Please choose another')
                    return
                }            
        }
    }

    const UpdateTournament = async()=>{

        if (formData.location===-1) {
            alert('You must select a location.');
            return;
        }

        if (formData.name==='') {
            alert('Tournament needs a name.');
            return;
        }

        const UpdateThisTournament=async()=>{
            try {
                const Response=await axios.patch(`http://127.0.0.1:8000/tournaments/onetournament/${update}/`,getFormDataToSend())
                setUpdateTournamentList(true)
            }catch(err){
                if (err.response.status===409) {
                    alert('That tournament name is already being used.  Please choose another')
                    return
                }
            }
            
            ResetForm()

        }
        UpdateThisTournament()
        setUpdateTournamentList(true)
    }
    const DeleteTournament = async()=>{
        const DeleteThisTournament=async()=>{
            const Response=await axios.delete(`http://127.0.0.1:8000/tournaments/onetournament/${update}/`)
            setUpdateTournamentList(true)
            ResetForm()
        }
        DeleteThisTournament()        
        setUpdateTournamentList(true)
    }
    const ResetForm = ()=>{setFormData(blankForm)}

    return(
        <div>
            <div
                    style={{
                        'display':'flex',
                        'justifyContent':'space-around',
                        'width':'100%',
                        'margin':'2% 0'
                    }}
                >
                    <MyInput
                            labelText="Tournament Name"
                            handleChange={HandelChange}
                            inputValue={formData.name}
                            inputName="name"
                            inputType="Text"
                            inputStyle={{
                                height:'50px',
                                width:'750px',
                            }}                    
                    />    
                    <MyInput
                            labelText="Date"
                            handleChange={HandelChange}
                            inputValue={formData.date}
                            inputName="date"
                            inputType="Date"
                            inputStyle={{
                                height:'50px',
                                width:'250px',
                            }}                    
                    />
                    <MyInput
                            labelText="Time"
                            handleChange={HandelChange}
                            inputValue={formData.time}
                            inputName="time"
                            inputType="Time"
                            inputStyle={{
                                height:'50px',
                                width:'250px',
                            }}                    
                    />                    
                    <MyListBox
                        theList={allVenues.map((oneVenue)=>oneVenue.venue_name)}
                        title="Venue"
                        titleColor="black"
                        direction="vertical"
                        ListBoxStyle={{
                            width:'150px'
                        }}
                        selectedItem={venueText}
                        setSelection={VenueSelected}
                    />
                    <MyListBox
                        theList={allGameTypes.map((oneGameType)=>oneGameType.name)}
                        title="Game Type"
                        titleColor="black"
                        direction="vertical"
                        ListBoxStyle={{
                            width:'150px'
                        }}
                        selectedItem={gameTypeText}
                        setSelection={GameTypeSelected}
                    />                                                                   
                </div>
                       
                {(update>-1) ?
                    <div
                            style={buttonRowStyle}>
                        <MyButton
                            button_function={UpdateTournament}
                            button_text={'Update Tournament'}
                            button_style={buttonStyle}                     
                        />
                        <MyButton
                            button_function={DeleteTournament}
                            button_text={'Delete Tournament'}
                            button_style={buttonStyle}                     
                        />
                        <MyButton
                            button_function={ResetForm}
                            button_text={'Reset Data'}
                            button_style={buttonStyle}                     
                        />                    
                </div>:
                    <div
                            style={buttonRowStyle}>
                        <MyButton
                            button_function={AddTournament}
                            button_text={'Add Tournament'}
                            button_style={buttonStyle}                     
                        />
                        <MyButton
                            button_function={ResetForm}
                            button_text={'Reset Data'}
                            button_style={buttonStyle}                     
                        />                            
                    </div>
                    }
                
        </div>
 
    )
}
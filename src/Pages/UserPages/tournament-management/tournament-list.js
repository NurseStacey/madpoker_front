import axios from 'axios';
import {useState, useEffect} from 'react'
import MyListBox from '../../../Components/Widgets/my-listbox';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';

export default function TourmanentList({
    setUpdate,
    updateTournamentList,
    setUpdateTournamentList
})
{
    const [tournamentList, setTournamentList]=useState([]);
    const [tournamentName, setTournamentName] =useState('')

    useEffect(()=>{

        const getCurrentTournaments = async () =>{

            try{
                let response=await axios.get(`http://127.0.0.1:8000/tournaments/tournament/`)
                setTournamentName('')
                setTournamentList(response.data)
            }catch(err){
                console.log(err)
            }
        }
        if (updateTournamentList) {
            setUpdateTournamentList(false)
            getCurrentTournaments()
            setUpdate(-1)
        } 
    },[updateTournamentList])

    const tournamentSelected = (e)=>{
        console.log(e.target.value)
        setTournamentName(e.target.value)

        setUpdate(tournamentList.find((oneTournament)=>oneTournament.name===e.target.value).id)
    }

    return(
        <div
            style={{
                'display':'block',
                'margin':'2% auto'
            }}
        >
            <div
                style={{
                    margin:'2% auto',
                    fontSize:'20px'
                }}
            >
                Current Tournaments
            </div>
            <MyDropdownText
                optionsList={tournamentList.map((oneTournament)=>oneTournament.name)}
                setSelectedOption={tournamentSelected}
                selection = {tournamentName}
                name="tournaments"
                disable={false}
                style={{
                    width:'200px',
                    margin:'0px auto',
                    height:'150px',
                    fontSize:'20px'
                }}
            />                 
            {/* <MyListBox
                theList={tournamentList.map((oneTournament)=>oneTournament.name)}
                title="Current Tournaments"
                titleColor="black"
                direction="vertical"
                ListBoxStyle={{
                    'width':'150px',
                    'margin':'2% auto',
                    'fontSize':'20px',
                    'height':'300px'
                }}
                selectedItem={tournamentName}
                setSelection={tournamentSelected}
            />             */}
        </div>
    )
}
import axios from 'axios';
import {useState, useEffect} from 'react';
import MyListBox from '../../../Components/Widgets/my-listbox';

export default function SelectTournament({
    setTournamentID,
    updateTournamentList,
    setUpdateTournamentList
})
{
    const [allTournaments, setAllTournaments]=useState([])
    const [selectedTournament, setSelectedTournament]=useState('')

    useEffect(()=>{
        if (updateTournamentList) {
            LoadTournaments()
            setUpdateTournamentList(false)
        }
    },[updateTournamentList])

    const LoadTournaments = async ()=>{

        try {
            let response = await axios.get("http://127.0.0.1:8000/tournaments/tournament/",);
            setAllTournaments(response.data)
        }catch(err){alert('Problem loading tournaments.')}
    }    
    useEffect(()=>{
        LoadTournaments()
    },[])

    const TournementSelected = (thisTournament)=>{
        setSelectedTournament(thisTournament)
        console.log(thisTournament)
        console.log(allTournaments.find((oneTournament)=>oneTournament.name===thisTournament).id)
        setTournamentID(allTournaments.find((oneTournament)=>oneTournament.name===thisTournament).id)
    }

    return(
        <div
            style={{
                display:'block',
                margin:'2% auto',
                fontSize:'25px'
            }}
            >
                <MyListBox
                    theList={allTournaments.map((oneTournament)=>oneTournament.name)}
                    title='Select Tournament'
                    selectedItem={selectedTournament}
                    setSelection={TournementSelected}
                    ListBoxStyle={{width:'20%', margin:'auto'}}
                />
        </div>
    )
}
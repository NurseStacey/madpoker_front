import {useState, useEffect} from 'react';
import axios from 'axios';
import CurrentSectionsButton from './current-sections-buttons';
import CurrentSectionsListBox from './current-sections-listbox';

export default function CurrentSections({
    allSections,
    formData,
    selectedSection,
    setSelectedSection,
    fetchData,
    formObj,
    setFormObj
})
{
    const [buttonText, setButtonText]=useState('Deactivate');
    const [allGames, setAllGames]=useState([]);

    useEffect(()=>{
        const GetGames = async()=>{
            try{

                const response = await axios.get("http://127.0.0.1:8000/games/games/",);
                setAllGames(response.data);
                setFormObj({
                    ...formObj,
                    
                })
            }catch(err){
                alert('Problem loading games.');
            }            
        }

        GetGames()
    },[])

    const ChangeActive=async()=>{

        try{

            let updatedData={
                ...{active:!formData.active}
            }
            console.log(updatedData)
            const response = await axios.patch(`http://127.0.0.1:8000/games/onesection/${selectedSection}/`,updatedData);
            
            fetchData()
            setSelectedSection(null)

        }catch(err){
            alert('Problem changing status of section.');
        }
    }

    const Delete=()=>{}
    const Update=()=>{}

    const SectionSelected=(id)=>{setSelectedSection(id);}

    const Test=()=>{console.log(selectedSection)}
    return(

        <div
            style={{
                display:"block",
                width:"40%",
                margin:"2% 5%",
                border:'1px solid black',
                padding:'40px'
            }}>

                <CurrentSectionsButton
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    ChangeActive={ChangeActive}
                    Delete={Delete}
                    Update={Update}
                    buttonText={buttonText}
                />                
                <CurrentSectionsListBox
                    allSections={allSections}
                    SectionSelected={SectionSelected}
                    selectedSection={selectedSection}
                    allGames={allGames}
                />
            <button onClick={Test}>test</button>         
        </div>
    )
}
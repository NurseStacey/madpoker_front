import {useState, useEffect} from 'react';
import axios from 'axios';
import CurrentSectionsButton from './current-sections-buttons';

export default function CurrentSections({
    allSections,
    formData,
    selectedSection,
    setSelectedSection,
    fetchData
})
{
    const [buttonText, setButtonText]=useState('Deactivate')

    const ChangeActive=async()=>{

        try{

            console.log(formData)
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
                {allSections.map((oneSection)=>(
                    <div
                        onClick={()=>SectionSelected(oneSection.id)}
                        key={oneSection.id}
                        style={{
                            margin:"10px 5px",
                            textAlign:"left",
                            fontSize:"18px",
                            backgroundColor:(oneSection.id===selectedSection) ? "pink" :"white",
                        }}
                        >{(oneSection.active) ? oneSection.game_text + '-' + oneSection.section_name: oneSection.Text + '-' + oneSection.section_name + ' - inactive'}</div>
                ))}
            <button onClick={Test}>test</button>         
        </div>
    )
}
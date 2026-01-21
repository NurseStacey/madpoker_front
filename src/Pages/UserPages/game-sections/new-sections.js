import {useState, useEffect} from 'react'
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';

export default function NewSection({
    formData,
    setFormData
})
{
    const [allGames, setAllGames]=useState([])
    const [allDirectors, setAllDirectors]=useState([])
    const [allSection, setAllSection]=useState([])

    useEffect(()=>{

        const fetchGames=async()=>{
            try{

                const response = await axios.get("http://127.0.0.1:8000/games/games/",);
                //console.log(response.data)
                setAllGames(response.data);

            }catch(err){
                alert('Problem loading games.');
            }
        }
        const fetchDirectors = async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
                //console.log(response.data)
                setAllDirectors(response.data)

            }catch(err){
                alert('Problem getting directors.');
            }
        }

        const fetchSections = async()=>{
                try{
                    const response = await axios.get("http://127.0.0.1:8000/games/events/",);
                    console.log(response.data)
                    setAllSection(response.data)

                }catch(err){
                    alert('Problem getting sections.');
                }
            }           
        fetchGames()
        fetchDirectors()
        fetchSections()

    }, [])

    const GameSelected=(whichGame)=>{
        setFormData({
            ...formData,
            game:allGames.find((oneGame)=>whichGame===oneGame.Text).id
        })
    }
    const DirectorSelected=(whichDirector)=>{
        setFormData({
            ...formData,
            director:allGames.find((oneDirector)=>whichDirector===oneDirector.username).id
        })
    }    

     const SectionSelected=(whichSection)=>{
        setFormData({
            ...formData,
            section:allSection.find((oneSection)=>whichSection===oneSection.name).id
        })
    }       

    const HandelChange = (e)=>{

        setFormData({...formData, ...{[e.target.name]:e.target.value}})      
    }

    return(
        <div
            style={{
                border:'1px solid black',
                margin:'2%',
                display:'flex',
                justifyContent:'space-around'
            }}
        >
            <MyDropdownText
                optionsList={allGames.map((oneGame)=>oneGame.Text)}
                setSelectedOption={GameSelected}
                selection={allGames.find((oneGame)=>oneGame.id===formData.game).Text}
                style={{}}
                disable={false}
                name="Games"
            />
            <MyDropdownText
                optionsList={allDirectors.map((oneDirector)=>oneDirector.username)}
                setSelectedOption={DirectorSelected}
                selection={allDirectors.find((oneDirector)=>oneDirector.id===formData.director).username}
                style={{}}
                disable={false}
                name="Directors"
            />     
            <MyDropdownText
                optionsList={allSection.map((oneSection)=>oneDirector.username)}
                setSelectedOption={SectionSelected}
                selection={allSection.find((oneSection)=>oneSection.id===formData.director).name}
                style={{}}
                disable={false}
                name="Section"
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
    )
}
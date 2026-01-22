import {useState, useEffect} from 'react';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';
import axios from 'axios';
import MyTextArea from '../../../Components/Widgets/my-textarea';
import MyButton from '../../../Components/Widgets/my-button';

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
                console.log(response.data)
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
                    const response = await axios.get("http://127.0.0.1:8000/games/sections/",);
                    //console.log(response.data)
                    setAllSection(response.data)

                }catch(err){
                    alert('Problem getting sections.');
                }
            }           
        fetchGames()
        fetchDirectors()
        fetchSections()

    }, [])

    const Test=()=>{console.log(formData)}

    const GameSelected=(whichGame)=>{
        setFormData({
            ...formData,
            game:allGames.find((oneGame)=>whichGame===oneGame.Text).id
        })
    }
    const DirectorSelected=(whichDirector)=>{
        setFormData({
            ...formData,
            director:allDirectors.find((oneDirector)=>whichDirector===oneDirector.username).id
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

    const AddSection = async()=>{

        try{

        }catch(err){
            alert('Problem adding section.')
        }
    }

    return(
        <div
            style={{
                display:'block',
                width:'40%'
            }}>
            <div    
                style={{
                    width:'100%',
                    textAlign:'center',
                    fontSize:'20px' 
                }}>
                Add a section to a game
            </div>
            <div
                style={{
                    border:'1px solid black',
                    margin:'2%',
                    display:'flex',
                    justifyContent:'space-between',

                }}
            >
                {/* <button onClick={Test}>test</button> */}
                <MyDropdownText
                    optionsList={allGames.map((oneGame)=>oneGame.Text)}
                    setSelectedOption={GameSelected}
                    selection={(formData.game!==-1) ? allGames.find((oneGame)=>oneGame.id===formData.game).Text: ""}
                    style={{}}
                    disable={false}
                    name="Games"
                />
                <MyDropdownText
                    optionsList={allDirectors.map((oneDirector)=>oneDirector.username)}
                    setSelectedOption={DirectorSelected}
                    selection={(formData.director!==-1) ? allDirectors.find((oneDirector)=>oneDirector.id===formData.director).username: ""}
                    style={{}}
                    disable={false}
                    name="Directors"
                />     
                <MyDropdownText
                    optionsList={allSection.map((oneSection)=>oneSection.name)}
                    setSelectedOption={SectionSelected}
                    selection={(formData.section!==-1) ? allSection.find((oneSection)=>oneSection.id===formData.section).name: ""}
                    style={{}}
                    disable={false}
                    name="Section"
                />
             </div>
            <MyTextArea
                labelText="Section Description"
                handleChange={HandelChange}
                inputValue={formData.description}
                inputName="description"
                cols="20"
                rows="6"
                labelStyle={{
                    fontSize:'20px'
                }}
            />          
            <MyButton
                button_function={AddSection}
                button_style={{
                    margin:"20px auto",
                    height:"75px"}}    
                button_text="Add Section"
            />
        </div>
    )
}
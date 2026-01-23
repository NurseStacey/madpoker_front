import {useState, useEffect} from 'react';
import MyDropdownText from '../../../Components/Widgets/my-dropdown-text';
import axios from 'axios';
import MyTextArea from '../../../Components/Widgets/my-textarea';
import MyButton from '../../../Components/Widgets/my-button';
//import {BlankFormData, FormObject} from './blank-form-data';
import  {CreateFormObj,BlankFormData} from './blank-form-data';

export default function NewSection({
    formData,
    setFormData,
    fetchData,
    selectedSection,
    formObj,
    setFormObj,
    allSections
})
{
    const [allGames, setAllGames]=useState([])
    const [allDirectors, setAllDirectors]=useState([])
    //const [allSection, setAllSection]=useState([])


    // useEffect(()=>{

    //     const fetchGames=async()=>{
    //         try{

    //             const response = await axios.get("http://127.0.0.1:8000/games/games/",);
    //             console.log(response.data);
    //             setFormObj({
    //                 ...formObj,
    //                 AllGames:response.data
    //             })
    //             //setAllGames(response.data);

    //         }catch(err){
    //             alert('Problem loading games.');
    //         }
    //     }
    //     const fetchDirectors = async()=>{
    //         try{
    //             const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
    //             //console.log(response.data)
    //             setAllDirectors(response.data)

    //         }catch(err){
    //             alert('Problem getting directors.');
    //         }
    //     }

    //     const fetchSections = async()=>{
    //             try{
    //                 const response = await axios.get("http://127.0.0.1:8000/games/sections/",);
    //                 //console.log(response.data)
    //                 setAllSection(response.data)

    //             }catch(err){
    //                 alert('Problem getting sections.');
    //             }
    //         }           
    //     fetchGames()
    //     fetchDirectors()
    //     fetchSections()

    // }, [])

    const Test=()=>{console.log(formObj.selectedDirectorName())}

    const GameSelected=(e)=>{
        setFormObj({
            ...formObj,
            formData:{
                ...formObj.formData,
                 game:formObj.getGameByText(e.target.value).id
            }
        })          
    }
    const DirectorSelected=(e)=>{
        setFormObj({
            ...formObj,
            formData:{
                ...formObj.formData,
                director:formObj.getDirectorByName(e.target.value).id
            }
        })                
    }    

     const SectionSelected=(e)=>{

        setFormObj({
            ...formObj,
            formData:{
                ...formObj.formData,
                 section:formObj.getSectionByName(e.target.value).id
            }
        })        
    }       

    const HandelChange = (e)=>{
        setFormObj({
            ...formObj,
            formData:{
                ...formObj.formData,
                ...{[e.target.name]:e.target.value}
            }
        }) 
    }

    const AddSection = async()=>{

        try {
            const response = await axios.post("http://127.0.0.1:8000/games/sectionthrough/",formData);
            fetchData()
            setFormObj({
                ...formObj,
                ...BlankFormData
            })
            //setFormData(BlankFormData)

        }catch(err){
            alert('Problem adding section.');
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

               <MyDropdownText
                    optionsList={formObj.getAllGamesText()}
                    setSelectedOption={GameSelected}
                    selection={formObj.selectedGameText()}
                    style={{}}
                    disable={false}
                    name="Games"
                />
                <MyDropdownText
                    optionsList={formObj.getAllDirectorsNamest()}
                    setSelectedOption={DirectorSelected}
                    selection={formObj.selectedDirectorName()}
                    style={{}}
                    disable={false}
                    name="Directors"
                />     
                <MyDropdownText
                    optionsList={formObj.getAllSectionsNames()}
                    setSelectedOption={SectionSelected}
                    selection={formObj.selectedSectionName()}
                    style={{}}
                    disable={false}
                    name="Section"
                /> 
             </div>
            <MyTextArea
                labelText="Section Description"
                handleChange={HandelChange}
                inputValue={formObj.getDescription()}
                inputName="description"
                cols="20"
                rows="6"
                labelStyle={{
                    fontSize:'20px'
                }}
            />       
                             <button onClick={Test}>test</button>    
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
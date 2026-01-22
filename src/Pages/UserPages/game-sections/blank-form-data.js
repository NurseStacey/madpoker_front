import axios from "axios";

export const BlankFormData={
    section:-1,
    game:-1,
    director:-1,
    active:true,
    description:''
}

// export const FormObject={
//     AllGames:[],
//     formData:BlankFormData,
//     textForList:function(){
//         if(formData.game!==-1) {
//             thisGame = allGames.find((oneGame)=>oneGame.id===formData.game)

            
//         } 
//         return 'test'
//     },
//     setGameID:function(){
//         return(allGames.find((oneGame)=>e.target.value===oneGame.Text).id)
//     }
// }

export function CreateFormObj(){

    const fetchGames=async()=>{
        try{

            const response = await axios.get("http://127.0.0.1:8000/games/games/",);
            return(response.data);


        }catch(err){
            alert('Problem loading games.');
        }    
    }

    const fetchSections = async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/games/sections/",);
                return(response.data)
            }catch(err){
                alert('Problem getting sections.');
            }
        }      
    const fetchDirectors = async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/login_api/all_user/",);
            return(response.data)
        }catch(err){
            alert('Problem getting directors.');
        }
    }

    return({
    AllGames:fetchGames,
    AllDirectors:fetchDirectors(),
    AllSections:fetchSections(),
    formData:BlankFormData,
    textForList:function(){
        if(this.formData.game!==-1) {
            let thisGame = this.allGames.find((oneGame)=>oneGame.id===this.formData.game)
            let thisSection = this.AllSections.find((oneSection)=>oneSection.id===this.formData.section)
            return thisGame.Text + '-' + thisSection.name
        } 
        return 'test'
    },
    directorName:function(){
        if(this.formData.director!==-1){
            return this.AllDirectors.find((oneDirector)=>oneDirector.id===this.formData.director).username
        }
    },
    getSection:function(){
        if(this.formData.director!==-1){
            return this.AllSections.find((oneSection)=>oneSection.id===this.formData.section).name
        }
    },
    setGameID:function(e){
        return(this.allGames.find((oneGame)=>e.target.value===oneGame.Text).id)
        }
    })
}
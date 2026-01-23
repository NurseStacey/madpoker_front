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

    return({
        AllGames:null,
        AllDirectors:null,
        AllSections:null,
        formData:BlankFormData,
        getAllGamesText:function(){
            if (this.AllGames===null) return []
            else return this.AllGames.map((oneGame)=>oneGame.Text)
        },
        getAllDirectorsNamest:function(){
            if (this.AllDirectors===null) return []
            else return this.AllDirectors.map((oneDirector)=>oneDirector.username)
        },    
        getAllSectionsNames:function(){
            if (this.AllSections===null) return []
            else return this.AllSections.map((oneSection)=>oneSection.name)
        },               
        textForList:function(gameID, sectionID){
            
            if (this.AllGames===null)  return ""
            if (this.AllSections===null) return ""
            //console.log(this.allGames)
            let thisGame = this.AllGames.find((oneGame)=>oneGame.id===gameID)
            let thisSection = this.AllSections.find((oneSection)=>oneSection.id===sectionID)
            return thisGame.Text + '-' + thisSection.name
        },
        selectedDirectorName:function(){
            // console.log(this.AllDirectors)
            // console.log(this.formData.director)
            // console.log(this.AllDirectors.find((oneDirector)=>oneDirector.id===this.formData.director).username)
            try{
                if(this.formData.director!==-1 && this.formData.director!==null){
                    return this.AllDirectors.find((oneDirector)=>oneDirector.id===this.formData.director).username
                }
                return ""
            }catch(err){
                console.log(err)
                console.log(this.formData.director)
            }

        },
        selectedGameText:function(){
            if (this.formData.game===-1) return ""
                else return (this.AllGames.find((oneGame)=>this.formData.game===oneGame.id).Text)
        },
        selectedSectionName:function(){
            if (this.formData.section===-1) return ""

            return(this.AllSections.find((oneSection)=>oneSection.id===this.formData.section).name)
        },
        getSection:function(){
            if(this.formData.director!==-1){
                return this.AllSections.find((oneSection)=>oneSection.id===this.formData.section).name
            } else { return ""}
        },
        // setGameID:function(e){
        //     return(this.allGames.find((oneGame)=>e.target.value===oneGame.Text).id)
        //     },            
        getThisSection:function(id){
            return(this.AllSections.find((oneSection)=>oneSection.id===id))
        },
        getDescription:function(){
            if (this.formData.description===null) return ""
            return this.formData.description
        },
        getDirectorByName:function(username){

            return(this.AllDirectors.find((oneDirector)=>oneDirector.username===username))
        },
        getSectionByName:function(name){

            return(this.AllSections.find((oneSection)=>oneSection.name===name))
        },
        getGameByText:function(text){
            try{
                return(this.AllGames.find((oneGame)=>oneGame.Text===text))
            }catch(err){console.log(err)}

        }
        })
}
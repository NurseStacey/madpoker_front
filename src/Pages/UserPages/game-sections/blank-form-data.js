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
        textForList:function(gameID, sectionID){
            
            if (this.AllGames===null)  return ""
            if (this.AllSections===null) return ""
            //console.log(this.allGames)
            let thisGame = this.AllGames.find((oneGame)=>oneGame.id===gameID)
            let thisSection = this.AllSections.find((oneSection)=>oneSection.id===sectionID)
            return thisGame.Text + '-' + thisSection.name
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
            },
        getThisSection:function(id){
            return(this.AllSections.find((oneSection)=>oneSection.id===id))
        }
        })
}
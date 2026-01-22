

export default function CurrentSectionsListBox({
    allSections,
    SectionSelected,
    selectedSection,
    allGames
})
{
    return(
        <div
            style={{
                height:'300px',
                overflowY:'scroll',
                border:'1px solid black'
            }}>
                {allSections.map((oneSection)=>(
                    <div
                        onClick={()=>SectionSelected(oneSection.id)}
                        key={oneSection.id}
                        style={{
                            margin:"0px 5px",
                            textAlign:"left",
                            fontSize:"18px",
                            backgroundColor:(oneSection.id===selectedSection) ? "pink" :"white",
                        }}
                        >{(oneSection.active) ? oneSection.game_text + '-' + oneSection.section_name: oneSection.Text + '-' + oneSection.section_name + ' - inactive'}</div>
                ))}
        </div>
    )
}
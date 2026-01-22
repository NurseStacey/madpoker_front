import MyButton from '../../../Components/Widgets/my-button';

export default function CurrentSectionsButton({
    Update,
    Delete,
    ChangeActive,
    setSelectedSection,
    selectedSection,
    buttonText
})
{
    return(
            <div
                style={{
                    width:"100%",
                    height:"100px",
                    display:"flex",
                    justifyContent:"space-around"
                }}>
                <MyButton
                    button_function={ChangeActive}
                    button_text={buttonText}
                    button_style={{
                        height:"50px",
                        width:"100px",
                        margin:"auto",
                        backgroundColor: (selectedSection!==null) ? "#00FFFF" : "#088080"
                    }}
                    disable={false}
                />    
                <MyButton
                    button_function={Delete}
                    button_text={"Delete"}
                    button_style={{
                        height:"50px",
                        width:"100px",
                        margin:"auto",
                        backgroundColor: (selectedSection!==null) ? "#00FFFF" : "#088080"
                    }}
                    disable={false}
                />    
                <MyButton
                    button_function={Update}
                    button_text={"Update"}
                    button_style={{
                        height:"50px",
                        width:"100px",
                        margin:"auto",
                        backgroundColor: (selectedSection!==null) ? "#00FFFF" : "#088080"
                    }}
                    disable={false}
                />     
                <MyButton
                    button_function={()=>setSelectedSection(null)}
                    button_text={"Unselect"}
                    button_style={{
                        height:"50px",
                        width:"100px",
                        margin:"auto",
                        backgroundColor: (selectedSection!==null) ? "#00FFFF" : "#088080"
                    }}
                    disable={false}
                />                                                    
            </div>        
    )
}
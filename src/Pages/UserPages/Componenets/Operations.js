import MyButton from "../../../Components/Widgets/my-button"

export default function Operations({
    NavigationFunction
}){
    return(
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-around",
                width:"100%",
                backgroundColor:'salmon'
            }}>
                <MyButton
                    button_style={{
                        margin:'20px',
                        height:'100px',
                        width:'100px'
                    }}
                    button_function={()=>NavigationFunction("/register")}
                    button_text="Add Director"
                    disable={false}
                    />
                <MyButton
                    button_style={{
                        margin:'20px',
                        height:'100px',
                        width:'100px'
                    }}
                    disable={false}
                    button_function={()=>NavigationFunction("/update_top")}
                    button_text="Update Top Message"
                    />    
                <MyButton
                    button_style={{
                        margin:'20px',
                        height:'100px',
                        width:'100px'
                    }}
                    disable={false}
                    button_function={()=>NavigationFunction("/update_special")}
                    button_text="Update Special Messages"
                    />     
                <MyButton
                    button_style={{
                        margin:'20px',
                        height:'100px',
                        width:'100px'
                    }}
                    disable={false}
                    button_function={()=>NavigationFunction("/edit_venues")}
                    button_text="Edit Venues"
                    />           
                <MyButton
                    button_style={{
                        margin:'20px',
                        height:'100px',
                        width:'100px',
                        fontSize:'18px'
                    }}
                    disable={false}
                    button_function={()=>NavigationFunction("/edit_games")}
                    button_text="Edit Games"
                    />
                <MyButton
                    button_style={{
                        margin:'20px',
                        height:'100px',
                        width:'100px',
                        fontSize:'18px'
                    }}
                    disable={false}
                    button_function={()=>NavigationFunction("/game_registration")}
                    button_text="Games Registration"
                    />     
                <MyButton
                    button_style={{
                        margin:'20px',
                        height:'100px',
                        width:'100px',
                        fontSize:'16px'
                    }}
                    disable={false}
                    button_function={()=>NavigationFunction("/season_management")}
                    button_text="Season Management"
                    />                                                                                                            
        </div>
    )
}
import My_Input from '../../../Components/Widgets/my-input'

export default function OnePlayer({
    thisPlayer,
    setPosition
})
{


    return(
        <div
            style={{
                display:'flex',
                //justifyContent:'space-between',
                font:'arial',
                fontSize:'18px',
                margin:'5px auto',
                width:'50%',
                alignItems:'center'
            }}>
            <div
                style={{
                    width:'50%',
                    textAlign:'left',
                }}>
                {thisPlayer.name}
            </div>
            <div                
                style={{
                    width:'25%',
                    textAlign:'left',
                }}>
                {thisPlayer.registration_time}
            </div>
            <div
                style={{
                    display:'flex',
                    justifyContent:'left',
                }}
                >
                <My_Input
                    labelText=""
                    handleChange={setPosition}
                    inputValue={thisPlayer.position}
                    inputName={thisPlayer.name}
                    inputType="text"
                    inputStyle={{
                        margin:'0px',
                        width:'25%',
                    }}
                />
            </div>
        </div>
    )
}
import My_Input from '../../../Components/Widgets/my-input'

export default function OnePlayer({
    thisPlayer,
    setPosition
})
{


    return(
        <div
            style={{
                // display:'flex',
                // //justifyContent:'space-between',
                // font:'arial',
                // fontSize:'18px',
                // margin:'5px auto',
                // width:'50%',
                // alignItems:'center'
                display:'flex',
                justifyContent:'space-between',
                font:'arial',
                fontSize:'18px',
                width:'100%',                
            }}>
            <div
                style={{
                    width:'30%',
                    textAlign:'left',
                    paddingLeft:'15%',                    

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
                <input
                style={{
                    width:"40%",
                    marginRight:"10%",
                    textAlign:"right"
                }}
                name={thisPlayer.name}
                onChange={setPosition}  
                type="number"
                value={thisPlayer.position}></input>                    

            </div>
        </div>
    )
}
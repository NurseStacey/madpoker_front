

export default function GameRegisteration({
    setOpenModal
})
{


    return(
        <div
            style={{
                position:"fixed",
                border:'1px solid black',
                backgroundColor:'#FADADD',
                width:'30%',
                height:'50%',
                top:'100px',
                zIndex:'1000'
            }}>
            <div
                style={{
                    fontSize:'20px',
                    marginTop:'30px'
                }}>
              Registration
            </div>
            <button onClick={()=>setOpenModal(false)}>Close</button>
        </div>

    )
}
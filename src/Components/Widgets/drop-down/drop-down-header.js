import downCheveron from '../../../Components/ClipArt/down-chevron.png'


export default function DropDownHeader({
    title,
    selectedItem,
    setDropDownClicked,
    dropDownClicked
})
{


    return(

            <div
                style={{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'2%',
                }}>
                <div
                    style={{
                        color:"#70727b",
                        padding:'10px',
                        fontSize:'12px',
                    }}
                >
                    {title}
                </div>
                <div
                    onClick={()=>setDropDownClicked(!dropDownClicked)}
                    style={{
                        display:"flex",
                        width:'75%',
                        fontSize:'20px',
                        backgroundColor:'white',
                        justifyContent:'space-between',
                        padding:'0px 5px',
                    }}>
                        <div>{selectedItem}</div>
                        <img src={downCheveron} style={{width:'15px', height:'15px', marginTop:'5px'}}></img>
                </div>
            </div>


    )
}


export default function DropDownList({
    dropDownClicked,
    setDropDownClicked,
    allItems,
    setSelectedItem
})
{
    const itemClicked=(thisItem)=>{
        setDropDownClicked(false)
        setSelectedItem(thisItem)
    }

    const test=()=>{console.log(allItems)}


    return(
            <div
                style={{
                    display:(dropDownClicked) ? 'block' : 'none',
                    marginLeft:'20%',
                    width:'75%',
                    height:'250px',
                    backgroundColor:'white',
                    border:'1px solid black',
                    zIndex:'5',
                    overflowY:'scroll'
                }}>
                   {allItems.map((oneItem)=>(
                        <div
                            onClick={()=>itemClicked(oneItem)}
                            key={oneItem}
                            style={{
                                textAlign:'left',
                                marginLeft:'5px'
                            }}
                            >
                                {oneItem}
                            </div>
                    ))}
                {/* <button onClick={test}>test</button> */}
            </div>        
    )
}
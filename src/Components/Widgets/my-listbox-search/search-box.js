

export default function SearchBox({
    searchBarInput,
    setSearchBarInput,
    setShowDropDown
})
{
    const InputClicked=()=>{
        setShowDropDown(true)
    }

    const handleChange = (e) =>{
        setSearchBarInput(e.target.value);
    }    

    return(
        <div
            style={{
                display:'flex',
                justifyContent:'center',
                marginTop:'2%',
            }}>

            <input
                onClick={InputClicked}
                value={searchBarInput}
                onChange={handleChange}  
                //onBlur={leavesInput}
                style={{
                    display:"flex",
                    width:'75%',
                    fontSize:'20px',
                    backgroundColor:'white',
                    color:(searchBarInput==='Search player') ?'#979790' : 'black',
                    justifyContent:'space-between',
                    padding:'0px 5px',
                }}/>
        </div>             
    )
}
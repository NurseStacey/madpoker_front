import {useEffect, useState} from 'react'

export default function SearchInput({
    searchBarInput,
    setSearchBarInput,
    setOpenList
})
{
    const leavesInput=()=>{
        if (searchBarInput==='') setSearchBarInput("Search player")
    }
    const InputClicked=()=>{
        setSearchBarInput("");
        setOpenList(true);
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
            <div
                style={{
                    color:"#70727b",
                    padding:'10px',
                    fontSize:'12px',
                }}
            >
                SEARCH:
            </div>
            <input
                onClick={InputClicked}
                value={searchBarInput}
                onChange={handleChange}  
                onBlur={leavesInput}
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
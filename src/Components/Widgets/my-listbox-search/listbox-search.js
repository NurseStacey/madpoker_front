import {useEffect, useState} from 'react'
import {APPLICATION_COLORS} from '../../Constants/application-colors'

export default function ListBoxSearch({
    searchBarInput,
    setSearchBarInput,
    setSelection,
    selection,
    showDropDown,
    theList
})
{
    const [thisLocalList, setThisLocalList]=useState([]);

    useEffect(()=>{
        if (searchBarInput==="Search") return;

        let newPlayerList = theList.filter((oneItem)=>oneItem.toUpperCase().includes(searchBarInput.toUpperCase()));
        setThisLocalList([" --- Reset List --- ", ...newPlayerList]);

    },[searchBarInput])    

    const ResetLocalList=()=>{
        setThisLocalList([" --- Reset List --- ", ...theList]);
    }

    useEffect(()=>{
        ResetLocalList()
    },[theList])

    const ItemClicked=(oneItem)=>{
        if (oneItem===" --- Reset List --- ")  {
            ResetLocalList();
            setSearchBarInput("Search");
            setSelection("");
        }
            else setSelection(oneItem);
    }
    return(
        <div
            style={{
                    display:(showDropDown) ? 'block' : 'none',
                    marginLeft:'20%',
                    width:'75%',
                    height:'250px',
                    backgroundColor:'white',
                    border:'1px solid black',
                    zIndex:'5',
                    overflowY:'scroll'
            }}
        >
            {thisLocalList.map((oneItem)=>(
                <div
                    key={oneItem}
                    onClick={()=>ItemClicked(oneItem)}
                    style={{
                        textAlign:'left',
                        paddingLeft:'5px',
                        color:APPLICATION_COLORS['widget-colors']['font_color'],
                        backgroundColor:(selection===oneItem)?APPLICATION_COLORS['widget-colors']['selected']:'white'
                    }}
                >
                    {oneItem}
                </div>
            ))}        
        </div>
    )
}
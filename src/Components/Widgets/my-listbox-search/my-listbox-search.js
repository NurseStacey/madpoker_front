import {useEffect, useState} from 'react';
import useOutsideClick from '../../useOutsideClick';
import SearchBox from './search-box';
import ListBoxSearch from './listbox-search';

export default function MyListBoxSearch({
    selection,
    setSelection,
    title,
    theList,
    MyListBoxSearchStyle
})
{

    const [searchBarInput, setSearchBarInput]=useState('Search');
    const [showDropDown, setShowDropDown]=useState(false)
    const handleClickOutside = () => {
        setShowDropDown(false);
    };
    const wrapperRef = useOutsideClick(handleClickOutside);

    useEffect(()=>{
        if (selection==="") setSearchBarInput("Search");
            else setSearchBarInput(selection);
    },[selection])

    const ItemChosen=(oneItem)=>{
        console.log(oneItem)
        if (oneItem!==""){
            setShowDropDown(false);
            setSearchBarInput(selection);
        }

        setSelection(oneItem);
    }

    return(
        <div
            ref={wrapperRef} 
            style={{
                display:'block',
                ...MyListBoxSearchStyle
            }}
        >
            <div
                style={{
                    fontSize:"22px"
                }}>
                {title}
            </div>
            <SearchBox
                searchBarInput={searchBarInput}
                setSearchBarInput={setSearchBarInput}
                setShowDropDown={setShowDropDown}
            />
            <ListBoxSearch
                selection={selection}
                setSelection={ItemChosen}
                showDropDown={showDropDown}
                searchBarInput={searchBarInput}
                setSearchBarInput={setSearchBarInput}
                theList={theList}
            />

        </div>
    )
}
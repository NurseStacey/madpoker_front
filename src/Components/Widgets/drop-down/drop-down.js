import DropDownHeader from './drop-down-header';
import {useState, useRef} from 'react';
import DropDownList from './drop-down-list';
import useClickOutside from './use-click-outside';

export default function DropDown({
    selectedItem,
    width,
    allItems,
    setSelectedItem,
    title,
    top,
    DropDownStyle
})
{
    const [dropDownClicked, setDropDownClicked]=useState(false)

    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, ()=>setDropDownClicked(false));    

    const test = ()=>{console.log('blur')}
    return(
        <div
            ref={dropdownRef}
            style={{
                position:'absolute',
                width:`${width}px`,
                top:`${top}px`,
                ...DropDownStyle
            }}>
            <DropDownHeader
                selectedItem={selectedItem}
                setDropDownClicked={setDropDownClicked}
                dropDownClicked={dropDownClicked}
                title={title}
            />
            <DropDownList
                dropDownClicked={dropDownClicked}
                setDropDownClicked={setDropDownClicked}
                allItems={allItems}
                setSelectedItem={setSelectedItem}
            /> 
        </div>
    )
}
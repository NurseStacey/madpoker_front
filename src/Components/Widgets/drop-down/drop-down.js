import DropDownHeader from './drop-down-header'
import {useState} from 'react'
import DropDownList from './drop-down-list'

export default function DropDown({
    selectedItem,
    width,
    allItems,
    setSelectedItem,
    title,
    top
})
{
    const [dropDownClicked, setDropDownClicked]=useState(false)

    return(
        <div
            style={{
                position:'absolute',
                width:`${width}px`,
                top:`${top}px`
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
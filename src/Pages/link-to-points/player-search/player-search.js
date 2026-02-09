import {useEffect, useState} from 'react'
import SearchInput from './search-input'
import PlayerList from './player-list'
import useOutsideClick from '../../../Components/useOutsideClick'

export default function PlayerSearch({
    width,
    top
})
{
    const [searchBarInput, setSearchBarInput]=useState('Search player');
    const [showDropDown, setShowDropDown]=useState(false)
    const [selectedPlayer, setSelectedPlayer]=useState({
        id:-1,
        player:''
    });

    const handleClickOutside = () => {
        setShowDropDown(false);
        setSearchBarInput(selectedPlayer.player);
    };
    const wrapperRef = useOutsideClick(handleClickOutside);
    useEffect(()=>{
        if (selectedPlayer===null){
            setSearchBarInput("")
        } else {
            setSearchBarInput(selectedPlayer.player)
            setShowDropDown(false)
        }
    },[selectedPlayer])

    const test=()=>{
        console.log(searchBarInput)
    }
    
    return(
        <div
            ref={wrapperRef} 
            style={{
                position:'absolute',
                width:`${width}px`,
                top:`${top}px`,
                zIndex:3,
            }}>
            <button onClick={test}>test</button>
            <SearchInput
                searchBarInput={searchBarInput}
                setSearchBarInput={setSearchBarInput}
                setShowDropDown={setShowDropDown}
            />
            <PlayerList
                searchBarInput={searchBarInput}
                setSelectedPlayer={setSelectedPlayer}
                selectedPlayer={selectedPlayer}
                showDropDown={showDropDown}
            />
            </div>        
    )
}
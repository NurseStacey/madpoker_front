import {useEffect, useState} from 'react'
import SearchInput from './search-input'
import PlayerList from './player-list'
import useOutsideClick from '../../../Components/useOutsideClick'

export default function PlayerSearch({
    width,
    top,
    selectedPlayer,
    setSelectedPlayer
})
{
    const [searchBarInput, setSearchBarInput]=useState('Search player');
    const [showDropDown, setShowDropDown]=useState(false)


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
                // position:'absolute',
                // width:'20%',
                // left:'50%',
                // translate:'-50%',
                // //width:`${width}px`,
                // //top:`${top}px`,
                // zIndex:10,
            }}>
            <div>Player</div>
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
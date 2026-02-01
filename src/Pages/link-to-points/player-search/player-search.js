import {useEffect, useState} from 'react'
import SearchInput from './search-input'
import PlayerList from './player-list'

export default function PlayerSearch({
    width,
    top
})
{
    const [ searchBarInput, setSearchBarInput]=useState('Search player');
    const [openList, setOpenList]=useState(false)
    const [selectedPlayer, setSelectedPlayer]=useState(null)

    return(
        <div
            style={{
                position:'absolute',
                width:`${width}px`,
                top:`${top}px`
            }}>
            <SearchInput
                searchBarInput={searchBarInput}
                setSearchBarInput={setSearchBarInput}
                setOpenList={setOpenList}
            />
            <PlayerList
                dropDownClicked={openList}
                setDropDownClicked={setOpenList}
                searchBarInput={searchBarInput}
                setSelectedPlayer={setSelectedPlayer}
            />
            </div>        
    )
}
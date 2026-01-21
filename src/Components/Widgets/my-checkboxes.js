import {useState} from 'react'

export default function MyCheckBoxes({
    options,
    setSelections,
    selections,
    Style,
    oneBoxStyle,
    disable
})
{
    
    const optionClicked=(thisOption)=>{
        if (disable) return
        
        if (selections.includes(thisOption)) setSelections(selections.filter((oneOption)=>oneOption!==thisOption))
            else setSelections([...selections, thisOption])
    }

    return(
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"left",
                flexWrap:"wrap",
                border:"1px solid  black",
                ...Style
            }}>
            {options.map((oneOption)=>
                <div
                    key={oneOption}
                    onClick={()=>optionClicked(oneOption)}
                    style={{
                        backgroundColor:(selections.includes(oneOption)) ? "#FF5C5C" : "white",
                        border:"1px solid black",
                        margin:"10px",  
                        cursor:"pointer",
                        ...oneBoxStyle 
                    }}>
                        {oneOption}
                </div>)}
        </div>
    )
}
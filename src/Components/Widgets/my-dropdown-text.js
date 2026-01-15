import {useState, useEffect} from 'react'

export default function MyDropdownText({
    optionsList,
    setSelectedOption,
    selection,
    style,
    disable,
    name
})
{
    const [inputText, setInputText]=useState("")
    const [matchingList,  setMatchingList]=useState([])

    useEffect(() => {
        setMatchingList(optionsList);
    }, [optionsList]);

    const selectionClicked=(item)=>{
        if (disable) return

        setSelectedOption(
            {
                target:{
                    name:name,
                    value:item
                }
            
        })        
    }

    const handleChange = (e)=>{
        if (disable) return
        let thisText=e.target.value
        let newMatchingList=[]

        optionsList.map((oneItem)=>{
            if (oneItem.toLowerCase().includes(thisText)){
                newMatchingList.push(oneItem)
            }
        })
        setMatchingList(newMatchingList)
        
        if (newMatchingList.length === 1){
            setSelectedOption(newMatchingList[0])
        } else {
            setSelectedOption("")    
        }
        setInputText(thisText)
    }

    const Test=()=>{console.log(selection )}
    return(
        <div
            style={{
                width:"150px",
                height:"250px",
                fontSize:"14px",
                font:"arial",
                display:"block",
                border:"1px solid black",
                ...style
            }}>
            <input
                type="text"
                onChange={handleChange}
                value={inputText}
                style={{
                    width:"100%",
                    boxSizing: "border-box",
                }}
                />
            <div
                style={{
                    width:"100%",
                    overflowY:"scroll",
                    height:'80%'
                }}
            >
                {matchingList.map((oneItem)=>
                    <div
                        
                        key={oneItem}
                        onClick={()=>selectionClicked(oneItem)}
                        style={{
                            textAlign:"left",
                            cursor:"pointer",
                            backgroundColor: (selection===oneItem) ? "limegreen" : "white"
                        }}
                        >
                        {oneItem}
                    
                    </div>
                )}
            </div>
        </div>
    )
}


export default function MyInputColumn({
    labelText,
    handleChange,
    inputValue,
    inputName,
    inputType
})
{
    
    return (
        <div
            style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"flex-start",
                margin:"25px 25px",

            }}
            >
            <label
                style={{
                    textAlign:"center",
                    marginBottom:"25px"
                }}>{labelText}</label>
            {(inputType=="textarea") ? 
                <textarea
                    style={{
                        textAlign:"right"
                    }}
                    cols="70"
                    name={inputName}
                    onChange={handleChange}  
                    type={inputType}
                    value={inputValue}></textarea> : 
                <input
                    style={{
                        textAlign:"right"
                    }}
                    name={inputName}
                    onChange={handleChange}  
                    type={inputType}
                    value={inputValue}></input>
            }
        </div>
    )
}
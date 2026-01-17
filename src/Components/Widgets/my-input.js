

export default function MyInput({
    labelText,
    handleChange,
    inputValue,
    inputName,
    inputType,
    inputStyle
})
{
    
    return (
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                margin:"25px 0px",
                ...inputStyle
            }}
            >
            <label
                style={{
                    width:"40%",
                    marginLeft:"10%",
                    textAlign:"Left"
                }}>{labelText}</label>
            <input
                style={{
                    width:"40%",
                    marginRight:"10%",
                    textAlign:"right"
                }}
                name={inputName}
                onChange={handleChange}  
                type={inputType}
                value={inputValue}></input>
        </div>
    )
}
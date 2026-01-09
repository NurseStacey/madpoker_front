

export default function MyTextArea({
    labelText,
    handleChange,
    inputValue,
    inputName,
    cols,
    rows
})
{
    
    return (
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                margin:"25px 0px"
            }}
            >
            <label
                style={{
                    width:"40%",
                    marginLeft:"10%",
                    textAlign:"Left"
                }}>{labelText}</label>
            <textarea
                cols={cols}
                rows={rows}
                style={{
                    width:"40%",
                    marginRight:"10%",
                    textAlign:"right"
                }}
                name={inputName}
                onChange={handleChange}  
                value={inputValue}></textarea>
        </div>
    )
}
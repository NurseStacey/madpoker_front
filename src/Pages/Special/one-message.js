

export default function OneMessage({thisRecord}){
    const ConvertDate=(oneRecord)=>{
        let thisArray = oneRecord.date.split("-")
        return `${thisArray[1]}-${thisArray[2]}-${thisArray[0]}`
    }

    return(
        <div
            style={{
                color:thisRecord.color,
                display:"flex",
                justifyContent:"row",
                fontFamily: "averia sans libre",
                fontSize:"20px"
            }}
        >
            <div
                style={{
                    width:"15%",
                }}
                >
                {ConvertDate(thisRecord)}
            </div>
            <div
                style={{
                    width:"3%"
                }}>
                    -
                </div>
            <div
                style={{
                    width:"80%",
                    display:"flex",
                    justifyContent:"left",
                    textAlign:"left"
                }}>
                {thisRecord.text}
            </div>
        </div>
    )
}
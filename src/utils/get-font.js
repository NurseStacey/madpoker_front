
export default function GetFont(
    Height,
    Width,
    text,
    numberOfMargins
){
    let fontSize=30

    while(fontSize>1)
    {
        let charactersPerLine=Math.floor((Width/(fontSize+1)))
        let numberLinesNeeded = 0
        text.map((oneLine)=>{
            numberLinesNeeded+=Math.ceil(oneLine.length/charactersPerLine)

        })


        if (((numberOfMargins+numberLinesNeeded)*(fontSize)<Height)) return fontSize

        fontSize-=1

    }

    return fontSize

}
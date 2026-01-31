

export default function MyListBox({
    theList,
    title,
    titleColor,
    direction
})
{
    return(
        <div
            style={{
                display:'flex',
                flexDirection:(direction==='horizontal' ? 'row' : 'column'),
                justifyContent:'center'
            }}>
            <div
                style={{
                    color:{titleColor},
                    padding:'5%'
                }}>
                {title}
            </div>
            <div                
                style={{
                    backgroundColor:'white',
                    color:'black',
                    padding:'5%'
                }}>
                {/* {theList.map((oneItem)=>(
                    <div
                        key={oneItem}>
                        {oneItem}
                    </div>
                ))} */}
            </div>
        </div>
    )
}
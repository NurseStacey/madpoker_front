

export default function MyListBox({
    theList,
    title,
    titleColor,
    direction,
    ListBoxStyle,
    selectedItem,
    setSelection
})
{
    return(
        <div
            style={{
                display:'flex',
                flexDirection:(direction==='horizontal' ? 'row' : 'column'),
                justifyContent:'flex-start',
                ...ListBoxStyle

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
                    padding:'5%',
                    border:'1px solid black',
                    width:'100%'
                }}>
                {theList.map((oneItem)=>(
                    <div
                        onClick={()=>setSelection(oneItem)}
                        key={oneItem}
                        style={{
                            backgroundColor:(selectedItem===oneItem)?'limegreen':'white'
                        }}>
                        {oneItem}
                    </div>
                ))} 
            </div>
        </div>
    )
}
import {APPLICATION_COLORS} from '../application-colors'

export default function MyMultiListBox({
    theList,
    title,
    titleColor,
    direction,
    ListBoxStyle,
    selectedItems,
    setSelection
})
{
    const localSetSelection = (oneItem)=>{
        setSelection(oneItem, !selectedItems.includes(oneItem))
    }

    return(
        <div
            style={{
                display:'flex',
                flexDirection:(direction==='horizontal' ? 'row' : 'column'),
                justifyContent:'flex-start',
                //border:'1px solid black',
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
                    width:'100%',
                    height:'100%',
                    overflowY:'scroll'
                }}>
                {theList.map((oneItem)=>(
                    <div
                        onClick={()=>localSetSelection(oneItem)}
                        key={oneItem}
                        style={{
                            backgroundColor:(selectedItems.includes(oneItem))?APPLICATION_COLORS['widget-colors']['selected']:'white'
                        }}>
                        {oneItem}
                    </div>
                ))} 
            </div>
        </div>
    )
}
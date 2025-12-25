import {useState} from 'react'
import MyInput from './my-input'

export default function ColorSelector({
    setValue
}){
    const [enteredHex, setenteredHex]=useState("")
    const [Pallette, setPallette] = useState( [
        {'name':'black', 'hex':'#000000','selected':false},
        {'name':'red', 'hex':'#FF0000','selected':false},
        {'name':'blue', 'hex':'#0000FF','selected':false},
        {'name':'green', 'hex':'#008000','selected':false},
        {'name':'aqua', 'hex':'#00FFFF','selected':false},
        {'name':'purple', 'hex':'#800080','selected':false},
        {'name':'pink', 'hex':'#FF69B4','selected':false},
    ])
    
    const textChange = (e) =>{
        setenteredHex(e.target.value)
        setValue(e.target.value)
    }

    const SelectedColor = (whichColor)=>{
        let newPallette = []
        Pallette.map((oneColor)=>{
            if (oneColor['name']==whichColor) {
                oneColor['selected']=true
                setValue(oneColor['hex'])
            } else {
                oneColor['selected']=false
            }
            newPallette.push(oneColor)
        })
        setPallette(newPallette)
    }
    return (
        <div
            style={{
                width:"300px",
                border:"1px solid black",
                display:"flex",
                flexWrap:"wrap"
            }}>
                {Pallette.map((oneColor)=>(
                    <div
                    style={{
                        display:"flex",
                        flexDirection:"row",
                        backgroundColor:oneColor['name'],
                        border: oneColor['selected'] ? "3px solid yellow" : "",
                        height:"50px",
                        width:"50px",
                        padding:"3px",
                        margin:"3px"
                    }}
                    onClick={()=>SelectedColor(oneColor['name'])}
                    >

                    </div>
                ))}
                 <MyInput
                            labelText="Enter your own"
                            handleChange={textChange}
                            inputValue={enteredHex}
                            inputName="hexValue"
                        />                        
        </div>
    )
}
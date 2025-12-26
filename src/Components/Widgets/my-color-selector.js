import {useState,useEffect} from 'react'
import MyInput from './my-input'

export default function ColorSelector({
    setValue,
    currentValue,
}){
    const [enteredHex, setenteredHex]=useState("")
    const [selectedColor, setSelectedColor]=useState({'name':'black', 'hex':'#000000','selected':false})
    const [Pallette, setPallette] = useState( [            
        {'name':'black', 'hex':'#000000','selected':false},
        {'name':'lime', 'hex':'#00FF00','selected':false},
        {'name':'teal', 'hex':'#008080','selected':false},
        {'name':'olive', 'hex':'#808000','selected':false},
        {'name':'maroon', 'hex':'#800000','selected':false},
        {'name':'Fuchsia', 'hex':'#FF00FF','selected':false},
        {'name':'navy', 'hex':'#000080','selected':false},
        {'name':'brown', 'hex':'##A52A2A','selected':false},
        {'name':'crimson', 'hex':'#DC143C','selected':false},
        {'name':'gold', 'hex':'#FFD700','selected':false},
        {'name':'red', 'hex':'#FF0000','selected':false},
        {'name':'blue', 'hex':'#0000FF','selected':false},
        {'name':'green', 'hex':'#008000','selected':false},
        {'name':'aqua', 'hex':'#00FFFF','selected':false},
        {'name':'purple', 'hex':'#800080','selected':false},
        {'name':'pink', 'hex':'#FF69B4','selected':false}])
    
    useEffect(()=>{
       
        let newPallette = []
        Pallette.map((oneColor)=>{

            if (oneColor['hex']==currentValue) {
                oneColor['selected']=true
                setSelectedColor(oneColor)
                
            } else {
                oneColor['selected']=false
            }
            newPallette=[...newPallette, oneColor]

        })

        setPallette(newPallette)
    },[currentValue])


    const textChange = (e) =>{
        setenteredHex(e.target.value)
        setValue(e.target.value)
    }

    const SelectedColor = (whichColor)=>{
        setValue(whichColor)
        setSelectedColor(whichColor)
    }

    const Test=()=>{console.log(Pallette)}

    return (
        <div
            style={{
                display:"block",
            }}
        >
            <div
                style={{
                    width:"300px",
                    border:"1px solid black",
                    display:"flex",
                    flexWrap:"wrap"
                }}>
                    {Pallette.map((oneColor)=>(
                        <div
                        key={oneColor.hex}
                        style={{
                            display:"flex",
                            flexDirection:"row",
                            backgroundColor:oneColor['name'],
                            border: oneColor['selected'] ? "3px solid yellow" : "3px solid white",
                            height:"15px",
                            width:"15px",
                            padding:"3px",
                            //margin:"3px"
                        }}
                        onClick={()=>SelectedColor(oneColor['hex'])}
                        >

                        </div>
                    ))}
                       
            </div>
            <div
                style={{
                    display:"flex",
                    justifyContent:"space-around",
                    color:selectedColor['hex'],
                    marginTop:"10px"
                }}
            >
                SelectedColor: {selectedColor['name']}
            </div>
            <MyInput
                        labelText="Enter your own"
                        handleChange={textChange}
                        inputValue={enteredHex}
                        inputName="hexValue"
                    /> 
        </div>
    )
}
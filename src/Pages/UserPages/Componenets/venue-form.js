import MyInput from '../../../Components/Widgets/my-input';
import MyButton from '../../../Components/Widgets/my-button';
import MyRadioButton from '../../../Components/Widgets/my-radiobutton';

import {useState} from 'react'

export default function VenueForm({
    formData,
    setFormData,
    buttonFunction,
    buttonText,
})
{
    const [fileKey,setFileKey]=useState(Date.now())

    const localButtonFunction=()=>{
        setFileKey(Date.now())
        buttonFunction()
    }

    const activeSelected = (value)=>{
        setFormData({
            ...formData,
           active:(value==='Active')
        })
    }

    const handleChange = (e) =>{

        if (e.target.name==='image') {
            setFormData({
                ...formData,
                [e.target.name]:e.target.files[0]
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]:e.target.value
            })
        }

    }    
    return(
        <div
            style={{
                display:"block",
                width:"80%",
                border:"3px solid blue",
                margin:"100px auto"

            }}>
            <MyInput
                labelText="Venue Name"
                handleChange={handleChange}
                inputValue={formData.venue_name}
                inputName="venue_name"
            />
            <MyRadioButton
                options ={['Active', 'Inactive']}
                disabled={false}
                radioStyle={{}}
                selection={(formData.active) ? 'Active':'Inactive'}
                optionsSelected={activeSelected}
            />
            <MyInput
                labelText="Text to Display"
                handleChange={handleChange}
                inputValue={formData.display_label}
                inputName="display_label"
            />
     
            <MyInput
                labelText="Venue Image"
                handleChange={handleChange}                
                inputName="image"
                inputType="file"
                inputKey={fileKey}
            />          
            <MyButton
                button_function={localButtonFunction}
                button_text={buttonText}  
                button_style={{
                    height:"100px",
                    width:"100px",
                    margin:"1% auto"
                }}
                disable={false}              
            />            
        </div>
    )
}
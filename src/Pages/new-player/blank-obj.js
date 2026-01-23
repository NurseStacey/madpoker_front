export const BlankFormData={
    first_name:"",
    last_name:"",
    player:"",
    email:"",
    phone:"",
    password:""
}

export function CreateFormObj(){

    return({
        formData:BlankFormData,
    })
}
import WindowDimensions from '../../../utils/window-dimensions'
import Title from '../Componenets/Title';
import {useState,useEffect} from 'react';
import axiosInstance from 'axios';
import OneDirector from './one-director';
import UserForm from '../Componenets/user-form'

export default function EditDirectors()
{
    const { height, width } = WindowDimensions();
    const [Width, setWidth]=useState(0);
    const [Height, setHeight] =  useState(0);      
    const [allDirectors, setAllDirectors]=useState([]);
    const [formData, setFormData]=useState({
        username:"",
        email:"",
        password1:"",
        password2:"",
        image:"",
        phone:""
    });
    const [idToEdit, setIdToEdit]=useState(-1)

    useEffect(()=>{
        setWidth(width);
        setHeight(height);
        fetchData();
    },[]);

    const fetchData = async ()=>{
        try{

            const response = await axiosInstance.get("http://127.0.0.1:8000/login_api/all_user/",);
            setAllDirectors(response.data)
            console.log(response.data)
        }catch(err){
            alert('Problem retrieving users.')
        }
    }

    const EditDirector=(id)=>{
        setIdToEdit(id)
        let thisDirector=allDirectors.find((oneDirector)=>oneDirector.id===id)
        console.log(thisDirector)
        setFormData({
            username:thisDirector.username,
            email:thisDirector.email,
            password1:"",
            password2:"",
            image:"",
            phone:thisDirector.phone
        });
    }

    const UpdateUser=async ()=>{
        try{
            let formToSend = new FormData();

            if (formData.image)
                formToSend.append("image", formData.image, formData.image.name);
            formToSend.append("username", formData.username);
            formToSend.append("email", formData.email);
            formToSend.append("password1", formData.password1);     
            formToSend.append("password2", formData.password2);     
            formToSend.append("phone", formData.phone);

            const response = await axiosInstance.patch(`http://127.0.0.1:8000/login_api/update_director/${idToEdit}/`,formToSend, {
                headers: { 'Content-Type': 'multipart/form-data'}});
            setFormData({
                username:"",
                email:"",
                password1:"",
                password2:"",
                image:'',
                phone:""
            });
            setIdToEdit(-1);
            fetchData()
        }catch(err){
            alert("Can't update user information")
        }
    }

    return(
        <div 
            style={{
                width:`${Width}px`,
                height:`${Height}px`,
                displpay:"block"
        }}>

            <Title
                TitleText = "Edit Directors"
            />
            <div
                style={{
                    display:'flex'
                }}
            >
                <div
                    style={{
                        display:'block',
                        margin:'100px auto',
                        width:'50%'
                    }}
                >
                    {allDirectors.map((ThisDirector)=>(
                        <div
                            key={ThisDirector.id}
                            style={{
                            }}>
                                <OneDirector
                                    ThisDirector={ThisDirector}
                                    fetchData={fetchData}
                                    EditDirector={EditDirector}
                                />
                            
                        </div>
                    ))}                
                </div>
                <div
                    style={{
                        display:'block',
                        margin:'100px auto',
                        width:'50%',
                        fontSize:'25px'
                    }}
                >
                    <div
                        style={{
                            display:'block'
                        }}
                    >
                        <div
                            // style={{
                            //     fontSize:'25px'
                            // }}
                        >
                            Edit Director Information
                        </div>
                        <UserForm
                            formData={formData}
                            setFormData={setFormData}
                            buttonFunction={UpdateUser}
                            buttonText='Update Director'
                        />                        
                    </div>
                </div>                
            </div>
        </div>
    )
}
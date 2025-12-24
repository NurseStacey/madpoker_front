import AxiosInstance from './utils/axios'
import './App.css';
import Left_Side from './Components/left-side'
import {useState, useEffect} from 'react'
import WindowDimensions from './utils/window-dimensions'

import HomeScreen from './Pages/Home/home'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/UserPages/Login';
import Register from './Pages/UserPages/Register';
import Layout from './Pages/UserPages/Layout';
import Admin from './Pages/UserPages/Admin';
import Index from './Pages/Index/index'
import UpdateTopMessage from './Pages/UserPages/update-top-message'

function App() {

  const [RightSideKey, setRighSideKey]=useState('home')

  const { Height, Width } = WindowDimensions();

  useEffect(()=>{

  }, [RightSideKey])
  
  const test =()=>{
    console.log(Width)
        // AxiosInstance.get('http://localhost:8000/react_test/')
        // .then(res => {
        //     console.log(res)
        //     })
        // .catch(err => {})
  }



  return (
    <div 
      className="App"
      style={{
        width:`${Width}px`,
        height:`${Height}px`,
      }}>
        <BrowserRouter>
          <Routes>
            <Route path='layout' element={<Layout/>}/>
            {/* <Route path='layout' element={<Layout/>}/> */}
            <Route path='/' element={<Index/>}/> 
            <Route path='admin' element={<Admin/>}/>    
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='update_top' element={<UpdateTopMessage/>}/>            
         
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;

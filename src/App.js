import AxiosInstance from './utils/axios'
import './App.css';
import Left_Side from './Components/left-side'
import {useState, useEffect} from 'react'
import WindowDimensions from './utils/window-dimensions'
import Slider from './Components/slider'
import HomeScreen from './Pages/Home/home'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/UserPages/Login';
import Register from './Pages/UserPages/Register';
import Layout from './Pages/UserPages/Layout';
import Admin from './Pages/UserPages/Admin';

function App() {

  const [RightSideKey, setRighSideKey]=useState('home')

  const { Height, Width } = WindowDimensions();

  useEffect(()=>{

  }, [RightSideKey])
  
  const test =()=>{
    console.log(window.innerWidth)
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
            <Route path='/' element={<Layout/>}>
            <Route index element={<Admin/>}/>    
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
        
            </Route>              
          </Routes>
        </BrowserRouter>
{/* 

          <Left_Side
            
            setRightSideKey={setRighSideKey}
            RightSideKey={RightSideKey}
            />

          
          {(RightSideKey=='home') ? 
            <HomeScreen/> :
            <></>} */}
    </div>
  );
}

export default App;

import AxiosInstance from './utils/axios'
import './App.css';
import Left_Side from './Components/left-side'
import {useState, useEffect} from 'react'
import WindowDimensions from './utils/window-dimensions'
import Slider from './Components/slider'
import HomeScreen from './Pages/Home/home'

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

         {/* <button onClick={test}>test</button>  */}

          <Left_Side
            
            setRightSideKey={setRighSideKey}
            RightSideKey={RightSideKey}
            />

          
          {(RightSideKey=='home') ? 
            <HomeScreen/> :
            <></>}
    </div>
  );
}

export default App;

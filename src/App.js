import AxiosInstance from './utils/axios'
import './App.css';
import Left_Side from './Components/left-side'
import {useState, useEffect} from 'react'
import Slider from './Components/slider'
import HomeScreen from './Pages/Home/home'

function App() {

  const [RightSideKey, setRighSideKey]=useState('home')

  useEffect(()=>{

  }, [RightSideKey])
  
  const test =()=>{
        AxiosInstance.get('http://localhost:8000/react_test/')
        .then(res => {
            console.log(res)
            })
        .catch(err => {})
  }

  return (
    <div className="App">
        <Slider/>
        {/* <button onClick={test}>test</button> */}

          {/* <Left_Side
            
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

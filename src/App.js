import AxiosInstance from './utils/axios'
import './App.css';
import Left_Side from './Components/left-side'
import {useState, useEffect} from 'react'

import HomeScreen from './Pages/home'

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

        {/* <button onClick={test}>test</button> */}

          <Left_Side
            
            setRighSideKey={setRighSideKey}
            />

          <div style={{width:'15%', marginRightt:'15%'}}></div>
          {(RightSideKey=='home') ? 
            <HomeScreen/> :
            <></>}
    </div>
  );
}

export default App;

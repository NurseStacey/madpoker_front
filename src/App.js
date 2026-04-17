import AxiosInstance from './utils/axios'
import './App.css';
import Left_Side from './Components/left-side'
import {useState, useEffect} from 'react'
import WindowDimensions from './utils/window-dimensions'

import HomeScreen from './Pages/Home/home'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/UserPages/Login';
import Register from './Pages/UserPages/register-director/register.js';
import Layout from './Pages/UserPages/Layout';
import Admin from './Pages/UserPages/Admin';
import Index from './Pages/Index/index'
import UpdateTopMessage from './Pages/UserPages/update-top-message/update-top-message'
import UpdateSpecialMessage from './Pages/UserPages/special-messages/update-special-message'
import EditVenues from './Pages/UserPages/edit-venues/edit-venues'
import EditGames from './Pages/UserPages/games/games'
import SeasonManagement from './Pages/UserPages/Seasons/seasons-management';
import GameRoster from './Pages/UserPages/game-roster/game-roster.js'
import EventManagement from './Pages/UserPages/event-management/event-management';
import EditDirectors from './Pages/UserPages/edit-directors/edit-directors';
import FinalizeGame from './Pages/UserPages/finalize-game/finalize-game';
import GameTypes from './Pages/UserPages/game-types/game-types';
import TestingPage from './Pages/UserPages/testing.js';
import CancelGame from './Pages/UserPages/CancelGame/CancelGame.js';
import TournamentManagement from './Pages/UserPages/tournament-management/tournament-management.js';
import TournamentRoster from './Pages/UserPages/tournament-roster/tournament-roster.js';


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
            <Route path='update_special' element={<UpdateSpecialMessage/>}/>        
            <Route path='edit_venues' element={<EditVenues/>}/>         
            <Route path='edit_games' element={<EditGames/>}/>      
            <Route path='season_management' element={<SeasonManagement/>}/>                         
            <Route path='game_roster' element={<GameRoster/>}/>
            <Route path='event_management' element={<EventManagement/>}/>
            {/* <Route path='game_sections' element={<GameSection/>}/> */}
            <Route path='edit_directors' element={<EditDirectors/>}/>
            <Route path='finalize_game' element={<FinalizeGame/>}/>
            <Route path='game_types' element={<GameTypes/>}/>
            <Route path='cancel_game' element={<CancelGame/>}/>
            <Route path='tournament_management' element={<TournamentManagement/>}/>
            <Route path='tournament_roster' element={<TournamentRoster/>}/>
            <Route path='testing' element={<TestingPage/>}/>
            

          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;

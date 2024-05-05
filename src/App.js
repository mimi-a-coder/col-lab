import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import './Styles/_compiled/style.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Profile from './Components/Profile';
import AskQuestions from './Components/AskQuestions';
import Question from './Components/Question';
import Jobs from './Components/Jobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/ask-questions" element={<AskQuestions/>} />
        <Route path="/question/:param1" element={<Question/>} />
        <Route path="/jobs" element={<Jobs/>} />
      </Routes>
   </Router>
  );
}

export default App;

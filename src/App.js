import React from 'react';
import {BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom";
// import './Styles/_compiled/style.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Profile from './Components/Profile';
import AskQuestions from './Components/AskQuestions';
import Question from './Components/Question';
import Jobs from './Components/Jobs';
import CreateJob from './Components/CreateJob';
import Job from './Components/Job';
import Mentors from './Components/Mentors';
import MentorSignup from './Components/MentorSignup';
import Mentor from './Components/Mentor';
import MentorChat from './Components/MentorChat';
import PlansandPricing from './Components/PlansandPricing';
import SubscriptionPlans from './Components/SubscriptionPlans';


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
        <Route path="/create-job" element={<CreateJob/>} />
        <Route path="/job/:param1" element={<Job/>} />
        <Route path="/mentorship-opportunities" element={<Mentors/>} />
        <Route path="/mentor-signup" element={<MentorSignup/>} />
        <Route path="/mentor/:param1" element={<Mentor/>} />
        <Route path="/mentor-chat/:param1" element={<MentorChat/>} />
        <Route path="/plansandpricing" element={<PlansandPricing/>} />
        <Route path="/subscriptionplans" element={<SubscriptionPlans/>} />
      </Routes>
   </Router>
  );
}

export default App;

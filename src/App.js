import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import './Styles/_compiled/style.css';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
   </Router>
  );
}

export default App;

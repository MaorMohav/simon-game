import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Playing from './components/Playing';
import StartGame from './components/StartGame';
import "./components/StartGame.css";



function App() {
 
  return (
    <Router>
      <div className="App">
        
        <Routes >
          <Route exact path='/' element={<StartGame />} />
          <Route path='/playing' element={<Playing />} />
        </Routes >
      </div>
    </Router>
  );
}



export default App;

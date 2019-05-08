import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchData from './FetchData.js'
import {useState, useEffect} from 'react'

function App() {
  const [gamesData, setGamesData] = useState([])
  useEffect(() => {
    FetchData()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <h1>baseball-bets</h1>
      </header>
      {gamesData}
    </div>
  );
}

export default App;

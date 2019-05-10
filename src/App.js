import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchData from './FetchData.js'
import MatchupBlock from './MatchupBlock.js'
import {useState, useEffect} from 'react'

function App() {
  const [allData, setAllData] = useState()

  useEffect(() => {
    FetchData(setAllData)
  },[])
  console.log(allData,'allData')
  let matchupBlocks
  if (allData !== undefined) {
    let schedule = allData.find(obj => obj.dataType === "schedule")
    let pitchingData = allData.find(obj => obj.dataType === "pitching").data
    let hittingData = allData.find(obj => obj.dataType === "hitting").data
    let fieldingData = allData.find(obj => obj.dataType === "fielding").data
    let startingPitcher = allData.find(obj => obj.dataType === "startingPitcherStats").data
    let recordData = allData.find(obj => obj.dataType === "records").data

    matchupBlocks = schedule.data.games.map(game => {

      let homeData = {
        id: game.teams.home.team.id,
        name: game.teams.home.team.name,
        records: recordData.find(obj => obj.id === game.teams.home.team.id),
        pitching: pitchingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
        hitting: hittingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
        fielding: fieldingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
        pitcherStats: startingPitcher.find(obj => obj.id == game.teams.home.probablePitcher.id).stats
      }
      let awayData = {
        id: game.teams.away.team.id,
        name: game.teams.away.team.name,
        records: recordData.find(obj => obj.id === game.teams.home.team.id),
        pitching: pitchingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
        hitting: hittingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
        fielding: fieldingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
        pitcherStats: startingPitcher.find(obj => obj.id == game.teams.away.probablePitcher.id).stats
      }
      return <MatchupBlock gameData={game} homeData={homeData} awayData={awayData} />
    })
  }
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div style={{padding: '15px'}}>
        {matchupBlocks}
      </div>
    </div>
  );
}

export default App;

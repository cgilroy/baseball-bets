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

    matchupBlocks = schedule.data.games.map(game => {
      let homeData = {
        id: game.teams.home.team.id,
        name: game.teams.home.team.name,
        record: game.teams.home.leagueRecord,
        pitching: pitchingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
        hitting: hittingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
        fielding: fieldingData.find(obj => obj.team.id === game.teams.home.team.id).stat
      }
      let awayData = {
        id: game.teams.away.team.id,
        name: game.teams.away.team.name,
        record: game.teams.away.leagueRecord,
        pitching: pitchingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
        hitting: hittingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
        fielding: fieldingData.find(obj => obj.team.id === game.teams.away.team.id).stat
      }
      return <MatchupBlock gameData={game} homeData={homeData} awayData={awayData} />
    })
  }
  return (
    <div className="App">
      <header className="App-header">

      </header>
      {matchupBlocks}
    </div>
  );
}

export default App;

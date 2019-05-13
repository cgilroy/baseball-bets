import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchData from './FetchData.js'
import MatchupBlock from './MatchupBlock.js'
import {useState, useEffect} from 'react'

function App() {
  const [allData, setAllData] = useState()
  const [loading, setLoading] = useState(true)
  const doneFetch = (data) => {
    setAllData(data)
    console.log('here')
    setLoading(false)
  }

  useEffect(() => {
    FetchData(doneFetch)
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
      let homePitcher = ''
      let awayPitcher = ''
      if (game.teams.home.hasOwnProperty('probablePitcher')) {
        homePitcher = (startingPitcher.find(obj => obj.id == game.teams.home.probablePitcher.id) !== undefined) ? (
          startingPitcher.find(obj => obj.id == game.teams.home.probablePitcher.id).stats
        ) : ('');
      }

      if (game.teams.away.hasOwnProperty('probablePitcher')) {
        awayPitcher = (startingPitcher.find(obj => obj.id == game.teams.away.probablePitcher.id) !== undefined) ? (
          startingPitcher.find(obj => obj.id == game.teams.away.probablePitcher.id).stats
        ) : ('');
      }

      let homeData = {
        id: game.teams.home.team.id,
        name: game.teams.home.team.name,
        records: recordData.find(obj => obj.id === game.teams.home.team.id),
        pitching: pitchingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
        hitting: hittingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
        fielding: fieldingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
        pitcherStats: homePitcher
      }
      let awayData = {
        id: game.teams.away.team.id,
        name: game.teams.away.team.name,
        records: recordData.find(obj => obj.id === game.teams.away.team.id),
        pitching: pitchingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
        hitting: hittingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
        fielding: fieldingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
        pitcherStats: awayPitcher
      }
      return <MatchupBlock gameData={game} homeData={homeData} awayData={awayData} />
    })
  }
  return (
    <div className="App" style={{backgroundColor:'#f0f0f0'}}>
      <header className="App-header">

      </header>
      <div style={{padding: '15px',maxWidth:'900px', margin:'0 auto'}}>
        {
          loading ? matchupBlocks : (<div>LOADING</div>)
        }
        {matchupBlocks}
      </div>
    </div>
  );
}

export default App;

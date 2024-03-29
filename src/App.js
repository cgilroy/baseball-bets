import React from 'react';
import github from './resources/github.svg'
import './App.css';
import { FetchStoredData } from './FetchData.js'
import MatchupBlock from './MatchupBlock.js'
import { BettingSummary } from './BettingSummary.js'
import useInterval from './useInterval.js'
import {useState, useEffect} from 'react'
import leagueLogo from './resources/league-logo.svg'

function App() {
  const [allData, setAllData] = useState()
  const [loading, setLoading] = useState(true)
  const [betObjects, setBetObjects] = useState([])
  var moment = require('moment')
  const [scheduleDate, setScheduleDate] = useState(new Date())

  const doneFetch = (data) => {
    // console.log(data,'donefetch')
    if (loading) setLoading(false);
    setAllData(data)
  }

  const handleDateChange = (date) => {
    // console.log('schedChange',date)
    setBetObjects([])
    setScheduleDate(date)
    FetchStoredData(moment(date).format('YYYY-MM-DD'),doneFetch)
  }

  useEffect(() => {
    FetchStoredData(moment(scheduleDate).format('YYYY-MM-DD'),doneFetch)
  },[])

  useInterval(() => {
    FetchStoredData(moment(scheduleDate).format('YYYY-MM-DD'),doneFetch);
  }, 15000);
  // console.log(allData)
  var liveGames = []
  var scheduledGames = []
  var finalGames = []
  let betObjectsTemp = []
  var betSummary = <BettingSummary handleDateChange={handleDateChange} betData={betObjects} />

  if (allData !== undefined && allData.hasOwnProperty('scheduleData')) {
    let schedule = allData.scheduleData
    if (schedule !== undefined) {
      let startingPitcher = []
      let hittingData = []
      let fieldingData = []
      let pitchingData = []
      let recordData = []
      if (allData.hasOwnProperty("teamStats")) {
        // if stored team data is available
        // startingPitcher = allData.pitcherData.data
        hittingData = allData.teamStats.find(obj => obj.dataType === "hitting").data
        fieldingData = allData.teamStats.find(obj => obj.dataType === "fielding").data
        pitchingData = allData.teamStats.find(obj => obj.dataType === "pitching").data
        recordData = allData.teamStats.find(obj => obj.dataType === "records").data
      }
      
      // if the stored pitcherData is available
      if (allData.hasOwnProperty("pitcherData")) { startingPitcher = allData.pitcherData.data }

      const addBetObject = (obj) => {
        betObjectsTemp.push(obj)
        setBetObjects(betObjectsTemp)
      }
      schedule.games.map(game => {
        let homePitcher = ''
        let awayPitcher = ''
        let homeData
        let awayData
        let outputBlock
        if (allData.hasOwnProperty("teamStats")) {
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
    
          homeData = {
            id: game.teams.home.team.id,
            name: game.teams.home.team.name,
            records: recordData.find(obj => obj.id === game.teams.home.team.id),
            pitching: pitchingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
            hitting: hittingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
            fielding: fieldingData.find(obj => obj.team.id === game.teams.home.team.id).stat,
            pitcherStats: homePitcher
          }
          awayData = {
            id: game.teams.away.team.id,
            name: game.teams.away.team.name,
            records: recordData.find(obj => obj.id === game.teams.away.team.id),
            pitching: pitchingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
            hitting: hittingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
            fielding: fieldingData.find(obj => obj.team.id === game.teams.away.team.id).stat,
            pitcherStats: awayPitcher
          }
          outputBlock = <MatchupBlock key={game.gamePk} addBetObject={addBetObject} gameData={game} homeData={homeData} awayData={awayData} hasData={true}/>
        } else {
          homeData = {
            id: game.teams.home.team.id,
            name: game.teams.home.team.name
          }
          awayData = {
            id: game.teams.away.team.id,
            name: game.teams.away.team.name
          }
          outputBlock = <MatchupBlock key={game.gamePk} addBetObject={addBetObject} gameData={game} homeData={homeData} awayData={awayData} hasData={false} />
        }
        
        let gameState = game.status.codedGameState

        if (gameState === "F" || gameState === "O" || gameState === "D") {
          finalGames.push(outputBlock)
        } else if (gameState === "I") {
          liveGames.push(outputBlock)
        } else {
          scheduledGames.push(outputBlock)
        }
        return
      })
    }
  }

  let matchupBlocks = (liveGames.length !== 0 || scheduledGames.length !== 0 || finalGames.length !== 0) ? (
    <React.Fragment>
      {
        liveGames.length !== 0  && (
          <div className="gamesSection">
            <h3 className="gamesSection__header">Live</h3>
            {liveGames}
          </div>
        )
      }
      {
        scheduledGames.length !== 0 && (
          <div className="gamesSection">
            <h3 className="gamesSection__header">Upcoming</h3>
            {scheduledGames}
          </div>
        )
      }
      {
        finalGames.length !== 0 && (
          <div className="gamesSection">
            <h3 className="gamesSection__header">Completed</h3>
            {finalGames}
          </div>
        )
      }
    </React.Fragment>
  ) : (
    <div className="noGamesSection">
      <img src={leagueLogo} />
      <h2>No Games Scheduled</h2>
    </div>
  )
  // console.log(betObjects,'betObjects')
  // console.log(betObjectsTemp,'betObjectsTemp')
  return (
    <div className="App" style={{backgroundColor:'#f0f0f0',minHeight:'100vh',display:'flex',flexFlow:'column'}}>
      <header className="App-header">
        <div className="App-header__content">
          <div>
            <h1>baseball-bets</h1>
            <div className="project-tag">
              <span>Check out the project</span>
              <a href="http://github.com/cgilroy/baseball-bets">
                <img src={github} />
              </a>
            </div>
          </div>
          {betSummary}
        </div>
      </header>
      <div style={{display:'flex',flex:'1 1 auto',flexFlow:'column',padding: '15px',maxWidth:'900px', width:'100%', margin:'0 auto',justifyContent:'center'}}>
        {
          loading ? (
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
              <div className="lds-ripple"><div></div><div></div></div>
            </div>
          ) : matchupBlocks
        }
      </div>
    </div>
  );
}

export default App;

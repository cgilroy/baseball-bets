import React from 'react'
import MatchupBlock from './MatchupBlock.js'
function FetchData(callback) {
  let scheduleData = ''
  let pitchingData = ''
  let hittingData = ''
  let fieldingData = ''

  var fetches = []

  fetches.push(
    scheduleData = fetch('http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1')
    .then(results => results.json())
  )
  fetches.push(
    fetch('https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=pitching&sportIds=1')
    .then(results => results.json()).then()
  )
  fetches.push(
    hittingData = fetch('https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=hitting&sportIds=1')
    .then(results => results.json())
  )
  fetches.push(
    fieldingData = fetch('https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=fielding&sportIds=1')
    .then(results => results.json())
  )

  Promise.all(fetches).then(() => {
    console.log([scheduleData,pitchingData,hittingData,fieldingData],'test')
  })
}

export default FetchData

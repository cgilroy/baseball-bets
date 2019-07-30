import React from 'react'
import MatchupBlock from './MatchupBlock.js'
function FetchSchedule(callback) {
  fetch('http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1')
  .then(results => results.json())
  .then(schedData => {
    // console.log(schedData,'schedData')
    let output = schedData.dates['0'].games.map(gameData => {
      return <MatchupBlock gameData={gameData} />
    })
    callback(output)
  })
}

export default FetchSchedule

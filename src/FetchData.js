import React from 'react'
import MatchupBlock from './MatchupBlock.js'
function FetchData(callback) {
  let scheduleData = ''
  let pitchingData = ''
  let hittingData = ''
  let fieldingData = ''

  var fetches = []
  const urls = [
    'http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&hydrate=probablePitcher(note)',
    'https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=pitching&sportIds=1',
    'https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=hitting&sportIds=1',
    'https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=fielding&sportIds=1'
  ]

  Promise.all(urls.map(url =>
    fetch(url).then(resp => resp.json()).then(data => {
      if (data.stats !== undefined) {
        return {dataType: data.stats['0'].group.displayName,data:data.stats['0'].splits}
      } else if (data.dates !== undefined) {
        return {dataType:'schedule',data: data.dates['0']}
      }
    })
  )).then(dataObj => callback(dataObj))
}

export default FetchData

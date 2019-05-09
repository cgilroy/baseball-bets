import React from 'react'
import MatchupBlock from './MatchupBlock.js'
function FetchData(callback) {
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
  )).then(dataObj => {
    let scheduleData = dataObj.find(obj => obj.dataType === "schedule")
    let pitcherUrls = []
    scheduleData.data.games.map(game => {
      if (game.teams.home.probablePitcher && game.teams.away.probablePitcher) {
        pitcherUrls.push(
          `https://statsapi.mlb.com/api/v1/people/${game.teams.home.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`,
          `https://statsapi.mlb.com/api/v1/people/${game.teams.away.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`
        )
      }
    })
    let allPitcherStats = []
    Promise.all(pitcherUrls.map(url =>
      fetch(url).then(resp =>
        resp.json().then(parsed => ({
          id: resp.url.substring(resp.url.lastIndexOf("people/")+7,resp.url.lastIndexOf("/stats")),
          stats: parsed.stats['0'].splits['0'].stat
        })
      ).then(data => {
        allPitcherStats.push(data)
      })
    )))
    .catch(error => {console.log(error)});
    dataObj.push(allPitcherStats);
    callback(dataObj)
  })
}

export default FetchData

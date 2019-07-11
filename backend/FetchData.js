const fetch = require("node-fetch")

function FetchTeamData(date,callback) {
    // console.log(date,'date')
    var testingLiveData = false
    let dateUrl = 'https://statsapi.mlb.com/api/v1/schedule?date='+date+'&sportId=1&hydrate=probablePitcher(note)'
    // let dateUrl = 'https://statsapi.mlb.com/api/v1/schedule?date=12/28/2019&sportId=1&hydrate=probablePitcher(note)'
    // console.log(dateUrl,'dateUrl')
    const urls = [
      dateUrl,
      'https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=pitching&sportIds=1',
      'https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=hitting&sportIds=1',
      'https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=fielding&sportIds=1'
    ]
  
    Promise.all(urls.map(url =>
      fetch(url).then(resp => resp.json()).then(data => {
        if (data.stats !== undefined) {
          return {dataType: data.stats['0'].group.displayName,data:data.stats['0'].splits}
        } else if (data.dates !== undefined) {
          if (testingLiveData) {
            return {dataType:'schedule',data: testLive.dates['0']}
          } else {
            return {dataType:'schedule',data: data.dates['0']}
          }
        }
      })
    )).then(dataObj => {
      let scheduleData = dataObj.find(obj => obj.dataType === "schedule")
      if (scheduleData.data !== undefined) {
        fetch('https://statsapi.mlb.com/api/v1/standings?leagueId=103,104').then(resp => resp.json()).then(output => {
          // console.log(output,'output')
          let splitRecords = []
          output.records.map(divisions => {
            divisions.teamRecords.map(teams => {
              splitRecords.push(
                {
                  id: teams.team.id,
                  wins: teams.leagueRecord.wins,
                  losses: teams.leagueRecord.losses,
                  totPct: teams.leagueRecord.pct,
                  dayPct: teams.records.splitRecords.find(obj => obj.type === 'day').pct,
                  nightPct: teams.records.splitRecords.find(obj => obj.type === 'night').pct,
                  lastTen: teams.records.splitRecords.find(obj => obj.type === 'lastTen').pct,
                  home: teams.records.splitRecords.find(obj => obj.type === 'home').pct,
                  away: teams.records.splitRecords.find(obj => obj.type === 'away').pct
                }
              )
            })
          })
          // console.log(nextData,'nextData')
          dataObj.push({dataType: 'records',data: splitRecords})
          callback(dataObj.filter(obj => (obj.dataType !== 'schedule' && obj.dataType !== 'startingPitcherStats')))
        })
      } else {
        // no games scheduled, return nothing
        callback()
      }
    })
  }

  function FetchStartingPitcherStats(date,storedData,callback) {
    let dateUrl = 'https://statsapi.mlb.com/api/v1/schedule?date=' + date + '&sportId=1&hydrate=probablePitcher(note)'
    var outputData = storedData.pitcherData !== undefined ? storedData.pitcherData.data : [];
    // console.log(storedData,'inital')
    fetch(dateUrl).then(resp => resp.json()).then(data => {
      if (data.dates !== undefined) {
        let scheduleData = data.dates['0']

        let pitcherUrls = []
        scheduleData.games.map(game => {
          // only fetch new pitcher data if game is not underway
          // we want to store historical pre-game pitcher data in database
          if (game.status.codedGameState === 'S' && game.teams.home.probablePitcher && game.teams.away.probablePitcher) {
            pitcherUrls.push(
              `https://statsapi.mlb.com/api/v1/people/${game.teams.home.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`,
              `https://statsapi.mlb.com/api/v1/people/${game.teams.away.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`
            )
          }
        })
        // console.log('pitcherUrls',pitcherUrls)
        Promise.all(pitcherUrls.map(url =>
          fetch(url).then(resp =>
            resp.json().then(parsed => {
              return (
                {
                  id: resp.url.substring(resp.url.lastIndexOf("people/")+7,resp.url.lastIndexOf("/stats")),
                  stats: parsed.stats['0'].splits['0'].stat
                }
              )
            })
          ).then(data => {
            // console.log('findingIndex',outputData)
            let foundIndex = outputData.findIndex(obj => obj.id === data.id)
            foundIndex !== -1 ? outputData[foundIndex] = data : outputData.push(data);
          })
          .catch(error => console.log(error))
        )).then(() => {
          // console.log('callingBack',outputData);
          if (storedData.pitcherData !== undefined) {
            (outputData !== undefined && outputData !== storedData.pitcherData.data) ? callback(outputData) : callback([]);
          } else {
            (outputData !== undefined) ? callback(outputData) : callback([]);
          }
        })
      } else {
        callback([])
      }
    })

  }

  module.exports = {
    fetchTeamData: FetchTeamData,
    fetchStartingPitcherStats: FetchStartingPitcherStats
  }
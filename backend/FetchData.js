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
    let outputData = storedData.pitcherData !== undefined ? [  ...storedData.pitcherData.data ] : [];
    // console.log(outputData,'initialoutput')
    // console.log(storedData.pitcherData.data,'inital')
    // console.log(typeof(storedData.pitcherData.data),'inital')
    fetch(dateUrl).then(resp => resp.json()).then(data => {
      if (data.dates !== undefined) {
        let scheduleData = data.dates['0']

        let pitcherUrls = []
        scheduleData.games.map(game => {
          // only fetch new pitcher data if game is not underway
          // we want to store historical pre-game pitcher data in database
          if ((game.status.codedGameState === 'S' || game.status.codedGameState === 'P') && game.teams.home.probablePitcher && game.teams.away.probablePitcher) {
            pitcherUrls.push(
              `https://statsapi.mlb.com/api/v1/people/${game.teams.home.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`,
              `https://statsapi.mlb.com/api/v1/people/${game.teams.away.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`
            )
          }
        })
        // console.log('pitcherUrls',pitcherUrls.length)
        Promise.all(pitcherUrls.map(url =>
          fetch(url).then(resp =>
            resp.json().then(parsed => {
              let pitcherStats
              let pitchID = resp.url.substring(resp.url.lastIndexOf("people/")+7,resp.url.lastIndexOf("/stats"))
              try {
                pitcherStats = {
                  id: pitchID,
                  stats: parsed.stats['0'].splits['0'].stat
                }
              } catch {
                pitcherStats = {
                  id: pitchID,
                  stats: ''
                }
                console.log(`Error found in pitcher data for id=${pitchID}`)
              }

              return pitcherStats
            })
          ).then(data => {
            // console.log('findingIndex',data)
            if (typeof(outputData) === 'object') {
              // console.log('differentData')
              // console.log(outputData,'addingsome')
              
              let foundIndex = outputData.findIndex(obj => {
                // console.log(obj.id,'obj id')
                // console.log(data.id,'data id')
                return obj.id === data.id 
              })
              // console.log(foundIndex,'foundIndex')
              foundIndex !== -1 ? outputData[foundIndex] = data : outputData.push(data);
            }
          })
          .catch(error => console.log(error))
        )).then(() => {
          // console.log(Object.keys(outputData),'outputData');
          // console.log(Object.keys(storedData.pitcherData.data),'storedData')
          if (storedData.pitcherData !== undefined) {
            (outputData !== undefined && !isEquivalent(outputData,storedData.pitcherData.data)) ? callback(outputData) : callback([]);
          } else {
            (outputData !== undefined) ? callback(outputData) : callback([]);
          }
        })
      } else {
        callback([])
      }
    })

  }

  function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    // console.log(aProps,'ap')
    // console.log(bProps, 'bp')

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        // console.log([a[propName].id,b[propName].id],'val test')

        // If pitcher id properties are not equal,
        // objects are not equivalent
        if (a[propName].id !== b[propName].id) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent

    return true;
}

  module.exports = {
    fetchTeamData: FetchTeamData,
    fetchStartingPitcherStats: FetchStartingPitcherStats
  }
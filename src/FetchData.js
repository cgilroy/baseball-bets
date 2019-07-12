import testLive from './sample-data/schedule.json'

export function FetchStoredData(date,callback) {
  let dateUrl = 'https://statsapi.mlb.com/api/v1/schedule?date=' + date + '&sportId=1&hydrate=probablePitcher(note)'
  // console.log('fetchdate',date)
  
  //fetch live schedule data, and stored team stats / starting pitcher data
  Promise.all(
    [FetchLiveData(dateUrl),
    fetch(`/api/games/${date}`).then(result => result.json()).then(data => {
      // console.log('fetcheddata',data)
      if (data.length !== 0) {
        return data[0].allData
      } else {
        // no data available
        return []
      }
    })]
  ).then(outputObj => {
    // console.log(outputObj,'outputObj')
    outputObj[1]["scheduleData"] = outputObj[0]
    // console.log('test', outputObj[1])
    callback(outputObj[1])
  })
}

function FetchLiveData(dateUrl) {
  var testingLiveData = false
  return fetch(dateUrl).then(resp => resp.json()).then(data => {
    let schedData
    if (data.dates !== undefined) {
      schedData = data.dates['0']
    }
    return schedData
  })
  // .then(dataObj => {
  //   if (dataObj !== undefined) {
  //     let pitcherUrls = []
  //     dataObj.data.games.map(game => {
  //       if (game.teams.home.probablePitcher && game.teams.away.probablePitcher) {
  //         pitcherUrls.push(
  //           `https://statsapi.mlb.com/api/v1/people/${game.teams.home.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`,
  //           `https://statsapi.mlb.com/api/v1/people/${game.teams.away.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`
  //         )
  //       }
  //     })
  //     let allPitcherStats = []
  //     Promise.all(pitcherUrls.map(url =>
  //       fetch(url).then(resp =>
  //         resp.json().then(parsed => {
  //           return (
  //             {
  //               id: resp.url.substring(resp.url.lastIndexOf("people/") + 7, resp.url.lastIndexOf("/stats")),
  //               stats: parsed.stats['0'].splits['0'].stat
  //             }
  //           )
  //         })
  //       ).then(data => allPitcherStats.push(data))
  //         .catch(error => console.log(error))
  //     )).then(() => {
  //       console.log(dataObj, 'testingobj')
  //       dataObj.push({ dataType: "startingPitcherStats", data: allPitcherStats });
        
  //       return dataObj
  //     })
  //   } else {
  //     // no games scheduled, return nothing
  //     // callback()
  //     console.log('else')
  //   }
  // })
}

// export function FetchNewData(date,callback) {
//   // console.log(date,'date')
//   var testingLiveData = false
//   let dateUrl = 'https://statsapi.mlb.com/api/v1/schedule?date='+date+'&sportId=1&hydrate=probablePitcher(note)'
//   // let dateUrl = 'https://statsapi.mlb.com/api/v1/schedule?date=12/28/2019&sportId=1&hydrate=probablePitcher(note)'
//   // console.log(dateUrl,'dateUrl')
//   const urls = [
//     dateUrl,
//     'https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=pitching&sportIds=1',
//     'https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=hitting&sportIds=1',
//     'https://statsapi.mlb.com/api/v1/teams/stats?season=2019&stats=season&group=fielding&sportIds=1'
//   ]

//   Promise.all(urls.map(url =>
//     fetch(url).then(resp => resp.json()).then(data => {
//       if (data.stats !== undefined) {
//         return {dataType: data.stats['0'].group.displayName,data:data.stats['0'].splits}
//       } else if (data.dates !== undefined) {
//         if (testingLiveData) {
//           return {dataType:'schedule',data: testLive.dates['0']}
//         } else {
//           return {dataType:'schedule',data: data.dates['0']}
//         }
//       }
//     })
//   )).then(dataObj => {
//     let scheduleData = dataObj.find(obj => obj.dataType === "schedule")
//     if (scheduleData.data !== undefined) {
//       let pitcherUrls = []
//       scheduleData.data.games.map(game => {
//         if (game.teams.home.probablePitcher && game.teams.away.probablePitcher) {
//           pitcherUrls.push(
//             `https://statsapi.mlb.com/api/v1/people/${game.teams.home.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`,
//             `https://statsapi.mlb.com/api/v1/people/${game.teams.away.probablePitcher.id}/stats?stats=byDateRange&season=2019&group=pitching`
//           )
//         }
//       })
//       let allPitcherStats = []
//       Promise.all(pitcherUrls.map(url =>
//         fetch(url).then(resp =>
//           resp.json().then(parsed => {
//             return (
//               {
//                 id: resp.url.substring(resp.url.lastIndexOf("people/")+7,resp.url.lastIndexOf("/stats")),
//                 stats: parsed.stats['0'].splits['0'].stat
//               }
//             )
//           })
//         ).then(data => allPitcherStats.push(data))
//         .catch(error => console.log(error))
//       )).then(() => {
//         dataObj.push({dataType:"startingPitcherStats",data:allPitcherStats});
//         return dataObj
//       }).then(nextData => {
//         fetch('https://statsapi.mlb.com/api/v1/standings?leagueId=103,104').then(resp => resp.json()).then(output => {
//           // console.log(output,'output')
//           let splitRecords = []
//           output.records.map(divisions => {
//             divisions.teamRecords.map(teams => {
//               splitRecords.push(
//                 {
//                   id: teams.team.id,
//                   wins: teams.leagueRecord.wins,
//                   losses: teams.leagueRecord.losses,
//                   totPct: teams.leagueRecord.pct,
//                   dayPct: teams.records.splitRecords.find(obj => obj.type === 'day').pct,
//                   nightPct: teams.records.splitRecords.find(obj => obj.type === 'night').pct,
//                   lastTen: teams.records.splitRecords.find(obj => obj.type === 'lastTen').pct,
//                   home: teams.records.splitRecords.find(obj => obj.type === 'home').pct,
//                   away: teams.records.splitRecords.find(obj => obj.type === 'away').pct
//                 }
//               )
//             })
//           })
//           // console.log(splitRecords,'splitRecords')
//           nextData.push({dataType: 'records',data: splitRecords})
//           callback(nextData)
//         })
//       })
//     } else {
//       // no games scheduled, return nothing
//       callback()
//     }
//   })
// }
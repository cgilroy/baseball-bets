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
}
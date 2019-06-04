import React from 'react'
import TextField from '@material-ui/core/TextField'
import BasicDatePicker from './BasicDatePicker.js'

function BettingSummary(props) {
  // console.log(props.betData,'props')
  var moment = require('moment')
  let betCounts = {}
  if (props.betData.length !== 0) {
    // console.log(props.betData,'i am in')
    let testObj = [
      {type:'I',state:'WIN'},
      {type:'P',state:'TIE'},
      {type:'I',state:'LOSE'},
      {type:'F',state:'WIN'},
      {type:'F',state:'LOSE'},
      {type:'D',state:'LOSE'},
    ]
    props.betData.map(obj => {
      let category
      if (obj.type === "I") {
        //live game
        switch (obj.state) {
          case 'WIN':
            category = 'Winning';
            break;
          case 'LOSE':
            category = 'Losing';
            break;
          case 'TIE':
            category = 'Tied';
            break;
        }
      } else if (obj.type === 'F' || obj.type === 'O') {
        category = (obj.state === 'WIN') ? 'Won' : 'Lost'
      } else {
        category = 'Not Started'
      }
      if (!betCounts[category]) {
        betCounts[category] = 0
      }
      // console.log(obj,'obj')
      betCounts[category]++;
    })
  }
  let betRows = []
  for (var category in betCounts) {
    if (betCounts.hasOwnProperty(category)) {
      // console.log(category,'category')
      betRows.push(<tr><td>{betCounts[category]}</td><td>{category}</td></tr>)
    }
  }
  // betRows.push(<tr><td>{props.betData.length}</td><td>Total Bets</td></tr>)

  let defaultDate = moment().format('YYYY-MM-DD')
  let bettingResult
  if (betCounts.hasOwnProperty('Lost')) {
    bettingResult = 'LOST :('
  } else if (betCounts.hasOwnProperty('Winning') || betCounts.hasOwnProperty('Losing')|| betCounts.hasOwnProperty('Tied') || betCounts.hasOwnProperty('Not Started')) {
    bettingResult = "TBD"
  } else {
    bettingResult = "WON :)"
  }

  return (
    <div className="betting-summary">
      <div className="betting-summary__date">
          <BasicDatePicker handleDateChange={props.handleDateChange} />
          <span style={{color:'rgba(0, 0, 0, 0.54)',fontSize:'1rem'}}>Result</span>
          <div className="betting-summary__result">{bettingResult}</div>
      </div>
      <div className="betting-summary__values">
        <span style={{color:'rgba(0, 0, 0, 0.54)',fontSize:'1rem'}}>Bets</span>
        <table>
          {betRows}
        </table>
      </div>
    </div>
  )
}

export default BettingSummary

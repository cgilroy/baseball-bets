import React from 'react'
import BasicDatePicker from './BasicDatePicker.js'

function BettingSummary(props) {
  // console.log(props.betData,'props')
  var moment = require('moment')
  let betCounts = {}
  if (props.betData.length !== 0) {
    // console.log(props.betData,'i am in')
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
          default:
            category = 'Tied'
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
      betRows.push(<tr key={category}><td>{betCounts[category]}</td><td>{category}</td></tr>)
    }
  }
  // betRows.push(<tr><td>{props.betData.length}</td><td>Total Bets</td></tr>)

  let bettingResult = ''
  if (betCounts.hasOwnProperty('Lost')) {
    bettingResult = 'LOST :('
  } else if (betCounts.hasOwnProperty('Winning') || betCounts.hasOwnProperty('Losing')|| betCounts.hasOwnProperty('Tied') || betCounts.hasOwnProperty('Not Started')) {
    bettingResult = "TBD"
  } else if (betCounts.hasOwnProperty('Won')){
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
        <span style={{color:'rgba(0, 0, 0, 0.54)',fontSize:'1rem'}}>{props.betData.length} Bets</span>
        <table>
          <tbody key='lol'>
            {betRows}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BettingSummary

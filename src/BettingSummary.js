import React from 'react'
import TextField from '@material-ui/core/TextField'
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
      betRows.push(<tr><td>{category}</td><td>{betCounts[category]}</td></tr>)
    }
  }

  let defaultDate = moment().format('YYYY-MM-DD')

  return (
    <div className="betting-summary">
      <div className="betting-summary__date">
        <div>
          <BasicDatePicker handleDateChange={props.handleDateChange} />
        </div>
      </div>
      <table>
        {betRows}
      </table>
    </div>
  )
}

export default BettingSummary

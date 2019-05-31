import React from 'react'

function BettingSummary(props) {
  console.log(props.betData,'props')
  if (props.betData.length !== 0) {
    console.log(props.betData,'i am in')
    let betCounts = {}
    props.betData.map(obj => {
      let category
      if (obj.type === "I") {
        //live game
        switch (obj.state) {
          case 'WIN':
            category = 'winning';
            break;
          case 'LOSE':
            category = 'losing';
            break;
          case 'TIE':
            category = 'tied';
            break;
        }
      } else if (obj.type === 'F' || obj.type === 'O') {
        category = (obj.state === 'WIN') ? 'WON' : 'LOST'
      }
      if (!obj[category]) {
        obj[category] = 0
      }
      console.log(obj,'obj')
      obj[category]++;
    })
  }

  return <div>YEAH</div>
}

export default BettingSummary

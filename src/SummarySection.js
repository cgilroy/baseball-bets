import React from 'react'
import Paper from '@material-ui/core/Paper';

function SummarySection(props) {

  console.log(props.data,'datagy')
  let output = []
  for (var category in props.data) {
    console.log(props.data[category],'category')
      output.push(
        <div>
          <div style={{display:'flex',justifyContent:'space-around'}}>
            <span>{props.data[category].stat.home}</span>
            <span style={{width:'180px'}}>{props.data[category].stat.statName}</span>
            <span>{props.data[category].stat.away}</span>
          </div>
        </div>
      )
  }

  return (
    <Paper  style={{width:'100%',maxWidth: '600px'}}>
      {output}
    </Paper>
  )
}

export default SummarySection

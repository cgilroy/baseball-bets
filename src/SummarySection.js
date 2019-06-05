import React from 'react'
import Fade from '@material-ui/core/Fade'
import Collapse from '@material-ui/core/Collapse'

function SummarySection(props) {

  let output = []
  let i = 0
  for (var category in props.data) {

      let statTotal = parseFloat(props.data[category].stat.home) + parseFloat(props.data[category].stat.away)
      let homePercent = (parseFloat(props.data[category].stat.home)/statTotal*100).toFixed(0)+'%'
      let awayPercent = (parseFloat(props.data[category].stat.away)/statTotal*100).toFixed(0)+'%'

      let homeBarStyle = (props.data[category].stat.winner === 'home') ? (
        {backgroundColor:'#7081ff',width:homePercent,height:'5px'}
      ) : {backgroundColor:'#ccc',width:homePercent,height:'3px'};
      let awayBarStyle = (props.data[category].stat.winner === 'away') ? (
        {backgroundColor:'#7081ff',width:awayPercent,height:'5px'}
      ) : {backgroundColor:'#ccc',width:awayPercent,height:'3px'};

      output.push(
        <Fade key={i} in={props.active}>
          <div style={{marginTop:'6px'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
              <span style={{width:'100%'}}>{props.data[category].stat.home}</span>
              <span style={{minWidth:'200px'}}>{props.data[category].stat.statName}</span>
              <span style={{width:'100%'}}>{props.data[category].stat.away}</span>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
              <div style={homeBarStyle}></div>
              <div style={awayBarStyle}></div>
            </div>
          </div>
        </Fade>
      )
      i++
  }

  output = (<div style={{marginBottom:'15px'}}>{output}</div>)

  return (
    <Collapse in={props.active} style={{width:'100%',maxWidth: '600px'}} unmountOnExit>
        {output}
    </Collapse>
  )
}

export default SummarySection

import React, {useState, useEffect} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import 'typeface-roboto';
import RunComparison from './RunComparison.js'
import SummarySection from './SummarySection.js'
import Checkmark from './resources/checkmark.svg'
import ExpandMoreIcon from './resources/expand-more.svg'
import LiveIcon from './resources/live-icon.svg'
import Moment from 'react-moment'
import useInterval from './useInterval.js'

const styles = {
  card: {
    width: '40%',
  },
  card__content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  matchup: {
    display: 'flex',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card__winner: {
    width: '40%',
    border: '2px solid #00d064',
    boxSizing: 'border-box'
  },
  dropDown: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  collapsed: {
    transition: 'all .15s linear'
  },
  expanded: {
    transition: 'all .15s linear',
    transform: 'rotate(180deg)'
  },
  centerScore: {
    display: 'flex',
    alignItems: 'center'
  }
};

const FetchLiveData = (gamePk,callback) => {
  let gameUrl = 'http://statsapi.mlb.com/api/v1.1/game/'+gamePk+'/feed/live'
  fetch(gameUrl).then(resp => resp.json()).then(data => {
    console.log(data,'FetchLiveData');
    let inningData = data.liveData.linescore.inningHalf + ' ' + data.liveData.linescore.currentInningOrdinal
    callback(inningData)
  })
}

const MatchupBlock = (props) => {
  const [dropDownActive, setDropDownActive] = useState(false)
  const [inningData, setInningData] = useState()
  const gameState = props.gameData.status.abstractGameCode
  // console.log(props,'props')
  let comparisonResult = RunComparison(props.homeData, props.awayData,props.gameData.dayNight)
  // console.log(comparisonResult,'comparisonResult')
  const doneFetch = (data) => {
    setInningData(data)
  }
  const gameUrl = props.gameData.gamePk

  if (gameState === 'L') FetchLiveData(gameUrl,doneFetch);

  const {classes} = props
  let homeBlock = (
    <Card className={(comparisonResult.winner === 'HOME') ? (classes.card__winner) : (classes.card)}>
      <CardContent className={classes.card__content}>
        {comparisonResult.winner === 'HOME' && <img className='checkmarkIcon' src={Checkmark} style={{marginRight:'8px'}}/>}
        <img src={`https://www.mlbstatic.com/team-logos/${props.homeData.id}.svg`} style={{height:'25px',paddingRight:'8px'}}/>
        {props.homeData.name}
      </CardContent>
    </Card>
  )
  let awayBlock = (
    <Card className={(comparisonResult.winner === 'AWAY') ? (classes.card__winner) : (classes.card)}>
      <CardContent className={classes.card__content}>
        {comparisonResult.winner === 'AWAY' && <img className='checkmarkIcon' src={Checkmark} style={{marginRight:'8px'}}/>}
        <img src={`https://www.mlbstatic.com/team-logos/${props.awayData.id}.svg`} style={{height:'25px',paddingRight:'8px'}}/>
        {props.awayData.name}
      </CardContent>
    </Card>
  )
  const toggleDropDown = () => {
    setDropDownActive(!dropDownActive)
  }
  return(
    <Paper style={{padding:'15px 15px 0 15px',margin:'10px 0',cursor:'default'}}>
      <TimeData gameState={gameState} inningData={inningData} gameDate={props.gameData.gameDate} location={props.gameData.venue.name} />
      <div className={classes.matchup}>
        {homeBlock}
        <CenterScore gameState={gameState} gameData={props.gameData} comparisonResult={comparisonResult} />
        {awayBlock}
      </div>
      <div className={classes.dropDown}>
        <CardActions style={{width:'100%',justifyContent:'center',paddingTop:'0'}}>
          <IconButton
            className={(dropDownActive) ? classes.expanded : classes.collapsed}
            onClick={toggleDropDown}
            aria-expanded={dropDownActive}
            aria-label="Show more"
          >
            <img src={ExpandMoreIcon} style={{height:'15px'}}/>
          </IconButton>
        </CardActions>
        <SummarySection data={comparisonResult.summary} active={dropDownActive}/>
      </div>
    </Paper>
  )
}

const TimeData = (props) => {
  let markup = ''
  switch (props.gameState) {
    case 'F':
      markup = <span>FINAL</span>
      break;
    case 'L':
      markup = (
        <React.Fragment>
          <img src={LiveIcon} style={{paddingRight:'4px'}}/>
          <span style={{color:'#259b24'}}>{props.inningData}</span>
        </React.Fragment>
      )
      break;
    case 'P':
      markup = (
        <React.Fragment>
          <span><Moment format="h:mm A">{props.gameDate}</Moment></span>
          <span style={{paddingLeft:'15px'}}>{props.location}</span>
        </React.Fragment>
      )
      break;
    default:

  }
  return (
    <div style={{display:'flex',alignItems:'center',marginBottom:'10px',textAlign:'left'}}>
      {markup}
    </div>
  )
}

const CenterScore = (props) => {

  const markup = (props.gameState === "L" || props.gameState === "F") ? (
    <React.Fragment>
      <div className='win-count'>
        <div>
          <span style={{fontWeight:'bolder'}}>{props.gameData.teams.home.score}</span>
        </div>
      </div>
      <Typography>-</Typography>
      <div className='win-count'>
        <div>
          <span style={{fontWeight:'bolder'}}>{props.gameData.teams.away.score}</span>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className='win-count'>
        <div>
          <span>WINS</span>
        </div>
        <div>
          <span style={{fontWeight:'bolder'}}>{props.comparisonResult.score.home}</span>
        </div>
      </div>
      <Typography>VS</Typography>
      <div className='win-count'>
        <div>
          <span>WINS</span>
        </div>
        <div>
          <span style={{fontWeight:'bolder'}}>{props.comparisonResult.score.away}</span>
        </div>
      </div>
    </React.Fragment>
  )

  return (
    <div style={{display:'flex',alignItems:'center'}}>
      {markup}
    </div>
  )
}

export default withStyles(styles)(MatchupBlock)

import React, {useState} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import RunComparison from './RunComparison.js'
import SummarySection from './SummarySection.js'
import Checkmark from './resources/checkmark.svg'
import Moment from 'react-moment'

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
  gameInfo: {
    textAlign:'left',
  },
  dropDown: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
};

const MatchupBlock = (props) => {
  const [dropDownActive, setDropDownActive] = useState(false)

  let comparisonResult = RunComparison(props.homeData, props.awayData,props.gameData.dayNight)
  console.log(comparisonResult,'comparisonResult')
  const {classes} = props
  let homeBlock = (
    <Card className={(comparisonResult.winner === 'HOME') ? (classes.card__winner) : (classes.card)}>
      <CardContent className={classes.card__content}>
        {comparisonResult === 'HOME' && <img src={Checkmark} style={{marginRight:'8px'}}/>}
        {props.homeData.name}
      </CardContent>
    </Card>
  )
  let awayBlock = (
    <Card className={(comparisonResult.winner === 'AWAY') ? (classes.card__winner) : (classes.card)}>
      <CardContent className={classes.card__content}>
        {comparisonResult === 'AWAY' && <img src={Checkmark} style={{marginRight:'8px'}}/>}
        {props.awayData.name}
      </CardContent>
    </Card>
  )
  const toggleDropDown = () => {
    setDropDownActive(!dropDownActive)
  }
  return(
    <div>
      <div className={classes.gameInfo}>
        <span><Moment format="h:mm A">{props.gameData.gameDate}</Moment></span>
        <span style={{paddingLeft:'15px'}}>{props.gameData.venue.name}</span>
      </div>
      <div className={classes.matchup}>
        {homeBlock}
        <Typography>VS</Typography>
        {awayBlock}
      </div>
      <div className={classes.dropDown}>
        <span onClick={toggleDropDown} style={{width:'100%'}}>MORE</span>
        {
          dropDownActive && (
            <SummarySection data={comparisonResult.summary} />
          )
        }
      </div>
    </div>
  )
}

export default withStyles(styles)(MatchupBlock)

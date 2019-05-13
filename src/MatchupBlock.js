import React, {useState} from 'react'
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
  },
  collapsed: {
    transition: 'all .15s linear'
  },
  expanded: {
    transition: 'all .15s linear',
    transform: 'rotate(180deg)'
  }
};

const MatchupBlock = (props) => {
  const [dropDownActive, setDropDownActive] = useState(false)
  console.log(props,'props')
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
    <Paper style={{padding:'15px 15px 0 15px',margin:'10px 0',cursor:'default'}}>
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
        <CardActions style={{width:'100%',justifyContent:'center'}}>
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

export default withStyles(styles)(MatchupBlock)

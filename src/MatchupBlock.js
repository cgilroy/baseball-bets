import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: '40%',
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
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
};

const MatchupBlock = (props) => {
  console.log(props,'props')
  const {classes} = props
  let homeBlock = (
    <Card className={classes.card}>
      <CardContent>
        {props.gameData.teams.home.team.name}
      </CardContent>
    </Card>
  )
  let awayBlock = (
    <Card className={classes.card}>
      <CardContent>
        {props.gameData.teams.away.team.name}
      </CardContent>
    </Card>
  )
  return(
    <div className={classes.matchup}>
      {homeBlock}
      <Typography>VS</Typography>
      {awayBlock}
    </div>
  )
}

export default withStyles(styles)(MatchupBlock)

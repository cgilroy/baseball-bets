# baseball-bets: Baseball Betting Tool

[Check it out](https://baseball-bets.herokuapp.com/)

This is a project I created for a friend of mine to use for baseball betting.

It takes data from the MLB API and compares certain key matchup statistics (as indicated by my friend) to decide which games he should bet on.  When one team has won at least 13 more categories than the other, they are deemed a good bet (highlighted green on the web app).

Live games display the up-to-date score as well as inning data such as base runners, outs, strikes and balls.

The app also includes a scheduled backend worker function which loads and stores historical stats data so that daily results can be viewed or downloaded for analysis.

## Skills Developed
* React.js - another create-react-app project
* Express.js - used to create the API server communicating with the cloud based MongoDB stats database
* Heroku - developed skills in deployment as well as how to run/design scheduled functions
* Material-UI - tried my first React UI framework

## Future Work
* Visualization of betting history; data analysis (data trends leading to wins possibly)

## Project Conclusions
* The MLB API definitely seems related to the NHL API; I'd bet they use a similar statistics service.  The Promise chaining was complicated, but I am getting more and more confident with it.
* Though Material-UI makes some things quicker/more simple to build, I wasn't able to find a styling system that really gave me the flexibility I was looking for.

### Acknowledgments
* The team behind [Material-UI](https://github.com/mui-org/material-ui)
* The MLB stats API

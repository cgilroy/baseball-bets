# baseball-bets: Baseball Betting Tool

[Check it out](http://cgilroy.github.io/baseball-bets)

This is a small project currently in progress I deployed for a friend of mine to use for sports betting.

It takes data from the MLB API and compares certain key matchup statistics (as indicated by my friend) to decide which games he should bet on.  When one team has won at least 13 more categories than the other, they are deemed a good bet (highlighted green on the web app).

## Skills Developed
* React.js - another create-react-app project
* Material-UI - tried my first React UI framework

## Known Issues
* Currently not able to look at past betting days.  This is because the team stats change as the season goes on, and there is not a way to query the API to get data as it would have been retrieved on a given day.

## Future Work
* A more comprehensive live game view showing stats, outs/strikes/balls/pitcher/batter/base runners etc.
* Storing bets results and the associated stats in a cloud database to be analyzed for betting strategies

## Project Conclusions
* The MLB API definitely seems related to the NHL API; I'd bet they use a similar statistics service.  The Promise chaining was complicated, but I am getting more and more confident with it.
* Though Material-UI makes some things quicker/more simple to build, I wasn't able to find a styling system that really gave me the flexibility I was looking for.

### Acknowledgments
* The team behind [Material-UI](https://github.com/mui-org/material-ui)
* The MLB stats API

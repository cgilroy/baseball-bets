
function RunComparison(homeData, awayData, gameTime) {
  let homeCount = 1;
  let awayCount = 0;
  let homeGP = homeData.records.wins + homeData.records.losses;
  let awayGP = awayData.records.wins + awayData.records.losses;
  console.log([homeGP,awayGP],'gamesplayed')
  let scoreSummary = []

  let homeMetrics = {
    pct: {displayName:'WIN %', value: homeData.records.totPct},
    runsForPG: {displayName:'RUNS / GAME', value: parseFloat(homeData.hitting.runs/homeGP).toFixed(2)},
    runsAgainstPG: {displayName:'RUNS ALLOWED / GAME', value: -parseFloat(homeData.pitching.runs/homeGP).toFixed(2)},
    hitsForPG: {displayName:'HITS / GAME', value: parseFloat(homeData.hitting.hits/homeGP).toFixed(2)},
    hitsAgainstPG: {displayName:'HITS ALLOWED / GAME', value: -parseFloat(homeData.pitching.hits/homeGP).toFixed(2)},
    avg: {displayName:'AVG', value: homeData.hitting.avg},
    obp: {displayName:'OBP', value: homeData.hitting.obp},
    slg: {displayName:'SLG', value: homeData.hitting.slg},
    ops: {displayName:'OPS', value: homeData.hitting.ops},
    homeRuns: {displayName:'HR', value: homeData.hitting.homeRuns},
    stolenBases: {displayName:'SB', value: homeData.hitting.stolenBases},
    era: {displayName:'ERA', value: -homeData.pitching.era},
    whip: {displayName:'WHIP', value: -homeData.pitching.whip},
    kPerNine:{displayName:'K/9', value:  parseFloat(homeData.pitching.strikeOuts*9/homeData.pitching.inningsPitched).toFixed(2)},
    homeRunsAllowed:{displayName:'HR AGAINST', value:  -homeData.pitching.homeRuns},
    fielding: {displayName:'FLD%', value: homeData.fielding.fielding},
    avgAgainst: {displayName:'BAA', value: -homeData.pitching.avg}
  }

  let awayMetrics = {
    pct: {displayName:'WIN %', value: awayData.records.totPct},
    runsForPG: {displayName:'RUNS / GAME', value: parseFloat(awayData.hitting.runs/awayGP).toFixed(2)},
    runsAgainstPG: {displayName:'RUNS ALLOWED / GAME', value: -parseFloat(awayData.pitching.runs/awayGP).toFixed(2)},
    hitsForPG: {displayName:'HITS / GAME', value: parseFloat(awayData.hitting.hits/awayGP).toFixed(2)},
    hitsAgainstPG: {displayName:'HITS ALLOWED / GAME', value: -parseFloat(awayData.pitching.hits/awayGP).toFixed(2)},
    avg: {displayName:'AVG', value: awayData.hitting.avg},
    obp: {displayName:'OBP', value: awayData.hitting.obp},
    slg: {displayName:'SLG', value: awayData.hitting.slg},
    ops: {displayName:'OPS', value: awayData.hitting.ops},
    homeRuns: {displayName:'HR', value: awayData.hitting.homeRuns},
    stolenBases: {displayName:'SB', value: awayData.hitting.stolenBases},
    era: {displayName:'ERA', value: -awayData.pitching.era},
    whip: {displayName:'WHIP', value: -awayData.pitching.whip},
    kPerNine:{displayName:'K/9', value:  parseFloat(awayData.pitching.strikeOuts*9/awayData.pitching.inningsPitched).toFixed(2)},
    homeRunsAllowed:{displayName:'HR AGAINST', value:  -awayData.pitching.homeRuns},
    fielding: {displayName:'FLD%', value: awayData.fielding.fielding},
    avgAgainst: {displayName:'BAA', value: -awayData.pitching.avg}
  }

  for (var category in homeMetrics) {
    if (homeMetrics[category].value > awayMetrics[category].value) {
      homeCount++
      scoreSummary.push(
        {
          stat: {
            statName: homeMetrics[category].displayName,
            home: Math.abs(homeMetrics[category].value),
            away: Math.abs(awayMetrics[category].value),
            winner: 'home'
          }
        }
      )
      // console.log(category+': '+homeMetrics[category]+' beats '+awayMetrics[category],'homewins')
    } else if (homeMetrics[category].value < awayMetrics[category].value) {
      awayCount++
      scoreSummary.push(
        {stat: {
          statName:  homeMetrics[category].displayName,
          home: Math.abs(homeMetrics[category].value),
          away: Math.abs(awayMetrics[category].value),
          winner: 'away'
        }}
      )
      // console.log(category+': '+awayMetrics[category]+' beats '+homeMetrics[category],'awaywins')
    }
  }
  console.log([homeCount,awayCount],'1st score')
  console.log(scoreSummary,'scoreSummary')

  //more complex comparisons
  if (homeData.pitcherStats !== undefined && awayData.pitcherStats !== undefined) {
    if (homeData.pitcherStats.inningsPitched > 24 && awayData.pitcherStats.inningsPitched > 24) {
      if (homeData.pitcherStats.era < awayData.pitcherStats.era) {
        homeCount++
        scoreSummary.push(
          {stat: {
            statName: 'Starting Pitcher ERA',
            home: homeData.pitcherStats.era,
            away: awayData.pitcherStats.era,
            winner: 'home'
          }}
        )
      } else if (homeData.pitcherStats.era > awayData.pitcherStats.era) {
        awayCount++
        scoreSummary.push(
          {stat: {
            statName: 'Starting Pitcher ERA',
            home: homeData.pitcherStats.era,
            away: awayData.pitcherStats.era,
            winner: 'away'
          }}
        )
      }
    }
  }

  if (gameTime === 'day') {
    if (homeData.records.dayPct > awayData.records.dayPct) {
      homeCount++
      scoreSummary.push(
        {stat: {
          statName: 'Day Win %',
          home: homeData.records.dayPct,
          away: awayData.records.dayPct,
          winner: 'home'
        }}
      )
    } else if (homeData.records.dayPct < awayData.records.dayPct) {
      awayCount++
      scoreSummary.push(
        {stat: {
          statName: 'Day Win %',
          home: homeData.records.dayPct,
          away: awayData.records.dayPct,
          winner: 'away'
        }}
      )
    }
  } else {
    if (homeData.records.nightPct > awayData.records.nightPct) {
      homeCount++
      scoreSummary.push(
        {stat: {
          statName: 'Night Win %',
          home: homeData.records.nightPct,
          away: awayData.records.nightPct,
          winner: 'home'
        }}
      )
    } else if (homeData.records.nightPct < awayData.records.nightPct) {
      awayCount++
      scoreSummary.push(
        {stat: {
          statName: 'Night Win %',
          home: homeData.records.nightPct,
          away: awayData.records.nightPct,
          winner: 'away'
        }}
      )
    }
  }

  if (homeData.records.lastTen > awayData.records.lastTen) {
    homeCount++
    scoreSummary.push(
      {stat: {
        statName: 'L10',
        home: homeData.records.lastTen,
        away: awayData.records.lastTen,
        winner: 'home'
      }}
    )
  } else if (homeData.records.lastTen < awayData.records.lastTen) {
    awayCount++
    scoreSummary.push(
      {stat: {
        statName: 'L10',
        home: homeData.records.lastTen,
        away: awayData.records.lastTen,
        winner: 'away'
      }}
    )
  }

  if (homeData.records.home > awayData.records.away) {
    homeCount++
    scoreSummary.push(
      {stat: {
        statName: 'HOME/AWAY',
        home: homeData.records.home,
        away: awayData.records.away,
        winner: 'home'
      }}
    )
  } else if (homeData.records.home < awayData.records.away) {
    awayCount++
    scoreSummary.push(
      {stat: {
        statName: 'HOME/AWAY',
        home: homeData.records.home,
        away: awayData.records.away,
        winner: 'away'
      }}
    )
  }

  // (homeMetrics.pct > awayData.record.pct) ? homeCount++ : awayCount++; // win %
  // (homeData.hitting.runs/homeGP > awayData.hitting.runs/awayGP) ? homeCount++ : awayCount++; //runs scored
  // (homeData.pitching.runs/homeGP < awayData.pitching.runs/awayGP) ? homeCount++ : awayCount++; //runs allowed
  // (homeData.hitting.hits/homeGP > awayData.hitting.hits/awayGP) ? homeCount++ : awayCount++; //runs scored
  // (homeData.pitching.hits/homeGP < awayData.pitching.hits/awayGP) ? homeCount++ : awayCount++; //runs allowed
  // (homeData.hitting.avg > awayData.hitting.avg) ? homeCount++ : awayCount++; // batting avg
  // (homeData.hitting.obp > awayData.hitting.obp) ? homeCount++ : awayCount++; // on base %
  // (homeData.hitting.slg > awayData.hitting.slg) ? homeCount++ : awayCount++; // on base %
  // (homeData.hitting.ops > awayData.hitting.ops) ? homeCount++ : awayCount++; // on base %
  // (homeData.hitting.homeRuns > awayData.hitting.homeRuns) ? homeCount++ : awayCount++; // on base %
  // console.log([homeData.hitting.runs/homeGP,awayData.hitting.runs/awayGP],'pitching')
  //
  console.log([homeCount,awayCount],'score')

  if (homeCount-awayCount > 12) {
    return {winner: 'HOME', summary:scoreSummary, score: {home: homeCount, away: awayCount}}
  } else if (awayCount-homeCount > 12) {
    return {winner: 'AWAY', summary: scoreSummary, score: {home: homeCount, away: awayCount}}
  } else {
    return {winner: '', summary: '', score: {home: '', away: ''}}
  }
}

export default RunComparison

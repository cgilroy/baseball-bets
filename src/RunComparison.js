
function RunComparison(homeData, awayData, gameTime) {
  let homeCount = 1;
  let awayCount = 0;
  let homeGP = homeData.records.wins + homeData.records.losses;
  let awayGP = awayData.records.wins + awayData.records.losses;
  let scoreSummary = []

  let homeMetrics = {
    pct: {displayName:'WIN %', value: parseFloat(homeData.records.totPct).toFixed(3)},
    runsForPG: {displayName:'RUNS / GAME', value: parseFloat(homeData.hitting.runs/homeGP).toFixed(2)},
    runsAgainstPG: {displayName:'RUNS ALLOWED / GAME', value: -parseFloat(homeData.pitching.runs/homeGP).toFixed(2)},
    hitsForPG: {displayName:'HITS / GAME', value: parseFloat(homeData.hitting.hits/homeGP).toFixed(2)},
    hitsAgainstPG: {displayName:'HITS ALLOWED / GAME', value: -parseFloat(homeData.pitching.hits/homeGP).toFixed(2)},
    avg: {displayName:'AVG', value: parseFloat(homeData.hitting.avg).toFixed(3)},
    obp: {displayName:'OBP', value: parseFloat(homeData.hitting.obp).toFixed(3)},
    slg: {displayName:'SLG', value: parseFloat(homeData.hitting.slg).toFixed(3)},
    ops: {displayName:'OPS', value: parseFloat(homeData.hitting.ops).toFixed(3)},
    homeRuns: {displayName:'HR', value: homeData.hitting.homeRuns},
    stolenBases: {displayName:'SB', value: homeData.hitting.stolenBases},
    era: {displayName:'ERA', value: -parseFloat(homeData.pitching.era).toFixed(2)},
    whip: {displayName:'WHIP', value: -parseFloat(homeData.pitching.whip).toFixed(2)},
    kPerNine:{displayName:'K/9', value:  parseFloat(homeData.pitching.strikeOuts*9/homeData.pitching.inningsPitched).toFixed(2)},
    homeRunsAllowed:{displayName:'HR AGAINST', value:  -homeData.pitching.homeRuns},
    fielding: {displayName:'FLD%', value: parseFloat(homeData.fielding.fielding).toFixed(3)},
    avgAgainst: {displayName:'BAA', value: -parseFloat(homeData.pitching.avg).toFixed(3)}
  }

  let awayMetrics = {
    pct: {displayName:'WIN %', value: parseFloat(awayData.records.totPct).toFixed(3)},
    runsForPG: {displayName:'RUNS / GAME', value: parseFloat(awayData.hitting.runs/awayGP).toFixed(2)},
    runsAgainstPG: {displayName:'RUNS ALLOWED / GAME', value: -parseFloat(awayData.pitching.runs/awayGP).toFixed(2)},
    hitsForPG: {displayName:'HITS / GAME', value: parseFloat(awayData.hitting.hits/awayGP).toFixed(2)},
    hitsAgainstPG: {displayName:'HITS ALLOWED / GAME', value: -parseFloat(awayData.pitching.hits/awayGP).toFixed(2)},
    avg: {displayName:'AVG', value: parseFloat(awayData.hitting.avg).toFixed(3)},
    obp: {displayName:'OBP', value: parseFloat(awayData.hitting.obp).toFixed(3)},
    slg: {displayName:'SLG', value: parseFloat(awayData.hitting.slg).toFixed(3)},
    ops: {displayName:'OPS', value: parseFloat(awayData.hitting.ops).toFixed(3)},
    homeRuns: {displayName:'HR', value: awayData.hitting.homeRuns},
    stolenBases: {displayName:'SB', value: awayData.hitting.stolenBases},
    era: {displayName:'ERA', value: -parseFloat(awayData.pitching.era).toFixed(2)},
    whip: {displayName:'WHIP', value: -parseFloat(awayData.pitching.whip).toFixed(2)},
    kPerNine:{displayName:'K/9', value:  parseFloat(awayData.pitching.strikeOuts*9/awayData.pitching.inningsPitched).toFixed(2)},
    homeRunsAllowed:{displayName:'HR AGAINST', value:  -awayData.pitching.homeRuns},
    fielding: {displayName:'FLD%', value: parseFloat(awayData.fielding.fielding).toFixed(3)},
    avgAgainst: {displayName:'BAA', value: -parseFloat(awayData.pitching.avg).toFixed(3)}
  }

  for (var category in homeMetrics) {
    if (parseFloat(homeMetrics[category].value) > parseFloat(awayMetrics[category].value)) {
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
      // console.log(category+': '+homeMetrics[category].value+' beats '+awayMetrics[category].value,'homewins')
    } else if (parseFloat(homeMetrics[category].value) < parseFloat(awayMetrics[category].value)) {
      awayCount++
      scoreSummary.push(
        {stat: {
          statName:  homeMetrics[category].displayName,
          home: Math.abs(homeMetrics[category].value),
          away: Math.abs(awayMetrics[category].value),
          winner: 'away'
        }}
      )
      // console.log(category+': '+awayMetrics[category].value+' beats '+homeMetrics[category].value,'awaywins')
    }
  }


  //more complex comparisons
  console.log([homeData,awayData],'pitcherstats')
  if (homeData.pitcherStats !== undefined && awayData.pitcherStats !== undefined) {
    console.log('inthepitch')
    if (parseFloat(homeData.pitcherStats.inningsPitched) > 24 && parseFloat(awayData.pitcherStats.inningsPitched) > 24) {
      if (parseFloat(homeData.pitcherStats.era) < parseFloat(awayData.pitcherStats.era)) {
        homeCount++
        scoreSummary.push(
          {stat: {
            statName: 'Starting Pitcher ERA',
            home: homeData.pitcherStats.era,
            away: awayData.pitcherStats.era,
            winner: 'home'
          }}
        )
      } else if (parseFloat(homeData.pitcherStats.era) > parseFloat(awayData.pitcherStats.era)) {
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
    if (parseFloat(homeData.records.dayPct) > parseFloat(awayData.records.dayPct)) {
      homeCount++
      scoreSummary.push(
        {stat: {
          statName: 'Day Win %',
          home: homeData.records.dayPct,
          away: awayData.records.dayPct,
          winner: 'home'
        }}
      )
    } else if (parseFloat(homeData.records.dayPct) < parseFloat(awayData.records.dayPct)) {
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
    if (parseFloat(homeData.records.nightPct) > parseFloat(awayData.records.nightPct)) {
      homeCount++
      scoreSummary.push(
        {stat: {
          statName: 'Night Win %',
          home: homeData.records.nightPct,
          away: awayData.records.nightPct,
          winner: 'home'
        }}
      )
    } else if (parseFloat(homeData.records.nightPct) < parseFloat(awayData.records.nightPct)) {
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

  if (parseFloat(homeData.records.lastTen) > parseFloat(awayData.records.lastTen)) {
    homeCount++
    scoreSummary.push(
      {stat: {
        statName: 'L10',
        home: homeData.records.lastTen,
        away: awayData.records.lastTen,
        winner: 'home'
      }}
    )
  } else if (parseFloat(homeData.records.lastTen) < parseFloat(awayData.records.lastTen)) {
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

  if (parseFloat(homeData.records.home) > parseFloat(awayData.records.away)) {
    homeCount++
    scoreSummary.push(
      {stat: {
        statName: 'HOME/AWAY',
        home: homeData.records.home,
        away: awayData.records.away,
        winner: 'home'
      }}
    )
  } else if (parseFloat(homeData.records.home) < parseFloat(awayData.records.away)) {
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

  console.log(scoreSummary,'scoreSummary')

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
    return {winner: '', summary: scoreSummary, score: {home: homeCount, away: awayCount}}
  }
}

export default RunComparison

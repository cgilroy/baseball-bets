
function RunComparison(homeData, awayData, gameTime) {
  let homeCount = 1;
  let awayCount = 0;
  let homeGP = homeData.records.wins + homeData.records.losses;
  let awayGP = awayData.records.wins + awayData.records.losses;

  let homeMetrics = {
    pct: homeData.records.totPct,
    runsForPG: homeData.hitting.runs/homeGP,
    runsAgainstPG: -homeData.pitching.runs/homeGP,
    hitsForPG: homeData.hitting.hits/homeGP,
    hitsAgainstPG: -homeData.pitching.hits/homeGP,
    avg: homeData.hitting.avg,
    obp: homeData.hitting.obp,
    slg: homeData.hitting.slg,
    ops: homeData.hitting.ops,
    homeRuns: homeData.hitting.homeRuns,
    stolenBases: homeData.hitting.stolenBases,
    era: -homeData.pitching.era,
    whip: -homeData.pitching.whip,
    kPerNine: homeData.pitching.strikeOuts*9/homeData.pitching.inningsPitched,
    homeRunsAllowed: -homeData.pitching.homeRuns,
    fielding: homeData.fielding.fielding,
    avgAgainst: -homeData.pitching.avg
  }

  let awayMetrics = {
    pct: awayData.records.totPct,
    runsForPG: awayData.hitting.runs/awayGP,
    runsAgainstPG: -awayData.pitching.runs/awayGP,
    hitsForPG: awayData.hitting.hits/awayGP,
    hitsAgainstPG: -awayData.pitching.hits/awayGP,
    avg: awayData.hitting.avg,
    obp: awayData.hitting.obp,
    slg: awayData.hitting.slg,
    ops: awayData.hitting.ops,
    homeRuns: awayData.hitting.awayRuns,
    stolenBases: awayData.hitting.stolenBases,
    era: -awayData.pitching.era,
    whip: -awayData.pitching.whip,
    kPerNine: awayData.pitching.strikeOuts*9/awayData.pitching.inningsPitched,
    homeRunsAllowed: -awayData.pitching.awayRuns,
    fielding: awayData.fielding.fielding,
    avgAgainst: -awayData.pitching.avg
  }

  for (var category in homeMetrics) {
    if (homeMetrics[category] > awayMetrics[category]) {
      homeCount++
      console.log(category+': '+homeMetrics[category]+' beats '+awayMetrics[category],'homewins')
    } else if (homeMetrics[category] < awayMetrics[category]) {
      awayCount++
      console.log(category+': '+awayMetrics[category]+' beats '+homeMetrics[category],'awaywins')
    }

  }

  console.log([homeCount,awayCount],'score1st')

  //more complex comparisons
  if (homeData.pitcherStats !== undefined && awayData.pitcherStats !== undefined) {
    if (homeData.pitcherStats.inningsPitched > 24 && awayData.pitcherStats.inningsPitched > 24) {
      (homeData.pitcherStats.era < awayData.pitcherStats.era) ? (homeCount++) : (awayCount++)
    }
  }

  if (gameTime === 'day') {
    if (homeData.records.dayPct > awayData.records.dayPct) {
      homeCount++
    } else if (homeData.records.dayPct < awayData.records.dayPct) {
      awayCount++
    }
  } else {
    if (homeData.records.nightPct > awayData.records.nightPct) {
      homeCount++
    } else if (homeData.records.nightPct < awayData.records.nightPct) {
      awayCount++
    }
  }

  if (homeData.records.lastTen > awayData.records.lastTen) {
    homeCount++
  } else if (homeData.records.lastTen < awayData.records.lastTen) {
    awayCount++
  }

  if (homeData.records.home > awayData.records.away) {
    homeCount++
  } else if (homeData.records.home < awayData.records.away) {
    awayCount++
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

  if (homeCount > 12) {
    return 'HOME'
  } else if (awayCount > 12) {
    return 'AWAY'
  }
}

export default RunComparison

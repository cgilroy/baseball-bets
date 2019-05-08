
function RunComparison(homeData, awayData) {
  let homeCount = 0;
  let awayCount = 0;
  let homeGP = homeData.record.wins + homeData.record.losses;
  let awayGP = homeData.record.wins + homeData.record.losses;

  let homeMetrics = {
    pct: homeData.record.pct,
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
    pct: awayData.record.pct,
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
    (homeMetrics[category] > awayMetrics[category]) ? homeCount++ : awayCount++;
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

  if (homeCount-awayCount > 3) {
    return 'HOME'
  } else if (awayCount-homeCount > 3) {
    return 'AWAY'
  }
}

export default RunComparison

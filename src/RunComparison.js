
function RunComparison(homeData, awayData) {
  if (homeData.record.pct > awayData.record.pct) {
    return 'HOME'
  } else { return 'AWAY'}
}

export default RunComparison

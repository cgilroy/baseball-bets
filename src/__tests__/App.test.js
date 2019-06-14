import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import MatchupBlock from '../MatchupBlock'
import RunComparison from '../RunComparison'
import { BettingSummary, makeBetTable, makeBetCountObject } from '../BettingSummary'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import matchupData from '../sample-data/matchup-block-data.json'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  it('App renders without crashing', () => {
    shallow(<App />)
  })
})

// it('renders correctly', () => {
//   const AppComponent = renderer.create(
//     shallow(
//       <MatchupBlock
//         key={matchupData.gameData.gamePk}
//         gameData={matchupData.gameData}
//         homeData={matchupData.homeData}
//         awayData={matchupData.awayData}
//         />
//     )
//   ).toJSON();
//   expect(AppComponent).toMatchSnapshot();
// })

describe('RunComparison', () => {
  // const comparisonOutput
  it('gives correct score', () => {
    expect(RunComparison(matchupData.homeData,matchupData.awayData,matchupData.gameData.dayNight).score).toEqual({away:21,home:1})
  })
})

describe('BettingSummary', () => {
  it('table renders correct data', () => {
    let testProps = {
      betData: 
        [
          {type:'I',state:'WIN'},
          {type:'P',state:'TIE'},
          {type:'I',state:'LOSE'},
          {type:'F',state:'WIN'},
          {type:'F',state:'LOSE'},
          {type:'D',state:'LOSE'},
        ]
    }
    const y = makeBetTable(makeBetCountObject(testProps.betData))
    const x = renderer.create(y).toJSON()

    expect(x).toMatchSnapshot();
  })
})

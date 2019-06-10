import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import MatchupBlock from '../MatchupBlock'
import RunComparison from '../RunComparison'
import { shallow } from 'enzyme';
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

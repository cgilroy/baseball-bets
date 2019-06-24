import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import MatchupBlock from '../MatchupBlock'
import RunComparison from '../RunComparison'
import { BettingSummary, makeBetTable, makeBetCountObject } from '../BettingSummary'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import matchupData from '../sample-data/matchup-block-data.json'
import { jsxEmptyExpression } from '@babel/types';

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
  let testProps = {
    betDataOne: 
      [
        {type:'I',state:'WIN'},
        {type:'P',state:'TIE'},
        {type:'I',state:'LOSE'},
        {type:'F',state:'WIN'},
        {type:'F',state:'LOSE'},
        {type:'D',state:'LOSE'},
      ],
      betDataTwo: 
      [
        {type:'F',state:'WIN'},
        {type:'F',state:'WIN'},
        {type:'F',state:'WIN'}
      ],
      betDataThree: 
      [
        {type:'I',state:'WIN'},
        {type:'P',state:'TIE'},
        {type:'I',state:'LOSE'}
      ]
  }
  it('table renders correct data', () => {
    const tableOne = renderer.create(makeBetTable(makeBetCountObject(testProps.betDataOne))).toJSON()
    const tableTwo = renderer.create(makeBetTable(makeBetCountObject(testProps.betDataTwo))).toJSON()
    const tableThree = renderer.create(makeBetTable(makeBetCountObject(testProps.betDataThree))).toJSON()
    expect(tableOne).toMatchSnapshot();
    expect(tableTwo).toMatchSnapshot();
    expect(tableThree).toMatchSnapshot();
  })
  it('determines the correct betting result', () => {
    jest.mock('../BettingSummary')
    // const test = renderer.create(<BettingSummary />)
    // console.log(test)
    const wrapperOne = renderer.create(<BettingSummary betData={testProps.betDataOne} />)
    const wrapperTwo = renderer.create(<BettingSummary betData={testProps.betDataTwo} />)
    const wrapperThree = renderer.create(<BettingSummary betData={testProps.betDataThree} />)
    const resultOne = wrapperOne.root.findByProps({className:'betting-summary__result'}).children
    const resultTwo = wrapperTwo.root.findByProps({className:'betting-summary__result'}).children
    const resultThree = wrapperThree.root.findByProps({className:'betting-summary__result'}).children
    expect([...resultOne,...resultTwo,...resultThree]).toEqual(['LOST :(','WON :)','TBD'])
  })
})

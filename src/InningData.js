import React from 'react'
import BasesMap from './BasesMap.js'
import OutsIndicator from './OutsIndicator.js'
import BallsAndStrikes from './BallsAndStrikes.js'
const InningData = (props) => {
    return (
      <React.Fragment>
        {(props.inningState.indexOf("Bottom") !== -1 ||
          props.inningState.indexOf("Top") !== -1) && (
          <div className="inningData">
            <div>
              <BasesMap basesWithRunner={props.basesWithRunner} />
              <OutsIndicator outs={props.outs} />
            </div>
            <BallsAndStrikes ballsAndStrikes={props.ballsAndStrikes} />
          </div>
        )}
      </React.Fragment>
    );
}

export default InningData
import React from 'react'
import BasesMap from './BasesMap.js'
import OutsIndicator from './OutsIndicator.js'
const InningData = (props) => {
    let bases = props.basesWithRunner
    return (
      <React.Fragment>
        {(props.inningState.indexOf("Bottom") !== -1 || props.inningState.indexOf("Top") !== -1)&& (
          <div className="inningData">
            <BasesMap basesWithRunner={bases} />
            <OutsIndicator outs={props.outs} />
          </div>
        )}
      </React.Fragment>
    );
}

export default InningData
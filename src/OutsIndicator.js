import React from 'react'
const OutsIndicator = (props) => {
    let outs = props.outs
    return (
      <div className="outsIndicator">
        <div className={`outs ${outs >= 1 ? "dark" : "light"}`} />
        <div className={`outs ${outs >= 2 ? "dark" : "light"}`} />
      </div>
    );
}

export default OutsIndicator
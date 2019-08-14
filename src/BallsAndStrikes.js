import React from 'react'
const BallsAndStrikes = (props) => {
    let balls = props.ballsAndStrikes.balls
    let strikes = props.ballsAndStrikes.strikes
    return (
      <div className="ballsAndStrikes">
        <div className="chart balls">
            <span className='abbrev'>B</span>
            <div className={`chart__circle ${balls >= 1 ? "dark" : "light"}`} />
            <div className={`chart__circle ${balls >= 2 ? "dark" : "light"}`} />
            <div className={`chart__circle ${balls >= 3 ? "dark" : "light"}`} />
            <div className={`chart__circle ${balls >= 4 ? "dark" : "light"}`} />
        </div>
        <div className="chart strikes">
            <span className='abbrev'>S</span>
            <div className={`chart__circle ${strikes >= 1 ? "dark" : "light"}`} />
            <div className={`chart__circle ${strikes >= 2 ? "dark" : "light"}`} />
            <div className={`chart__circle ${strikes >= 3 ? "dark" : "light"}`} />
        </div>
      </div>
    );
}

export default BallsAndStrikes
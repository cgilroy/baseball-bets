import React from 'react'
const BasesMap = (props) => {
    let bases = props.basesWithRunner
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.7 48.7">
            <defs>

            </defs>
            <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <rect className="cls-1" fill={bases.second === 1 ? '#f0ac00' : '#fff'} x="23.85" y="4.85" width="20" height="20" transform="translate(-0.59 28.28) rotate(-45)"/>
                    <path className="cls-2" d="M33.85,1.41,47.28,14.85,33.85,28.28,20.41,14.85,33.85,1.41m0-1.41L19,14.85,33.85,29.7,48.7,14.85,33.85,0Z"/>
                    <rect className="cls-1" fill={bases.third === 1 ? '#f0ac00' : '#fff'} x="4.85" y="23.85" width="20" height="20" transform="translate(-19.59 20.41) rotate(-45)"/>
                    <path className="cls-2" d="M14.85,20.41,28.28,33.85,14.85,47.28,1.41,33.85,14.85,20.41m0-1.41L0,33.85,14.85,48.7,29.7,33.85,14.85,19Z"/>
                    <rect className="cls-1" fill={bases.first === 1 ? '#f0ac00' : '#fff'} x="42.85" y="23.85" width="20" height="20" transform="translate(-8.46 47.28) rotate(-45)"/>
                    <path className="cls-2" d="M52.85,20.41,66.28,33.85,52.85,47.28,39.41,33.85,52.85,20.41m0-1.41L38,33.85,52.85,48.7,67.7,33.85,52.85,19Z"/>
                </g>
            </g>
        </svg>
    )
}

export default BasesMap
import React from 'react'
import "./style.scss"
const CardLoading = () => {
  return (
    <div>
    <svg width="100%" height="800">
      <g className="coin1">
        <circle cx="260" cy="220" r="35" fill="#ffd900"/>
        <circle cx="260" cy="220" r="25" fill="#fff300"/>
        <rect   x="255"  y="205"  width="10" height="30" fill="#ffd900"/>
      </g>

      <g className="coin2">
        <circle cx="340" cy="230" r="35" fill="#ffd900"/>
        <circle cx="340" cy="230" r="25" fill="#fff300"/>
        <rect   x="335"  y="215"  width="10" height="30" fill="#ffd900"/>
      </g>
      <g className="coin3">
        <circle cx="420" cy="240" r="35" fill="#ffd900"/>
        <circle cx="420" cy="240" r="25" fill="#fff300"/>
        <rect   x="415"  y="225"  width="10" height="30" fill="#ffd900"/>
      </g>

      <g className="credit-card">
        <rect x="200" y="200" rx="25" ry="25" width="400" height="250" fill="#00a8ff"/>
        <rect x="200" y="245" width="400" height="50" fill="#0b6fa2"/>
        <rect x="210" y="320" width="270" height="25" fill="#e5e5e5"/>
        <rect x="500" y="320" width="85"  height="25" fill="#e5e5e5"/>
        <rect x="210" y="400" width="85"  height="25" fill="#e5e5e5"/>
      </g>
    </svg>
  </div>
  )
}

export default CardLoading
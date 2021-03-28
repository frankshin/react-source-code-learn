import React from 'react'
import './index.css'

export default function halfPx () {
  return (
    <div>
      <div>half px test</div>
      <div className="label">绘制1px细线之方案1:</div>
      <div className="line1" />

      <div className="label">绘制1px细线之方案2:</div>
      <div className="line2" />

      <div className="label">绘制0.5px细线之方案1:</div>
      <div className="line3" />
    </div>
  )
}

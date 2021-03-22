import React from 'react'
import { throttle } from 'allsaberjs'

export default function throttlePage () {
  const handleClick = () => {
    console.log('执行了～～')
  }
  const wrapFunc = throttle(handleClick, 3000)

  return (
    <div>
      <div>test throttle</div>
      <button onClick={() => {
        wrapFunc()
      }}
      >点击我～</button>
    </div>
  )
}

// hooks方式
import React, { useState } from 'react'

export default function useStateTest () {
  const [time, setTime] = useState(0)

  const handleClick = () => {
    setTime(time + 1)
    setTimeout(() => {
      console.log('1s后的time：', time)
    }, 1000)
  }

  return (
    <div>
      <button onClick={() => handleClick()}>点击我{time}</button>
    </div>
  )
}

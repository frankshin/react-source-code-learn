import React, { useState } from 'react'
import One from './components/one'

export default function ChildComponentRenderHooks (){
  const [time, setTime] = useState(0)

  const resetVal = () => {
    setTime(1)
  }

  return (
    <div onClick={() => resetVal()}>
      test pureComponent render in hooks{time}
      <One />
    </div>
  )
}
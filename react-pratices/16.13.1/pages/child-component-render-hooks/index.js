import React, { useState, useMemo } from 'react'
import One from './components/one'

export default function ChildComponentRenderHooks (){
  const [time, setTime] = useState(0)
  const [tit, setTit] = useState('hello')

  const componentOne = useMemo(() => {
    return (
      <One
        time={time}
        tit={tit}
      />
    )
  }, [time])

  const resetVal = () => {
    setTime(1)
  }

  return (
    <div
      onClick={() => resetVal()}
    >
      test pureComponent render in hooks{time}
      { componentOne }
    </div>
  )
}
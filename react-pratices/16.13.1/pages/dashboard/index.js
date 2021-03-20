import React, { useEffect } from 'react'
import { deepClone } from 'allsaberjs'

export default function DashboardPage (){

  useEffect(() => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        ha: 'hello',
        low: 'world'
      }
    }
    // obj.haha = obj // 循环引用问题
    const newobj = deepClone(obj)
    console.log(1, newobj)
  }, [])

  return (
    <div>dashboard</div>
  )
}
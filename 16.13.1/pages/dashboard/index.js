import React, { useEffect } from 'react'
import { deepClone } from 'allsaberjs'

export default function DashboardPage (){

  useEffect(() => {
    console.log(1, deepClone)
  }, [])

  return (
    <div>dashboard</div>
  )
}
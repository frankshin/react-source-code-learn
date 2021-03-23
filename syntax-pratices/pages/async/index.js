import React from 'react'
import {
  test1,
  test2,
} from './promiseLibs'

export default function asyncPage () {
  // 题1
  test2()

  return (
    <div>测试异步执行逻辑</div>
  )
}

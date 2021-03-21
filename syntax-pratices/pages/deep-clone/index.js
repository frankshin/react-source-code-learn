import React from 'react'
import { deepClone } from 'allsaberjs'

export default function deepclone () {
  const a = {
    a: 1,
    b: 'hello',
    c: undefined,
    d: {
      ha: 55,
      test: 'world',
    },
    f: 'sfsfsdf',
  }
  a.e = a
  const newa = deepClone(a) // error:Maximum call stack size exceeded,。。。。死循环了
  console.log(newa)

  return <div>deepclone...</div>
}

export function test1 () {
  setTimeout(function () {
    console.log(1)
  }, 0)

  new Promise(function executor (resolve) {
    console.log(2)
    for (let i = 0; i < 10000; i++) {
      if (i === 9999) {
        console.log(100)
        resolve()
      }
    }
    console.log(3)
  }).then(function () {
    console.log(4)
  })

  console.log(5)
}

export function test2 () {
  const promise = new Promise((resolve, reject) => {
    console.log(1)
    setTimeout(() => {
      console.log('timerStart')
      resolve('success')
      console.log('timerEnd')
    }, 0)
    console.log(2)
  })
  promise.then((res) => {
    console.log(res)
  })
  console.log(4)
}
// 1 2 4 timerStart timerEnd success

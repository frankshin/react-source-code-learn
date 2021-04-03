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

export function test3 () {
  setTimeout(() => {
    console.log('timer1')
    setTimeout(() => {
      console.log('timer3')
    }, 0)
  }, 0)
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log('start')
}
// start timer1 timer2 timer3

export function test4 () {
  setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(() => {
      console.log('promise')
    })
  }, 0)
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log('start')
}
// start time1 promise time2

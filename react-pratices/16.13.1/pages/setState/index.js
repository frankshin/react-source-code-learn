// setstate执行流测试
import React, { Component } from 'react'

export default class setStatePage extends Component {
  constructor () {
    super()
    this.state = {
      time: 1,
    }
  }

  handleClick () {
    this.setState((state) => {
      return {
        time: state.time + 1,
      }
    })
    setTimeout(() => {
      console.log('1s 后的time：', this.state.time)
    }, 1000)
  }

  render () {
    const { time } = this.state
    return (
      <div>
        <button onClick={() => this.handleClick()}>say Hello{time}</button>
      </div>
    )
  }
}

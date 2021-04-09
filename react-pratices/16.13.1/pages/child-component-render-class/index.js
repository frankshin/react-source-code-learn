/**
 *  父组件渲染 子组件渲染测试
 */
import React, { Component } from 'react'
// import One from './components/pure-child'
import One from './components/scu-child'
export default class ChildComponentRenderClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tit: '子组件1',
    }
  }

  resetValue () {
    this.setState({
      time: 2,
      // tit: '子组件props改变啦' // 子组件的props改变了，子组件会重新渲染
    })
  }

  render () {
    const { time, tit } = this.state
    return (
      <div onClick={() => this.resetValue()}>
        test pureComponent render in class{time}
        <One
          title={tit}
        />
      </div>
    )
  }
}

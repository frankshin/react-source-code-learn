// setstate执行流测试
import React, {Component} from 'react';

export default class setStatePage extends Component {
  constructor(){
    super()
    this.state={
      time: 1
    }
  }
  func1(){
    // this.setState({
    //   time: 2
    // })
    this.setState((state) => {
      return {
        time: state.time + 1
      }
    })
    console.log('time：', this.state.time)
  }
  handleClick() {
    // transMyaction.perform(this.func1, this)
    this.func1()
  }
  render() {
    const { time } = this.state
    return (
      <div>
        <button onClick={() => this.handleClick()}>say Hello{time}</button>      
      </div>
    );
  }
}

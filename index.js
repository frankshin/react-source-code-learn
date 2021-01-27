import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class IndexPage extends Component {
  constructor(){
    super()
    this.state={
      value: 1,
    }
  }

  testStateValue (){
    this.setState({
      value: 2
    })
    console.log('value', this.state.value)
  }

  render(){
    const { value } = this.state
    return <div onClick={() => { this.testStateValue() }}>点击我{value}</div>
    // return <div>点击我{value}</div>
  }

  componentDidMount(){
    const _this = this
    const parentDom = ReactDOM.findDOMNode(this)
    // const dom = document.querySelector('div')
    parentDom.addEventListener('click', function(){
      // 此处的setstate赋值后value的变化就是同步的！！！！！！！！why？？？？？
      _this.setState({
        value: 2
      })
      console.log('value', _this.state.value)
    }, false)
  }

}

ReactDOM.render(
  <IndexPage />,
  document.getElementById('root')
);
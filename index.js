import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class IndexPage extends Component {
  constructor(){
    super()
    this.state={
      value: 1,
    }
  }

  setStateValue(){
    this.setState({
      value: 2
    })
    console.log('setStateValue value', this.state.value) // ？
  }

  render(){
    const { value } = this.state
    return <div>点击我{value}</div>
    // return <div onClick={() => { this.setStateValue() }}>点击我{value}</div>
  }

  componentDidMount(){
    const _this = this
    const parentDom = ReactDOM.findDOMNode(this)
    parentDom.addEventListener('click', function(){
      _this.setState({
        value: 2
      })
      console.log('value', _this.state.value) // ？
    }, false)
  }
}

ReactDOM.render(
  <IndexPage />,
  document.getElementById('root')
);

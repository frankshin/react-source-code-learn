// scu -> shouldComponentUpdate
import React, { Component } from 'react'

export default class OneComponent extends Component {
  render(){
    console.log('child render....')
    const { title } = this.props
    return (
      <div>component：{ title }</div>
    )
  }

  shouldComponentUpdate(){
    return false
  }
}

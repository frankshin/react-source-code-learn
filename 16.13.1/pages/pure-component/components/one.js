import React, { Component, PureComponent } from 'react'

export default class OneComponent extends PureComponent {
  render(){
    console.log('child render....')
    const { title } = this.props
    return (
      <div>component：{ title }</div>
    )
  }
}

// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

// export default class IndexPage extends Component {
//   constructor(){
//     super()
//     this.state={
//       value: 1,
//     }
//   }

//   setStateValue(){
//     this.setState({
//       value: 2
//     })
//     console.log('setStateValue value', this.state.value) // ？
//   }

//   render(){
//     const { value } = this.state
//     return <div>点击我{value}</div>
//     // return <div onClick={() => { this.setStateValue() }}>点击我{value}</div>
//   }

//   componentDidMount(){
//     const _this = this
//     const parentDom = ReactDOM.findDOMNode(this)
//     parentDom.addEventListener('click', function(){
//       _this.setState({
//         value: 2
//       })
//       console.log('value', _this.state.value) // ？
//     }, false)
//   }
// }

// ReactDOM.render(
//   <IndexPage />,
//   document.getElementById('root')
// );




import React,{Component} from 'react';
import Transaction from 'react/lib/Transaction';
import ReactDOM from 'react-dom'

const TRANSACTION_WRAPPERS = [
  {
    initialize:function (){
      console.log('log begin time'+ new Date().getTime())
    },
    close:function (){
      console.log('log end time'+ new Date().getTime())
    },
  },
  {
    initialize:function (){
      console.log('执行第二队列的initialize....')
    },
    close:function (){
      console.log('执行第二队列的close...')
    },
  }
];

function LogTransaction(){
  this.reinitializeTransaction();
}

Object.assign(LogTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function() {
    return TRANSACTION_WRAPPERS;
  },
});

var transMyaction = new LogTransaction();

class Main extends Component {
  constructor(){
    super()
    this.state={
      time: 1
    }
  }
  func1(){
    this.setState({
      time: 2
    })
    console.log('此处为执行函数....')
  }
  handleClick() {
    transMyaction.perform(this.func1, this)
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
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

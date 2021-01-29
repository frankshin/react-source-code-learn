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
      console.log('log begin at'+ new Date().getTime())
    },
    close:function (){
      console.log('log end at'+ new Date().getTime())
    },
  },
  {
    initialize:function (){
      console.log(1)
    },
    close:function (){
      console.log(2)
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
  sayHello(){
    console.log('Hello，An ge')
  }
  handleClick() {
    transMyaction.perform(this.sayHello, this)
  }
  render() {
    return (
      <div>
        <button onClick={() => this.handleClick()}>say Hello</button>      
      </div>
    );
  }
}
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

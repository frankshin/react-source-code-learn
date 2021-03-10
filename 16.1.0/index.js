// // setstate执行流测试
// import React, {Component} from 'react';
// import ReactDOM from 'react-dom'

// class Main extends Component {
//   constructor(){
//     super()
//     this.state={
//       time: 1
//     }
//   }
//   func1(){
//     // this.setState({
//     //   time: 2
//     // })
//     this.setState((state) => {
//       return {
//         time: state.time + 1
//       }
//     })
//     console.log('time：', this.state.time)
//   }
//   handleClick() {
//     // transMyaction.perform(this.func1, this)
//     this.func1()
//   }
//   render() {
//     const { time } = this.state
//     return (
//       <div>
//         <button onClick={() => this.handleClick()}>say Hello{time}</button>      
//       </div>
//     );
//   }
// }
// ReactDOM.render(
//   <Main />,
//   document.getElementById('root')
// );



// 父组件渲染 子组件渲染测试
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import One from './one'

class Main extends Component {
  constructor(props){
    super()
    this.state = {}
  }
  render() {
    const { time } = this.state
    return (
      <div>
        <button onClick={() => this.setState({ time: 2 })}>say Hello{time}</button>  
        <One />    
      </div>
    );
  }
}
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Menu from './component/menu'
import { routers } from './routers'

// import PureComponent from './pages/pure-component'

async function test(component) {
  const dom = await component()
  return dom
}

export default class App extends Component {
  constructor(props){
    super()
    this.state = {}
  }
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Switch>
            {
              routers.map((item, index) => {
                const { path, component } = item

                // const mod = require('./pages/pure-component').default
                const mod = test()
                console.log(111, mod)

                return (
                  <Route
                    path={path}
                    component={
                      mod
                    }
                  />
                )
              })
            }
          </Switch>
        </div>
      </Router>
    );
  }
}


function User(){
  return <div>fsfdsfds</div>
}

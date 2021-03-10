import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// components
import Menu from './component/menu'
// pages
import SetStatePage from './pages/set-state'
import PureComponentPage from './pages/pure-component'

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
            <Route path="/set-state">
              <SetStatePage />
            </Route>
            <Route path="/pure-component">
              <PureComponentPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


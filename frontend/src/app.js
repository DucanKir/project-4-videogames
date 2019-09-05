import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { HashRouter, Route, Switch } from 'react-router-dom'

import 'bulma'

class App extends React.Component {

  render(){
    return (
      <HashRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'


import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { HashRouter, Route, Switch } from 'react-router-dom'
import GamesIndex from './components/games/GamesIndex'
import GameShow from './components/games/GameShow'
import Navbar from './components/common/Navbar'

import 'bulma'
import './style.scss'

class App extends React.Component {

  render(){
    return (
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/games/:id" component={GameShow} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/games" component={GamesIndex} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

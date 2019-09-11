import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/react-fontawesome'


import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { HashRouter, Route, Switch } from 'react-router-dom'
import GamesIndex from './components/games/GamesIndex'
import GameShow from './components/games/GameShow'
import GenresIndex from './components/games/GenresIndex'
import GenreShow from './components/games/GenreShow'
import PlatformShow from './components/games/PlatformShow'
import Search from './components/games/Search'
import About from './components/pages/About'
import Navbar from './components/common/Navbar'

import 'bulma'
import './style.scss'

class App extends React.Component {

  render(){
    return (
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/games/:slug" component={GameShow} />
          <Route path="/genres/:id" component={GenreShow} />
          <Route path="/platforms/:id" component={PlatformShow} />
          <Route path="/register" component={Register} />
          <Route path="/genres" component={GenresIndex} />
          <Route path="/about" component={About} />
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

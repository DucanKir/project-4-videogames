import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'
import axios from 'axios'
import Promise from 'bluebird'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      error: '',
      navbarOpen: false,
      genres: [],
      searchResults: []
    }
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.getGenres = this.getGenres.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getSearchResults = this.getSearchResults.bind(this)
    this.hideSearchResults = this.hideSearchResults.bind(this)
  }

  componentDidMount() {
    Promise.props({
      genres: axios.get('/api/genres/').then(res => res.data),
      platforms: axios.get('/api/platforms/').then(res => res.data)
    })
      .then(data => this.setState(data))
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen})
  }

  hideSearchResults() {
    this.refs.field.value = ''
    this.setState({searchResults: []})
  }

  getGenres(){
    const allGenres = this.state.genres
    return (
      <div className="navbar-dropdown">
        {allGenres.map(genre =>
          <Link
            key={genre.id}
            to={`/genres/${genre.name}`}
            className="navbar-item">
            {genre.name}
          </Link>
        )}
      </div>
    )

  }

  getSearchResults() {
    if(this.state.formData !== "") {
      const allSearchedGames = this.state.searchResults
      console.log(allSearchedGames)
      if (allSearchedGames.length>0) {
        return (
          <div className="container with-background-black">
          {allSearchedGames.map(game =>
            <Link key={game.id} to={`/games/${game.slug}`} onClick={this.hideSearchResults}>
            <div className='columns'>
            <div className='column is-one-third'>
            <figure className="image image-user figure-height" style={{ backgroundImage: `url(${game.background_image})` }} />
            </div>
            <div className='column'>
            <h1  className="subtitle is-6 has-text-white">{game.name}</h1>
            </div>
            </div>
            </Link>
          )}
          </div>
        )
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get(`api/games/?page=0&search=${this.state.formData.search}`)
      .then(res => this.setState({ searchResults: res.data }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  // <h1 className="title">Happening</h1>
  render() {
    if(!this.state.platforms) return <h1>loading</h1>
    return (
      <nav className="navbar is-black" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand ">
            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}
          >
            <div className="navbar-start">

              <Link to="/" className="navbar-brand">
                <div className="navbar-item title">
                Home
                </div>
              </Link>
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                  Genres
                </div>
                {this.getGenres()}
              </div>

              <Link to="/platforms" className="navbar-item">
                Platforms
              </Link>
              <Link to="/about" className="navbar-item">
                About
              </Link>
            </div>
            <div className="navbar-item">
              <form onSubmit={this.handleSubmit}>
                <div className="field has-addons">
                  <div className="control">
                    <input ref="field" onChange={this.handleChange} name='search' className="input is-small input-width" type="text" placeholder="Find a game" />
                  </div>
                  <div className="control">
                    <button className="button is-link is-small">
                      Search
                    </button>
                  </div>

                  <div className="search-results">
                  {this.state.searchResults.length>0 && this.getSearchResults()}
                  </div>
                </div>
              </form>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {!Auth.isAuthenticated() &&
                    <Link to="/register" className="button is-light">
                      <strong>Sign up</strong>
                    </Link>
                  }
                  {!Auth.isAuthenticated() &&
                    <Link  to="/login" className="button is-light">
                      Log in
                    </Link>
                  }
                  {Auth.isAuthenticated() &&
                    <Link to={`/users/${Auth.getCurrentUserId()}`} className="button is-light">
                      My Profile
                    </Link>
                  }
                  {Auth.isAuthenticated() &&
                    <Link
                      to="/"
                      className="button is-dark"
                      onClick={this.logout}
                    >
                      Logout
                    </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)

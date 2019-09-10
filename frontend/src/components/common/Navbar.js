import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'
import axios from 'axios'
import Promise from 'bluebird'

class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      error: '',
      navbarOpen: false,
      genres: []
    }
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.getGenres = this.getGenres.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getPlatforms = this.getPlatforms.bind(this)
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

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false})
    }
  }
  getGenres(){
    const allGenres = this.state.genres
    return (
      <div className=" ">
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

  getPlatforms(){
    const allPlatforms = this.state.platforms
    console.log(allPlatforms)
    return (
      <div className=" ">
        {allPlatforms.map(platform =>
          <Link
            key={platform.name}
            to={`/platforms/${platform.name}`}
            className="navbar-item">
            {platform.name}
          </Link>
        )}
      </div>
    )

  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.history.push(`/games/search?q=${this.state.formData.search}`)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  // <h1 className="title">Happening</h1>
  render() {
    if(!this.state.platforms) return <h1>loading</h1>
    console.log()
    return (
      <nav className="navbar is-black" role="navigation" aria-label="main navigation">
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
            <Link to="/games" className="navbar-brand">
              <div className="navbar-item title">
              All games
              </div>
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link to="/genres" className="navbar-item">
                <div className="navbar-link">
                  Genre
                </div>
              </Link>
              <div className="navbar-dropdown ">
                {this.getGenres()}

              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link to="/genres" className="navbar-item">
                <div className="navbar-link">
                  Platforms
                </div>
              </Link>
              <div className="navbar-dropdown ">
                {this.getPlatforms()}

              </div>
            </div>
            <Link to="/about" className="navbar-item">
            About
            </Link>
          </div>
          <div className="navbar-item">
            <div className="field has-addons" >
              <div className="control">
                <input onChange={this.handleChange} name='search' className="input" type="text" placeholder="Find a game" />
              </div>
              <div className="control">
                <a className="button is-link" onClick={this.handleSubmit}>
                  Search
                </a>
              </div>
            </div>
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
      </nav>
    )
  }
}

export default withRouter(Navbar)

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'
import axios from 'axios'

class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      navbarOpen: false,
      genres: []
    }
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.getGenres = this.getGenres.bind(this)
  }

  componentDidMount() {
    axios.get('/api/genres/')
      .then(res => this.setState({ genres: res.data}))
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
            to={`/genres/${genre.id}`}
            className="navbar-item">
            {genre.name}
          </Link>
        )}
      </div>
    )

  }

  // <h1 className="title">Happening</h1>
  render() {
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
            <Link to="/" className="navbar-item">
              <div className="navbar-brand">
                <div className="navbar-item title">Home</div>
              </div>
            </Link>
            <Link to="/games" className="navbar-item">
              <div className="">
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
            <Link to="/about" className="navbar-item">
            About
            </Link>
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

import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import Auth from '../../lib/Auth'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.redirectToSignUp = this.redirectToSignUp.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login/', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token) // store the token in localStorage
        toast.success(res.data.message)
        this.props.history.push('/') // redirect to the cheeses INDEX page
      })
      .catch(() => {
        Auth.removeToken() // remove the token from localStorage
        this.setState({ error: 'Invalid credentials' }) // display an error
      })
  }

  redirectToSignUp() {
    this.props.history.push('register')
  }

  render() {
    return (
      <section className="section">
        <div className="columns">
          <div className="column is-half-desktop">
            <h2 className="title is-2">Login</h2>
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      type="username"
                      name="username"
                      placeholder="eg"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      placeholder="eg: ••••••••"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}
                </div>

                <button className="button is-info">Submit</button>
              </form>
            </div>
            <br />
            <br />
            <h3 className="title is-3 has-text-weight-medium">OR</h3>
            <br />
            <h2 className="title is-2">Register</h2>
            <div className="container">
              <button
                className="button is-info"
                onClick={this.redirectToSignUp}
              >Sign Up</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Login

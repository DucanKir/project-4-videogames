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
      <section className="section full-height">
        <div className="columns">
          <div className="column">
          </div>
          <div className="column">
          </div>
          <div className="column is-one-third is-half-tablet">
            <h2 className="title has-text-centered is-4 has-text-light">Login</h2>
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label has-text-grey-light">Username</label>
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
                  <label className="label has-text-grey-light">Password</label>
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
                <br />
                <div className='has-text-centered'>
                  <button className="button is-link is-outlined ">Submit</button>
                </div>
              </form>
            </div>
            <br />
            <br />
            <br />
            <h2 className="title has-text-centered is-4 has-text-light">Or register</h2>
            <div className="container has-text-centered">
              <button
                className="button is-link is-outlined"
                onClick={this.redirectToSignUp}
              >Sign Up</button>
            </div>
          </div>
          <div className="column">
          </div>
          <div className="column">
          </div>
        </div>
      </section>
    )
  }
}

export default Login

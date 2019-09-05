import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register/', this.state.formData)
      .then(res => {
        toast.success(res.data.message)
        this.props.history.push('login/')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
      console.log(this.state.errors)
  }

  render() {
    if (!this.state) return 'loading'
    console.log(this.state.formData)
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half-desktop">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      name="username"
                      placeholder="eg"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="eg"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
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
                  {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                </div>
                <div className="field">
                  <label className="label">Password Confirmation</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password_confirmation"
                      placeholder="eg: ••••••••"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.password_confirmation && <small className="help is-danger">{this.state.errors.password_confirmation}</small>}
                </div>

                <button className="button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Register

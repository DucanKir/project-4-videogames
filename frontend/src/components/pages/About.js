import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class About extends React.Component {

  constructor() {
    super()

    this.state = {}
  }

  // getFollowings() {
  //   return (
  //     <div className="columns is-multiline">
  //       {!this.state.user.following[0] && <h2 className="subtitle is-4">Not following</h2>}
  //       {this.state.user.following[0] && this.state.user.following.map(follow =>
  //         <Link className="column is-offset-0 is-one-fifth has-text-centered"
  //           key={follow._id}
  //           to={`/users/${follow._id}`}
  //         >
  //           <div>
  //             <figure className="image is-128x128  has-image-centered">
  //               <img className="is-rounded" src={follow.photo} />
  //             </figure>
  //             <p className="is-6 has-text-weight-semibold">{follow.name}</p>
  //           </div>
  //         </Link>
  //       )}
  //
  //     </div>
  //   )
  // }

  // getUser() {
  //   axios.get(`/api/users/${this.props.match.params.id}`)
  //     .then(res => this.setState({ user: res.data }))
  // }
  //
  // componentDidMount() {
  //   this.getUser()
  // }

  render() {


    return (
      <div className="full-height">

        <div className="container">
          <div className="section ">

            <div className="container">
              <div className="columns">

                <div className="column">
                  <div className="section">
                    <h1 className="title is-2 has-text-light">About</h1>
                    <p className="has-text-light"><span className="title is-6 has-text-light">Video Games Website</span> is a project created by <a href="https://github.com/DucanKir">Lana Kirilenko</a>, on the General Assembly Sofware Engineering Immersive course in London.</p>
                    <br />
                    <p className="has-text-light">Tasked with creating a full-stack web application, I used <a href="https://rawg.io/apidocs">RAWG Video Games Database API</a> and the following technologies</p>
                    <br />
                    <div className="columns">
                      <div className="column">
                        <ul>
                          <li className="has-text-light"> - React</li>
                          <li className="has-text-light"> - Javascript</li>
                          <li className="has-text-light"> - Python</li>
                          <li className="has-text-light"> - Django</li>
                          <li className="has-text-light"> - SQLite</li>
                        </ul>
                      </div>
                      <div className="column">
                        <ul>
                          <li className="has-text-light"> - HTML5</li>
                          <li className="has-text-light"> - CSS3</li>
                          <li className="has-text-light"> - Sass</li>
                          <li className="has-text-light"> - Bulma</li>
                          <li className="has-text-light"> - Git</li>
                        </ul>
                      </div>
                      <div className="column is-half">
                      </div>
                    </div>
                    <p className="has-text-light">to build a website which allows users to search for video games, sorted by genres and platforms. </p>
                    <br />
                    <p className="has-text-light">This project was created in 7 days, including concept development, .</p>
                    <br />
                    <p className="has-text-light">We learned to work effectively as a team, and how to manage version control using Git and GitHub. The project improved our understanding of the development of full-stack web applications and the underlying technologies used to build these.
                    </p>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-white with-white-background ">
          <br />
          <section>
            <div className="columns ">
              <div className="column has-text-centered">
              </div>
              <div className="column has-text-centered">
              </div>
              <div className="column has-text-centered">
                <i className="fab fa-react fa-4x"></i>
              </div>
              <div className="column has-text-centered">
                <i className="fab fa-js-square fa-4x"></i>
              </div>
              <div className="column has-text-centered">
                <i className="fab fa-python  fa-4x"></i>
              </div>
              <div className="column has-text-centered">
                <i className="fas fa-database  fa-4x"></i>
              </div>
              <div className="column has-text-centered">
                <i className="fab fa-html5 fa-4x"></i>
              </div>
              <div className="column has-text-centered">
                <i className="fab fa-css3-alt fa-4x"></i>
              </div>
              <div className="column has-text-centered">
                <i className="fab fa-sass fa-4x"></i>
              </div>
              <div className="column has-text-centered">
                <i className="fab fa-github fa-4x"></i>
              </div>
              <div className="column has-text-centered">
              </div>
              <div className="column has-text-centered">
              </div>
            </div>
          </section>
          <br />
        </div>
      </div>
    )
  }

}


export default About

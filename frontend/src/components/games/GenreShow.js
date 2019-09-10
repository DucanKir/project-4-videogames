import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { css } from '@emotion/core'
import { RingLoader } from 'react-spinners'
import Promise from 'bluebird'


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 30vh;
`

class GenresIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      games: [],
      genre: [],
      pageCount: 0
    }
    this.getNextPage = this.getNextPage.bind(this)
    this.getPreviousPage = this.getPreviousPage.bind(this)
    // this.getGenreName = this.getGenreName.bind(this)
  }

  componentDidMount() {
    Promise.props({
      genre: axios.get(`/api/genres/${this.props.match.params.id}?page=${this.state.pageCount}`).then(res => res.data)
      // genres: axios.get('/api/genres').then(res => res.data)
    })
      .then(data => this.setState(data))

  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0)
    if(prevProps.match.params.id !== this.props.match.params.id) {
      axios.get(`/api/genres/${this.props.match.params.id}`)
        .then(res => this.setState({ genre: res.data}))
    }
  }

  getNextPage(){
    axios.get(`/api/genres/${this.props.match.params.id}?page=${this.state.pageCount+1}`)
      .then(res => {
        this.setState({genre: res.data, pageCount: this.state.pageCount+1})
      })
  }

  getPreviousPage(){
    axios.get(`/api/genres/${this.props.match.params.id}?page=${this.state.pageCount-1}`)
      .then(res => {
        this.setState({genre: res.data, pageCount: this.state.pageCount-1})
      })
  }


  render() {
    if (!this.state.genre.games) return (
      <section className="section full-height">
        <div className='sweet-loading'>
          <RingLoader
            css={override}
            sizeUnit={'px'}
            size={50}
            color={'white'}

          />
        </div>
      </section>
    )
    console.log(this.state.genre.games.length)

    return (
      <section className="section full-height">
        <div className="container">
          <div className=" columns">
            <div className=" column has-text-left">
              &nbsp;&nbsp;&nbsp;
              <a style={this.state.pageCount===0 ? {display: 'none'} : {display: 'inline-flex'}} className="button is-link" onClick={this.getPreviousPage}>Previous</a>
            </div>
            <div className=" column has-text-centered">
              <h1 className="title is-4 has-text-light">{this.state.genre.name}</h1>
            </div>
            <div className=" column has-text-right">
              <a  className="button is-link" onClick={this.getNextPage}>Next</a>
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>

          <div className="columns is-multiline">
            {this.state.genre.games.map(game =>
              <div
                key={game.id}
                className="column is-half-tablet is-one-quarter-desktop"
              >
                <Link className="column  has-text-centered"
                  to={`/games/${game.slug}`}
                  key={game.id}
                >
                  <div className="card">
                    <figure className="image image-user" style={{ backgroundImage: `url(${game.background_image})` }} />
                    <p className="is-6 has-text-weight-semibold has-text-grey-light">{game.name}</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default GenresIndex

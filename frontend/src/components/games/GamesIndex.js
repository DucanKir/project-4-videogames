import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { css } from '@emotion/core'
import { RingLoader } from 'react-spinners'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 30vh;
`

class GameIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      games: [],
      pageCount: 0
    }
    this.getNextPage = this.getNextPage.bind(this)
    this.getPreviousPage = this.getPreviousPage.bind(this)
  }

  componentDidMount() {
    axios.get('/api/games/?page=0')
      .then(res => this.setState({ games: res.data}))
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  getNextPage(){
    axios.get(`/api/games/?page=${this.state.pageCount+1}`)
      .then(res => {
        this.setState({games: res.data, pageCount: this.state.pageCount+1})
      })
  }

  getPreviousPage(){
    axios.get(`/api/games/?page=${this.state.pageCount-1}`)
      .then(res => {
        this.setState({games: res.data, pageCount: this.state.pageCount-1})
      })
  }


  render() {
    if (!this.state.games[0]) return (
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

    return (
      <section className="section full-height">
        <div className="container">
          <div className="container">
            <div className=" columns">

              <div className=" column has-text-left">
              &nbsp;&nbsp;&nbsp;
                <a style={this.state.pageCount===0 ? {display: 'none'} : {display: 'inline-flex'}} className="button is-link" onClick={this.getPreviousPage}>Previous</a>
              </div>
              <div className=" column has-text-centered">
                <h1 className="title is-4 has-text-light">All Games</h1>
              </div>
              <div className=" column has-text-right">
                <a className="button is-link" onClick={this.getNextPage}>Next</a>
                &nbsp;&nbsp;&nbsp;
              </div>

            </div>
          </div>
          <div className="columns is-multiline">
            {this.state.games.map(game =>
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

export default GameIndex

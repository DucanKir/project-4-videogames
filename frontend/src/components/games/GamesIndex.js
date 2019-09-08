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
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.games.map(game =>
              <div
                key={game.id}
                className="column is-half-tablet is-one-quarter-desktop"
              >
                <Link className="column  has-text-centered"
                  to={`/games/${game.id}`}
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
          <div className=" columns">
            <div className=" column has-text-left">
              <a  onClick={this.getPreviousPage}>Previous</a>
            </div>
            <div className=" column has-text-right">
              <a  onClick={this.getNextPage}>Next</a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default GameIndex

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
      genres: [],
      pageCount: 0
    }
  }

  componentDidMount() {
    Promise.props({
      genres: axios.get('/api/genres/?page=0').then(res => res.data)
    })
      .then(data => this.setState(data))
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }


  render() {
    if (!this.state.genres[0]) return (
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

    console.log(this.state.genres[0].games[0].background_image)
    return (
      <section className="section full-height">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.genres.map(genre =>
              <div
                key={genre.id}
                className="column is-half-tablet is-one-quarter-desktop"
              >
                <Link className="column  has-text-centered"
                  to={`/genres/${genre.id}`}
                  key={genre.id}
                >
                  <div className="card">
                    
                    <p className="is-6 has-text-weight-semibold has-text-grey-light">{genre.name}</p>
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

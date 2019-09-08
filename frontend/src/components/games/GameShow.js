import React from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import '../../carousel.min.css'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Carousel } from 'react-responsive-carousel'
import StarRatings from 'react-star-ratings'
import { css } from '@emotion/core'
import { RingLoader } from 'react-spinners'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 30vh;
`


import Auth from '../../lib/Auth'
// import Comment from '../common/Comment'

class GamesShow extends React.Component {

  constructor() {
    super()
    this.state = {
      descriptionOpen: false
    }

    this.getScreenshots = this.getScreenshots.bind(this)
    this.getGenres = this.getGenres.bind(this)
    this.getPlatforms = this.getPlatforms.bind(this)
    this.getStores = this.getStores.bind(this)
    this.openDescription = this.openDescription.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    axios.get(`/api/games/${this.props.match.params.id}`)
      .then(res => this.setState({ game: res.data}))
  }

  getScreenshots() {
    const allScreenshots = this.state.game.short_screenshots
    return (
      <div className=" ">
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={true}>
          {allScreenshots.map(screenshot =>
            <div key={screenshot.id}>
              <img  src={screenshot.image} />
            </div>
          )}
        </Carousel>
      </div>
    )
  }

  getGenres() {
    const allGenres = this.state.game.genres
    return (
      <p className='has-text-grey-light'>Genres:
        {allGenres.map(genre =>
          <span key={genre.id}>
          &nbsp; <span   className='tag'> {genre.name}</span> &nbsp;
          </span>
        )}
      </p>
    )
  }

  getPlatforms() {
    const allPlatforms = this.state.game.platforms
    return (
      <p className='has-text-grey-light'>Platforms:
        {allPlatforms.map(platform =>
          <span className='has-text-white' key={platform.id}>
            &nbsp;<span className=''> {platform.name} </span>&nbsp;
          </span>
        )}
      </p>
    )
  }

  getStores() {
    const allStores = this.state.game.stores
    return (
      <p>
        {allStores.map(store =>
          <span key={store.id}>
            &nbsp;<a className=''  href={store.url_en}> {store.store} </a>&nbsp;
          </span>
        )}
      </p>
    )
  }

  openDescription() {
    this.setState({ descriptionOpen: !this.state.descriptionOpen})

  }



  render() {
    if (!this.state.game) return (
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
    console.log(this.state.game.short_screenshots)
    return (
      <section className="section">
        <div className="container">

          {!this.state.game && <h2 className="title is-2">Loading...</h2>}

          {this.state.game && <div>
            <div className="columns container">
              <div className="column ">
                <h1 className="title is-2 has-text-light">&nbsp;{this.state.game.name}</h1>
              </div>
              <div className="column  has-text-right ">
                <a className='subtitle is-6 has-text-grey-light is-vcentered' href={this.state.game.website}> {this.state.game.name} Website</a>
              </div>
            </div>
            <div className="columns ">
              <div className="column ">
                <div >
                  {this.getScreenshots()}
                  <div className="card span container with-background has-text-centered">
                    <br />
                    {this.getStores()}
                    <br />
                  </div>
                  <br />
                  <div>
                    <ReactPlayer className="full-width is-centered " url={this.state.game.clip[0].clip}  controls volume={0}/>
                  </div>
                </div>
                <br />
              </div>
              <div className="column ">
                <div className="container">
                  <div className="section card">
                    <div>
                      <div className="columns">
                        <div className="column">
                          <p className='has-text-grey-light'>Released:&nbsp; <span className='has-text-white'>{moment(this.state.game.released, 'YYYY-MM-DD').format('DD MMMM YYYY')}</span></p>
                          <p className='has-text-grey-light'>Playtime:&nbsp;<span className='has-text-white'> {this.state.game.playtime} h</span></p>
                        </div>
                        <div className="column ">
                          <div className="has-text-right">
                            <span className="subtitle is-6 has-text-light has-text-right">Rating:&nbsp; {this.state.game.rating}&nbsp;&nbsp;</span><StarRatings

                              rating={+(this.state.game.rating)}
                              starRatedColor="yellow"
                              numberOfStars={5}
                              starDimension="20px"
                              starSpacing="5px"
                              name='rating'
                            />
                          </div>
                          <h1 className="subtitle is-6 has-text-grey-light has-text-right"> {this.state.game.ratings_count} ratings</h1>
                        </div>

                      </div>
                      <br />
                    </div>
                    <div className={` ${this.state.descriptionOpen ? 'openDescription' : 'less-text'}`}>
                      <p className='has-text-grey-light'>Description:&nbsp; <span className='has-text-white'>{this.state.game.description_raw}</span></p>
                    </div>
                    <div  id="read-more" className='read-more has-text-grey-light'>
                      <a onClick={this.openDescription}>{` ${this.state.descriptionOpen ? 'Hide' : 'Read more...'}`}</a>
                    </div>
                    <div>
                      <br />
                      {this.getPlatforms()}
                      <br />
                      {this.getGenres()}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="columns">

            </div>
          </div>}
        </div>
      </section>
    )
  }
}

export default GamesShow

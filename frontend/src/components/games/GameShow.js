import React from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Carousel } from 'react-responsive-carousel'
import StarRatings from 'react-star-ratings'


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
    axios.get(`/api/games/${this.props.match.params.id}`)
      .then(res => this.setState({ game: res.data}))
  }

  getScreenshots() {
    const allScreenshots = this.state.game.short_screenshots
    return (
      <div>
        <Carousel  autoPlay={true} infiniteLoop={true} showThumbs={true}>
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
    if (!this.state.game) return <h1>Loading...</h1>
    console.log(this.state.game.short_screenshots)
    return (
      <section className="section">
        <div className="container">

          {!this.state.game && <h2 className="title is-2">Loading...</h2>}

          {this.state.game && <div>
            <div className="columns">
              <div className="column ">
                <h1 className="title is-2 has-text-light">{this.state.game.name}</h1>
                <a className='subtitle is-6 has-text-grey-light' href={this.state.game.website}> {this.state.game.name} Website</a>
              </div>
              <div className="column ">
                <h1 className="subtitle is-4 has-text-light has-text-right">Rating:  {this.state.game.rating} </h1>
                <div className="has-text-right">
                  <StarRatings

                    rating={+(this.state.game.rating)}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="5px"
                    name='rating'
                  />
                </div>
                <h1 className="subtitle is-6 has-text-grey-light has-text-right">based on {this.state.game.ratings_count} ratings</h1>
              </div>
            </div>
            <div className="columns ">
              <div className="column">
                <div>
                  {this.getScreenshots()}
                  <ReactPlayer className="full-width" url={this.state.game.clip[0].clip}  controls volume={0}/>
                </div>
              </div>
              <div className="column ">
                <div className="container with-background">
                  <div className="section">
                    <div>
                      <p className='has-text-grey-light'>Released:&nbsp; <span className='has-text-white'>{moment(this.state.game.released, 'YYYY-MM-DD').format('DD MMMM YYYY')}</span></p>
                      <p className='has-text-grey-light'>Playtime:&nbsp;<span className='has-text-white'> {this.state.game.playtime} h</span></p>
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
                <br />
                <div className="span container with-background has-text-centered">
                  <br />
                  {this.getStores()}
                  <br />
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

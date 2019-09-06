import React from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Carousel } from 'react-responsive-carousel'


import Auth from '../../lib/Auth'
// import Comment from '../common/Comment'

class GamesShow extends React.Component {

  constructor() {
    super()
    this.state = {}

    this.getScreenshots = this.getScreenshots.bind(this)
    this.getGenres = this.getGenres.bind(this)
    this.getPlatforms = this.getPlatforms.bind(this)
    this.getStores = this.getStores.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/games/${this.props.match.params.id}`)
      .then(res => this.setState({ game: res.data}))
  }

  getScreenshots() {
    const allScreenshots = this.state.game.short_screenshots
    return (
      <div>
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
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
      <div>
        {allGenres.map(genre =>
          <div key={genre.id}  className='container'>
            <span className='tag'> {genre.name} </span>
          </div>
        )}
      </div>
    )
  }

  getPlatforms() {
    const allPlatforms = this.state.game.platforms
    return (
      <div>
        {allPlatforms.map(platform =>
          <div key={platform.id}>
            <span className='tag'> {platform.name} </span>
          </div>
        )}
      </div>
    )
  }

  getStores() {
    const allStores = this.state.game.stores
    return (
      <div>
        {allStores.map(store =>
          <a key={store.id} href={store.url_en}>
            <span className='tag'> {store.store} </span>
          </a>
        )}
      </div>
    )
  }


  render() {
    if (!this.state.game) return <h1>Loading...</h1>
    console.log(this.state.game.short_screenshots)
    return (
      <section className="section" >
        <div className="container">

          {!this.state.game && <h2 className="title is-2">Loading...</h2>}

          {this.state.game && <div>
            <div className="columns">
              <div className="column">
                <div>
                  <h1>{this.state.game.name}</h1>
                  <figure className="image image-user" style={{ backgroundImage: `url(${this.state.game.background_image})` }} />
                  <p>Released {moment(this.state.game.released, 'YYYY-MM-DD').format('DD MMMM YYYY')}</p>
                  <p>Playtime {this.state.game.playtime} hrs</p>
                  {this.state.game.description}
                  {this.getGenres()}
                  {this.getScreenshots()}
                  {this.getPlatforms()}
                  {this.getStores()}
                  <ReactPlayer url={this.state.game.clip[0].clip}  controls volume={0.5}/>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </section>
    )
  }
}

export default GamesShow

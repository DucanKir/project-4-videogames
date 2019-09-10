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
import Promise from 'bluebird'

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
      descriptionOpen: false,
      relatedGames: []
    }

    this.getScreenshots = this.getScreenshots.bind(this)
    this.getGenres = this.getGenres.bind(this)
    this.getPlatforms = this.getPlatforms.bind(this)
    this.getStores = this.getStores.bind(this)
    this.openDescription = this.openDescription.bind(this)
    this.getRelatedGames = this.getRelatedGames.bind(this)
    this.getData = this.getData.bind(this)
    this.setVideo = this.setVideo.bind(this)
  }
  getData(){
    Promise.props({
      game: axios.get(`/api/games/${this.props.match.params.slug}`).then(res => res.data),
      relatedGames: axios.get(`https://api.rawg.io/api/games/${this.props.match.params.id}/suggested?page_size=6`).then(res => res.data.results)
    })
      .then(data => this.setState(data))
      .catch(error => {
        if (error.response) {
          axios.get(`https://api.rawg.io/api/games/${this.props.match.params.slug}`)
            .then(res => this.setState({ game: res.data}))
        }
      })
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getData()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      window.scrollTo(0, 0)
      this.getData()

    }
  }

  // https://api.rawg.io/api/games/${this.props.match.params.slug}

  getScreenshots() {
    if (this.state.game.short_screenshots) {
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
    } else {
      const allScreenshots = []
      allScreenshots.push(this.state.game.background_image, this.state.game.background_image_additional)
      return (
        <div className=" ">
          <Carousel autoPlay={true} infiniteLoop={true} showThumbs={true}>
            {allScreenshots.map(screenshot =>
              <div key={screenshot}>
                <img  src={screenshot.image} />
              </div>
            )}
          </Carousel>
        </div>
      )
    }
  }

  getGenres() {
    if(this.state.game.genres[0].name) {
      const allGenres = this.state.game.genres
      return (
        <p className='has-text-grey-light'>Genres:
        {allGenres.map(genre =>
          <Link className="column  has-text-centered" style={{display: 'inline-flex'}}
          to={`/genres/${genre.id}`}
          key={genre.id}
          >
          <span key={genre.id}>
          &nbsp; <span   className='tag'> {genre.name}</span> &nbsp;
          </span>
          </Link>
        )}
        </p>
      )

    } else {
      return <h1>no genres</h1>
    }
  }

  getPlatforms() {
    if(this.state.game.platforms[0].name) {
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

    } else {
      return <h1>no platforms</h1>
    }
  }

  getStores() {
    if(this.state.game.stores[0].name) {
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

    } else {
    return <h1>No stores<h1>
    }
  }


  getRelatedGames() {
    return (
      <div className="columns is-multiline">
        {this.state.relatedGames.map(game =>
          <Link className="column is-one-third has-text-centered"
            to={`/games/${game.slug}`}
            key={game.id}
          >
            <div className="card">
              <figure className="image image-user figure-height" style={{ backgroundImage: `url(${game.background_image})` }} />
              <p className="is-6 has-text-weight-semibold has-text-grey-light">{game.name}</p>
            </div>
          </Link>
        )}
      </div>
    )
  }

  openDescription() {
    this.setState({ descriptionOpen: !this.state.descriptionOpen})
  }

  setVideo() {
    if(this.state.game.clip) {
      return(
        <ReactPlayer key='video' className="full-width is-centered " url={this.state.game.clip[0].clip}  controls volume={0}/>
      )
    } else {
      return <h1 key='video' >No video</h1>
    }
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
    console.log(this.state.game)
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
                    {this.setVideo()}
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
                  <div className="section">
                    <h1 className="subtitle is-4 has-text-light">Related Games</h1>
                    {this.getRelatedGames()}
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

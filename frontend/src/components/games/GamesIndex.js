import React from 'react'
import { Link } from 'react-router-dom'
import Card from './GameCard'
import axios from 'axios'

class GameIndex extends React.Component {
  constructor() {
    super()

    this.state = { games: [] }
  }

  componentDidMount() {
    axios.get('/api/games/')
      .then(res => this.setState({ games: res.data}))
  }

  render() {
    if (!this.state.games[0]) return <h1>Loading</h1>
    console.log(this.state.games[0])
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
                  <div>
                    <figure className="image image-user" style={{ backgroundImage: `url(${game.background_image})` }} />
                    <p className="is-6 has-text-weight-semibold">{game.name}</p>
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

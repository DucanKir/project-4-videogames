import React from 'react'

const Card = ({ name, rating, backgrImage }) => {
  return (

    <div className="column">
      <div className="container">
        <div className="title is-6">{name}</div>
        <figure className="image image-user" style={{ backgroundImage: `url(${backgrImage})` }}/>
        <p>{rating}</p>
      </div>
    </div>
  )
}

export default Card

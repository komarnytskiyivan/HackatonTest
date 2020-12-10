import React from 'react'
import './CardItem.css'
function CardItem (props) {
    return (
        <div className="home__hero-card">
            <img className="img-main" src={props.img} alt={props.title}/>
            <h1 className="card-title">{props.title}</h1>
            <h4>{props.date}</h4>
            <p>Час UTC:{props.time}</p>
            <p>Тривалість:{props.length}</p>
            <p>Хмарність:{props.cloud}</p>
        </div>
    )
}

export default CardItem

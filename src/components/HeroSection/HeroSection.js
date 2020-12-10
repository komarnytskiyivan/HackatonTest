import React, { Fragment, useEffect, useState } from "react";
import './HeroSection.css'
import CardItem from '../CardItem/CardItem'
export default function HeroSection() {
    const [events, setEvents] = useState([]);
    const [locationCity, setLocationCity] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async (locationCity = 'Lviv') => {
    try {
      const response = await fetch(
        `https://9jqaw6.deta.dev/api/v1/event/?city=${locationCity}`
      );
      const data = await response.json();
      setEvents(data);
      setLocationCity(locationCity);
      console.log(data)
    } catch (error) {
      console.log(error.message);
    }
  };
    return (
        <div className='home__hero-section darkBg'>
            <div className="container">
                <h1 className="home__hero-topline">Найближчі події в вашому регіоні</h1>
                <div className="home__hero-cards">
                {
                    events.map((datumn) => {
                    return (
                        <CardItem 
                        key={datumn.id}
                        img={`./assets/${datumn.img}.svg`}
                        title={datumn.event_ua}
                        date={(datumn.date_start).slice(0,10)}
                        time={(datumn.date_start).slice(11,19)}
                        length={datumn.duration}
                        />
                    );
                })}
                </div>
                <h3 className="home__hero-bottomline">
                    <img src="./assets/svg/Vector2.svg" alt="Calendar"/>
                    &nbsp;Ваше місцезнаходження: <span className="location">{locationCity}</span>
                </h3>
                <input onChange={fetchData} value={locationCity} className="home__hero-bottombutton">
                </input>
            </div>
        </div>
    )
}
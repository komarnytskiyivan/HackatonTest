import React, { Component, useEffect, useState,useRef } from "react";
import './HeroSection.css'
import CardItem from '../CardItem/CardItem'
export default function HeroSection() {
    const [events, setEvents] = useState([]);
    const [locationCityState, setLocationCity] = useState([]);
    let inputRef = useRef(null);
  useEffect(() => {
    fetchData();
  }, []);
  function ChangeCity(){
            fetchData(inputRef.current.value);
        }
  const fetchData = async (locationCity = 'Lviv') => {
    try {
      const response = await fetch(
        `https://9jqaw6.deta.dev/api/v1/event/?city=${locationCity}`
      );
      const data = await response.json();
      setEvents(data);
      setLocationCity(locationCity);
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
                        cloud={datumn.cloud == null ? "Немає хмарності" : datumn.cloud}
                        />
                    );
                })}
                </div>
                <h3 className="home__hero-bottomline">
                    <img src="./assets/svg/Vector2.svg" alt="Calendar"/>
                    &nbsp;Ваше місцезнаходження: <span className="location">{locationCityState}</span>
                </h3>
                <input ref={inputRef} className="home__hero-bottombutton">
                </input>
                <button onClick={ChangeCity} className="location-button" type="submit">Подивитись івенти!</button>
            </div>
        </div>
    )
}
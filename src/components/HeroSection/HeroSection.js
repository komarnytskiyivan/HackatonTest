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
      console.log(inputRef)
            setLocationCity(inputRef.current.value)
            fetchData(locationCityState);
        }
  const fetchData = async (locationCity = 'Lviv') => {
    try {
      const response = await fetch(
        `https://9jqaw6.deta.dev/api/v1/event/?city=${locationCity}`
      );
      const data = await response.json();
      setEvents(data);
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
                    &nbsp;Ваше місцезнаходження: <span className="location">{locationCityState}</span>
                </h3>
                <input onChange={ChangeCity} ref={inputRef} className="home__hero-bottombutton">
                </input>
            </div>
        </div>
    )
}
// export default class HeroSection extends Component {
//     state = {
//         events: [],
//         locationCity:'Lviv'
//     }
//     componentDidMount () {
//         fetchData();
//     }
//     fetchData = async () => {
//         let locationCity = this.state.locationCity
//         try {
//             const response = await fetch(
//                 `https://9jqaw6.deta.dev/api/v1/event/?city=${locationCity}`
//             );
//             const data = await response.json();
//             this.setState({
//                 events: data
//             })
//           } catch (error) {
//             console.log(error.message);
//           }
//         }
//     ChangeCity = () =>{
//         const inputRef = useRef(null);
//         this.setState({
//             locationCity: inputRef.current.value
//         })
//         fetchData();
//     }
//       render() {
//         return(
//                         <div className='home__hero-section darkBg'>
//                             <div className="container">
//                                 <h1 className="home__hero-topline">Найближчі події в вашому регіоні</h1>
//                                 <div className="home__hero-cards">
//                                 {
//                                     this.state.events.map((datumn) => {
//                                     return (
//                                         <CardItem 
//                                         key={datumn.id}
//                                         img={`./assets/${datumn.img}.svg`}
//                                         title={datumn.event_ua}
//                                         date={(datumn.date_start).slice(0,10)}
//                                         time={(datumn.date_start).slice(11,19)}
//                                         length={datumn.duration}
//                                         />
//                                     );
//                                 })}
//                                 </div>
//                                 <h3 className="home__hero-bottomline">
//                                     <img src="./assets/svg/Vector2.svg" alt="Calendar"/>
//                                     &nbsp;Ваше місцезнаходження: <span className="location">{this.state.locationCity}</span>
//                                 </h3>
//                                 <input  onChange={ChangeCity} className="home__hero-bottombutton">
//                                 </input>
//                             </div>
//                         </div>
//                     )
//       }
// }
import React, { useEffect, useState } from 'react';
import '../Styles/Intro.css';
import { NavLink } from 'react-router-dom';

const IntroSection = () => {
  const [heroFunction, setHeroFunction] = useState(null);
  const [eventName, setEventName] = useState('');
  const [heroEvent, setHeroEvent] = useState([]);

  useEffect(() => {
    const getHeroFunction = async () => {
      try {
        const response = await fetch('http://localhost:3000/getHero', {
          method: 'GET',
        });
        const resdata = await response.json();
        if (response.ok) {
          const sortedEvents = resdata.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const latestEvent = sortedEvents[0];
          setHeroFunction(latestEvent);
          setEventName(latestEvent.name.split(' ')[0]);
        }
      } catch (error) {
        console.log('Error while getting hero:', error);
      }
    };

    getHeroFunction();
  }, []);

  useEffect(() => {
    if (eventName) {
      const getEvent = async () => {
        try {
          const response = await fetch(`http://localhost:3000/forms/create/${eventName}`, {
            method: 'GET',
          });
          const resdata = await response.json();
          if (response.ok) {
            setHeroEvent(resdata);
            console.log(resdata);
          }
        } catch (error) {
          console.log('Error while getting event:', error);
        }
      };

      getEvent();
    }
  }, [eventName]);

  console.log(eventName)

  return (
    <section id="intro">
      {heroFunction ? (
        <div className="intro-container wow fadeIn">
          <h1 className="mb-4 pb-0">
            {heroFunction.name.split(' ')[0]} <br />
            <span>{heroFunction.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="mb-4 pb-0">{heroFunction.date}</p>
          <a
            href={heroFunction.link}
            className="venobox play-btn mb-4"
            data-vbtype="video"
            data-autoplay="true"
          ></a>
          <NavLink to={`/AboutEvent/${eventName}`}>
            <span className="about-btn scrollto">About Event</span>
          </NavLink>
        </div>
      ) : (
        <p>Loading latest event...</p>
      )}
    </section>
  );
};

export default IntroSection;

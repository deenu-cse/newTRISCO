import React, { useEffect, useState } from 'react';
import '../Styles/About.css'

const About = () => {
  const [heroFunction, setheroFunction] = useState(null)
  useEffect(() => {
    const getHeroFunction = async () => {
      try {
        const response = await fetch('http://localhost:3000/getHero', {
          method: "GET"
        })
        const resdata = await response.json()
        if (response.ok) {
          const sortedEvents = resdata.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setheroFunction(sortedEvents[0]);
        }
      } catch (error) {
        console.log('Error while getting hero:', error);
      }
    }
    getHeroFunction()
  }, [])
  return (
    <section id="about">
      {heroFunction ? (
        <div className="container">
          <div className="row">
            <div className="col-lg-6 fix">
              <h2>About The Event</h2>
              <p>
                {heroFunction.about}
              </p>
            </div>
            <div className="col-lg-3">
              <h3>Where</h3>
              <p>{heroFunction.where}</p>
            </div>
            <div className="col-lg-3">
              <h3>When</h3>
              <p>{heroFunction.date.split(' ')[0]} <br />
                <span>{heroFunction.date.split(' ').slice(1).join(' ')}</span></p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading latest event...</p>)}
    </section>
  );
};

export default About;

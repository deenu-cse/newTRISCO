import React, { useState, useEffect } from 'react';
import '../Styles/Profile.css';
import Extranav from './Extranav';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [event, setEvent] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [timeLeft, setTimeLeft] = useState({});
  const [isValidToken, setIsValidToken] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        const response = await fetch(`http://localhost:3000/profile/${studentId}`, {
          method: "GET"
        });

        const resData = await response.json();

        if (response.ok) {
          setProfile(resData.Profile);
        } else {
          console.log('Error fetching profile:', resData.message);
        }
      } catch (error) {
        console.log('Fetch error:', error);
      }
    };

    const getEvent = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        const response = await fetch(`http://localhost:3000/event/${studentId}`, {
          method: "GET"
        });

        const resData = await response.json();
        console.log('Fetched events:', resData);
        if (response.ok) {
          if (Array.isArray(resData.Events)) {
            setEvent(resData.Events);
          } else {
            console.log('Expected an array but got:', resData.Events);
            setEvent([]);
          }
        } else {
          console.log('Error fetching events:', resData.message);
        }
      } catch (error) {
        console.log('Fetch error:', error);
      }
    };

    getProfile();
    getEvent();
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/verify-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          const data = await response.json();
          console.log(data);
          if (data.valid) {
            setIsValidToken(true);
          } else {
            setIsValidToken(false);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          setIsValidToken(false);
        }
      } else {
        setIsValidToken(false);
      }
    };

    verifyToken();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateTimeLeft = (eventDate, eventTime) => {
    const [day, month, year] = eventDate.split('/');
    const eventDateTime = new Date(`${year}-${month}-${day} ${eventTime}`);
    const currentTime = new Date();
    const timeLeft = eventDateTime - currentTime;

    if (timeLeft < 0) {
      return 'Past Event';
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, ${minutes} min. remaining`;
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeLeft = {};
      event.forEach((singleEvent) => {
        newTimeLeft[singleEvent._id] = calculateTimeLeft(singleEvent.date, singleEvent.time);
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [event]);

  if (!isValidToken) {
    navigate('/userAuth/login')
  }

  return (
    <>
      <Extranav />
      {
        profile ? (
          <div className="fullscreen">
            <div className="leftscreen">
              <div className="info">
                <div className="more-info">
                  <h2>{profile.name}</h2>
                  <h4>{profile.contact}</h4>
                  <h3>{profile.studentId}</h3>
                </div>
              </div>
              <div className="infoli">
                <ul>
                  <li onClick={() => setActiveTab('profile')}>Profile Information</li>
                  <li onClick={() => setActiveTab('events')}>Registered Events</li>
                  <li>Log Out</li>
                </ul>
              </div>
            </div>

            <div className="rightscreen">
              {activeTab === 'profile' && (
                <div className="profil-info">
                  <h2>Profile Information</h2>
                  <div>
                    <label>Name:</label>
                    <h3>{profile.name}</h3>
                  </div>
                  <div>
                    <label>Email Address:</label>
                    <h3>{profile.email}</h3>
                  </div>
                  <div>
                    <label>Contact:</label>
                    <h3>{profile.contact}</h3>
                  </ div>
                  <div>
                    <label>StudentId:</label>
                    <h3>{profile.studentId}</h3>
                  </div>
                  <div>
                    <label>RollNo:</label>
                    <h3>{profile.rollNo}</h3>
                  </div>
                </div>
              )}

              {activeTab === 'events' && (
                <div className="events-info">
                  <h2>Registered Events</h2>
                  {event
                    .filter((singleEvent) => timeLeft[singleEvent._id] !== 'Past Event')
                    .map((singleEvent) => (
                      <div className="events-container" key={singleEvent._id}>
                        <div className="events-list">
                          <div className="event-item">
                            <div className="event-date">
                              <span className="event-day">{singleEvent.date}</span>
                              <span className="event-time">{singleEvent.time}</span>
                            </div>
                            <div className="event-details">
                              <h3 className="event-title">{singleEvent.Event}</h3>
                              <p className="event-description"> Reg. Date: {formatDate(singleEvent.createdAt)}</p>
                            </div>
                            <button className="add-calendar-btn">{timeLeft[singleEvent._id]}</button>
                          </div>
                        </div>
                      </div>
                    ))}

                  <h2>Past Events</h2>
                  {event
                    .filter((singleEvent) => timeLeft[singleEvent._id] === 'Past Event')
                    .map((singleEvent) => (
                      <div className="events-container" key={singleEvent._id}>
                        <div className="events-list">
                          <div className="event-item">
                            <div className="event-date">
                              <span className="event-day">{singleEvent.date}</span>
                              <span className="event-time">{singleEvent.time}</span>
                            </div>
                            <div className="event-details">
                              <h3 className="event-title">{singleEvent.Event}</h3>
                              <p className="event-description"> Reg. Date: {formatDate(singleEvent.createdAt)}</p>
                            </div>
                            <button className="add-calendar-btn past">Past Event</button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )
      }
      <Footer />
    </>
  );
}
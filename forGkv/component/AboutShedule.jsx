import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Footer from './Footer';
import Extranav from './Extranav';

export default function AboutShedule() {
    const [schedule, setSchedule] = useState(null);
    const [submitData, setSubmitData] = useState([]);
    const [eventGallery, setEventGallery] = useState([]);
    

    const { id } = useParams();

    const eventName = id

    useEffect(() => {
        const getSchedule = async () => {
            try {
                const response = await fetch(`http://localhost:3000/getSheduleId?eventName=${eventName}`, {
                    method: 'GET',
                });
                const resdata = await response.json();
                if (response.ok) {
                    const filteredEvent = resdata.find(item => item.name.toLowerCase() === eventName.toLowerCase());
                    setSchedule(filteredEvent);
                    setEventGallery(filteredEvent.image || []);
                }
            } catch (error) {
                console.log('Error while getting schedule:', error);
            }
        };

        getSchedule();
    }, [eventName]);

    useEffect(() => {
        const getSubmitForm = async () => {
            try {
                const response = await fetch('http://localhost:3000/submitedForm', {
                    method: 'GET',
                });
                const resdata = await response.json();
                if (response.ok) {
                    setSubmitData(resdata.forms);
                }
            } catch (error) {
                console.log('Error while getting submitted forms:', error);
            }
        };

        getSubmitForm();
    }, []);

    const Setdate = (time) => {
        const [day, month, year] = time.split('/')
        const eventDate = new Date(`${year}-${month}-${day}`)
        const currentDate = new Date()
        const timeLeft = eventDate - currentDate

        if (timeLeft < 0) {
            return 'Event already started';
          }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        return `${days} days, ${hours} hours, ${minutes} min. remaining`;
    }

    const filteredData = submitData.filter(data => {
        const regex = new RegExp(eventName, 'i');
        return regex.test(data.Event);

    });

    console.log(eventName)

    return (
        <>
            <Extranav />
            <section
                id="intro"
                style={{
                    backgroundImage: schedule ? `url(${schedule.image[0]})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {schedule ? (
                    <div className="intro-container wow fadeIn">
                        <h1 className="mb-4 pb-0">
                            {schedule.name.split(' ')[0]} <br />
                            <span>{schedule.name.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="mb-4 pb-0">{schedule.date}</p>
                        <div className='count'>
                            <p>{Setdate(schedule.date)}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading latest event...</p>
                )}
            </section>

            <section id="about-event">
                <h2>About the {schedule ? schedule.name : 'Event'}</h2>
                <p>
                    {schedule
                        ? schedule.description
                        : 'This is a great event that brings together like-minded individuals to engage, learn, and have fun. Stay tuned for more details about the event.'}
                </p>
            </section>

            <section id="total-user">
                <h2>Total participants in {eventName}</h2>
                <div className="data">
                    <button>
                        <h3>{filteredData.length}</h3>
                    </button>
                    <p>Unlock new opportunities, meet inspiring people, and expand your horizons—register now and make {eventName} your stepping stone to greatness!</p>
                </div>
            </section>

            <section id="venue" className="wow fadeInUp">
                <div className="container-fluid">
                    <div className="section-header">
                        <h2>Gallery of this event</h2>
                    </div>
                </div>

                <div className="container-fluid venue-gallery-container">
                    <div className="venue-gallery">
                        {eventGallery.length > 0 ? (
                            eventGallery.map((imgUrl, index) => (
                                <div key={index} className="gallery-item">
                                    <img src={imgUrl} alt={`Gallery ${index + 1}`} />
                                </div>
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                </div>
            </section>
            <div className="regbtn">
                <NavLink to={`/EventForm/${eventName}`}>
                    <button>Do Register</button>
                </NavLink>
            </div>
            <Footer />
        </>
    );
}

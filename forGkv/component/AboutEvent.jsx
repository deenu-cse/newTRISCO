import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import Extranav from './Extranav';


export default function AboutEvent() {
    const [heroFunction, setHeroFunction] = useState(null);
    const [eventName, setEventName] = useState('');
    const [submitData, setSubmitData] = useState([]);
    const [eventGallery, seteventGallery] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [isValidToken, setIsValidToken] = useState(false);
    const [winnerPage, setwinnerPage] = useState(null)

    const navigate = useNavigate()


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
                    seteventGallery(resdata);

                    startCountdown(new Date('2024-12-10T00:00:00'));
                }
            } catch (error) {
                console.log('Error while getting hero:', error);
            }
        };

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
                console.log('Error while getting submitted form:', error);
            }
        };

        getHeroFunction();
        getSubmitForm();
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


    const startCountdown = (eventStartDate) => {
        const timer = setInterval(() => {
            const now = new Date();
            const timeDiff = eventStartDate - now;

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                clearInterval(timer);
                setTimeRemaining('The event has started or already passed');
            }
        }, 1000);
    };

    if (!isValidToken) {
        navigate('/userAuth/login')
    }

    useEffect(() => {
        const fetchWinner = async () => {
            try {
                const response = await fetch(`http://localhost:3000/highlights`, {
                    method: 'GET',
                });
                const resdata = await response.json();
                if (response.ok) {
                    setwinnerPage(resdata);
                }
            } catch (error) {
                console.log('Error while getting winners:', error);
            }
        }
        fetchWinner();
    }, [eventName]);

    return (
        <>
            <Extranav />
            <section
                id="intro"
                style={{
                    backgroundImage: heroFunction ? `url(${heroFunction.image[0]})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
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
                    </div>
                ) : (
                    <p>Loading latest event...</p>
                )}
            </section>

            <section id="about-event">
                <h2>About the {heroFunction ? heroFunction.name : 'Event'}</h2>
                <p>
                    {heroFunction
                        ? heroFunction.description
                        : 'This is a great event that brings together like-minded individuals to engage, learn, and have fun. Stay tuned for more details about the event.'}
                </p>
            </section>

            <section id="total-user">
                <h2>Total participants in {eventName}</h2>
                <div className="data">
                    <button>
                        <h3>{submitData.length}</h3>
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
                            eventGallery.map((gallery, index) => (
                                <div key={index} className="gallery-item">
                                    {gallery.image && gallery.image.length > 0 ? (
                                        gallery.image.map((imgUrl, imgIndex) => (
                                            <img loading='lazy' src={imgUrl} key={imgIndex} alt={`Gallery ${imgIndex + 1}`} />
                                        ))
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No images loaded</p>
                        )}
                    </div>
                </div>
            </section>
            <section>
                {winnerPage ? (
                    <div className="winner-post">
                        <h2>{winnerPage.title} winners blog</h2>
                        <div
                            className="winner-content"
                            dangerouslySetInnerHTML={{ __html: winnerPage.content }}
                        ></div>
                    </div>
                ) : (
                    <p></p>
                )}
            </section>
            <div className="regbtn">
                <NavLink to={`/#schedule`}>
                    <button>Do Register</button>
                </NavLink>
            </div>
            <Footer />
        </>
    );
}

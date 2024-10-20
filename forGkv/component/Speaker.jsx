import React, { useEffect, useState } from 'react';
import '../Styles/Speaker.css';


import github from '../../img/speakers/link.png';
import insta from '../../img/speakers/link.png';
import linkedinIcon from '../../img/speakers/link.png';

const Speakers = () => {
    const [speaker, setspeaker] = useState([]);

    useEffect(() => {
        const getSpeakers = async () => {
            try {
                const response = await fetch('http://localhost:3000/getSpeaker', {
                    method: "GET",
                });
                if (response.ok) {
                    const resdata = await response.json();
                    setspeaker(resdata);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getSpeakers();
    }, []);

    console.log(speaker);

    const getSocialIcon = (url) => {
        if (url.includes('github')) return github;
        if (url.includes('instagram')) return insta;
        if (url.includes('linkedin')) return linkedinIcon;
        return null; 
    };

    return (
        <section id="speakers" className="wow fadeInUp">
            <div className="container">
                <div className="section-header">
                    <h2>Event Speakers</h2>
                    <p>Here are some of our speakers</p>
                </div>
                <div className="rowx">
                    {speaker.map((speakerData, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className="speaker">
                                <img loading='lazy' src={speakerData.image} alt={`Speaker ${index + 1}`} className="img-fluid" />
                                <div className="details">
                                    <h3>{speakerData.name}</h3>
                                    <p>{speakerData.profession}</p>
                                    <div className="social">
                                        <h4>Know more:-</h4>
                                        {speakerData.contact.map((link, idx) => (
                                            <a key={idx} href={link} target="_blank" rel="noopener noreferrer">
                                                <img loading='lazy' src={getSocialIcon(link)} alt={`Social link ${idx}`} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Speakers;

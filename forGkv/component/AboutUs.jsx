import React from "react";
import '../Styles/AboutUs.css'; 
import yourPhoto from '../../img/me.jpg';  
import Extranav from "./Extranav";

const AboutUs = () => {
    return (
        <>
        <Extranav/>
        <div className="about-us">
            <div className="about-container">
                <div className="profile-section">
                    <img loading="lazy" src={yourPhoto} alt="Deendayal" className="profile-photo" />
                    <h1>Deendayal</h1>
                    <p>
                        I am a second-year Engineering CSE student at Gurukula Kangri Vishwavidyalaya, Haridwar. 
                        I've been in the web development field for one year, starting from zero, and this journey has been incredible.
                    </p>
                </div>
                <div className="details-section">
                    <h2>About This Site</h2>
                    <p>
                        This full-stack website was designed, developed, and is currently managed by me, Deendayal. 
                        Built using the MERN stack (MongoDB, Express, React, and Node.js), this platform solves the problem 
                        of event management for my college by allowing multiple events to be hosted and managed effortlessly 
                        with registration forms, payment methods, and user profiles.
                    </p>
                    <p>
                        The website also features secure authentication, unique student IDs, and email notifications 
                        for users about new events. I’m continuously working to improve and enhance its features to provide 
                        a seamless event management experience.
                    </p>
                </div>
                <div className="important-links">
                    <h2>Important Links</h2>
                    <ul>
                        <li><a href="https://www.linkedin.com/in/deendayal-verma-1a8432290/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        <li><a href="https://github.com/deenu-cse" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default AboutUs;

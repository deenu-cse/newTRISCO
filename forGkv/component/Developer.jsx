import React from 'react';
import '../Styles/Developer.css';
import structureImage from '../../img/structure.jpg';
import Extranav from './Extranav';
import Footer from './Footer';

const Developer = () => {
    return (
        <>
            <Extranav />
            <div className="developer-container">
                <h1 className="page-title">Developer Story</h1>
                <div className="idea-section">
                    <h2 className="section-title">💡 The Idea Behind This Website</h2>
                    <p className="description">
                        It all started when I noticed that very few events happen in our college, and even those are not well communicated to students. Some students never get to know about them, and very few students register.
                        So, I thought, why not solve this issue? And that’s how the idea of this website came to my mind! 🎉
                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2 className="section-title">🔧 How This Site Works</h2>
                    <p className="description">
                        This site helps in managing all college events in one place. Organizers can easily upload event details with registration forms, and students can register without any hassle. Each event has its own details and forms that are updated on the site via the admin dashboard. No coding needed!
                        Payment is managed via Razorpay, and we verify students by matching their roll numbers with their uploaded ID cards using Tesseract OCR.
                    </p>
                </div>

                <div className="structure-section">
                    <h2 className="section-title">📝 The Site Structure</h2>
                    <p className="description">
                        Below is the very first sketch I made when I planned out the structure of the website. It's where the magic started! 💻
                    </p>
                    <img loading='lazy' src={structureImage} alt="Site Structure Diagram" className="structure-image" />
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Developer;

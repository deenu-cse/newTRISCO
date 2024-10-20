import React from "react";
import '../Styles/Vanue.css';
import first from '../../img/venue-gallery/1.jpg';
import two from '../../img/venue-gallery/2.jpg';
import three from '../../img/venue-gallery/3.jpg';
import four from '../../img/venue-gallery/4.jpg';
import five from '../../img/venue-gallery/5.jpg';
import six from '../../img/venue-gallery/6.jpg';
import seven from '../../img/venue-gallery/7.jpg';
import eight from '../../img/venue-gallery/8.jpg';

const Venue = () => {
    return (
        <section id="venue" className="wow fadeInUp">
            <div className="container-fluid">
                <div className="section-header">
                    <h2>Event Venue</h2>
                    <p>Event venue location info and gallery</p>
                </div>

                <div className="row no-gutters">
                    <div className="col-lg-6 venue-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.168092292457!2d78.06112257381635!3d29.91706262459794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909491fb2c8a701%3A0x7347af12afc695cc!2sFET%20Library!5e0!3m2!1sen!2sin!4v1728630343879!5m2!1sen!2sin"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen
                            title="Venue Map"
                        />
                    </div>

                    <div className="col-lg-6 venue-info">
                        <div className="row justify-content-center">
                            <div className="col-11 col-lg-8">
                            <h3>Gurukula Kangri Vishwavidyalaya, Haridwar</h3>
                                <p>
                                    Located on the banks of the Ganges in Haridwar, Uttarakhand, our campus is known for its rich history and academic excellence. The venue offers a perfect environment for organizing various college events, providing both a serene and vibrant atmosphere for students and participants.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid venue-gallery-container">
                <div className="venue-gallery">
                    <img loading='lazy' src={first} alt="1" className="img-fluid" />
                    <img loading='lazy' src={two} alt="2" className="img-fluid" />
                    <img loading='lazy' src={three} alt="3" className="img-fluid" />
                    <img loading='lazy' src={four} alt="4" className="img-fluid" />
                    <img loading='lazy' src={five} alt="5" className="img-fluid" />
                    <img loading='lazy' src={six} alt="6" className="img-fluid" />
                    <img loading='lazy' src={seven} alt="7" className="img-fluid" />
                    <img loading='lazy' src={eight} alt="8" className="img-fluid" />
                </div>
            </div>
        </section>
    );
};

export default Venue;

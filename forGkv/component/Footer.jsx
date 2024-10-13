import React from "react";
import '../Styles/Footer.css'
import tlogo from '../../img/tlogo.png'
import { NavLink } from "react-router-dom";


const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="rowf">
                        <div className="col-lg-3 col-md-6 footer-info">
                            <img src={tlogo} alt="TRISCO" />
                            <p>
                                Trisco is your go-to platform for managing and participating in college events. Stay informed with real-time email notifications about multiple upcoming events, complete with date, time, and registration forms. Whether you want to register for a single event or track your entire event activity, Trisco ensures a seamless and personalized experience for every user.
                            </p>

                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li>
                                    <i className="fa fa-angle-right"></i> <a href="/">Home</a>
                                </li>
                                <li>
                                    <i className="fa fa-angle-right"></i> <a href="/#about">About Event</a>
                                </li>
                                <NavLink to={'/Terms-of-services'}>
                                    <li>
                                        <i className="fa fa-angle-right"></i> <a href="#">Terms of service</a>
                                    </li>
                                </NavLink>
                                <NavLink to={'/PrivacyPolicy'}>
                                    <li>
                                        <i className="fa fa-angle-right"></i> <a href="#">Privacy policy</a>
                                    </li>
                                </NavLink>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li>
                                    <i className="fa fa-angle-right"></i> <a href="/">Home</a>
                                </li>
                                <NavLink to={'/AboutMe'}>
                                    <li>
                                        <i className="fa fa-angle-right"></i> <a href="#">About Me</a>
                                    </li>
                                </NavLink>
                                <NavLink to={'/Developer-Page'}>
                                    <li>
                                        <i className="fa fa-angle-right"></i> <a href="#">Developer</a>
                                    </li>
                                </NavLink>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h4>Contact Us</h4>
                            <p>
                                Near pandit lekhram hostel
                                <br />
                                Haridwar, 249401
                                <br />
                                uttarakhand
                                <br />
                                <strong>Phone:</strong> +91-6378837030
                                <br />
                                <strong>Email:</strong> vdeendayal866@example.com
                                <br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="copyright">
                    &copy; Copyright <strong>TRISCO</strong>. All Rights Reserved
                </div>
                <div className="credits">
                    Designed by <a>Deendayal</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

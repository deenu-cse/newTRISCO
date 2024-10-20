import React, { useEffect, useState } from 'react';
import '../Styles/Header.css';
import tlogo from '../../img/tlogo.png'

const Header = () => {
  const [istoken, setistoken] = useState('');
  const [studentId, setstudentId] = useState('');
  const [mobileNavActive, setMobileNavActive] = useState(false); 
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setistoken(token);

    const student = localStorage.getItem('studentId');
    setstudentId(student);
  }, []);

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

  return (
    <header id="header" className={mobileNavActive ? 'mobile-nav-active' : ''}>
      <div className="containerc">
        <div id="logo" className="pull-left">
          <a href="/" className="scrollto">
            <img loading='lazy' src={tlogo} alt="" title="" />
          </a>
        </div>

        <button id="mobile-nav-toggle" onClick={toggleMobileNav}>
          <img loading='lazy' src="https://img.icons8.com/?size=100&id=83195&format=png&color=FFFFFF" alt="" /> 
        </button>

        <nav id="nav-menu-container" className={mobileNavActive ? 'active' : ''}>
          <ul className="nav-menu">
            <li className="menu-active">
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#speakers">Speakers</a>
            </li>
            <li>
              <a href="#schedule">Schedule</a>
            </li>
            <li>
              <a href="#venue">Venue</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            {
              istoken ? (
                <li className="buy-tickets">
                  <a href={`/your-profile/${studentId}`} >Profile</a>
                </li>
              ) : (
                <li className="buy-tickets">
                  <a href="/userAuth/login">Log In</a>
                </li>
              )
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

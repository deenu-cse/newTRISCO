import React, { useEffect, useState } from 'react'
import tlogo from '../../img/tlogo.png'


export default function Extranav() {
    const [istoken, setistoken] = useState('');
    const [studentId, setstudentId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setistoken(token);

        const student = localStorage.getItem('studentId');
        setstudentId(student);
    }, []);

    return (
        <header id="header" >
            <div className="containerc">
                <div id="logo" className="pull-left">
                    <a href="/" className="scrollto">
                        <img loading='lazy' src={tlogo} alt="" title="" />
                    </a>
                </div>

                <nav id="nav-menu-containerm" >
                    <ul className="nav-menu nav-menux">
                        <li className="menu-active">
                            <a href="/">Home</a>
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
}

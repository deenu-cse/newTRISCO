import React from 'react'
import '../Styles/Navbar.css'

export default function Navbar() {
    return (
        <>
            <div className="navbar">
                <div className="nav">
                    <div className="nfirst">
                        <img loading='lazy' src='https://img.icons8.com/?size=100&id=69736&format=png&color=ff0000' />
                        <input placeholder='Search' />
                    </div>
                    <div className="nsecond">
                        <ul>
                            <li><img loading='lazy' src='https://img.icons8.com/?size=100&id=63489&format=png&color=737373'/>Message</li>
                            <li><img loading='lazy' src='https://img.icons8.com/?size=100&id=0qxdKWVkmxjy&format=png&color=737373'/>Notification</li>
                            <li><img loading='lazy' src='https://i.pinimg.com/736x/40/de/9e/40de9e0f88eae2d0e3a63b65ec620176.jpg'/>Deendayal</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

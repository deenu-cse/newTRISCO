import React from 'react'
import Header from './header'
import IntroSection from './Intro'
import About from './About'
import Speakers from './Speaker'
import Schedule from './Event'
import Venue from './Vanue'
import Gallery from './Gallaery'
import Faq from './Faq'
import Contact from './Contact'
import Footer from './Footer'


export default function Home() {
    return (
        <div>
            <Header />
            <IntroSection />
            <About />
            <Speakers />
            <Schedule />
            <Venue />
            <Gallery />
            <Faq/>
            <Contact/>
            <Footer/>
        </div>
    )
}

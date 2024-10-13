import Header from '../component/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../component/Home'
import Dashboard from '../component/dashboard'
import Forms from '../component/Forms'
import Eventform from '../component/Eventform'
import Payment from '../component/Payment'
import AboutEvent from '../component/AboutEvent'
import AboutShedule from '../component/AboutShedule'
import Fullgallery from '../component/Fullgallery'
import SignIn from '../component/SignIn'
import Login from '../component/Login'
import Profile from '../component/Profile'
import Terms from '../component/Terms'
import PrivacyPolicy from '../component/PrivacyPolicy'
import AboutUs from '../component/AboutUs'
import Developer from '../component/Developer'
import ScrollToTop from '../component/ScrollToTop'


function App() {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dash' element={<Dashboard />} />
          <Route path='/form' element={<Forms />} />
          <Route path='/AboutEvent/:id' element={<AboutEvent />} />
          <Route path='/AboutEventshedule/:id' element={<AboutShedule />} />
          <Route path='/EventForm/:id' element={<Eventform />} />
          <Route path='/secure-payment/:id' element={<Payment />} />
          <Route path='/events-gallery' element={<Fullgallery />} />
          <Route path='/userAuth' element={<SignIn />} />
          <Route path='/userAuth/login' element={<Login />} />
          <Route path='/your-profile/:studentId' element={<Profile/>}/>
          <Route path='/Terms-of-services' element={<Terms/>}/>
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy/>}/>
          <Route path='/AboutMe' element={<AboutUs/>}/>
          <Route path='/Developer-Page' element={<Developer/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

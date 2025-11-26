import { useRef } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import TourSection from './components/Tours/TourSection'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Partners from './components/Partners/Partners'

function App() {
  const toursRef = useRef<any>(null)

  const handleTourSelect = (tourId: string) => {
    toursRef.current?.openTourById(tourId)
  }

  return (
    <>
      <Header onTourSelect={handleTourSelect} />
      <Hero />
      <About />
      <TourSection ref={toursRef} />
      <Partners/>
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default App
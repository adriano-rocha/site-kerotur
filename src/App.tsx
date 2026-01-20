import { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import TourSection from './components/Tours/TourSection'

import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Partners from './components/Partners/Partners'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import MissionVisionValuesPage from './components/pages/MissionVisionValuesPage'

type TourSectionRef = {
  openTourById: (tourId: string) => void;
};

function HomePage() {
  const toursRef = useRef<TourSectionRef | null>(null);

  const handleTourSelect = (tourId: string) => {
    toursRef.current?.openTourById(tourId)
  }

  return (
    <>
      <Header onTourSelect={handleTourSelect} />
      <Hero />
      <TourSection ref={toursRef} />
      <About />      
      <Partners />

      <Contact />
      <WhatsAppButton />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mvv" element={<MissionVisionValuesPage />} />
    </Routes>
  )
}

export default App

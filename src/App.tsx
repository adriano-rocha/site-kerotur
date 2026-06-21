import { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSEO } from "./hooks/useSEO";
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import MissionVisionValues from './components/MissionVisionValues/MissionVisionValues'
import TourSection from './components/Tours/TourSection'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Partners from './components/Partners/Partners'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import MissionVisionValuesPage from './components/pages/MissionVisionValuesPage'
import CookieBanner from './components/CookieBanner/CookieBanner';

type TourSectionRef = {
  openTourById: (tourId: string) => void;
};

function HomePage() {
  useSEO({
    title: "Passeios no Rio de Janeiro",
    description: "Conheça os melhores passeios no Rio de Janeiro, outras cidades e experiências exclusivas com a Kerotur Turismo.",
  });  

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
      <MissionVisionValues />  
      <Partners />
      <Contact />
      <WhatsAppButton />
      <Footer />
      <CookieBanner />
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
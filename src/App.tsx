import { useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import ToursSection from "./components/Tours/ToursSection";
import TourModal from "./components/Tours/TourModal";
import toursData from "./data/tours.json";
import Partners from "./components/Partners/Partners";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

  // Encontra o tour selecionado
  const selectedTour = selectedTourId
    ? toursData.find((tour) => tour.id === selectedTourId)
    : null;

  const handleTourSelect = (tourId: string) => {
    console.log("🎯 Tour selecionado no App:", tourId);
    setSelectedTourId(tourId);
  };

  const handleCloseModal = () => {
    console.log("❌ Fechando modal");
    setSelectedTourId(null);
  };

  return (
    <>
      <Header onTourSelect={handleTourSelect} />
      <Hero />
      <About />
      <ToursSection />
      <Partners />
      <Contact />
      <Footer /> 

      {/* Modal de Tour */}
      {selectedTour && (
        <TourModal tour={selectedTour} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;

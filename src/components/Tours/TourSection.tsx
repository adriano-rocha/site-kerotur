import { useState, useImperativeHandle, forwardRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TourCard from "./TourCard";
import TourModal from "./TourModal";
import Autoplay from "embla-carousel-autoplay";
import toursDataImport from "../../data/tours.json";

interface Tour {
  id: string;
  category: "rio" | "outras-cidades" | "outras-experiencias";
  name: { [key: string]: string };
  shortDescription: { [key: string]: string };
  fullDescription?: { [key: string]: string };
  image: string;
  images?: string[];
  attractions?: { [key: string]: string[] };
  duration?: { [key: string]: string };
  price: {
    individual?: string;
    group?: string;
    value?: string;
    perPerson?: boolean;
  };
  included?: { [key: string]: string[] | undefined };
  buttonText?: { [key: string]: string };
}
export interface TourSectionRef {
  openTourById: (tourId: string) => void;
}

const toursData = (Array.isArray(toursDataImport)
  ? toursDataImport
  : [toursDataImport]) as Tour[];

const toursRio = toursData.filter((t) => t.category === "rio");
const toursOutrasCidades = toursData.filter(
  (t) => t.category === "outras-cidades"
);
const toursOutrasExperiencias = toursData.filter(
  (t) => t.category === "outras-experiencias"
);

interface CarouselBlockProps {
  title: string;
  tours: Tour[];
  onSelectTour: (tour: Tour) => void;
  formatTourForCard: (tour: Tour) => {
    id: string;
    name: { [key: string]: string };
    shortDescription: { [key: string]: string };
    image: string;
    price: { value: string; perPerson: boolean };
    buttonText: { [key: string]: string };
  };
}

function CarouselBlock({
  title,
  tours,
  onSelectTour,
  formatTourForCard,
}: CarouselBlockProps) {
  // Carrossel Desktop
  const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 3 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
 
  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: false })]
  );

  const scrollPrevDesktop = useCallback(
    () => emblaApiDesktop?.scrollPrev(),
    [emblaApiDesktop]
  );
  const scrollNextDesktop = useCallback(
    () => emblaApiDesktop?.scrollNext(),
    [emblaApiDesktop]
  );
  const scrollPrevMobile = useCallback(
    () => emblaApiMobile?.scrollPrev(),
    [emblaApiMobile]
  );
  const scrollNextMobile = useCallback(
    () => emblaApiMobile?.scrollNext(),
    [emblaApiMobile]
  );

  return (
    <div className="mb-20">     
      <h3
        className="text-2xl md:text-3xl font-bold mb-8 text-[#00008B] border-l-4 border-[#00ffff] pl-4"
        data-aos="fade-right"
      >
        {title}
      </h3>
    
      <div
        className="hidden md:block relative"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className="overflow-hidden" ref={emblaRefDesktop}>
          <div className="flex gap-6">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <TourCard
                  tour={formatTourForCard(tour)}
                  onClick={() => onSelectTour(tour)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-12 h-12 absolute left-0 -translate-y-1/2 -translate-x-6 top-1/2 z-10 transition duration-300 hover:scale-110"
          onClick={scrollPrevDesktop}
          aria-label="Passeios anteriores"
          type="button"
        >
          <ChevronLeft className="w-6 h-6 text-[#0008B]" />
        </button>

        <button
          className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-12 h-12 absolute right-0 -translate-y-1/2 translate-x-6 top-1/2 z-10 transition duration-300 hover:scale-110"
          onClick={scrollNextDesktop}
          aria-label="Próximos passeios"
          type="button"
        >
          <ChevronRight className="w-6 h-6 text-[#0008B]" />
        </button>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(tours.length / 3) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => emblaApiDesktop?.scrollTo(index * 3)}
                className="w-2 h-2 rounded-full bg-[#00ffff] hover:bg-[#0008B] transition"
                aria-label={`Ir para grupo ${index + 1}`}
                type="button"
              />
            )
          )}
        </div>
      </div>
      
      <div
        className="md:hidden relative"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className="overflow-hidden" ref={emblaRefMobile}>
          <div className="flex">
            {tours.map((tour) => (
              <div key={tour.id} className="flex-[0_0_100%] min-w-0 px-2">
                <TourCard
                  tour={formatTourForCard(tour)}
                  onClick={() => onSelectTour(tour)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-10 h-10 absolute left-0 -translate-y-1/2 -translate-x-2 top-1/2 z-10 transition duration-300"
          onClick={scrollPrevMobile}
          aria-label="Passeio anterior"
          type="button"
        >
          <ChevronLeft className="w-5 h-5 text-[#0008B]" />
        </button>

        <button
          className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-10 h-10 absolute right-0 -translate-y-1/2 translate-x-2 top-1/2 z-10 transition duration-300"
          onClick={scrollNextMobile}
          aria-label="Próximo passeio"
          type="button"
        >
          <ChevronRight className="w-5 h-5 text-[#0008B]" />
        </button>

        <div className="flex justify-center gap-2 mt-6 items-center">
          {tours.slice(0, 10).map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApiMobile?.scrollTo(index)}
              className="w-2 h-2 rounded-full bg-[#00ffff] hover:bg-[#0008B] transition"
              aria-label={`Ir para passeio ${index + 1}`}
              type="button"
            />
          ))}
          {tours.length > 10 && (
            <span className="text-gray-400 text-xs ml-1">
              +{tours.length - 10}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const TourSection = forwardRef<TourSectionRef, object>((_, ref) => {
  const { t } = useTranslation();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const formatTourForCard = (tour: Tour) => ({
    id: tour.id,
    name: tour.name,
    shortDescription: tour.shortDescription,
    image: tour.image,
    price: {
      value: tour.price.individual || tour.price.value || "Consulte",
      perPerson:
        tour.price.perPerson !== undefined ? tour.price.perPerson : true,
    },
    buttonText: tour.buttonText || { "pt-BR": "Reserve agora" },
  });

  const formatTourForModal = (tour: Tour) => {
    const included = tour.included || { "pt-BR": [] };
    const normalizedIncluded: { [key: string]: string[] } = Object.fromEntries(
      Object.entries(included).map(([lang, list]) => [lang, list || []])
    );

    return {
      id: tour.id,
      name: tour.name,
      shortDescription: tour.shortDescription,
      fullDescription: tour.fullDescription || tour.shortDescription,
      image: tour.image,
      images: tour.images || [tour.image],
      attractions: tour.attractions || { "pt-BR": [] },
      duration: tour.duration || { "pt-BR": "Consulte" },
      price: {
        value: tour.price.individual || tour.price.value || "Consulte",
        perPerson:
          tour.price.perPerson !== undefined ? tour.price.perPerson : true,
        individual: tour.price.individual || tour.price.value || "Consulte",
        group: tour.price.group || "Consulte",
      },
      included: normalizedIncluded,
      buttonText: tour.buttonText || { "pt-BR": "Reserve agora" },
    };
  };

  useImperativeHandle(ref, () => ({
    openTourById: (tourId: string) => {
      const tour = toursData.find((t: Tour) => t.id === tourId);
      if (tour) {
        setSelectedTour(tour);
        setTimeout(() => {
          document.getElementById("passeios")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    },
  }));

  return (
    <section id="passeios" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Título principal da seção */}
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-[#ff8C00]"
          data-aos="fade-down"
        >
          {t("tours.title")}
        </h2>
        <p
          className="text-center text-gray-600 mb-16 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {t("tours.subtitle")}
        </p>
     
        <CarouselBlock
          title={t("tours.rioSection")}
          tours={toursRio}
          onSelectTour={setSelectedTour}
          formatTourForCard={formatTourForCard}
        />
       
        <CarouselBlock
          title={t("tours.otherCitiesSection")}
          tours={toursOutrasCidades}
          onSelectTour={setSelectedTour}
          formatTourForCard={formatTourForCard}
        />
       
        <CarouselBlock
          title={t("tours.experiencesSection")}
          tours={toursOutrasExperiencias}
          onSelectTour={setSelectedTour}
          formatTourForCard={formatTourForCard}
        />
      </div>

      {selectedTour && (
        <TourModal
          tour={formatTourForModal(selectedTour)}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </section>
  );
});

TourSection.displayName = "TourSection";

export default TourSection;
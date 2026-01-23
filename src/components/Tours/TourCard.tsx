import { useTranslation } from 'react-i18next'

interface TourCardProps {
  tour: {
    id: string
    name: { [key: string]: string }
    shortDescription: { [key: string]: string }
    image: string
    price: {
      value: string
      perPerson: boolean
    }
    buttonText: { [key: string]: string }
  }
  onClick: () => void
}

function TourCard({ tour, onClick }: TourCardProps) {
  
  const { i18n} = useTranslation()
  const currentLang = i18n.language

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={tour.image}
          alt={tour.name[currentLang] || tour.name['pt-BR']}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            // Fallback para imagem padrão se não encontrar
            e.currentTarget.src = '/images/tours/default-tour.jpg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white pr-4">
          {tour.name[currentLang] || tour.name['pt-BR']}
        </h3>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3 min-h-[72px]">
          {tour.shortDescription[currentLang] || tour.shortDescription['pt-BR']}
        </p>

       
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xl font-bold text-[#00008B]"> {/* 👈 text-xl (era 2xl) */}
              {tour.price.value}
            </p>
            {/* 👈 REMOVIDO: perPerson e "grupo consulte economia especial" */}
          </div>
        </div>

        {/* ✅ BOTÃO RESERVE AGORA - COR WHATSAPP SEM HOVER */}
        <div 
          className="w-full bg-green-500 text-white font-bold py-3 rounded-lg text-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation() // Impede abrir modal
            window.open('https://wa.me/5521982251450?text=Olá+!+Quero+fazer+uma+reserva', '_blank')
          }}
        >
          Reserve agora
        </div>
      </div>
    </div>
  )
}

export default TourCard





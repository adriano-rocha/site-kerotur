import React, { type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

interface TourModalProps {
  tour: {
    id: string
    name: { [key: string]: string }
    shortDescription: { [key: string]: string }
    fullDescription?: { [key: string]: string }
    image: string
    images?: string[]
    attractions?: { [key: string]: string[] }
    duration?: { [key: string]: string }
    price: {
      value: string
      perPerson: boolean
      individual?: string
      group?: string
    }
    included?: { [key: string]: string[] }
    buttonText: { [key: string]: string }
  }
  onClose: () => void
}

function TourModal({ tour, onClose }: TourModalProps): JSX.Element {
  const { i18n } = useTranslation()
  const currentLang = i18n.language ?? 'pt-BR'
  const getText = (map?: { [key: string]: string }) =>
    map ? (map[currentLang] ?? map['pt-BR'] ?? '') : ''

  // Estado do carrossel
  const images = tour.images || [tour.image]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const WHATSAPP_LINK = `https://wa.me/5521982251450?text=${encodeURIComponent(
    `Olá! Gostaria de mais informações sobre o passeio: ${getText(tour.name)}`
  )}`

  // Bloquear scroll do body quando modal está aberto
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original || 'unset'
    }
  }, [])

  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Formatar descrição completa com parágrafos
  const fullDesc = getText(tour.fullDescription) || getText(tour.shortDescription)
  const paragraphs = fullDesc.split('\n').filter(p => p.trim())

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão X - Fixo no topo */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="sticky top-4 float-right mr-4 mt-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 transition duration-300 shadow-lg z-10 cursor-pointer"
          aria-label="Fechar"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Carrossel de Imagens - SEM BLUR */}
        <div className="relative w-full h-96 md:h-[500px] bg-gray-900">
          {/* Imagem Atual */}
          <img
            src={images[currentImageIndex]}
            alt={`${getText(tour.name)} - ${currentImageIndex + 1}`}
            className="w-full h-full object-contain bg-gray-900"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const img = e.currentTarget as HTMLImageElement
              img.src = '/images/tours/default-tour.jpg'
            }}
          />

          {/* Botões de navegação do carrossel */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0008B] rounded-full p-3 transition duration-300 shadow-lg z-10"
                aria-label="Imagem anterior"
                type="button"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0008B] rounded-full p-3 transition duration-300 shadow-lg z-10"
                aria-label="Próxima imagem"
                type="button"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicadores (dots) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>

              {/* Contador de imagens */}
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Conteúdo Principal */}
        <div className="p-8 md:p-12">
          {/* Título com ícone de localização */}
          <div className="flex items-start gap-3 mb-8 pt-4">
            <MapPin className="w-8 h-8 text-[#FF8C00] flex-shrink-0 mt-1" />
            <h1 className="text-3xl md:text-4xl font-bold text-[#0008B] leading-tight">
              {getText(tour.name)}
            </h1>
          </div>

          {/* Duração e Info rápida */}
          {tour.duration && (
            <div className="flex items-center gap-2 mb-6 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Duração: {getText(tour.duration)}</span>
            </div>
          )}

          {/* Descrição Completa - Texto corrido em parágrafos */}
          <div className="prose prose-lg max-w-none mb-8">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4 text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          {/* O que está incluído */}
          {tour.included && tour.included[currentLang]?.length > 0 && (
            <div className="mb-8 bg-[#00ffff]/5 p-6 rounded-xl border border-[#00ffff]/20">
              <h3 className="text-xl font-bold text-[#0008B] mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                O que está incluído
              </h3>
              <ul className="space-y-2">
                {tour.included[currentLang]?.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-600 text-lg mt-0.5">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preço */}
          <div className="bg-gradient-to-r from-[#00ffff]/10 to-[#0008B]/10 p-6 rounded-xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Valor do Passeio</p>
                <p className="text-4xl font-bold text-[#0008B]">
                  {tour.price.individual || tour.price.value}
                </p>
                {tour.price.perPerson && (
                  <p className="text-sm text-gray-600 mt-1">por pessoa</p>
                )}
              </div>
              {tour.price.group && (
                <div className="text-center md:text-right">
                  <p className="text-sm text-gray-600 mb-1">Grupo</p>
                  <p className="text-2xl font-bold text-green-600">{tour.price.group}</p>
                  <p className="text-sm text-gray-600 mt-1">por pessoa</p>
                </div>
              )}
            </div>
          </div>

          {/* Botões de Ação - Grandes e Centralizados */}
          <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-200">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-8 rounded-xl transition duration-300 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Faça sua Reserva
            </a>
            
            <button
              onClick={onClose}
              className="md:flex-none bg-[#FF8C00] hover:bg-[#FF7A00] text-[#0008B] font-bold py-5 px-12 rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourModal
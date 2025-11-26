import { useTranslation } from "react-i18next";
import { useState } from "react";

function Contact() {
  const { t } = useTranslation();
  const WHATSAPP_NUMBER = "5521982251450";
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
  const EMAIL = "kerotur@kerotur.com";
  const PHONE = "+55 21 98225-1450";
  const ADDRESS = "Rua Noronha Torrezão, 282/1002B, Niterói - RJ";
  const GOOGLE_REVIEW_LINK = "https://g.page/r/SUA_URL_AQUI/review"; // Substitua pela sua URL

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const socialLinks = [
    { name: "WhatsApp", image: "/images/midias/whats.png", url: WHATSAPP_LINK },
    { name: "Instagram", image: "/images/midias/insta.avif", url: "https://www.instagram.com/kerotur_/" },
    { name: "Facebook", image: "/images/midias/face.avif", url: "#" },
    { name: "Linktree", image: "/images/midias/link.webp", url: "#" },
    { name: "TripAdvisor", image: "/images/midias/trip.png", url: "#" }
  ];

  const paymentMethods = [
    { name: "PIX", image: "/images/payment/pix.svg" },
    { name: "Visa", image: "/images/payment/visa.png" },
    { name: "Mastercard", image: "/images/payment/mastercard.svg" },
    { name: "Elo", image: "/images/payment/elo.svg" },
    { name: "Amex", image: "/images/payment/amex.jpg" },
    { name: "Link de Pagamento", image: "/images/payment/link.svg" }
  ];

  return (
    <section
      id="contato"
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#0008B]"
            data-aos="fade-down"
          >
            {t("contact.title")}
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Coluna Esquerda - Canais de Contato (1/3) */}
          <div className="space-y-4">
            {/* WhatsApp - Destaque */}
            <a
              href={WHATSAPP_LINK}
              data-aos="fade-right"
              data-aos-delay="100"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    {t("contact.whatsapp.title")}
                  </h3>
                  <p className="text-green-100 text-sm">{PHONE}</p>
                </div>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </a>

            {/* E-mail */}
            <div
              data-aos="fade-right"
              data-aos-delay="200"
              className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:border-[#00ffff] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#00ffff]/20 rounded-full p-2">
                  <svg
                    className="w-6 h-6 text-[#0008B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800">
                    {t("contact.email.title")}
                  </h3>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-[#0008B] hover:text-[#00ffff] text-sm"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* Telefone */}
            <div
              data-aos="fade-right"
              data-aos-delay="300"
              className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:border-[#FF8C00] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#FF8C00]/20 rounded-full p-2">
                  <svg
                    className="w-6 h-6 text-[#FF8C00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800">
                    {t("contact.phone.title")}
                  </h3>
                  <a
                    href={`tel:${WHATSAPP_NUMBER}`}
                    className="text-gray-700 hover:text-[#0008B] text-sm"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div
              data-aos="fade-right"
              data-aos-delay="400"
              className="bg-white rounded-xl p-4 shadow-md border border-gray-200"
            >
              <div className="flex items-start gap-3">
                <div className="bg-[#0008B]/20 rounded-full p-2 mt-1">
                  <svg
                    className="w-6 h-6 text-[#0008B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800 mb-1">
                    {t("contact.address.title")}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {ADDRESS}
                  </p>
                </div>
              </div>
            </div>

            {/* Horário de Atendimento */}
            <div
              data-aos="fade-right"
              data-aos-delay="500"
              className="bg-[#00ffff]/10 rounded-xl p-4 border border-[#00ffff]/30"
            >
              <div className="flex items-start gap-3">
                <div className="bg-[#00ffff]/30 rounded-full p-2 mt-1">
                  <svg
                    className="w-5 h-5 text-[#0008B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-[#0008B] mb-2">
                    {t("contact.hours.title")}
                  </h3>
                  <p className="text-[#0008B] text-sm font-semibold">
                    Todos os dias, das 8h às 22h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Avaliação, Pagamento e Redes (2/3) */}
          <div className="lg:col-span-2 space-y-6" data-aos="fade-left" data-aos-delay="300">
            
            {/* Seção de Avaliação */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-[#0008B] mb-4 text-center">
                {t("contact.review.title")}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {t("contact.review.subtitle")}
              </p>

              {/* Estrelas de Rating */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <svg
                      className={`w-10 h-10 ${
                        star <= (hoverRating || rating)
                          ? "text-[#FF8C00] fill-current"
                          : "text-gray-300"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
              </div>

              {/* Formulário de Avaliação */}
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={t("contact.review.namePlaceholder")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00ffff] transition"
                  />
                </div>
                <div>
                  <textarea
                    placeholder={t("contact.review.commentPlaceholder")}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00ffff] transition resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF8C00] hover:bg-[#FF7A00] text-[#0008B] font-bold py-3 rounded-lg transition duration-300"
                >
                  {t("contact.review.submitButton")}
                </button>
              </form>
            </div>

            {/* Grid com Pagamento e QR Code */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Formas de Pagamento */}
              <div className="bg-gradient-to-br from-[#00ffff]/10 to-white rounded-2xl p-6 shadow-xl border border-[#00ffff]/30">
                <h3 className="text-xl font-bold text-[#0008B] mb-4 text-center">
                  {t("contact.payment.title")}
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {paymentMethods.map((method, index) => (
                    <div 
                      key={index}
                      className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
                    >
                      <img 
                        src={method.image}
                        alt={method.name}
                        className="w-10 h-10 mb-1 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <p className="text-xs font-semibold text-[#0008B] text-center">
                        {method.name}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 text-center">
                  * Cartões e links de pagamento possuem taxas administrativas
                </p>
              </div>

              {/* QR Code Google Meu Negócio */}
              <div className="bg-gradient-to-br from-[#FF8C00]/10 to-white rounded-2xl p-6 shadow-xl border border-[#FF8C00]/30 flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold text-[#0008B] mb-3 text-center">
                  {t("contact.qrcode.title")}
                </h3>
                <div className="bg-white p-4 rounded-xl shadow-lg mb-3">
                  <img 
                    src="/images/qrcode-google.png"
                    alt="QR Code Google Avaliação"
                    className="w-40 h-40 object-contain"
                    onError={(e) => {
                      // Fallback: mostra ícone do Google se não houver QR Code
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23999'%3EQR Code%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600 text-center mb-3">
                  {t("contact.qrcode.instruction")}
                </p>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      className="w-6 h-6 text-[#FF8C00] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <a
                  href={GOOGLE_REVIEW_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF8C00] hover:bg-[#FF7A00] text-white font-bold py-2 px-6 rounded-lg transition duration-300 text-sm"
                >
                  {t("contact.qrcode.button")}
                </a>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
              <h3 className="text-xl font-bold text-[#0008B] mb-4 text-center">
                {t("contact.social.title")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center border border-gray-200"
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-2">
                      <img 
                        src={social.image}
                        alt={social.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <p className="text-xs font-semibold text-[#0008B] text-center">
                      {social.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
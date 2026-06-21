import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const SITE_NAME = "Kerotur Turismo e Eventos";
const SITE_URL = "https://kerotur.com.br";
const DEFAULT_IMAGE = `${SITE_URL}/images/logo.jpg`;

/**
 * Cria ou atualiza uma <meta> tag no <head>.
 * Procura primeiro por name, depois por property (para Open Graph).
 */
function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

/**
 * Cria ou atualiza a tag <link rel="canonical">.
 */
function setCanonicalLink(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
}

/**
 * Cria ou atualiza o script JSON-LD de dados estruturados.
 */
function setJsonLd(data: object) {
  const id = "jsonld-structured-data";
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Hook de SEO: atualiza title, meta description, Open Graph,
 * Twitter Card, link canonical e o JSON-LD da TravelAgency.
 *
 * Uso:
 *   useSEO({
 *     title: "Passeios no Rio de Janeiro",
 *     description: "Conheça os melhores passeios...",
 *   })
 */
export function useSEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = "website",
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    // Title da página
    document.title = fullTitle;

    // Meta description
    setMetaTag("name", "description", description);

    // Open Graph
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:locale", "pt_BR");

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    // Canonical
    setCanonicalLink(url);

    // JSON-LD — TravelAgency (dados fixos da empresa)
    setJsonLd({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: SITE_NAME,
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      image: DEFAULT_IMAGE,
      description:
        "Agência de turismo especializada em passeios no Rio de Janeiro, outras cidades do estado e experiências exclusivas.",
      telephone: "+5521982251450",
      email: "kerotur@kerotur.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Noronha Torrezão, 282/1002B",
        addressLocality: "Niterói",
        addressRegion: "RJ",
        postalCode: "24240-182",
        addressCountry: "BR",
      },
      openingHours: "Mo-Su 08:00-22:00",
      sameAs: [
        "https://www.instagram.com/kerotur_/",
        "https://www.facebook.com/share/1G1BD6rCFg/",
        "https://www.tripadvisor.com.br/Attraction_Review-g303506-d32984640-Reviews-Kerotur_Turismo_e_Eventos-Rio_de_Janeiro_State_of_Rio_de_Janeiro.html",
        "https://linktr.ee/kerotur_",
      ],
    });
  }, [title, description, image, url, type]);
}
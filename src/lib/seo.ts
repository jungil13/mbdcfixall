// src/lib/seo.ts

export const SITE_URL = "https://mbdcfixall.com";
export const SITE_NAME = "MBDC FIX ALL";
export const LOGO_URL = `${SITE_URL}/mightyb_logo.png`;

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "name": SITE_NAME,
    "image": LOGO_URL,
    "@id": SITE_URL,
    "url": SITE_URL,
    "telephone": "0323422202",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cebu City",
      "addressRegion": "Cebu",
      "addressCountry": "PH"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 10.3157,
        "longitude": 123.8854
      },
      "geoRadius": "50000"
    },
    "description": "Your trusted partner for all types of home and property repairs in Cebu — fast response, quality workmanship, and transparent pricing.",
    "sameAs": [
      "https://facebook.com/mbdcfixall",
      "https://twitter.com/mbdcfixall"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Property Repair and Facility Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Property Repair"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Maintenance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Facility Services"
          }
        }
      ]
    }
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": LOGO_URL,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "0323422202",
      "contactType": "customer service",
      "areaServed": "PH",
      "availableLanguage": ["en", "tl"]
    },
    "sameAs": [
      "https://facebook.com/mbdcfixall",
      "https://twitter.com/mbdcfixall"
    ]
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.item
    }))
  };
}

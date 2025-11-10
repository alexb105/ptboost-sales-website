export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ptboost.co.uk"

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": baseUrl,
    "name": "PTBoost",
    "description": "Professional website design and development service for UK personal trainers. Affordable custom websites starting at £7.99/month with 7-day turnaround.",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/og-image.jpg`,
    "telephone": "+44",
    "email": "ptboost.info@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressRegion": "United Kingdom"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.5074",
      "longitude": "-0.1278"
    },
    "priceRange": "££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Credit Card, Debit Card, Stripe",
    "areaServed": [
      {
        "@type": "City",
        "name": "London"
      },
      {
        "@type": "City",
        "name": "Manchester"
      },
      {
        "@type": "City",
        "name": "Birmingham"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      }
    ],
    "serviceType": "Website Design & Development",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Personal Trainer Website Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Personal Trainer Website",
            "description": "Professional single-page website with psychology-driven design, mobile-first optimization, hosting included, smart lead capture system, and 7-day turnaround.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "PTBoost"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "serviceType": "Website Design & Development"
          },
          "price": "7.99",
          "priceCurrency": "GBP",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "7.99",
            "priceCurrency": "GBP",
            "billingIncrement": "P1M"
          },
          "availability": "https://schema.org/InStock",
          "url": baseUrl
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "10",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://twitter.com/ptboost",
      "https://www.instagram.com/ptboost"
    ]
  }

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PTBoost",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Professional website design and development service for UK personal trainers",
    "email": "ptboost.info@gmail.com",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "PTBoost Team"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
    </>
  )
}


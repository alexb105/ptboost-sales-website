export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ptboost.co.uk"

  // Enhanced LocalBusiness Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": baseUrl,
    "name": "PTBoost",
    "alternateName": "PTBoost - Personal Trainer Websites UK",
    "description": "Professional website design and development service for UK personal trainers. Affordable custom websites starting at £7.99/month with 7-day turnaround. Perfect for budget-conscious trainers in London, Manchester, Birmingham, and across the UK who need a professional online presence without paying agency prices.",
    "url": baseUrl,
    "logo": `${baseUrl}/ptboost_logo-nobg.png`,
    "image": [
      `${baseUrl}/og-image.jpg`,
      `${baseUrl}/ptboost_logo-nobg.png`
    ],
    "telephone": "+44",
    "email": "ptboost.info@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressRegion": "United Kingdom",
      "addressLocality": "United Kingdom"
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
        "name": "London",
        "@id": "https://www.wikidata.org/wiki/Q84"
      },
      {
        "@type": "City",
        "name": "Manchester",
        "@id": "https://www.wikidata.org/wiki/Q18125"
      },
      {
        "@type": "City",
        "name": "Birmingham",
        "@id": "https://www.wikidata.org/wiki/Q2256"
      },
      {
        "@type": "City",
        "name": "Leeds"
      },
      {
        "@type": "City",
        "name": "Liverpool"
      },
      {
        "@type": "City",
        "name": "Bristol"
      },
      {
        "@type": "City",
        "name": "Sheffield"
      },
      {
        "@type": "City",
        "name": "Edinburgh"
      },
      {
        "@type": "City",
        "name": "Glasgow"
      },
      {
        "@type": "Country",
        "name": "United Kingdom",
        "@id": "https://www.wikidata.org/wiki/Q145"
      }
    ],
    "serviceType": "Website Design & Development",
    "knowsAbout": [
      "Personal Trainer Websites",
      "Fitness Website Design",
      "Local SEO for Personal Trainers",
      "Lead Generation for Fitness Professionals",
      "Affordable Website Design UK"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Personal Trainer Website Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Personal Trainer Website",
            "description": "Professional single-page website with psychology-driven design, mobile-first optimization, hosting included, smart lead capture system, AI website editor, and 7-day turnaround. Perfect for UK personal trainers who need a professional online presence without paying £2,000-5,000 agency prices.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "PTBoost"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "serviceType": "Website Design & Development",
            "audience": {
              "@type": "Audience",
              "audienceType": "Personal Trainers",
              "geographicArea": {
                "@type": "Country",
                "name": "United Kingdom"
              }
            }
          },
          "price": "7.99",
          "priceCurrency": "GBP",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "7.99",
            "priceCurrency": "GBP",
            "billingIncrement": "P1M",
            "priceType": "https://schema.org/Monthly"
          },
          "availability": "https://schema.org/InStock",
          "url": baseUrl,
          "eligibleRegion": {
            "@type": "Country",
            "name": "United Kingdom"
          }
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
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  }

  // Organization Schema
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PTBoost",
    "alternateName": "PTBoost - Personal Trainer Websites UK",
    "url": baseUrl,
    "logo": `${baseUrl}/ptboost_logo-nobg.png`,
    "description": "Professional website design and development service for UK personal trainers. Affordable custom websites starting at £7.99/month with 7-day turnaround.",
    "email": "ptboost.info@gmail.com",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "PTBoost Team"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://twitter.com/ptboost",
      "https://www.instagram.com/ptboost"
    ]
  }

  // FAQPage Schema
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is it only £7.99/month? What's the catch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There's no catch. This is a launch special to help trainers who can't afford expensive agency prices (£2,000+ upfront) but need a professional online presence. At £7.99/month, you get everything - website, hosting, maintenance, and updates. This introductory rate locks in your price forever, even when it increases for new subscribers. Cancel anytime, no contracts."
        }
      },
      {
        "@type": "Question",
        "name": "What if I don't like the design?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You won't pay a penny until you're happy. I'll work with you through revisions until you love it. If after reasonable revisions you're still not satisfied, you get a full refund. I only succeed when you're thrilled with your site."
        }
      },
      {
        "@type": "Question",
        "name": "Can I edit the website myself later?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! You'll get access to our AI-powered editor that lets you update text, images, prices, and content in seconds — no coding required. Just tell the AI what you want to change in plain English, and it happens instantly. For major redesigns, I'm happy to help (small fee may apply). But for day-to-day updates, you have total control with zero developer fees."
        }
      },
      {
        "@type": "Question",
        "name": "Is hosting really included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Your site will be hosted on enterprise-grade servers (Vercel/Netlify) with excellent uptime and security. Hosting, maintenance, and ongoing updates are all included in your £7.99/month subscription. If your site grows massively and needs more resources, I'll let you know, but for 99% of PTs, the base subscription covers everything."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it actually take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Usually 5-7 days from when I receive your content (photos, bio, pricing, etc). If you're ready with everything, I can often have you live even faster. If you need help creating content, I'll guide you through it - might add a day or two."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to provide all the content and photos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ideally yes - your own photos and story make the best websites. But if you're stuck, I'll help you with copywriting guidance and can suggest stock photos. The more 'you' we can make it, the better it will perform."
        }
      },
      {
        "@type": "Question",
        "name": "What if I don't have a domain name?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No problem! I can help you choose and set up a domain (you'll need to purchase it - usually £10-15/year). Or if you prefer, I can launch your site on a free subdomain to start (like yourname.vercel.app) and we can add a custom domain later."
        }
      },
      {
        "@type": "Question",
        "name": "Will this actually help me get more clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A website alone won't magically bring clients - you still need to drive people to it (Instagram, local SEO, word of mouth, etc). BUT, once people find you, a professional website dramatically increases trust and conversions compared to just a Linktree or Instagram profile. It's a tool, not a magic bullet."
        }
      },
      {
        "@type": "Question",
        "name": "What makes this different from a template?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Templates are generic - same layout as thousands of other sites. I build each site custom for your brand, your colors, your personality. No two sites look the same. It's the difference between buying a suit off the rack vs getting one tailored to fit you perfectly."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a refund policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You have 7 days after delivery to review your completed website. If you're not satisfied, you can request a full refund within that window. Additionally, if any serious technical issues arise that prevent basic website functionality and can't be fixed within 30 days, you're also covered. Full details in our Terms & Conditions."
        }
      }
    ]
  }

  // HowTo Schema for the 3-step process
  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Get a Professional Personal Trainer Website in 7 Days",
    "description": "Simple 3-step process to get your professional personal trainer website live in 7 days for just £7.99/month",
    "totalTime": "P7D",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "GBP",
      "value": "7.99"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Subscribe & Get Started",
        "text": "Start your subscription at just £7.99/month. Everything included — website, hosting, maintenance, and updates. Cancel anytime.",
        "image": `${baseUrl}/og-image.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Share Your Details",
        "text": "Upload your content, social links, and preferences. Don't have content yet? No problem — I'll help you!",
        "image": `${baseUrl}/og-image.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "I Build & Launch",
        "text": "Sit back and relax. I'll build your professional website, set up hosting, and have you live within 7 days — guaranteed.",
        "image": `${baseUrl}/og-image.jpg`
      }
    ]
  }

  // BreadcrumbList Schema
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ]
  }

  // WebSite Schema with SearchAction
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PTBoost",
    "url": baseUrl,
    "description": "Professional websites for UK personal trainers. Get a custom website in 7 days for just £7.99/month.",
    "publisher": {
      "@type": "Organization",
      "name": "PTBoost"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
    </>
  )
}


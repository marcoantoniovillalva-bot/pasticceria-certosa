export default function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Bakery', 'CafeOrCoffeeShop', 'Restaurant'],
    name: 'Delizie della Certosa',
    image: '/images/logo.png',
    '@id': 'https://www.deliziedellacertosa.it',
    url: 'https://www.deliziedellacertosa.it',
    telephone: '+390382147278',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Volta 4',
      addressLocality: 'Certosa di Pavia',
      postalCode: '27012',
      addressRegion: 'PV',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.2564,
      longitude: 9.1456,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday'],
        opens: '05:30',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday'],
        opens: '05:30',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday'],
        opens: '15:30',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '05:30',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '15:30',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '05:30',
        closes: '14:00',
      },
    ],
    servesCuisine: ['Italian', 'Sicilian'],
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '112',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Dany Montalbano' },
        reviewBody:
          'Cercavo da mesi una buona pizza a domicilio a Certosa di Pavia.. FINALMENTE pizze farcitissime, qualità, puntualità e prezzo TUTTO AL TOP! Complimenti',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Nicoletta' },
        reviewBody:
          'Come sempre le vostre torte non deludono mai, bellissima e super buona. Complimenti',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
      },
    ],
    sameAs: ['https://www.facebook.com/Deliziedellacertora'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

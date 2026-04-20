const CURRENCY = {
  SECRET: 'fa5d7bf69a0631fe82e34261',
  BASE_URL: 'https://v6.exchangerate-api.com/v6',
};

export const apiConfig = {
  currency: {
    baseUrl: CURRENCY.BASE_URL,
    baseUrlWithSecret: `${CURRENCY.BASE_URL}/${CURRENCY.SECRET}`,
    endpoints: {
      conversion: '/latest',
    },
  },
  news: {
    baseUrl: 'https://newsapi.org/v2',
    apiKey: '770939e1b9734195b38fe81ee5ed7a9f',
    endpoints: {
      topHeadlines: '/top-headlines',
    },
  },
};

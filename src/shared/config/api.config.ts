const CURRENCY = {
  SECRET: 'fa5d7bf69a0631fe82e34261',
  BASE_URL: import.meta.env.VITE_CURRENCY_API_BASE_URL as string,
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
    baseUrl: import.meta.env.VITE_NEWS_API_BASE_URL as string,
    apiKey: '770939e1b9734195b38fe81ee5ed7a9f',
    endpoints: {
      topHeadlines: '/top-headlines',
    },
  },
  main: {
    baseUrl: import.meta.env.VITE_MAIN_API_BASE_URL as string,
    endpoints: {
      email: '/email',
    },
  },
};

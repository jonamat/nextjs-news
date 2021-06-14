export const RESTCOUNTRIES_API = 'https://restcountries.eu/rest/v2';
export const NEWSAPI_API = 'https://newsapi.org/v2';
export const LOCAL_API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://nextjs-news-six.vercel.app/api';

export const restCountriesEndpoints = {
  getAllCountries: RESTCOUNTRIES_API + '/all',
  getCountryInfoByCountryCode: RESTCOUNTRIES_API + '/alpha',
};

export const newsApiEndpoints = {
  getNewsByKeyword: NEWSAPI_API + '/everything',
  getNewsByCountryCode: NEWSAPI_API + '/top-headlines',
};

export const localApiEndpoints = {
  countries: LOCAL_API + '/countries',
  news: LOCAL_API + '/news',
};

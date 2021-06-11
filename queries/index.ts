import axios from "axios";

export const RESTCOUNTRIES_API = "https://restcountries.eu/rest/v2";
export const NEWSAPI_API = "https://newsapi.org/v2";
export const NEWSAPI_TOKEN = "71d7d23f1d594e78898fd21676ccedd2";

export const restCountries_endpoints = {
  getAll: RESTCOUNTRIES_API + "/all",
  getByAlphaCode: RESTCOUNTRIES_API + "alpha",
};

export const newsApiEndpoints = {
  getByKeyword: NEWSAPI_API + "/everything",
  getByCountryCode: NEWSAPI_API + "/top-headlines",
};

export const getNews = async (alpha2code: string) =>
  (
    await axios.get(newsApiEndpoints.getByCountryCode, {
      params: {
        country: alpha2code,
        apiKey: NEWSAPI_TOKEN,
      },
    })
  ).data;

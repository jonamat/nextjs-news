import axios from "axios";
import { Article } from "../interfaces";
import { newsApiEndpoints } from "../network/config";

/**
 * Get headlines for a specific country
 * @param alpha2code 2-digit country code
 * @returns Array of 20 Article objects
 */
export const getNewsByCountryCode = async (alpha2code: string) => {
  interface Response {
    status: string;
    totalResults: number;
    articles: Array<Article>;
  }

  try {
    const { articles } = (
      await axios.get<Response>(newsApiEndpoints.getNewsByCountryCode, {
        params: {
          country: alpha2code,
          apiKey: process.env.NEWSAPI_TOKEN,
        },
      })
    ).data;

    return articles;
  } catch (_e) {

    // Country is not covered by the service
    return [];
  }
};

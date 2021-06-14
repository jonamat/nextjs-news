import { useQuery } from 'react-query';
import { getNewsByCountryCode } from '../network/local';

const QUERY_KEY = 'news';

const useNews = (countryCode: string) => {
  return useQuery([QUERY_KEY, { countryCode }], () => getNewsByCountryCode(countryCode));
};

export default useNews;

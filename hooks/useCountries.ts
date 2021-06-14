import { useQuery } from "react-query";
import { getAllCountries } from "../network/local";

const QUERY_KEY = "countries";

const useCountries = () => {
  return useQuery(QUERY_KEY, () => getAllCountries());
};

export default useCountries;

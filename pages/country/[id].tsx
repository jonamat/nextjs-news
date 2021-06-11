import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { Country, REQ_STATUS } from "../../interfaces";
import { useNews } from "../../queries/hooks";

interface Props {
  countryData: Country;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries: Array<Country> = (
    await axios.get("https://restcountries.eu/rest/v2/all")
  ).data;

  let paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) throw new Error();

  const countryData = (
    await axios.get(`
    https://restcountries.eu/rest/v2/alpha/${params.id}`)
  ).data;

  return {
    props: {
      countryData,
    },
  };
};

const CountryDetails: FC<Props> = ({ countryData }) => {
  const { data, status, error } = useNews(countryData.alpha2Code);

  return (
    <>
      <h1>{countryData.name}</h1>
      <div>Region: {countryData.region}</div>
      <div>Subregion: {countryData.subregion}</div>
      <div>Capital: {countryData.capital}</div>
      <div>Population: {countryData.population}</div>
      <div>
        {(() => {
          switch (status) {
            case REQ_STATUS.LOADING:
              return <div>Loading news...</div>;
            case REQ_STATUS.ERROR:
              return <div>Error: {error}</div>;
            default:
              return (
                <div>
                  {data.articles.map((article, index) => (
                    <div style={{padding: 10}} key={index}>
                      <h4>Source: {article.source.name}</h4>
                      <h3>{article.title}</h3>
                      <p>{article.content}</p>
                    </div>
                  ))}
                </div>
              );
          }
        })()}
      </div>
    </>
  );
};

export default CountryDetails;

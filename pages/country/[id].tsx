import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { Country, REQ_STATUS } from "../../interfaces";

import {
  getAllCountries,
  getCountryInfoByCountryCode,
} from "../../network/countries";
import useNews from "../../hooks/useNews";

interface Props {
  countryData: Country;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await getAllCountries();

  let paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || typeof params.id !== "string")
    throw new Error("params.id must be a string");

  const countryData = await getCountryInfoByCountryCode(params.id);

  return {
    props: {
      countryData,
    },
  };
};

const CountryDetails: FC<Props> = ({ countryData }) => {
  const { data, status, error } = useNews(countryData.alpha2Code);

  if (error) console.error(error);

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
              return <div>Error</div>;

            case REQ_STATUS.SUCCESS:
              return (
                <div>
                  {(data?.length &&
                    data.map((article, index) => (
                      <div style={{ padding: 10 }} key={index}>
                        <h4>Source: {article.source.name}</h4>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                      </div>
                    ))) ||
                    "I can't get the news for this country"}
                </div>
              );
          }
        })()}
      </div>
    </>
  );
};

export default CountryDetails;

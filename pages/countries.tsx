import { FC } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";

import { Country } from "../interfaces";

import { getAllCountries } from "../network/countries";
import { COUNTRY_DETAILS_PAGE } from "../locations/pages";

interface Props {
  countries: Array<Country>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const countries = await getAllCountries();

  return {
    props: {
      countries,
    },
  };
};

const Countries: FC<Props> = ({ countries }) => {
  return (
    <>
      <h1>List of countries</h1>
      {countries.map((country, index) => (
        <div key={index}>
          <Link href={COUNTRY_DETAILS_PAGE + country.alpha3Code}>
            <a>{country.name}</a>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Countries;

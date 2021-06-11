import axios from "axios";
import { GetStaticProps } from "next";
import { FC } from "react";
import { Country } from "../interfaces";
import Link from "next/link";

interface Props {
  countries: Array<Country>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const countries = (await axios.get("https://restcountries.eu/rest/v2/all"))
    .data;

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
      {countries.map((country) => (
        <div>
          <Link href={`/country/${country.alpha3Code}`}>
            <a>{country.name}</a>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Countries;

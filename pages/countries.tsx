import React, { FC } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Text, Flex, Heading, UnorderedList, ListItem, useBreakpointValue, ListIcon } from "@chakra-ui/react";

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
  const column = useBreakpointValue({
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  })

  return (
    <Flex direction="column" m="5">
      <Heading mb="10">List of countries</Heading>
      <UnorderedList spacing={3} sx={{ columnCount: column }}>
        {countries.map((country, index) => (
          <ListItem key={index} sx={{ listStyle: 'none', cursor: 'pointer' }}>
            <Link href={COUNTRY_DETAILS_PAGE + country.alpha3Code}>
              <Text _hover={{ color: '#78bbea' }}>{country.name}</Text>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  );
};

export default Countries;

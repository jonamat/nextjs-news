import { FC, ReactNode, useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Heading, Text, useToast, Box } from '@chakra-ui/react';

import { Article, Country, REQ_STATUS } from '@/interfaces';
import { getAllCountries, getCountryInfoByCountryCode } from '@/network/countries';
import useNews from '@/hooks/useNews';
import Page from '@/components/Layout/Page/Page';
import Modal from '@/components/Layout/Modal/Modal';
import ArticleList from '@/components/Countries/ArticleList/ArticleList';

interface Props {
  countryData: Country;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await getAllCountries();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || typeof params.id !== 'string') throw new Error('params.id must be a string');

  const countryData = await getCountryInfoByCountryCode(params.id);

  return {
    props: {
      countryData,
    },
  };
};

interface ModalState {
  open: boolean;
  title?: string;
  content?: ReactNode;
}

const CountryDetails: FC<Props> = ({ countryData }) => {
  const { data, status } = useNews(countryData.alpha2Code);
  const [modal, setModal] = useState<ModalState>({ open: false });
  const toast = useToast();

  useEffect(() => {
    if (status === REQ_STATUS.ERROR)
      toast({
        title: 'Sorry',
        description: "Monkeys shouldn't write websites",
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
  }, [status]);

  const handleCloseModal = () => setModal({ ...modal, open: false });
  const handleNewsClick = (article: Article) => {
    setModal({
      open: true,
      title: article.title,
      content: (
        <Box w="100%" h="50vh" bg="white">
          <iframe title={article.title} src={article.url} width="100%" height="100%" />
        </Box>
      ),
    });
  };

  return (
    <Page showBack>
      <Heading>{countryData.name}</Heading>

      <Box my={4}>
        <Text>
          <strong>Region:</strong> {countryData.region}
        </Text>
        <Text>
          <strong>Subregion:</strong> {countryData.subregion}
        </Text>
        <Text>
          <strong>Capital:</strong> {countryData.capital}
        </Text>
        <Text>
          <strong>Population:</strong> {countryData.population}
        </Text>
      </Box>

      <ArticleList articles={data} status={status as REQ_STATUS} handleNewsClick={handleNewsClick} />

      <Modal open={modal.open} handleClose={handleCloseModal} title={modal.title} content={modal.content} />
    </Page>
  );
};

export default CountryDetails;

import { FC } from "react";
import Link from "next/link";
import { COUNTRIES_PAGE } from "../locations/pages";
import { Button, Flex, Heading, Center } from "@chakra-ui/react";

const Home: FC = () => {
  return (
    <>
      <Center h="100vh">
        <Flex p="10" direction="column" align="center" justify="center">
          <Heading mb={10}>World News!</Heading>

          <Link href={COUNTRIES_PAGE}>
            <Button colorScheme="blue">Choose your country</Button>
          </Link>
        </Flex>
      </Center>
    </>
  );
};

export default Home;

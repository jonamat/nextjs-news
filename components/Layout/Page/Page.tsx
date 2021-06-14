import React, { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';

import Navbar from '../Navbar/Navbar';

interface Props {
  showBack?: boolean;
}

const Page: FC<Props> = ({ children, showBack = false }) => {
  return (
    <Flex direction="column" m={0}>
      <Navbar showBack={showBack} />
      <Box m={5} mt="100px">
        {children}
      </Box>
    </Flex>
  );
};

export default Page;

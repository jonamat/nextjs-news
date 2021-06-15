import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, IconButton, HStack, Heading, Tooltip, Link, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import NavButtons from './NavButtons';
import Modal from '../Modal/Modal';

interface Props {
  showBack: boolean;
}

const Navbar: FC<Props> = ({ showBack }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleBack = () => router.back();
  const handleInfo = () => setModalOpen(true);

  return (
    <Flex justify="space-between" position="fixed" h="80px" w="100%" p={5} shadow="sm" bg="blue.100">
      {showBack && (
        <HStack flexGrow={0} spacing={5} mr={5}>
          <Tooltip hasArrow label="Go back">
            <IconButton colorScheme="blue" icon={<ArrowBackIcon />} onClick={handleBack} aria-label="go back" />
          </Tooltip>
        </HStack>
      )}

      <Flex flexGrow={1} align="center">
        <Heading size="lg" color="blackAlpha.800">
          World News
        </Heading>
      </Flex>

      <NavButtons handleInfo={handleInfo} />

      <Modal
        open={modalOpen}
        handleClose={setModalOpen}
        isCentered
        title={'NextJS demo app'}
        content={
          <Text>
            Repo at <Link href="https://github.com/jonamat/nextjs-news">https://github.com/jonamat/nextjs-news</Link>
          </Text>
        }
      />
    </Flex>
  );
};

export default Navbar;

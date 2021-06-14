import { ChangeEventHandler, FC, useState } from "react";
import { useRouter } from "next/router";
import {
  IconButton,
  HStack,
  Tooltip,
  Select,
  Collapse,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { InfoIcon, SearchIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import { REQ_STATUS } from "@/interfaces";
import { COUNTRY_DETAILS_PAGE } from "@/locations/pages";
import useCountries from "@/hooks/useCountries";

interface Props {
  handleInfo: () => any;
}

const NavButtons: FC<Props> = ({ handleInfo }) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { data, status } = useCountries();
  const router = useRouter();
  const toast = useToast();

  const toggleSelect = () => setSelectOpen(!selectOpen);
  const handleCountrySelect: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    toggleSelect();
    router.push(COUNTRY_DETAILS_PAGE + event.target.value).catch((error) => {
      console.error(error);
      toast({ title: "Error", description: "The page could not be loaded" });
    });
  };

  return (
    <HStack flexGrow={0} spacing={5}>
      <Collapse
        in={selectOpen}
        animateOpacity
        transition={{
          exit: { duration: 0 },
          enter: { delay: 0.2, duration: 0.2 },
        }}
      >
        <Select
          maxW="200px"
          colorScheme="blue"
          placeholder="Select a country"
          _dark={{ color: "whiteAlpha.900" }}
          onChange={handleCountrySelect}
        >
          {status === REQ_STATUS.LOADING && (
            <option disabled>Loading countries...</option>
          )}
          {data?.map((country) => (
            <option key={country.alpha3Code} value={country.alpha3Code}>
              {country.name}
            </option>
          ))}
        </Select>
      </Collapse>

      <Collapse
        in={!selectOpen}
        animateOpacity
        transition={{ exit: { duration: 0.2 }, enter: { duration: 0.2 } }}
      >
        <Tooltip hasArrow label="Search">
          <IconButton
            colorScheme="blue"
            icon={<SearchIcon />}
            onClick={toggleSelect}
            aria-label="Search"
          />
        </Tooltip>
      </Collapse>

      <Tooltip hasArrow label="Switch theme">
        <IconButton
          colorScheme="blue"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          aria-label="Switch theme"
        />
      </Tooltip>
      <Tooltip hasArrow label="About">
        <IconButton
          colorScheme="blue"
          icon={<InfoIcon />}
          onClick={handleInfo}
          aria-label="About"
        />
      </Tooltip>
    </HStack>
  );
};

export default NavButtons;

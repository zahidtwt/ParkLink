import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BARI_KOI_API_KEY } from '../../../../config';
import AddressInput from './AddressInput';

function DebouncedAddress({ setLocationValue, addressValue }) {
  const [searchValue, setSearchValue] = useState('');
  const [locations, setLocations] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const searchBg = useColorModeValue('white', 'gray.600');
  const hoverTextColor = useColorModeValue('white', 'purple.900');
  const searchIcon = useColorModeValue('purple', 'lighgray');
  const handleSelect = (selectedItem) => {
    setLocationValue(selectedItem);
    setIsOpen(false);
  };
  const showResults = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    if (searchValue === '') {
      setLocations([]);
    }
    const fetchLocations = async () => {
      const response = await axios.get(
        `https://barikoi.xyz/v1/api/search/verify/autocomplete/${BARI_KOI_API_KEY}/place?q=${searchValue}`
      );
      setLocations(response.data);
    };
    fetchLocations();
  }, [searchValue]);

  return (
    <>
      <AddressInput
        value={addressValue}
        delay={1000}
        showResults={showResults}
        onChange={(value) => setSearchValue(value)}
      />
      {isOpen && locations?.places ? ( // only render the box if it is open
        <Box
          shadow={'xl'}
          border={'2px solid lightgray'}
          overflow={'scroll'}
          borderRadius={'xl'}
          position="fixed"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={10}
          top="430px"
          minWidth={'300px'}
          maxWidth={'300px'}
          minHeight={'40px'}
          maxHeight={'400px'}
          background={searchBg}
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {locations?.places?.map((location) => (
            <Text
              key={location.id}
              px={4}
              py={2}
              borderBottom={'1px solid #ccc'}
              cursor="pointer"
              _hover={{
                bg: { searchIcon },
                color: { hoverTextColor },
              }}
              onClick={() => {
                handleSelect(location);
              }}
            >
              {location.address}
            </Text>
          ))}
        </Box>
      ) : null}
    </>
  );
}

export default DebouncedAddress;

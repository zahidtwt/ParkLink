import { useState, useEffect } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import DebouncedInput from './DebouncedInput';
import axios from 'axios';
import MyMap from './MyMap';

function SearchLocation({ map }) {
  const [searchValue, setSearchValue] = useState('');
  const [locations, setLocations] = useState([]);
  const searchBg = useColorModeValue('gray.100', 'gray.600');
  // const textColor = useColorModeValue('purple.900', 'white');
  const hoverTextColor = useColorModeValue('white', 'purple.900');
  const searchIcon = useColorModeValue('purple', 'lighgray');

  const handleSelect = (selectedItem) => {
    const { longitude, latitude } = selectedItem;
    setBoxOpen(false);
    map.current.flyTo({ center: [longitude, latitude], zoom: 14 });
  };
  const [boxOpen, setBoxOpen] = useState(false);
  useEffect(() => {
    if (searchValue === '') {
      setLocations([]);
    }
    const fetchLocations = async () => {
      const response = await axios.get(
        `https://barikoi.xyz/v1/api/search/verify/autocomplete/NDY2Njo0Q1NGM05IS00w/place?q=${searchValue}`
      );
      setLocations(response.data);
    };
    fetchLocations();
  }, [searchValue]);

  return (
    <>
      <DebouncedInput
        onFocus={() => setBoxOpen(true)}
        delay={1000}
        placeholder='Search'
        onChange={(value) => setSearchValue(value)}
      />
      {locations?.places && boxOpen ? (
        <Box
          shadow={'xl'}
          border={'2px solid lightgray'}
          overflow={'scroll'}
          borderRadius={'xl'}
          position='fixed'
          left='50%'
          transform='translate(-50%, -50%)'
          zIndex={10}
          top='305px'
          minWidth={'300px'}
          maxWidth={'300px'}
          minHeight={'40px'}
          maxHeight={'400px'}
          background={searchBg}
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}>
          {locations?.places?.map((location) => (
            <Text
              key={location.id}
              px={4}
              py={2}
              cursor='pointer'
              _hover={{
                bg: { searchIcon },
                color: { hoverTextColor },
              }}
              onClick={() => {
                handleSelect(location);
              }}>
              {location.address}
            </Text>
          ))}
        </Box>
      ) : null}
    </>
  );
}

export default SearchLocation;

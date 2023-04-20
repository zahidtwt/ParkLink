import {
  Box,
  VStack,
  HStack,
  Image,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import { FaArrowRight } from 'react-icons/fa';
import DistanceCalculator from '../parking/DistanceCalculator';
import ParkingInfo from '../parking/ParkingInfoDisplay';
function ParkingCart({ parking }) {
  const selectedLon = parking?.location?.longitude;
  const selectedLat = parking?.location?.latitude;
  const { isOpen, onClose, onOpen } = useDisclosure();
  function handleClick() {
    onOpen();
  }

  return (
    <>
      {' '}
      <ParkingInfo msg={parking} isOpen={isOpen} onClose={onClose} />
      {parking && (
        <Box
          border={'1px solid #e1e1e1'}
          onClick={handleClick}
          position='relative'
          boxShadow='0px 11px 23px -3px rgba(0,0,0,0.2)'
          borderRadius={'xl'}
          spacing={2}
          w={60}>
          <HStack
            p={2}
            pb={0}
            justifyContent={'space-between'}
            justifyItems={'space-between'}
            alignItems={'space-between'}
            alignContent={'space-between'}>
            <VStack align={'left'} padding={1} mb={0}>
              <Heading size={'sm'}>
                {parking?.location?.address?.length > 20
                  ? parking?.location?.address?.slice(0, 20) + '...'
                  : parking?.location?.address}
              </Heading>

              <DistanceCalculator
                selectedLat={selectedLat}
                selectedLon={selectedLon}
              />
            </VStack>
            <Box padding={2}>
              <FaArrowRight />
            </Box>
          </HStack>

          <Image
            borderRadius={'xl'}
            borderTopRadius={0}
            shadow={'lg'}
            src={parking?.images[parking?.images?.length - 1]}
            alt={parking?.address}
            minW={'90%'}
            maxH={'80%'}
            mr={1}
            // maxH={'80px'}
          />

          <VStack>
            {parking?.location?.address?.length > 20
              ? parking?.location?.address?.slice(0, 20) + '...'
              : parking?.location?.address}
          </VStack>
        </Box>
      )}
    </>
  );
}

export default ParkingCart;

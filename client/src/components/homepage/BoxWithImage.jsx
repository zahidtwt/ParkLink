import { Box, HStack, Heading, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import findpark from '../../assets/findpark.png';
import listpark from '../../assets/listpark.png';
import { Link } from 'react-router-dom';
function BoxWithImage() {
  return (
    <HStack
      alignContent={'center'}
      justifyContent={'center'}
      spacing={7}
      my={5}>
      <Link to='/dashboard'>
        <VStack
          shadow={'0px 17px 43px -7px rgba(0,0,0,0.2)'}
          alignItems={'center'}
          p={5}
          borderRadius={20}>
          <Image src={findpark} maxWidth={'100px'} maxHeight={'100px'} />
          <Heading size={'md'} colorScheme='gray' color={'gray.600'}>
            Find Parking
          </Heading>
        </VStack>
      </Link>

      <Link to='/listparking'>
        <VStack
          shadow={'0px 17px 43px -7px rgba(0,0,0,0.2)'}
          alignItems={'center'}
          p={5}
          borderRadius={20}>
          <Image src={listpark} width={'100px'} />
          <Heading size={'md'} color={'gray.600'}>
            List Parking
          </Heading>
        </VStack>
      </Link>
    </HStack>
  );
}

export default BoxWithImage;

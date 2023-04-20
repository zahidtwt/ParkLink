import {
  Box,
  HStack,
  Heading,
  Image,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import findpark from '../../assets/findpark.png';
import listpark from '../../assets/listpark.png';
import { Link } from 'react-router-dom';

function BoxWithImage() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imageLoad = () => {
    setIsLoaded(true);
  };

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
          <Box height={'100px'} width={'100px'} position='relative'>
            {!isLoaded && (
              <Skeleton height={'100%'} width={'100%'} position='absolute' />
            )}
            <Image
              src={findpark}
              maxWidth={'100%'}
              maxHeight={'100%'}
              onLoad={imageLoad}
              style={{ opacity: isLoaded ? 1 : 0 }}
            />
          </Box>
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
          <Box height={'100px'} width={'100px'} position='relative'>
            {!isLoaded && (
              <Skeleton height={'100%'} width={'100%'} position='absolute' />
            )}
            <Image
              src={listpark}
              maxWidth={'100%'}
              maxHeight={'100%'}
              onLoad={() => {
                setIsLoaded(true);
              }}
              style={{ opacity: isLoaded ? 1 : 0 }}
            />
          </Box>
          <Heading size={'md'} color={'gray.600'}>
            List Parking
          </Heading>
        </VStack>
      </Link>
    </HStack>
  );
}

export default BoxWithImage;

import React from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import NavigationSVG from './svg/navigationSVG';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
function SplashScreenLocationError() {
  return (
    <VStack
      spacing={10}
      p={5}
      textAlign={'center'}
      h={'100vh'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <VStack h={20}></VStack>
      <NavigationSVG />
      <Text as="b" fontSize={'2xl'}>
        Opps! Location Error
      </Text>
      <Text fontSize={'lg'} mt={'5!important'}>
        We need to access your location
        <br /> to provide our services!
      </Text>
      <Box mt={20}></Box>

      <Box
        position="fixed"
        bottom="70px"
        right={['30px', '84px']}
        zIndex={1}
      ></Box>
    </VStack>
  );
}

export default SplashScreenLocationError;

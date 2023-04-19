// components/LoadingOverlay.js
import React from 'react';
import { Box, Spinner, Center } from '@chakra-ui/react';

const LoadingOverlay = ({ isLoading }) => {
  return (
    <Box
      position='fixed'
      top='0'
      left='0'
      width='100%'
      height='100%'
      zIndex='999'
      display={isLoading ? 'block' : 'none'}
      backgroundColor='rgba(0, 0, 0, 0.3)'>
      <Center height='100%'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='purple.500'
          size='xl'
        />
      </Center>
    </Box>
  );
};

export default LoadingOverlay;

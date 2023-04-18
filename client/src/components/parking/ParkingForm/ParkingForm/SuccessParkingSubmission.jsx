import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import successpost from '../../../../assets/successpost.svg';

function SuccessParkingSubmission() {
  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      height='100vh'
      bgGradient='linear(to-b, gray.100, gray.200)'>
      <VStack>
        <Box>
          <Image boxSize='150px' src={successpost} alt='success' />
        </Box>
      </VStack>
    </Flex>
  );
}

export default SuccessParkingSubmission;

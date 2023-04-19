import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import succesVideo from '../../../../assets/success.mp4';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate;
function SuccessParkingSubmission() {
  const searchParams = new URLSearchParams(window.location.search);
  const parkingId = searchParams.get('parkingId');

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      height='100vh'
      bg={'#E3E3EE'}
      // bgGradient='linear(to-b, #BDC3DB, #BDC3DB)'
    >
      <VStack>
        <Box
          mb={5}
          shadow={'lg'}
          background={'whiteAlpha.700'}
          p={5}
          borderRadius={'full'}
          border='0px solid #3353EA'>
          <Heading
            as='h1'
            size='lg'
            colorScheme='purple'
            color={'purple'}
            textTransform={'uppercase'}
            bgGradient='linear(to-l, #3353EA, #FF0080)'
            bgClip='text'>
            <Flex align='center'>
              <Box
                boxShadow={'lg'}
                mr={2}
                bgGradient='linear(to-l, #ff, #ffff)'
                borderRadius='full'
                p={1}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='purple'
                  width='20px'
                  height='20px'>
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
                </svg>
              </Box>
              Post Successful
            </Flex>
          </Heading>
        </Box>
        <Box
          bg={'whiteAlpha.500'}
          padding={'5px 10px'}
          borderRadius={'lg'}
          border={'4px dotted #d6bcfa'}>
          <Text fontSize='xl' color={'gray.500'}>
            Parking ID: <b>{parkingId}</b>
          </Text>
        </Box>
        <Box>
          <video
            src={succesVideo}
            autoPlay
            loop
            muted
            style={{ pointerEvents: 'none' }}
          />
        </Box>

        <a href='/'>
          <Button w={'100%'} colorScheme='purple'>
            Go to Dashboard
          </Button>
        </a>
      </VStack>
    </Flex>
  );
}

export default SuccessParkingSubmission;

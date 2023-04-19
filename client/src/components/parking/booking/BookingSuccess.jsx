import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import parkingDone from '../../../assets/parkingDone.gif';
import { useLocation, useNavigate } from 'react-router-dom';
const navigate = useNavigate;
function BookingSuccess() {
  const location = useLocation();

  const parkingInfo = location?.parkingInfo;
  console.log(parkingInfo);
  const latitude = parkingInfo?.location?.latitude;
  const longitude = parkingInfo?.location?.longitude;
  const navLink = `https://maps.google.com/?q=${latitude},${longitude}`;
  const handleClick = () => {
    setTimeout(() => {
      navigate('/dashboard');
    }, 0);
  };
  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      height='100vh'
      bg={'#BCC4CE'}
      // bgGradient='linear(to-b, #BDC3DB, #BDC3DB)'
    >
      <VStack spacing={10} mb={20}>
        <Box
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
              Booked Successfully
            </Flex>
          </Heading>
        </Box>
        <Box
          bg={'whiteAlpha.500'}
          padding={'5px 10px'}
          borderRadius={'lg'}
          border={'4px dotted #d6bcfa'}>
          <Text fontSize='xl' color={'gray.500'}>
            {/* Booking ID: <b>{bookingInfo?.bookingId}</b> */}
          </Text>
        </Box>

        <Box maxW={'300px'} borderRadius={'20px'} transition={'ease-in'}>
          <Image src={parkingDone} borderRadius={'20px'}></Image>
        </Box>
        <VStack>
          <a href='/'>
            <Button w={'100%'} colorScheme='green'>
              Go to Dashboard
            </Button>
          </a>
          <a href={navLink}>
            <Button w={'100%'} colorScheme='purple'>
              Navigate to Parking
            </Button>
          </a>
        </VStack>
      </VStack>
    </Flex>
  );
}

export default BookingSuccess;

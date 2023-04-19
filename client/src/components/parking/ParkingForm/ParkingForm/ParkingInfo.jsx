import React from 'react';
import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  HStack,
} from '@chakra-ui/react';
import Slider from 'react-slick';

import InfoCheap from '../../InfoCheap';
import { BiCctv } from 'react-icons/bi';
import { CiWarning } from 'react-icons/ci';
import { GiPoliceOfficerHead } from 'react-icons/gi';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function ParkingInfo({ parkingInfo }) {
  return (
    <>
      <Box borderRadius='lg' w={'100%'} justifyContent={'left'}>
        <Heading
          shadow={'lg'}
          borderRadius={'lg'}
          as='h2'
          size='lg'
          mb={4}
          p={2}
          textAlign={'center'}
          borderBottom={'4px solid #CBC3E3'}>
          Confirm Information
        </Heading>
        <VStack spacing={4} alignItems={'left'}>
          <Box>
            <Slider {...settings}>
              {parkingInfo.images.map((image, index) => (
                <Box key={index} mb={4} shadow={'md'}>
                  <Image src={image} borderRadius={10} />
                </Box>
              ))}
            </Slider>

            <Stack direction='column' spacing={4}>
              <Box
                mb={4}
                shadow={'lg'}
                borderRadius={'lg'}
                border={'1px solid #ADD8E6'}>
                <Text
                  color={'#3D405B'}
                  borderRadius={'lg'}
                  borderBottomLeftRadius={0}
                  borderBottomRightRadius={0}
                  fontSize='md'
                  fontWeight='bold'
                  textAlign={'center'}
                  bg={'#ADD8E6'}
                  p={2}>
                  Address
                </Text>
                <Text p={2}>{parkingInfo.location.address}</Text>
              </Box>
            </Stack>

            {parkingInfo.bike && (
              <Box
                mb={4}
                shadow={'lg'}
                borderRadius={'lg'}
                border={'1px solid #CBC3E3'}>
                <Text
                  borderRadius={'lg'}
                  borderBottomLeftRadius={0}
                  borderBottomRightRadius={0}
                  fontSize='md'
                  fontWeight='bold'
                  textAlign={'center'}
                  bg={'#CBC3E3'}
                  p={2}
                  color={'#3D405B'}>
                  BIKE
                </Text>
                <Table>
                  <Tbody>
                    <Tr>
                      <Th>Hourly</Th>
                      <Td>{parkingInfo.bikeHourly ? 'Yes' : 'No'}</Td>
                    </Tr>
                    <Tr>
                      <Th>Monthly</Th>
                      <Td>{parkingInfo.bikeMonthly ? 'Yes' : 'No'}</Td>
                    </Tr>
                    <Tr>
                      <Th>Slots</Th>
                      <Td>{parkingInfo.bikeSlot}</Td>
                    </Tr>
                    <Tr>
                      <Th>Hourly Rate</Th>
                      <Td>{parkingInfo.bikeHourlyRate}</Td>
                    </Tr>
                    <Tr>
                      <Th>Monthly Rate</Th>
                      <Td>{parkingInfo.bikeMonthlyRate}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            )}
            {parkingInfo.car && (
              <Box
                mb={4}
                shadow={'lg'}
                borderRadius={'lg'}
                border={'1px solid #a7c4e4'}>
                <Text
                  borderRadius={'lg'}
                  borderBottomLeftRadius={0}
                  borderBottomRightRadius={0}
                  fontSize='md'
                  fontWeight='bold'
                  textAlign={'center'}
                  bg={'#a7c4e4'}
                  p={2}
                  color={'#3D405B'}>
                  CAR
                </Text>
                <Table>
                  <Tbody>
                    <Tr>
                      <Th>Hourly</Th>
                      <Td>{parkingInfo.carHourly ? 'Yes' : 'No'}</Td>
                    </Tr>
                    <Tr>
                      <Th>Monthly</Th>
                      <Td>{parkingInfo.carMonthly ? 'Yes' : 'No'}</Td>
                    </Tr>
                    <Tr>
                      <Th>Slots</Th>
                      <Td>{parkingInfo.carSlot}</Td>
                    </Tr>
                    <Tr>
                      <Th>Hourly Rate</Th>
                      <Td>{parkingInfo.carHourlyRate}</Td>
                    </Tr>
                    <Tr>
                      <Th>Monthly Rate</Th>
                      <Td>{parkingInfo.carMonthlyRate}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            )}

            <Box
              mb={4}
              shadow={'lg'}
              borderRadius={'lg'}
              border={'1px solid #FEB2B2'}>
              <Text
                borderRadius={'lg'}
                borderBottomLeftRadius={0}
                borderBottomRightRadius={0}
                fontSize='md'
                fontWeight='bold'
                textAlign={'center'}
                bg={'#FEB2B2'}
                p={2}
                color={'#3D405B'}>
                PARKING TIME{' '}
              </Text>
              <Table w={'100%'}>
                <Tbody>
                  <Tr>
                    <Th>From</Th>
                    <Td>{formatTime(parkingInfo.fromTime)}</Td>
                  </Tr>
                  <Tr>
                    <Th>To</Th>
                    <Td>{formatTime(parkingInfo.toTime)}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
            <Box
              mb={4}
              shadow={'lg'}
              borderRadius={'lg'}
              border={'1px solid #CBD5E0'}>
              <Text
                borderBottomLeftRadius={0}
                borderBottomRightRadius={0}
                fontSize='md'
                fontWeight='bold'
                textAlign={'center'}
                bg={'#CBD5E0'}
                p={2}
                color={'#3D405B'}>
                RULES
              </Text>
              <VStack p={4} alignItems='left'>
                {parkingInfo.rules.map((rule, index) => (
                  <HStack key={index}>
                    {<CiWarning color='red' />}
                    <Text>{rule}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Box
              mb={4}
              shadow={'lg'}
              borderRadius={'lg'}
              border={'1px solid #add8e6'}>
              <Text
                borderRadius={'lg'}
                borderBottomLeftRadius={0}
                borderBottomRightRadius={0}
                fontSize='md'
                fontWeight='bold'
                textAlign={'center'}
                bg={'#add8e6'}
                p={2}
                color={'#3D405B'}>
                Extra Services
              </Text>
              <Table w={'100%'}>
                <Tbody>
                  <Tr>
                    <Td>
                      <Stack
                        direction='row'
                        spacing={4}
                        justifyContent={'center'}>
                        {parkingInfo.cctv && (
                          <InfoCheap
                            text='CCTV'
                            color={'blue'}
                            icon={BiCctv}
                            size={'md'}
                          />
                        )}
                        {parkingInfo.guard && (
                          <InfoCheap
                            text='GUARD'
                            color={'blue'}
                            icon={GiPoliceOfficerHead}
                            size={'md'}
                          />
                        )}
                      </Stack>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
function formatTime(time) {
  const [hour, minute] = time.split(':');
  const date = new Date(0, 0, 0, hour, minute);
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleTimeString([], options);
}

export default ParkingInfo;

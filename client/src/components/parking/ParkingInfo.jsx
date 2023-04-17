import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Box,
  Image,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DistanceCalculator from './DistanceCalculator';
import InfoCheap from './InfoCheap';
import { GrMapLocation, GrAlarm } from 'react-icons/gr';
import { FaMotorcycle, FaCar } from 'react-icons/fa';
import { ImClock } from 'react-icons/im';
import { BiCctv } from 'react-icons/bi';
import { CiWarning } from 'react-icons/ci';
import { MdBookmarkAdd } from 'react-icons/md';
import { GiPoliceOfficerHead } from 'react-icons/gi';

import PriceBox from './PricerBox';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function ParkingInfo({ msg, onClose, isOpen }) {
  const [images] = useState([
    'https://st.depositphotos.com/1008438/3923/i/600/depositphotos_39236807-stock-photo-underground-parking-aisle.jpg',
    'https://via.placeholder.com/290x150?text=Image+2',
    'https://via.placeholder.com/290x150?text=Image+3',
    'https://via.placeholder.com/320x150?text=Image+4',
    'https://via.placeholder.com/320x150?text=Image+5',
  ]);
  const selectedLon = msg?.geometry?.coordinates[0];
  const selectedLat = msg?.geometry?.coordinates[1];
  const properties = msg?.properties;
  const time = properties?.time ? properties?.time.toUpperCase() : '24H';
  const selectedBgColor = useColorModeValue('purple.100', 'gray.700');
  // const selectedColor = useColorModeValue('purple.600', 'purple.200');

  return (
    <>
      <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius={20} borderTopRightRadius={20}>
          <DrawerCloseButton
            borderRadius={50}
            bg={selectedBgColor}
            size={'lg'}
          />

          <DrawerHeader borderBottomWidth='1px'>Parking Details</DrawerHeader>
          <DrawerBody>
            {/* SLIDER */}

            <Box maxW='500px' mx='1' mt={8}>
              <Slider {...settings}>
                {images.map((image, index) => (
                  <Box key={index} mb={4}>
                    <Image src={image} borderRadius={10} />
                  </Box>
                ))}
              </Slider>
            </Box>
            <HStack justifyContent={'space-between'}>
              <VStack align={'left'} mb={3}>
                <Heading size={'md'}>Parking Space at Konabari</Heading>
                <Text>{properties?.address}</Text>
              </VStack>

              <Text pr={2} pb={5}>
                <MdBookmarkAdd size={30} color='#6B46C1' />
              </Text>
            </HStack>
            {/* DISTANCE */}
            <HStack flexWrap='wrap' mb={2}>
              <InfoCheap
                text={
                  <DistanceCalculator
                    selectedLat={selectedLat}
                    selectedLon={selectedLon}
                  />
                }
                color={'purple'}
                icon={GrMapLocation}
                size={'md'}
              />
              <InfoCheap
                text={time}
                color={'purple'}
                icon={GrAlarm}
                size={'md'}
              />
              {properties?.hourly ? (
                <InfoCheap
                  text={'Hourly'}
                  color={'purple'}
                  icon={ImClock}
                  size={'md'}
                />
              ) : null}
            </HStack>
            <HStack>
              <InfoCheap
                text={'Bike'}
                color={'green'}
                icon={FaMotorcycle}
                size={'md'}
              />
              <InfoCheap
                text={'Car'}
                color={'green'}
                icon={FaCar}
                size={'md'}
              />
              {properties?.cctv ? (
                <InfoCheap
                  text='CCTV'
                  color={'blue'}
                  icon={BiCctv}
                  size={'md'}
                />
              ) : null}
              {properties?.guard ? (
                <InfoCheap
                  text='Guard'
                  color={'blue'}
                  icon={GiPoliceOfficerHead}
                  size={'md'}
                />
              ) : null}
            </HStack>

            <VStack align={'left'} mb={3} mt={5}>
              <Heading size={'md'}>Parking Rules</Heading>
              <UnorderedList listStyleType='none'>
                {properties?.rules
                  ? properties.rules.map((rule) => (
                      <HStack key={rule}>
                        <Text display={'inline'}>
                          {<CiWarning color='red' />}
                        </Text>
                        <ListItem mb={1}>{rule}</ListItem>
                      </HStack>
                    ))
                  : null}
              </UnorderedList>
            </VStack>
            <PriceBox price='20 TK' type='hour' slot='20' />

            <Button
              colorScheme='purple'
              w={'100%'}
              borderRadius={20}
              mb={5}
              mt={2}>
              Book Parking
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ParkingInfo;

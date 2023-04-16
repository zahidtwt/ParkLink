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
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function ParkingInfo({ msg, onClose, isOpen }) {
  const [images, setImages] = useState([
    'https://via.placeholder.com/290x150?text=Image+1',
    'https://via.placeholder.com/290x150?text=Image+2',
    'https://via.placeholder.com/290x150?text=Image+3',
    'https://via.placeholder.com/320x150?text=Image+4',
    'https://via.placeholder.com/320x150?text=Image+5',
  ]);

  return (
    <>
      <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius={20} borderTopRightRadius={20}>
          <DrawerCloseButton borderRadius={50} bg={'gray.100'} size={'lg'} />

          <DrawerHeader borderBottomWidth='1px'>
            {msg?.properties?.Address}
          </DrawerHeader>
          <DrawerBody>
            <Box maxW='500px' mx='1' mt={8}>
              <Slider {...settings}>
                {images.map((image, index) => (
                  <Box key={index} mb={4}>
                    <Image src={image} borderRadius={10} m={'0!important'} />
                  </Box>
                ))}
              </Slider>
            </Box>
            <p>{JSON.stringify(msg)}</p>
            <Button colorScheme='purple' w={'100%'} borderRadius={20}>
              {' '}
              Book Parking
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ParkingInfo;

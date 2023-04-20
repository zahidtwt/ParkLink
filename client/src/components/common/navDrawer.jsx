import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import SwitchDarkMode from './switchDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
function NavDrawer({ isOpen, onClose }) {
  const { profileImage, firstName, lastName, due, balance } =
    useSelector((state) => state.auth.user) || {};
  const dispatch = useDispatch();
  const selectedBgColor = useColorModeValue('purple.100', 'gray.700');

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton borderRadius={50} bg={selectedBgColor} size={'lg'} />
        <DrawerHeader>DASHBOARD</DrawerHeader>

        <DrawerBody>
          <VStack alignItems={'center'} mb={5} justifyContent={'space-between'}>
            <HStack spacing={2} mb={5}>
              <Avatar size='md' name={firstName} src={profileImage} />
              <VStack alignItems={'left'}>
                <Text fontSize={'lg'} mr={10}>
                  {firstName} {lastName}
                </Text>{' '}
                <Link to='/profile' onClick={handleLinkClick}>
                  <Text fontSize={'sm'} fontWeight={400}>
                    Edit Profile
                  </Text>
                </Link>
              </VStack>
              <SwitchDarkMode />
            </HStack>
            <HStack>
              <Box
                px={5}
                bg='purple.500'
                color='white'
                borderRadius='md'
                textAlign='center'
                py={2}>
                Balance: {balance}
              </Box>
              <Box
                px={5}
                bg='red.400'
                color='white'
                borderRadius='md'
                textAlign='center'
                py={2}>
                Due: {due}
              </Box>
            </HStack>
          </VStack>

          {/* <form
            id='my-form'
            onSubmit={(e) => {
              e.preventDefault();
              console.log('submitted');
            }}>
            <Input name='nickname' placeholder='Type here...' />
          </form> */}
          <VStack align={'left'} mt={10}>
            <Text fontSize={'xl'} fontWeight={700}>
              User Menu
            </Text>
            <VStack
              align={'left'}
              spacing={5}
              fontSize={'md'}
              fontWeight={400}
              pl={5}>
              <Link to={'mybookings'} onClick={handleLinkClick}>
                My Bookings
              </Link>
              <Link to={'myparklistings'} onClick={handleLinkClick}>
                Manage Listing
              </Link>
              <Link to={'bookmarks'} onClick={handleLinkClick}>
                Bookmarks
              </Link>

              <Link to={'/'} onClick={handleLinkClick}>
                Payment
              </Link>
              <Link to={'/'} onClick={handleLinkClick}>
                Withdraw
              </Link>
              <Link to={'support'} onClick={handleLinkClick}>
                Support
              </Link>
            </VStack>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button
            type='submit'
            w={'100%'}
            onClick={() => {
              onClose();
              dispatch(userLoggedOut());
            }}>
            Logout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default NavDrawer;

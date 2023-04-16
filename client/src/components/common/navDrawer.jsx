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
} from '@chakra-ui/react';
import SwitchDarkMode from './switchDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import avatar from '../../assets/avatar.svg';
import { Link } from 'react-router-dom';
function NavDrawer({ isOpen, onClose }) {
  const { firstname, lastname } = useSelector((state) => state.auth.user) || {};
  const dispatch = useDispatch();

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton borderRadius={50} bg={'gray.600'} size={'lg'} />
        <DrawerHeader>DASHBOARD</DrawerHeader>

        <DrawerBody>
          <VStack alignItems={'center'} mb={5} justifyContent={'space-between'}>
            {' '}
            j
            <HStack spacing={2} mb={5}>
              <Avatar size='md' name='?' src={avatar} />
              <VStack alignItems={'left'}>
                <Text fontSize={'lg'} mr={10}>
                  {firstname} {lastname}
                </Text>{' '}
                <Text fontSize={'sm'} fontWeight={400}>
                  Edit Profile
                </Text>
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
                Balance: 10 ৳
              </Box>
              <Box
                px={5}
                bg='red.400'
                color='white'
                borderRadius='md'
                textAlign='center'
                py={2}>
                Due: 10 ৳
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
              <Link to={'/'}>Nearby</Link>
              <Link to={'/'}>Saved</Link>
              <Link to={'/'}>History</Link>
              <Link to={'/'}>Payment</Link>
              <Link to={'/'}>Withdraw</Link>
              <Link to={'/'}>Support</Link>
            </VStack>{' '}
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

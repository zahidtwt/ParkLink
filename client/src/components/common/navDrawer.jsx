import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react';
import SwitchDarkMode from './switchDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
function NavDrawer({ isOpen, onClose }) {
  const { username } = useSelector((state) => state.auth.user) || {};
  const dispatch = useDispatch();

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Dashboard</DrawerHeader>

        <DrawerBody>
          <Text size={'lg'} fontWeight={'bold'}>
            Welcome {username}!
          </Text>
          {/* <form
            id='my-form'
            onSubmit={(e) => {
              e.preventDefault();
              console.log('submitted');
            }}>
            <Input name='nickname' placeholder='Type here...' />
          </form> */}

          <SwitchDarkMode />
        </DrawerBody>

        <DrawerFooter>
          <Button
            type='submit'
            w={'100%'}
            onClick={() => {
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

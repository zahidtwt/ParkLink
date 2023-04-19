import {
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineMenuFold,
} from 'react-icons/ai';

import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavDrawer from './navDrawer';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function MobileBottomNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const boxShadowColor = useColorModeValue(
    '0 -2px 20px rgba(0, 0, 0, 0.1)',
    '0 -2px 20px rgba(155, 155, 155, 0.1)'
  );
  const activeColor = useColorModeValue('purple.400', 'purple.400');
  const selectedBgColor = useColorModeValue('purple.100', 'gray.700');
  const selectedColor = useColorModeValue('purple.600', 'purple.200');

  const location = useLocation();
  const activeRoute = location.pathname;
  const data = Cookies.get('auth');
  useEffect(() => {}, [data]);

  let content = null;
  if (data)
    content = (
      <Flex
        mx={9}
        zIndex={10}
        pos='fixed'
        bottom={10}
        left={0}
        right={0}
        align='center'
        justify='space-around'
        py={1.5}
        px={6}
        borderRadius='30px'
        bgColor={bgColor}
        boxShadow={'0px 0px 15px -8px rgba(0,0,0,0.9)'}>
        <Link to='/dashboard'>
          <motion.div whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              aria-label='Home'
              icon={<AiOutlineHome size={20} />}
              variant='ghost'
              size='lg'
              colorScheme={activeRoute === '/dashboard' ? 'gray' : 'blue'}
              color={activeRoute === '/dashboard' ? selectedColor : activeColor}
              transform={
                activeRoute === '/dashboard' ? 'scale(1.4)' : 'scale(1.0)'
              }
              bg={
                activeRoute === '/dashboard' ? selectedBgColor : 'transparent'
              }
              _active={{
                bg: selectedBgColor,
              }}
              _hover={{
                bg: selectedBgColor,
              }}
              isRound
              shadow='0px 0px 5px 2px rgba(0,0,0,0.1)'
            />
          </motion.div>
        </Link>
        <Link to='/search'>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              aria-label='Search'
              icon={<AiOutlineSearch size={20} />}
              variant='ghost'
              size='lg'
              colorScheme={activeRoute === '/search' ? 'gray' : 'blue'}
              color={activeRoute === '/search' ? selectedColor : activeColor}
              transform={
                activeRoute === '/search' ? 'scale(1.4)' : 'scale(1.0)'
              }
              bg={activeRoute === '/search' ? selectedBgColor : 'transparent'}
              _active={{
                bg: selectedBgColor,
              }}
              _hover={{
                bg: selectedBgColor,
              }}
              isRound
              shadow='0px 0px 5px 2px rgba(0,0,0,0.1)'
            />
          </motion.div>
        </Link>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton
            onClick={onOpen}
            aria-label='Profile'
            icon={<AiOutlineMenuFold size={20} />}
            variant='ghost'
            size='lg'
            colorScheme={activeRoute === '/menu' ? 'gray' : 'blue'}
            color={activeRoute === '/menu' ? selectedColor : activeColor}
            transform={activeRoute === '/menu' ? 'scale(1.4)' : 'scale(1.0)'}
            bg={activeRoute === '/menu' ? selectedBgColor : 'transparent'}
            _active={{
              bg: selectedBgColor,
            }}
            _hover={{
              bg: selectedBgColor,
            }}
            isRound
            shadow='0px 0px 5px 2px rgba(0,0,0,0.1)'
          />{' '}
        </motion.div>
        <NavDrawer isOpen={isOpen} onClose={onClose} />
      </Flex>
    );

  return content;
}

export default MobileBottomNavbar;

import {
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineHome, AiOutlineMenuFold } from 'react-icons/ai';
import { FaSearchLocation } from 'react-icons/fa';

import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavDrawer from './navDrawer';

function MobileBottomNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');

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
        maxWidth={'calc(100% - 70px)'}
        margin={'0 auto'}
        bottom={5}
        zIndex={10}
        pos="fixed"
        left={0}
        right={0}
        align="center"
        justify="space-around"
        py={3}
        px={3}
        bgColor={bgColor}
        borderRadius={'15px'}
        boxShadow={'0px 10px 15px 1px rgba(0,0,0,0.2)'}
      >
        <Link to="/main">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              aria-label="Home"
              icon={<AiOutlineHome size={20} />}
              variant="ghost"
              size="sm"
              colorScheme={activeRoute === '/main' ? 'gray' : 'blue'}
              color={activeRoute === '/main' ? selectedColor : activeColor}
              transform={activeRoute === '/main' ? 'scale(1.2)' : 'scale(1.0)'}
              bg={activeRoute === '/main' ? selectedBgColor : 'transparent'}
              _active={{
                bg: selectedBgColor,
              }}
              _hover={{
                bg: selectedBgColor,
              }}
              isRound
            />
          </motion.div>
        </Link>
        <Link to="/dashboard">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              aria-label="Search"
              icon={<FaSearchLocation size={20} />}
              variant="ghost"
              size="sm"
              colorScheme={activeRoute === '/dashboard' ? 'gray' : 'blue'}
              color={activeRoute === '/dashboard' ? selectedColor : activeColor}
              transform={
                activeRoute === '/dashboard' ? 'scale(1.2)' : 'scale(1.0)'
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
            />
          </motion.div>
        </Link>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton
            onClick={onOpen}
            aria-label="Profile"
            icon={<AiOutlineMenuFold size={20} />}
            variant="ghost"
            size="sm"
            colorScheme={activeRoute === '/menu' ? 'gray' : 'blue'}
            color={activeRoute === '/menu' ? selectedColor : activeColor}
            transform={activeRoute === '/menu' ? 'scale(1.2)' : 'scale(1.0)'}
            bg={activeRoute === '/menu' ? selectedBgColor : 'transparent'}
            _active={{
              bg: selectedBgColor,
            }}
            _hover={{
              bg: selectedBgColor,
            }}
            isRound
          />{' '}
        </motion.div>
        <NavDrawer isOpen={isOpen} onClose={onClose} />
      </Flex>
    );

  return content;
}

export default MobileBottomNavbar;

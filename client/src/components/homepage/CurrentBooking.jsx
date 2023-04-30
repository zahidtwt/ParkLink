import { Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { CiParking1 } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function CurrentBooking() {
  const activeColor = useColorModeValue('purple.400', 'purple.400');
  const data = Cookies.get('auth');
  useEffect(() => {}, [data]);

  const breathingAnimation = {
    initial: { scale: 0.8 },
    animate: { scale: 1.2 },
    transition: {
      duration: 1,
      ease: [0.5, 0.01, 0.39, 1.8],
      loop: Infinity,
      repeatDelay: 0,
    },
  };

  let content = null;
  if (data)
    content = (
      <Flex
        height={'70px'}
        width={'70px'}
        zIndex={10}
        pos="fixed"
        bottom={'100px'}
        left={290}
        right={'50px'}
        align="center"
        justify="space-around"
        borderRadius="full"
        bgColor={''}
        boxShadow={'0px 0px 15px -8px rgba(0,0,0,0.9)'}
      >
        <Link to="/main">
          <motion.div
            initial={breathingAnimation.initial}
            animate={breathingAnimation.animate}
            transition={breathingAnimation.transition}
          >
            <IconButton
              margin={'0!important'}
              padding={'0!important'}
              aria-label="Home"
              icon={<CiParking1 size={55} />}
              variant="ghost"
              size="lg"
              colorScheme={'purple'}
              color={activeColor}
              bg={'purple.100'}
              isRound
              shadow="0px 0px 5px 2px rgba(0,0,0,0.1)"
            />
          </motion.div>
        </Link>
      </Flex>
    );

  return content;
}

export default CurrentBooking;

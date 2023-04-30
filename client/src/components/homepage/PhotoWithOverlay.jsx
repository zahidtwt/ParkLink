import { Box, HStack, Heading, Text } from '@chakra-ui/react';
import Greeting from './Greeting';
import slider1 from '../../assets/mainslider1.png';
import { useGetUserQuery } from '../../features/auth/authApi';
export default function PhotoWithOverlay() {
  const styles = {
    backgroundImage: `url(${slider1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '25px',
    position: 'relative',
    height: '150px',
  };

  const overlayStyles = {
    fontSize: '1.1rem',
    color: 'white',
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '25px',
  };
  const { data: user } = useGetUserQuery();

  return (
    <Box style={styles} shadow={'xl'}>
      <Box style={overlayStyles} padding={4}>
        <HStack>
          <Greeting />
          <Text>
            {user ? (
              <>
                {user.username[0].toUpperCase() +
                  user.username.slice(1).toLowerCase()}
              </>
            ) : (
              <></>
            )}
          </Text>
        </HStack>
        <Heading size={'lg'} mt={5} fontWeight={'500'}>
          Find the best Parking & <br /> Post your Parking for free!
        </Heading>
      </Box>
    </Box>
  );
}

import { Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

function Greeting() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 7 && hour < 12) {
      setGreeting('Good morning,');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon,');
    } else {
      setGreeting('Good evening,');
    }
  }, []);

  return (
    <>
      {' '}
      <Text colorScheme='white'>{greeting}</Text>
    </>
  );
}

export default Greeting;

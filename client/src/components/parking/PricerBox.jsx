import { HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react';

function PriceBox({ price, type }) {
  const selectedBgColor = useColorModeValue('gray.100', 'gray.700');
  const selectedColor = useColorModeValue('purple.600', 'purple.200');
  return (
    <VStack>
      <HStack mb={3} spacing={5}>
        <HStack
          justifyContent={'center'}
          textAlign={'center'}
          bg={selectedBgColor}
          color={selectedColor}
          borderRadius='0'
          py={1}
          px={2}
          borderLeft={'4px solid '}>
          <Text fontSize='lg' fontWeight={600}>
            20 slots avaialable
          </Text>
        </HStack>
        <HStack
          justifyContent={'center'}
          textAlign={'center'}
          bg={selectedBgColor}
          color={selectedColor}
          borderRadius='0'
          py={1}
          px={2}
          borderLeft={'4px solid '}>
          <Text fontSize='lg' fontWeight={600}>
            $ 1.00 per hour
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
}

export default PriceBox;

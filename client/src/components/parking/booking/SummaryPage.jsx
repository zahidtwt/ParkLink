import React from 'react';
import {
  VStack,
  Text,
  Button,
  Box,
  Heading,
  Container,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
} from '@chakra-ui/react';

export const SummaryPage = ({ formData, onSubmit, onEdit, isLoading }) => {
  const convertTo12Hour = (time) => {
    let hour = parseInt(time.split(':')[0]);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:00 ${suffix}`;
  };

  return (
    <>
      {' '}
      <Container maxW={'container.xl'} mt={10}>
        <Box borderRadius='lg' w={'100%'} justifyContent={'left'}>
          <Heading
            shadow={'lg'}
            borderRadius={'lg'}
            as='h2'
            size='lg'
            mb={4}
            p={2}
            textAlign={'center'}
            borderBottom={'4px solid #CBC3E3'}>
            Confirm Booking
          </Heading>

          <Box
            mb={4}
            shadow={'lg'}
            borderRadius={'lg'}
            border={'1px solid #CBC3E3'}>
            <Text
              borderRadius={'lg'}
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
              fontSize='md'
              fontWeight='bold'
              textAlign={'center'}
              bg={'#CBC3E3'}
              p={2}
              color={'#3D405B'}>
              Booking Details
            </Text>
            <Table>
              <Tbody>
                <Tr>
                  <Th>Vehicle Type</Th>
                  <Td> {formData.vehicleType} </Td>
                </Tr>
                <Tr>
                  <Th>Date:</Th>
                  <Td> {formData.selectedDate}</Td>
                </Tr>
                {formData.endDate && (
                  <Tr>
                    <Th>End Date</Th>
                    <Td>
                      <Text>{formData.endDate}</Text>
                    </Td>
                  </Tr>
                )}
                <Tr>
                  <Th>From </Th>
                  <Td>{convertTo12Hour(formData.fromTime)}</Td>
                </Tr>
                <Tr>
                  <Th>To</Th>
                  <Td>To: {convertTo12Hour(formData.toTime)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          <Box
            mb={4}
            shadow={'lg'}
            borderRadius={'lg'}
            border={'1px solid #CBC3E3'}>
            <Text
              borderRadius={'lg'}
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
              fontSize='md'
              fontWeight='bold'
              textAlign={'center'}
              bg={'#CBC3E3'}
              p={2}
              color={'#3D405B'}>
              Payment Details
            </Text>
            <Table>
              <Tbody>
                <Tr>
                  <Th>Amount</Th>
                  <Td> ${formData.cost} </Td>
                </Tr>
                <Tr borderBottom={'2px solid #8865f25e'}>
                  <Th>Taxes & Fees (10%)</Th>
                  <Td> ${formData.cost * 0.1}</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Total</Th>
                  <Th fontSize={'xl'}>
                    ${formData.cost * 0.1 + formData.cost}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
          <VStack spacing={4}>
            <Button
              loadingText='Booking...'
              isLoading={isLoading}
              onClick={onSubmit}
              colorScheme='purple'>
              Submit Booking
            </Button>
            <Button colorScheme='gray' onClick={onEdit}>
              Edit Booking
            </Button>
          </VStack>
        </Box>
      </Container>
    </>
  );
};

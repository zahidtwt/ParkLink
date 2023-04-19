import {
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
// import { FaMotorcycle, FaCar } from 'react-icons/fa';

function PriceBox({ parkingInfo }) {
  const {
    bikeSlot,
    carSlot,
    bikeHourlyRate,
    carHourlyRate,
    bikeMonthlyRate,
    carMonthlyRate,
  } = parkingInfo ? parkingInfo : {};
  return (
    <VStack mb={2}>
      <TableContainer w={'100%'} borderRadius={'xl'}>
        <Table typeof='purple' size={''} fontWeight={400}>
          <Thead bg={'#805ad52b'}>
            <Tr>
              <Th
                textAlign='center'
                padding={'4px'}
                width='25%'
                colSpan={1}></Th>
              <Th textAlign='center' padding={'4px'} width='15%'>
                Slots
              </Th>
              <Th textAlign='center' width='60%' colSpan={2}>
                Rate <sub>(BDT)</sub>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {bikeSlot > 0 && (
              <Tr>
                <Td
                  textAlign='center'
                  width='20%'
                  bg={'#c1e0ff57'}
                  fontWeight={'bold'}>
                  <HStack justifyContent={'center'}>
                    <Text>Bike</Text>
                  </HStack>
                </Td>
                <Td textAlign='center' width='20%' bg={'#c1e0ff57'}>
                  {bikeSlot}
                </Td>

                <Td textAlign='center' width='30%' bg={'#c1e0ff57'}>
                  {bikeHourlyRate && (
                    <>
                      {bikeHourlyRate} <sub>/H</sub>
                    </>
                  )}
                </Td>

                <Td textAlign='center' width='30%' bg={'#c1e0ff57'}>
                  {bikeMonthlyRate && (
                    <>
                      {bikeMonthlyRate} <sub>/M</sub>
                    </>
                  )}
                </Td>
              </Tr>
            )}
            {carSlot > 0 && (
              <Tr>
                <Td
                  textAlign='center'
                  width='20%'
                  bg={'#f76ba21f'}
                  fontWeight={'bold'}>
                  <HStack justifyContent={'center'}>
                    <Text>Car</Text>
                  </HStack>
                </Td>
                <Td textAlign='center' width='25%' bg={'#f76ba21f'}>
                  20
                </Td>

                <Td textAlign='center' width='25%' bg={'#f76ba21f'}>
                  {carHourlyRate && (
                    <>
                      {carHourlyRate} <sub>/H</sub>
                    </>
                  )}
                </Td>
                <Td textAlign='center' width='25%' bg={'#f76ba21f'}>
                  {carMonthlyRate && (
                    <>
                      {carMonthlyRate} <sub>/M</sub>
                    </>
                  )}
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default PriceBox;

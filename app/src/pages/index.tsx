import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useSeatsQuery, useSeatConditionQuery } from '../generated/graphql';
import { Box, Accordion, AccordionItem, AccordionHeader, AccordionIcon, AccordionPanel, Stack, Text } from '@chakra-ui/core';
import { isServer } from '../utils/isServer';
import { Layout } from '../components/Layout';
import { useState } from 'react';

const Index = () => {
  const [selectedSeat, setSelectedSeat] = useState(-1);
  const [{ data, fetching }] = useSeatsQuery({ pause: isServer() });

  const selectedSeatId = data?.seats[selectedSeat] ? data?.seats[selectedSeat].id : 0;
  const [{ data: conditionData, fetching: conditionFetching }, reexecuteConditionQuery] = useSeatConditionQuery({
    variables: { seatId: selectedSeatId },
    pause: isServer() || selectedSeat < 0
  });

  const changeSelect = (index: number | number[] | undefined) => {
    if (typeof index === 'number') {
      setSelectedSeat(index);
    } else if (index && index[0]) {
      setSelectedSeat(index[0]);
    }
  }

  if (fetching) { return <Layout><div>Loading Seats...</div></Layout>; }
  if (!data) { return <Layout><div>Failed to Fetch Data</div></Layout>; }

  let conditionDescription = <></>;
  if (conditionFetching) { conditionDescription = <div>Loading condition...</div> }
  else if (conditionData?.seatCondition.error) { conditionDescription = <div>Failed to Fetch Seat Condition</div> }
  else {
    conditionDescription = (
      <Stack spacing={1}>
        <Text fontSize='sm'>Seat id: {conditionData?.seatCondition.seatCondition?.seatId}</Text>
        <Text fontSize='sm'>Status: {conditionData?.seatCondition.seatCondition?.status}</Text>
        <Text fontSize='sm'>Description: {conditionData?.seatCondition.seatCondition?.description}</Text>
      </Stack>
    )
  }

  return (
    <Layout>
      <Accordion onChange={changeSelect} index={selectedSeat}>
        {data.seats.map(seat => (
          <AccordionItem key={seat.id}>
            <AccordionHeader>
              <Box flex="1" textAlign="left">
                Seat: {seat.seatNumber}
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              {conditionDescription}
            </AccordionPanel>
          </AccordionItem>))}
      </Accordion>
    </Layout>);
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
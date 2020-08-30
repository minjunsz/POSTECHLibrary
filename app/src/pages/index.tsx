import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useSeatsQuery, RegularSeatConditionFragment } from '../generated/graphql';
import { Box, Accordion, AccordionItem, AccordionHeader, AccordionIcon, AccordionPanel, Stack, Text } from '@chakra-ui/core';
import { isServer } from '../utils/isServer';
import { Layout } from '../components/Layout';
import { useState } from 'react';

const Index = () => {
  const [{ data, fetching }] = useSeatsQuery({
    variables: {
      limit: 10,
      cursor: null,
      floor: null
    },
    pause: isServer()
  });

  if (fetching) { return <Layout><div>Loading Seats...</div></Layout>; }
  if (!data) { return <Layout><div>Failed to Fetch Data</div></Layout>; }

  const renderSeatCondition = (seatCondition: RegularSeatConditionFragment | null | undefined) => {
    if (!seatCondition) { return <div>No Seat Condition Available</div> }
    else {
      return (
        <Stack spacing={1}>
          <Text fontSize='sm'>Seat id: {seatCondition.seatId}</Text>
          <Text fontSize='sm'>Status: {seatCondition.status}</Text>
          <Text fontSize='sm'>Description: {seatCondition.description}</Text>
        </Stack>)
    }
  }

  return (
    <Layout>
      <Accordion allowMultiple={true} >
        {data.seats.map(seat => (
          <AccordionItem key={seat.id}>
            <AccordionHeader>
              <Box flex="1" textAlign="left">
                Seat: {seat.floor} floor, {seat.id}
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              {renderSeatCondition(seat.seatCondition)}
            </AccordionPanel>
          </AccordionItem>))}
      </Accordion>
    </Layout>);
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
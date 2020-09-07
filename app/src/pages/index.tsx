import { Accordion, AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel, Box, Stack, Text } from '@chakra-ui/core';
import { Layout } from '../components/Layout';
import { PlotPoints } from '../components/PlotPoints/PlotPoints';
import { RegularSeatConditionFragment, useSeatsQuery } from '../generated/graphql';

const Index = () => {
  const { data: seatsData, loading: seatsLoading } = useSeatsQuery({
    variables: {
      limit: 10,
      cursor: null,
      floor: null
    },
    ssr: false,
    fetchPolicy: "no-cache",
    pollInterval: 500
  });

  if (seatsLoading) { return <Layout><div>Loading Seats...</div></Layout>; }
  if (!seatsData) { return <Layout><div>Failed to Fetch Data</div></Layout>; }

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
      <Box mx='auto' maxW="400px"> {/* TODO: add library map as background image */}
        <PlotPoints
          coords={seatsData.seats.map((seat) => [seat.xpos, seat.ypos])}
          boxSize="75%"
          boxColor="purple.200"
          dotSize="5%"
          dotColor={seatsData.seats.map((seat) => !seat.order ? "green.300" : "red.300")}
          hoverData={seatsData.seats.map((seat) => seat.seatCondition)}
        ></PlotPoints>
      </Box>
      <Accordion allowMultiple={true} >
        {seatsData.seats.map(seat => (
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

export default Index;
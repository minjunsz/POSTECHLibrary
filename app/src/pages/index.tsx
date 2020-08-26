import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useSeatsQuery } from '../generated/graphql';
import { Box } from '@chakra-ui/core';
import { isServer } from '../utils/isServer';
import { Layout } from '../components/Layout';

const Index = () => {
  const [{ data, fetching }] = useSeatsQuery({
    pause: isServer()
  });
  if (fetching) { return <Layout><div>Loading Seats...</div></Layout>; }
  if (!data) { return <Layout><div>Failed to Fetch Data</div></Layout>; }
  return (
    <Layout>
      {data.seats.map(
        seat => <Box border="1px solid" p={1} key={seat.id}>
          {seat.seatNumber}
        </Box>
      )}
    </Layout>);
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
import { useRouter } from 'next/router';
import React from 'react';
import { useMeQuery, useSeatQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';
import { Box, Flex } from '@chakra-ui/core';
import { PlotPoints } from '../components/PlotPoints/PlotPoints';

interface MypageProps { }

const Mypage: React.FC<MypageProps> = ({ }) => {
  const router = useRouter();
  const [{ data: meData, fetching: meFetching }] = useMeQuery();
  const notLoggedIn = !meData?.me;
  const [{ data: seatData, fetching: seatFetching }] = useSeatQuery({
    pause: meFetching || notLoggedIn,
    variables: {
      seatId: meData?.me?.seatId!
    }
  })

  let content = (<div>Loading</div>)
  if (!meFetching) {
    if (notLoggedIn) { router.push('/'); }
    else if (!seatFetching) {
      if (!seatData?.seat) {
        content = (<div>server Error</div>); // TODO: add server Error component
      } else {
        content = (
          <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" mx="auto">
            {/* <Image src={property.imageUrl} alt={property.imageAlt} /> TODO: seat image*/}
            <Box p="6">
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                Current Seat: {seatData.seat.id}
              </Box>
              <Flex direction="column" >
                <Box color="gray.600" fontSize="sm" w="100%">
                  {seatData.seat.floor} 층
                </Box>
                <Box color="gray.600" fontSize="sm" w="100%">
                  콘센트 {seatData.seat.hasOutlet ? "있음" : "없음"}
                </Box>
                <Box color="gray.600" fontSize="sm" w="100%" >
                  위치:
                  <Box mx='auto'> {/* TODO: add library map as background image */}
                    <PlotPoints
                      coords={[[seatData.seat.xpos, seatData.seat.ypos]]}
                      boxSize="75%"
                      boxColor="purple.200"
                      dotSize="10%"
                      dotColor={["green.300"]}
                    ></PlotPoints>
                  </Box>
                  ({seatData.seat.xpos}, {seatData.seat.ypos})
                </Box>
                <Box color="gray.600" fontSize="sm" w="100%">
                  자리 상태: {seatData.seat.seatCondition?.status}
                </Box>
                <Box color="gray.600" fontSize="sm" w="100%">
                  기타: {seatData.seat.seatCondition?.description}
                </Box>
              </Flex>
            </Box>
          </Box>
        );
      }
    }
  }
  return <Layout>{content}</Layout>
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Mypage);

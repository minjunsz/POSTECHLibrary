import { Box, Button, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '../../components/Layout';
import { PlotPoints } from '../../components/PlotPoints/PlotPoints';
import { useDeleteOrderMutation, useMeQuery, useSeatQuery } from '../../generated/graphql';
import NextLink from "next/link";

interface MypageProps { }

const Mypage: React.FC<MypageProps> = ({ }) => {
  const router = useRouter();
  const { data: meData, loading: meLoading } = useMeQuery();
  const notLoggedIn = !meData?.me;
  const { data: seatData, loading: seatLoading } = useSeatQuery({
    skip: meLoading || notLoggedIn,
    variables: {
      seatId: meData?.me?.seatId!
    }
  })
  const [delOrder] = useDeleteOrderMutation({
    update: (cache, { data }) => {
      if (data?.deleteOrder.order) {
        cache.evict({ id: cache.identify(data.deleteOrder.order) });
      }
    }
  })

  let content = (<div>Loading</div>)
  if (!meLoading) {
    if (notLoggedIn) { router.push('/'); }
    else if (!seatLoading) {
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
                </Box>
                <Box color="gray.600" fontSize="sm" w="100%">
                  자리 상태: {seatData.seat.seatCondition?.status}
                </Box>
                <Box color="gray.600" fontSize="sm" w="100%">
                  기타: {seatData.seat.seatCondition?.description}
                </Box>
                <Box ml="auto">
                  <NextLink href="/mypage/edit">
                    <Button mx={2}>수정</Button>
                  </NextLink>
                  <Button mx={2} onClick={async () => {
                    const delResult = await delOrder({ variables: { seatId: seatData.seat.id } });
                    console.log(delResult);
                    if (!delResult.data?.deleteOrder.order) {
                      console.log("failed to delete order");
                    }
                  }} >삭제</Button>
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

export default Mypage;

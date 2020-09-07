import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from "next/link";
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false
  });
  const [logout, { loading: logoutLoading }] = useLogoutMutation({
    update: (cache, { data }) => {
      if (data?.logout) {
        cache.evict({ id: cache.identify(meData?.me!) });
      }
    }
  })

  let menus = null;

  if (meLoading) {
    menus = <div>loading...</div>;
  } else if (!meData?.me) {
    menus = (
      <>
        <NextLink href="/login">
          <Link m={1}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link m={1}>register</Link>
        </NextLink>
      </>
    );
  } else {
    menus = (
      <Flex>
        <Box mx={2}>seat {meData.me.seatId} is selected</Box>
        <NextLink href="/mypage">
          <Link m={1}>MyPage</Link>
        </NextLink>
        <Button variant="link"
          onClick={() => { logout(); }}
          isLoading={logoutLoading}
        >logout</Button>
      </Flex >
    )
  }

  return (
    <Flex bg="lightSteelBlue" p={4} >
      <Box mr="auto">
        <NextLink href="/">
          <Link m={1}>home</Link>
        </NextLink>
      </Box>
      <Box ml="auto">
        {menus}
      </Box>
    </Flex>
  );
}
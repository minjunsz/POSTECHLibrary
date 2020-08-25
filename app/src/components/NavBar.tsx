import React from 'react'
import { Box, Link, Flex, Button } from '@chakra-ui/core';
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer()
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()

  let menus = null;

  if (fetching) {
    menus = "loading..."
  } else if (!data?.me) {
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
        <Box mx={2}>seat {data.me.seatId} is selected</Box>
        <Button variant="link"
          onClick={() => { logout(); }}
          isLoading={logoutFetching}
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
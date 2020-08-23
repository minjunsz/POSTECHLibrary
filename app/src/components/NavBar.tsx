import React from 'react'
import { Box, Link, Flex, Button } from '@chakra-ui/core';
import NextLink from "next/link";
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ data, fetching }] = useMeQuery();

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
        <Button variant="link">logout</Button>
      </Flex>
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
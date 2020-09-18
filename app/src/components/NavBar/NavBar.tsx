import React from 'react';
import { NavBarWrapper, NavBarLink } from './NavBarComponents';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import { Spinner, Text } from '@chakra-ui/core';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const { data: meData, loading: meLoading } = useMeQuery({ ssr: false });
  const [logout] = useLogoutMutation({
    update: (cache, { data }) => {
      if (data?.logout) {
        cache.evict({ id: cache.identify(meData?.me!) });
      }
    }
  });

  let menus: JSX.Element = <></>;
  if (!meLoading) {
    if (!meData?.me) {
      menus = (<>
        <NavBarLink href="/login" name="Login" keyStr="login"></NavBarLink>
        <NavBarLink href="/register" name="Register" keyStr="register"></NavBarLink>
      </>);
    } else {
      menus = (<>
        <NavBarLink href="/mypage" name="My Page" keyStr="mypage"></NavBarLink>
        <NavBarLink href="#" name="Logout" keyStr="logout"
          onClick={() => { logout(); }}></NavBarLink>
      </>);
    }
  }

  return (
    <NavBarWrapper title="POSTECH Library" titleHref='/'>
      {meLoading
        ? <Spinner m="1rem"></Spinner>
        : (<>
          {meData?.me ? <Text p="1rem">Seat {meData?.me?.seatId} is selected</Text> : null}
          <NavBarLink href="/" name="Home" keyStr="home"></NavBarLink>
          {menus}
        </>)}
    </NavBarWrapper>
  );
}



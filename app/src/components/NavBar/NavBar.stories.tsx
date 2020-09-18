import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { NavBarWrapper, NavBarLink } from './NavBarComponents'

export default {
  title: 'Navigation Bar',
  component: NavBarWrapper,
} as Meta;

export const sampleNavbar = () => {
  return (
    <NavBarWrapper title="LOGO" titleHref="#" >
      <NavBarLink href="#" keyStr="home" name="HOME" />
      <NavBarLink href="#" keyStr="about" name="ABOUT" />
      <NavBarLink href="#" keyStr="contact" name="CONTACT" />
    </NavBarWrapper>);
}
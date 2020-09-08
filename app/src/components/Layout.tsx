import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from './NavBar/NavBar';

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar></NavBar>
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

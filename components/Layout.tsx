import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { LoginModalProvider } from "../contexts/LoginModalContext";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LoginModalProvider>
      <Flex flexDirection="column" flex={1} minHeight="100vh" width="full">
        <Header />
        <main className="layout__content bg-gray-900 h-full flex-1">
          {children}
        </main>
      </Flex>
    </LoginModalProvider>
  );
};

export default Layout;

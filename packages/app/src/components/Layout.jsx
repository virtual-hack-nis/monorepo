import React from 'react';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import Menu from './Menu';
import TopBar from './Topbar';

function Layout({ children }) {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        width="375px" 
        height="812px" 
        backgroundColor="gray.50" 
        boxShadow="xl" 
        borderRadius="lg" 
        overflow="auto" 
      >
        {children}
        <Spacer />
        <Menu />
      </Flex>
    </Flex>
  );
}

export default Layout;
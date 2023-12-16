import React from 'react';
import { Box, HStack, VStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import StarsIcon from '@mui/icons-material/Stars';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Menu() {
  return (
    <Box backgroundColor="#EFEFF7" width="100%" padding="4">
      <HStack spacing={4} justifyContent="space-around">
        <LinkBox display="flex" flexDirection="column" alignItems="center">
          <StarsIcon color="action" fontSize="large" />
          <LinkOverlay as={RouterLink} to="/rewards">
            <Text fontWeight="bold">Nagrade</Text>
          </LinkOverlay>
        </LinkBox>
        <LinkBox display="flex" flexDirection="column" alignItems="center">
          <CompareArrowsIcon color="action" fontSize="large" />
          <LinkOverlay as={RouterLink} to="/transfer">
            <Text fontWeight="bold">Transfer</Text>
          </LinkOverlay>
        </LinkBox>
        <LinkBox display="flex" flexDirection="column" alignItems="center">
          <ShoppingBagIcon color="action" fontSize="large" />
          <LinkOverlay as={RouterLink} to="/inventory">
            <Text fontWeight="bold">Inventar</Text>
          </LinkOverlay>
        </LinkBox>
      </HStack>
    </Box>
  );
}

export default Menu;
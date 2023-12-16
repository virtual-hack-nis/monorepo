import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function TopBar({ taxiCardNumber, referralCode }) {
  return (
    <Box position="sticky" top="0" width="100%" zIndex="sticky">
      <Box bg="#2F3432" p="10px">
        <Text color="white">Broj taksi kartice: <Text as="span" fontWeight="bold">{taxiCardNumber}</Text></Text>
      </Box>
      <Box bg="#F6B714" p="10px">
        <Text color="white">Vaš promo kod: <Text as="span" fontWeight="bold">{referralCode}</Text></Text>
      </Box>
    </Box>
  );
}
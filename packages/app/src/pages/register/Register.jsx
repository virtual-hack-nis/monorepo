import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Flex } from "@chakra-ui/react";
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [taxiCardNumber, setTaxiCardNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const { data, error } = await supabase
        .from('taxi_users')
        .insert({
          taxi_card_number: taxiCardNumber,
          phone_number: phoneNumber,
          promo_code: promoCode
        });
  
      if (error) {
        console.error('Error inserting data:', error);
        return;
      }
  
      console.log('Inserted data:', data);
      navigate('/');
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Box bg="white" p={5} borderRadius="md" boxShadow="md">
        <VStack as="form" onSubmit={handleSubmit} spacing={4}>
          <Heading as="h1" size="xl">Registracija</Heading>
          <FormControl isRequired>
            <FormLabel>Broj taksi kartice</FormLabel>
            <Input type="text" value={taxiCardNumber} onChange={(e) => setTaxiCardNumber(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Broj Telefona</FormLabel>
            <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Promo kod</FormLabel>
            <Input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue">Registruj se</Button>
        </VStack>
      </Box>
    </Flex>
  );
}
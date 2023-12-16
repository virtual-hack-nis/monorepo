import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, Input, VStack, Heading, FormHelperText, Flex } from "@chakra-ui/react";
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

export default function Login() {
  const [taxiCardNumber, setTaxiCardNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const storedTaxiCardNumber = localStorage.getItem('taxiCardNumber');

    if (storedTaxiCardNumber) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const taxiCardNumberPattern = /^\d{8}$/;
    const phoneNumberPattern = /^\+381\d{8,9}$/;

    const taxiCardNumberWithoutSpaces = taxiCardNumber.replace(/\s/g, '');
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s/g, '');

    if (!taxiCardNumberPattern.test(taxiCardNumberWithoutSpaces)) {
      toast({
        title: "Login Error",
        description: "Invalid taxi card number format",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setIsLoading(false);
      return;
    }

    if (!phoneNumberPattern.test(phoneNumberWithoutSpaces)) {
      toast({
        title: "Login Error",
        description: "Invalid phone number format",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('taxi_users')
        .select('*')
        .eq('taxi_card_number', taxiCardNumber)
        .eq('phone_number', phoneNumber);

      if (error || data.length === 0) {
        toast({
          title: "Login Error",
          description: "Invalid login credentials",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setIsLoading(false);
        return;
      } 

      localStorage.setItem('taxiCardNumber', taxiCardNumber);

      navigate('/home');
      toast({
        title: "Successful Login",
        description: "You have successfully logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      setIsLoading(false);
    }
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center" backgroundColor={'#2F3432'}>
      <Box bg="white" p={50} borderRadius="md" boxShadow="md" backgroundColor={'#F8F8FF'}>
        <VStack as="form" onSubmit={handleSubmit} spacing={6}>
          <Heading as="h1" size="xl" fontWeight={'bold'} letterSpacing={-1}>PRIJAVA</Heading>
          <FormControl isRequired>
            <Input
              type="text"
              value={taxiCardNumber}
              onChange={(e) => setTaxiCardNumber(e.target.value)}
              placeholder="1234 5678"
              backgroundColor={'#D9D9D9'}
            />
            <FormHelperText>*Broj taxi kartice</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+381 61 2345 678"
              backgroundColor={'#D9D9D9'}
            />
            <FormHelperText>*Broj telefona</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            colorScheme="yellow"
            bg="#F6B714"
            color="black"
            isLoading={isLoading}
            isDisabled={isLoading}
            p={5}
            w={'60%'}
            marginTop={5}
          >
            Login
          </Button>
          <Button>
            <a href="/register">Registracija</a>
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
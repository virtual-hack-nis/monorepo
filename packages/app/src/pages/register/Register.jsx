import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, FormHelperText, Flex } from "@chakra-ui/react";
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

export default function Register() {
  const [taxiCardNumber, setTaxiCardNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  /** Other hooks */
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
        title: "Greška pri unosu",
        description: "Pogrešan format broja taksi kartice",
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
        title: "Greška pri unosu",
        description: "Pogrešan format broja telefona",
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
        .insert({
          taxi_card_number: taxiCardNumber,
          phone_number: phoneNumber,
          promo_code: promoCode
        });

      if (error) {
        console.error('Error inserting data:', error);
        toast({
          title: "Greška pri unosu",
          description: "Došlo je do greške prilikom unosa podataka",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setIsLoading(false);
        return;
      } 

      localStorage.setItem('taxiCardNumber', taxiCardNumber);
      localStorage.setItem('promoCode', promoCode);

      navigate('/home');
      toast({
        title: "Uspešna registracija",
        description: "Uspešno ste se registrovali",
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
          <Heading as="h1" size="xl" fontWeight={'bold'} letterSpacing={-1}>REGISTRACIJA</Heading>
          <FormControl isRequired>
            {/* <FormLabel>Broj taksi kartice</FormLabel> */}
            <Input
              type="text"
              value={taxiCardNumber}
              onChange={(e) => setTaxiCardNumber(e.target.value)}
              placeholder="1234 5678"
              backgroundColor={'#D9D9D9'}
            />
            <FormHelperText>*Broj taksi kartice</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            {/* <FormLabel>Broj Telefona</FormLabel> */}
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+381 61 2345 678"
              backgroundColor={'#D9D9D9'}
            />
            <FormHelperText>*Broj telefona</FormHelperText>
          </FormControl>
          <FormControl>
            {/* <FormLabel>Promo kod</FormLabel> */}
            <Input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Unesite promo kod"
              backgroundColor='rgba(246, 183, 20, 0.5)'
            />
            <FormHelperText>Promotivni kod</FormHelperText>
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
            Potvrdi
          </Button>
          <Button>
            <a href="/login">Prijava</a>
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
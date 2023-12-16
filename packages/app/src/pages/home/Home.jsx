import React, { useState, useEffect } from 'react';
import { Box, Button, Center, Heading, VStack, Flex } from '@chakra-ui/react';
import {supabase} from '../../lib/supabase'
import QRCode from 'qrcode.react';
import TopBar from '../../components/Topbar';

function Home() {
  const [userData, setUserData] = useState({});
  const taxiCardNumber = localStorage.getItem('taxiCardNumber');

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { data, error } = await supabase
          .from('taxi_users')
          .select('*')
          .eq('taxi_card_number', taxiCardNumber)
          .single();

        if (error) {
          console.error('Error fetching points:', error);
          return;
        }

        setUserData(data);
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchPoints();
  }, [taxiCardNumber]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Flex alignItems={'center'} flexDirection={'column'}>
        <TopBar taxiCardNumber={userData.taxi_card_number} referralCode={userData.referral_code} />
        <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
        <QRCode value={userData.taxi_card_number} size={256} />
        <Heading>Moji Poeni: {userData.points}</Heading>
        <Button colorScheme="blue" onClick={() => alert('Share functionality not implemented yet.')}>Podeli</Button>
      </Flex>
    </>
  );
}

export default Home;
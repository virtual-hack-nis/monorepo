import React, { useState, useEffect } from 'react';
import {supabase} from '../../lib/supabase'

function Home() {
  const [points, setPoints] = useState(0);
  const taxiCardNumber = localStorage.getItem('taxiCardNumber');

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { data, error } = await supabase
          .from('taxi_users')
          .select('points')
          .eq('taxi_card_number', taxiCardNumber)
          .single();

        if (error) {
          console.error('Error fetching points:', error);
          return;
        }

        setPoints(data.points);
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchPoints();
  }, [taxiCardNumber]);

  const handleLogout = () => {
    localStorage.clear();
    // Redirect to login page or refresh the page to reflect the changes
    window.location.reload();
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Your taxi card number is: {taxiCardNumber}</p>
      <p>Your points are: {points}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
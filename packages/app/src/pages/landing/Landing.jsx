import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.scss';

function Landing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
      <div className="home" onClick={handleClick}>
        <h1>Pun Rezervoar <br/> Puno Srce</h1>
        <div className="logos">
          <img src="logo1.png" alt="Logo 1" />
          <img src="logo2.png" alt="Logo 2" />
        </div>
      </div>
  );
}

export default Landing;
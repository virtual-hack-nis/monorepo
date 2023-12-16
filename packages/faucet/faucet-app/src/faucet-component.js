// Import React
import React, { useState } from 'react';
import './faucet-component.css'; // Import the CSS file for styling

// Functional component
const Faucet = () => {
  // State variables to hold the values of the input fields
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  // Event handler for input1
  const handleInput1Change = (event) => {
    setInput1(event.target.value);
  };

  // Event handler for input2
  const handleInput2Change = (event) => {
    setInput2(event.target.value);
  };

  // Event handler for the button click
  const handleButtonClick = () => {
    // You can perform some action with the input values here
    console.log('Input 1:', input1);
    console.log('Input 2:', input2);
    // Add your logic or API calls here
  };

  return (
    <div className="centered-form">
      {/* Input Group 1 */}
      <div className="input-group">
        <label>
          Br. Taxi kartice:
          <br/>
          <input type="text" value={input1} onChange={handleInput1Change} className="input-field" />
        </label>
      </div>

      {/* Input Group 2 */}
      <div className="input-group">
        <label>
          Poeni:
          <br/>
          <input type="text" value={input2} onChange={handleInput2Change} className="input-field" />
        </label>
      </div>

      {/* Button */}
      <button onClick={handleButtonClick} className="submit-button">
        UPDATE
      </button>
    </div>
  );
};

// Export the component
export default Faucet;

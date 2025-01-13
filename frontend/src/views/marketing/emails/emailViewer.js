import React, { useState } from 'react';
import axios from 'axios';

const EmailScheduler = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const endpoint = 'http://localhost:5000/chat'; // Update with your actual backend URL

  const generateSchedule = async () => {
    setResponse(''); // Clear previous response
    try {
      const response = await axios.post(
        endpoint,
        { prompt },
        { withCredentials: true } // Ensure credentials are sent if using CORS
      );
      setResponse(response.data);
    } catch (error) {
      console.error('Error generating schedule:', error);
      setResponse('Error generating schedule. Please try again.');
    }
  };

  return (
    <div>
      <h2>Email Schedule Generator</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for AI"
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={generateSchedule}>Generate Schedule</button>
      {response && (
        <div>
          <h3>Generated Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default EmailScheduler;

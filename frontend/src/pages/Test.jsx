import React, { useEffect, useState } from 'react';
import FSMV from '../components/GraphComponent/FSMV';

const Test = () => {
  const [dotScript, setDotScript] = useState('');

  useEffect(() => {
    const fetchDotScript = async () => {
      try {
        const response = await fetch('/api/parse/visualizeFSM', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, // Correct header
          body: JSON.stringify({ regEx: '(abba)*' }), // Properly stringified JSON
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Response:', response);
        console.log('Data:', data);

        setDotScript(data.dotScript); // Update the state with the dotScript
      } catch (error) {
        console.error('Error fetching DOT script:', error);
      }
    };

    fetchDotScript();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h1>Finite Automata Visualizer</h1>
      {dotScript ? (
        <FSMV dotScript={dotScript} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Test;

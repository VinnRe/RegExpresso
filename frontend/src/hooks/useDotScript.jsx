import { useState } from 'react';
import { endpoints } from '../config/config';

const useDotScript = () => {
  const [dotScript, setDotScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDotScript = async (regEx) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch(endpoints.visualize, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regEx }), // Send the regular expression
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDotScript(data.dotScript); // Update the state with the fetched DOT script
    } catch (error) {
      setError(error.message);
      console.error('Error fetching DOT script:', error);
    } finally {
      setLoading(false);
    }
  };

  return { dotScript, fetchDotScript, loading, error };
};

export default useDotScript;

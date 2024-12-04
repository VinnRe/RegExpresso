import { useState } from 'react';
import { endpoints } from '../config/config';

const useDotScript = () => {
  const [dotScript, setDotScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDotScript = async (regEx, type) => {
    setLoading(true);
    setError(null);
    try {
        if (type == 'NFA') {
            const response = await fetch(endpoints.visualizeNFA, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ regEx }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

            const data = await response.json();
            setDotScript(data.dotScript); 
        } else if ( type == 'DFA') {
            const response = await fetch(endpoints.visualizeDFA, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ regEx }),
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

            const data = await response.json();
            setDotScript(data.dotScript); 
        } else {
            setError("Error visualizing the regular expression");
            console.error('Error fetching DOT script:', error);
        }
        } catch (error) {
            setError("Error visualizing the regular expression");
            console.error('Error fetching DOT script:', error);
        } finally {
            setLoading(false);
        }
    };

    return { dotScript, fetchDotScript, loading, error };
};

export default useDotScript;

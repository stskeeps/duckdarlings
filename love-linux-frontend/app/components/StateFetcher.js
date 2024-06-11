// app/components/StateFetcher.js
'use client';

import { useState } from 'react';

const StateFetcher = () => {
  const [cid, setCid] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const fetchState = async () => {
    try {
      const res = await fetch(`/api/getState?cid=${cid}`);
      const data = await res.json();

      if (res.ok) {
        setContent(data.content);
        setError('');
      } else {
        setError(data.error);
        setContent('');
      }
    } catch (error) {
      setError(error.message);
      setContent('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        placeholder="Enter CID"
      />
      <button onClick={fetchState}>Fetch State</button>
      {content && <pre>{content}</pre>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StateFetcher;

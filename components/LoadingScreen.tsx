'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 800);

    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="loading-screen">
      <div className="loading-box">
        <div className="loading-spinner" />
        <p className="loading-text">Loading portfolio…</p>
      </div>
    </div>
  );
}

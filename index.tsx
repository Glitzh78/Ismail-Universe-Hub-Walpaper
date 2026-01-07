
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Aplikasi Bulan Dan Langit Dimulai...");
  } catch (error) {
    console.error("Mounting error:", error);
    container.innerHTML = `<div style="color: white; padding: 20px; text-align: center;">Error: ${error}</div>`;
  }
}

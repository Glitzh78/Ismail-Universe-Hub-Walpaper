
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app mounted successfully");
  } catch (error) {
    console.error("Mounting error:", error);
    container.innerHTML = `<div style="color: white; padding: 20px; text-align: center;">Gagal memuat aplikasi. Silakan muat ulang.</div>`;
  }
}

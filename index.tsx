
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
    console.log("Bulan Dan Langit Studio: Sistem Berhasil Dimuat.");
  } catch (error: any) {
    console.error("Critical Mount Error:", error);
    container.innerHTML = `
      <div style="color: #ef4444; background: #020617; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; padding: 20px; text-align: center;">
        <h1 style="font-weight: 900; margin-bottom: 10px;">GAGAL MEMUAT DIMENSI</h1>
        <p style="color: #64748b; font-size: 14px; max-width: 400px; margin-bottom: 20px;">Terjadi kegagalan modul pada browser. Silakan coba muat ulang halaman atau periksa koneksi internet Anda.</p>
        <code style="background: #1e293b; padding: 10px; border-radius: 8px; font-size: 11px; color: #94a3b8;">${error?.message || error}</code>
      </div>
    `;
  }
}

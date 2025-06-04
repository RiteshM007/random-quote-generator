import React from 'react';
import ReactDOM from 'react-dom/client';
import QuoteVisualizer from './QuoteVisualizer';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QuoteVisualizer />
  </React.StrictMode>
); 
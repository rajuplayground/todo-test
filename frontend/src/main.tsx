import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './global.css';
import GlobalStyles from './components/GlobalStyles';
import { worker } from './mocks/worker';

if (process.env.NODE_ENV === 'testing-mock') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <GlobalStyles />
  </React.StrictMode>,
);

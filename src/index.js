import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './Context/Context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);

// const handleDownloadImage = async () => {
//   const element = document.getElementById('print')
//   const canvas = await html2canvas(element)
//   const data = canvas.toDataURL('image/jpg')

//   console.log(data);
// };
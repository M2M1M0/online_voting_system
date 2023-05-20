import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </QueryClientProvider>
);


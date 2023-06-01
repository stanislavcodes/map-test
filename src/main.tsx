import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const breakpoints = {
  sm: '370px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
  '3xl': '1900px',
  '4xl': '2530px',
};

const theme = extendTheme({ breakpoints });
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

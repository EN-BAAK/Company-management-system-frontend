import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from 'react-query'
import AppProvider from './context/AppProvider.tsx'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.scss"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from 'react-query'
import AppProvider from './context/AppProvider.tsx'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import heLang from "./assets/languages/he.json"
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


i18next.init({
  interpolation: { escapeValue: false },
  lng: "he",
  resources: {
    he: {
      global: heLang
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <AppProvider>
          <App />
        </AppProvider>
      </I18nextProvider>
    </QueryClientProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { LocationProvider } from '../entities/location/model/store'
import { BookmarkProvider } from '../entities/bookmark/model/store'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LocationProvider>
          <BookmarkProvider>
            <App />
            <Toaster position="top-center" />
          </BookmarkProvider>
        </LocationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {InvoiceContextProvider} from './store/InvoiceContext'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvoiceContextProvider>
      <App />
    </InvoiceContextProvider>
    <Toaster/>
  </StrictMode>,
)

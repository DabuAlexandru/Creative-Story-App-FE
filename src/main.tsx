import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserContextProvider from './utils/providers/UserContextProvider.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import PictureContextProvider from './utils/providers/ProfilePicturesProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <UserContextProvider>
      <PictureContextProvider>
        <App />
      </PictureContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)

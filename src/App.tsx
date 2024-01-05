import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NavbarComponent from './components/custom/NavbarComponent';
import './App.css';
import RoutesProvider from './routing/RoutesProvider';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <NavbarComponent />
          <RoutesProvider />
        </div>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;

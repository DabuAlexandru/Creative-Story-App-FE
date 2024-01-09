import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css';
import RoutesProvider from './routing/RoutesProvider';

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesProvider />
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;

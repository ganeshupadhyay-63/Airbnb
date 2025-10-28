import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';
import AuthContextProvider from './Context/AuthContext.jsx';
  
import UserContextProvider from './Context/UserContext.jsx';
import ListingContext from './Context/ListingContext.jsx';
import BookingContext from "./Context/BookingContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ListingContext>
       <UserContextProvider>
        <BookingContext>
  <App />
  </BookingContext>
</UserContextProvider>
</ListingContext>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);

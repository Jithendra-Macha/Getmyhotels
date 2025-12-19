import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';

import SearchResults from './pages/SearchResults';

import HotelDetails from './pages/HotelDetails';

import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import DestinationPage from './pages/DestinationPage';
import ScrollToTop from './components/ScrollToTop';

import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

const libraries = ['places'];

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCyClX-enj-iqwrsMpHMravX2q0-OkvOL4",
    libraries
  });

  if (!isLoaded) return <div className="flex items-center justify-center min-h-screen">Loading Maps...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/destination/:slug" element={<DestinationPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidenavbar from '../components/sidenavbar';
import Herosection from '../components/herosection';
import Services from '../components/services';
import Aboutus from '../components/aboutus';
import Workshop from '../components/workshop';
import AppointmentBar from '../components/AppointmentBar';
import Testimonials from '../components/Testimonials';
import WorkshopFeatures from '../components/Workshopdet/WorkshopFeatures';
import LogoSlider from '../components/Workshopdet/LogoSlider';

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    // Add any other auth-related items that need to be cleared
    
    setIsLoggedIn(false);
    
    // Redirect to login page
    navigate('/login');
    
    // You can also add a toast notification here
    alert('You have been logged out successfully');
  };

  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <Sidenavbar />
        <div className="content-wrapper">
          {isLoggedIn && (
            <div className="logout-button-container">
              <button 
                className="logout-button" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          <Herosection />
          <Services />
          <Aboutus />
          <Workshop />
          <AppointmentBar />
          <Testimonials />
          <WorkshopFeatures />
          <LogoSlider />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
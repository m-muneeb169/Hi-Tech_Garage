// ✅ SAME IMPORTS as before
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidenavbar from '../components/sidenavbar';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { FiSettings } from 'react-icons/fi';

function Booking() {
  const [showModal, setShowModal] = useState(true);
  const routerLocation = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      navigate('/login/loginUser', {
        state: { redirectTo: '/booking' },
        replace: true,
      });
    }
  }, [routerLocation, isLoggedIn, navigate]);

  const handleButtonClick = async (type) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error('User not found!');
        return;
      }

      const typeOrder = type === 'Maintenance At Home' ? 'on-site' : 'workshopRepair';
      const userRef = doc(db, 'users', user.uid);

      await updateDoc(userRef, {
        orders: arrayUnion({ typeOrder }),
      });

      navigate(typeOrder === 'on-site' ? '/onsite' : '/workshopRepair');
    } catch (error) {
      console.error('Error updating Firestore orders:', error);
    }
  };

  const handleEmergencyClick = () => {
    navigate('/emergency');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={`relative ${showModal ? 'overflow-hidden' : ''}`}>
      <Sidenavbar />
      <Link to="/"><Header /></Link>

      <div className={`page-header relative flex items-center justify-center overflow-hidden ${showModal ? 'filter blur-sm pointer-events-none' : ''}`}>
        <img className="absolute inset-0 w-full h-full object-cover" src="./assets/images/careers.jpg" alt="Booking Background" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-white text-4xl font-bold">Bookings</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#1E2533] rounded-2xl shadow-2xl border-2 border-blue-800/30 max-w-2xl w-full p-10">
            <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
              Choose Your Service
            </h2>

            <div className="flex justify-center space-x-6">
              <button onClick={() => handleButtonClick('Maintenance At Home')} className="w-1/2 py-4 bg-gradient-to-br from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold">On-Site</span>
                <span className="text-sm text-blue-200">Maintenance</span>
              </button>
              <button onClick={() => handleButtonClick('Repair In Workshop')} className="w-1/2 py-4 bg-gradient-to-br from-gray-600 to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold">Workshop</span>
                <span className="text-sm text-gray-400">Repair</span>
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <button onClick={handleEmergencyClick} className="w-1/2 py-4 bg-gradient-to-br from-red-600 to-red-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold">Emergency</span>
                <span className="text-sm text-red-200">Immediate Help</span>
              </button>
            </div>

            {/* Settings Button Only */}
            <div className="fixed bottom-4 right-4">
              <button onClick={handleSettings} className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105" title="Settings">
                <FiSettings size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Booking;

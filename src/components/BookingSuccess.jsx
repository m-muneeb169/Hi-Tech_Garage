import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, HomeIcon, ClipboardListIcon } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidenavbar from '../components/sidenavbar';

function BookingSuccess() {
  return (
    <div>
      <Sidenavbar />
      <Link to="/">
        <Header />
      </Link>

      <div className="bg-[#0F172A] text-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-[#1E293B] rounded-xl p-8 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
              <CheckCircleIcon className="w-12 h-12 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Booking Successful!</h1>
            
            <p className="text-gray-300 mb-8">
              Your vehicle maintenance has been scheduled successfully. 
              We have sent the booking details to the workshop, and they will contact you shortly to confirm.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#172033] p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <p className="text-gray-400 text-sm">
                  The workshop will review your booking and confirm your appointment.
                  Please ensure your vehicle is available at the scheduled time.
                </p>
              </div>
              
              <div className="bg-[#172033] p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-400 text-sm">
                  If you have any questions about your booking, please contact our support team or the workshop directly.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
              <Link 
                to="/" 
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              
              <Link 
                to="/bookings" 
                className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <ClipboardListIcon className="w-5 h-5 mr-2" />
                View My Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default BookingSuccess;
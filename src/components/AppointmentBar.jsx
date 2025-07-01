import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentBar = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/booking');
  };

  return (
    <div>
      <div className=" bg-gradient-to-r from-blue-700 to-black text-white container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Schedule Your Appointment Today
            </h1>
            <p className="text-lg mb-8">
              Your Automotive Repair & Maintenance Service Specialist
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleBookAppointment}
                className="bg-yellow-500 text-black px-8 py-3 rounded-full hover:bg-yellow-600 transition-colors"
              >
                Book an Appointment
              </button>
            </div>
          </div>
          <div>
            <img
              src="./assets/images/products/car1.png"
              alt="Car"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="bg-black text-white container mx-auto py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <span>Hi-Tech Garrage, Faisalabad.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>
            <span>+92-302-7169070; +92-313-2900169</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <span>24 Hours Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBar;
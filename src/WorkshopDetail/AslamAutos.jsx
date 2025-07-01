/* import React from "react";
import { Link} from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidenavbar from "../components/sidenavbar";

function Software() {
  return (
    <div>
       
      <Sidenavbar />
      <Link to="/"><Header /></Link>
      <div
        className="
        page-header
        position-relative
        d-flex
        align-items-center
        justify-content-center
        overflow-hidden
      "
      >
        <img
          className="position-absolute"
          src="../assets/images/products/Software-development.jpg"
          alt=""
        />
        <div
          className="
          position-absolute
          w-100
          h-100
          d-flex
          flex-column
          align-items-start
          justify-content-end
        "
        >
          <div className="position-relative w-100 h-100">
            <div className="content-container w-100 h-100">
              <div
                className="
                container
                w-100
                h-100
                d-flex
                flex-column
                align-items-start
                justify-content-center
              "
              >
                <p>
                  <span>Software</span> Development
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="page">
        <div className="content-container">
          <div className="container">
            <p>
              Elevate your business with SystemLogic, a leading global provider
              of IT solutions and enterprise applications. We specialize in
              custom development, systems integration, and top-notch technical
              services to address your unique business needs.
            </p>
            <p>
              <strong>SoftwareCraft</strong> is our flagship portal offering a
              suite of tools tailored for the construction and contracting
              industry. Within its robust modules, the "Blueprint Insight"
              feature allows users to seamlessly import CAD diagrams. The
              interactive tools within the "Take Off" module empower users to
              mark and measure material requirements efficiently,
              revolutionizing the construction process.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default Software;
 */

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Wrench, 
  Car, 
  Shield, 
  Star, 
  Home, 
  Droplet, 
  Disc, 
  Truck, 
  Battery, 
  Settings 
} from 'lucide-react'; 
import { Link } from 'react-router-dom';
import Footer from "../../src/components/footer";
import Hondadetail1st from '../components/Workshopdet/Hondadetail1st';
import Header from '../components/header';
import RelatedWorkshops from '../components/Workshopdet/RelatedWorkshops';


const AslamAutos = () => {
  const [activeService, setActiveService] = useState(null);
    const [showOverlay, setShowOverlay] = useState(true);

  const workshopData = {
    name: "Aslam Autos",
    rating: 4.7,
    totalReviews: 256,
    location: "Main Street, City Center",
    contact: "+92 300 1234567",
    workingHours: "8:00 AM - 8:00 PM",
    specialties: ["Honda", "Suzuki", "General Repairs"],
    backgroundImage: "./assets/images/Workrepair.jpg",
    services: [
      {
        id: '1',
        title: 'Roadside Assistance',
        description: 'Immediate help when your vehicle breaks down. Our team reaches you quickly with necessary tools and expertise to get you back on the road.',
        icon: <Shield className="w-12 h-12 text-blue-600" />
      },
      {
        id: '2',
        title: 'Home Maintenance Service',
        description: 'Professional mechanics arrive at your doorstep to diagnose and repair vehicle issues, saving you time and hassle.',
        icon: <Home className="w-12 h-12 text-blue-600" />
      },
      {
        id: '3',
        title: 'Periodic Servicing',
        description: 'Comprehensive vehicle check-up and maintenance to ensure optimal performance and prevent potential issues.',
        icon: <Clock className="w-12 h-12 text-blue-600" />
      },
      {
        id: '4',
        title: 'Oil Change',
        description: 'Expert oil change services and vehicle tuning to maintain engine health and improve overall vehicle performance.',
        icon: <Wrench className="w-12 h-12 text-blue-600" />
      },
      {
        id: '5',
        title: 'Tire Services',
        description: 'Complete tire care including rotation, balancing, alignment, and replacement with high-quality tires.',
        icon: <Car className="w-12 h-12 text-blue-600" />
      },
      {
        id: '6',
        title: 'Coolant Change',
        description: 'Keep your engine at the right temperature with our coolant replacement service, preventing overheating and corrosion.',
        icon: <Droplet className="w-12 h-12 text-blue-600" />
      },
      {
        id: '7',
        title: 'Brake Service',
        description: 'Ensure safety with our expert brake inspection, repair, and replacement services for responsive and efficient braking.',
        icon: <Disc className="w-12 h-12 text-blue-600" />
      },
      {
        id: '8',
        title: 'Suspension Replacement',
        description: 'Improve ride comfort and stability with professional suspension repair and replacement using high-quality components.',
        icon: <Truck className="w-12 h-12 text-blue-600" />
      },
      {
        id: '9',
        title: 'Battery Service',
        description: 'Expert battery testing, replacement, and maintenance to ensure reliable starts and long-lasting performance.',
        icon: <Battery className="w-12 h-12 text-blue-600" />
      },
      {
        id: '10',
        title: 'Tuning',
        description: 'Enhance your vehicle’s performance with professional tuning for improved efficiency, power, and fuel economy.',
        icon: <Settings className="w-12 h-12 text-blue-600" />
      }      
    ]
  };

   const InitialOverlay = () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
        <div
          className="relative  bg-[#1E2533] 
              rounded-2xl 
              shadow-2xl 
              border-2 
              border-blue-800/30 
              max-w-2xl 
              w-full 
              p-10 "
        >
          <div className="text-center space-y-6">
            <h2
              className="text-3xl 
                font-bold 
                text-white 
                text-center 
                mb-8 
                tracking-wide
                bg-clip-text 
                text-transparent 
                bg-gradient-to-r 
                from-blue-400 
                to-white"
            >
              Welcome to Aslam Autos
            </h2>
            <p className="text-gray-400">
              Please login to access full features or continue as guest
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
  to="/login/workshop"
                className="
                    w-4/12
                    py-4 
                    bg-gradient-to-br 
                    from-blue-600 
                    to-blue-900 
                    text-white 
                    rounded-xl 
                    shadow-lg 
                    hover:shadow-xl 
                    transition-all 
                    duration-300 
                    transform 
                    hover:-translate-y-2
                    flex 
                    flex-col 
                    items-center 
                    justify-center"
              >
                Login
              </Link>
              <Link
                onClick={() => setShowOverlay(false)}
                className="
                    w-4/12
                    py-4 
                    bg-gradient-to-br 
                    from-gray-600 
                    to-purple-700
                    text-white 
                    rounded-xl 
                    shadow-lg 
                    hover:shadow-xl 
                    transition-all 
                    duration-300 
                    transform 
                    hover:-translate-y-2
                    flex 
                    flex-col 
                    items-center 
                    justify-center"
              >
                View Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-200 text-gray-900 min-h-screen">
      {/* Initial Overlay */}
      {showOverlay && <InitialOverlay />}

      {/* Main content with blur effect when overlay is shown */}
      <div
        className={`transition-all duration-300 ${
          showOverlay ? "blur-sm" : ""
        }`}
      ></div>
      <Link to="/"><Header /></Link>
      {/* Header Section with Background Image */}
      <div 
        className="relative bg-cover bg-center text-white py-16 px-4"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${workshopData.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{workshopData.name}</h1>
            <div className="flex items-center space-x-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i < Math.floor(workshopData.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-2">
                {workshopData.rating} ({workshopData.totalReviews} Reviews)
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="flex items-center justify-end space-x-2 mb-2">
              <MapPin className="w-6 h-6" />
              <span>{workshopData.location}</span>
            </div>
            <div className="flex items-center justify-end space-x-2 mb-2">
              <Phone className="w-6 h-6" />
              <span>{workshopData.contact}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Clock className="w-6 h-6" />
              <span>{workshopData.workingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto pt-16 pb-8 px-4">
        <h2 className="text-4xl font-bold font-serif text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {workshopData.services.map((service) => (
            <div 
              key={service.id}
              onClick={() => setActiveService(service)}
              className={`
                border-2 rounded-lg p-6 text-center cursor-pointer transform transition-all duration-300
                ${activeService?.id === service.id 
                  ? 'border-blue-600 bg-blue-50 scale-105 shadow-lg' 
                  : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}
              `}
            >
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">
                {service.description.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Service Modal */}
        {activeService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{activeService.title}</h3>
                <button 
                  onClick={() => setActiveService(null)}
                  className="text-gray-500 hover:text-black"
                >
                  Close
                </button>
              </div>
              <div className="flex items-center mb-6">
                {activeService.icon}
                <p className="ml-4 text-gray-700">{activeService.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Hondadetail1st/>

      <RelatedWorkshops/>

      {/* Contact & Booking Section */}
      <div className="container mx-auto py-8">
        <div className="bg-gradient-to-r from-black to-blue-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="mb-8">Book our services or get instant roadside assistance</p>
          <div className="flex justify-center space-x-4">
            <Link to="/bookings" className=" bg-yellow-500 text-black px-8 py-3 rounded-full hover:bg-yellow-600 hover:text-black transition-colors">
              Book Service
            </Link>
            <Link to="/bookings" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
              Roadside Help
            </Link>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default AslamAutos;
import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, MapPin, Shield, Truck, Phone, Star, CheckCircle, Wrench } from 'lucide-react';
import Sidenavbar from '../components/sidenavbar';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

const RoadsideAssistance = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Sidenavbar />
      <Link to="/"><Header /></Link>
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-900 to-black flex items-center justify-center">
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className={`max-w-2xl text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <h1 className="text-5xl font-bold text-white mb-6">24/7 Roadside Assistance</h1>
      <p className="text-xl text-white mb-8">
        Your reliable partner when the unexpected happens. Professional assistance anywhere, anytime.
      </p>
      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
        Get Help Now
      </button>
    </div>
  </div>
</div>


      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">Why Choose Our Roadside Assistance</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Clock className="w-12 h-12 text-blue-600" />, title: "24/7 Availability", description: "Round-the-clock emergency support whenever you need us" },
              { icon: <MapPin className="w-12 h-12 text-blue-600" />, title: "Quick Response", description: "Fast arrival times with real-time tracking" },
              { icon: <Shield className="w-12 h-12 text-blue-600" />, title: "Certified Mechanics", description: "Expert technicians for all vehicle types" }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">Our Roadside Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Battery Jump Start", description: "Dead battery? We'll get you running in no time" },
              { title: "Flat Tire Change", description: "Quick and professional tire replacement service" },
              { title: "Fuel Delivery", description: "Run out of fuel? We'll bring it to you" },
              { title: "Vehicle Towing", description: "Safe and secure towing to your preferred location" }
            ].map((service, index) => (
              <div key={index} className="flex items-start p-6 bg-gray-50 rounded-lg">
                <ChevronRight className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-tr from-blue-600 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Request Service", description: "Choose your location and describe the issue" },
              { step: 2, title: "Connect with Workshop", description: "Get matched with the nearest available workshop" },
              { step: 3, title: "Track Service", description: "Real-time updates on mechanic's arrival" },
              { step: 4, title: "Problem Solved", description: "Get back on the road or get safely towed" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-blue-100">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">Customer Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", location: "Karachi", text: "Excellent service! They arrived within 20 minutes when my car broke down on the highway." },
              { name: "Ahmed K.", location: "Lahore", text: "Professional and skilled mechanics. Fixed my car right on the spot!" },
              { name: "Fatima R.", location: "Islamabad", text: "Very reliable service. The tracking feature gave me peace of mind while waiting." }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Need Immediate Assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our professional team is available 24/7 to help you get back on the road
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </button>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
              <Wrench className="w-5 h-5 mr-2" />
              Book Service
            </button>
          </div>
        </div>
      </div>

      {/* Coverage Area */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">Coverage Areas</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Karachi", "Lahore", "Islamabad", "Rawalpindi",
              "Faisalabad", "Multan", "Peshawar", "Quetta"
            ].map((city, index) => (
              <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                <span>{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoadsideAssistance;
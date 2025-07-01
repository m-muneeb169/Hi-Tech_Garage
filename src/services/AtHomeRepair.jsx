import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Wrench, Shield, Home, Star, CheckCircle, Phone, Settings, ArrowRight } from 'lucide-react';
import Sidenavbar from '../components/sidenavbar';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

const AtHomeRepair = () => {
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
      <h1 className="text-5xl font-bold text-white mb-6">Professional Auto Repair at Your Doorstep</h1>
      <p className="text-xl text-white mb-8">
      Expert mechanics bring the workshop to your home. Convenient, reliable, and professional service.
      </p>
      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
      Schedule Service
      </button>
    </div>
  </div>
</div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">Why Choose At-Home Repair</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Home className="w-12 h-12 text-blue-600" />, title: "Comfort & Convenience", description: "No need to visit a workshop - we bring our expertise to your location" },
              { icon: <Clock className="w-12 h-12 text-blue-600" />, title: "Time-Saving", description: "Save time and effort with our mobile repair service" },
              { icon: <Shield className="w-12 h-12 text-blue-600" />, title: "Quality Guaranteed", description: "Professional service with warranty on parts and labor" }
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">Our At-Home Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Settings className="w-8 h-8 text-blue-600" />, title: "Engine Diagnostics", description: "Complete computer diagnostics and troubleshooting" },
              { icon: <Wrench className="w-8 h-8 text-blue-600" />, title: "Regular Maintenance", description: "Oil changes, filters, and routine services" },
              { icon: <Shield className="w-8 h-8 text-blue-600" />, title: "Brake Service", description: "Brake pad replacement and brake system repair" },
              { icon: <Settings className="w-8 h-8 text-blue-600" />, title: "Battery Service", description: "Battery testing, charging, and replacement" },
              { icon: <Wrench className="w-8 h-8 text-blue-600" />, title: "AC Service", description: "AC repair, recharge, and maintenance" },
              { icon: <Shield className="w-8 h-8 text-blue-600" />, title: "Electrical Repair", description: "Electrical system diagnostics and repair" }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold ml-3">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-blue-600 flex items-center hover:text-blue-800 transition duration-300">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How Our At-Home Service Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Book Online", description: "Schedule a convenient time for service" },
              { step: 2, title: "Mechanic Arrives", description: "Our certified mechanic comes to your location" },
              { step: 3, title: "Inspection & Quote", description: "Thorough inspection and transparent pricing" },
              { step: 4, title: "Service Complete", description: "Professional repair with warranty" }
            ].map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="w-16 h-16 bg-white text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-blue-100">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-700 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Hassan R.", location: "Karachi", text: "The convenience of having my car serviced at home is unmatched. Excellent service!" },
              { name: "Amina S.", location: "Lahore", text: "Very professional mechanics. They explained everything and completed the work efficiently." },
              { name: "Usman M.", location: "Islamabad", text: "Great experience! The mechanic was punctual and very knowledgeable." }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
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

      {/* Booking CTA */}
      <div className="py-20 bg-gradient-to-r from-blue-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Book Your At-Home Service?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional auto repair and maintenance at your convenience
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Now
            </button>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </button>
          </div>
        </div>
      </div>

      {/* Service Areas */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">Service Areas</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Karachi", "Lahore", "Islamabad", "Rawalpindi",
              "Faisalabad", "Multan", "Peshawar", "Quetta"
            ].map((city, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
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

export default AtHomeRepair;
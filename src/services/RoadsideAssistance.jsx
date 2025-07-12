import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Clock,
  MapPin,
  Shield,
  Truck,
  Phone,
  Star,
  CheckCircle,
  Wrench,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidenavbar from '../components/sidenavbar';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import '@fontsource/barlow/700.css';
import '@fontsource/open-sans/400-italic.css';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const RoadsideAssistance = () => {
   const navigate = useNavigate();
  const goToLogin = () => navigate("/login/user"); // Adjust route if different
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
 const AnimatedButton = ({ children, className }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={className}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-white font-['Open_Sans'] overflow-x-hidden">
      <Sidenavbar />
      <Link to="/">
        <Header />
      </Link>

      {/* Hero Section */}
<section className="relative h-screen bg-white text-blue-900 flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-900 to-black opacity-90 z-0" />
  <div className="absolute inset-0 z-10 flex items-center justify-center">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.8 }}
      className="max-w-4xl text-center px-6 z-10"
    >
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-['Barlow'] leading-tight">
        Long – Journey <br className="hidden md:block" />
        <span className="text-blue-300">experience</span> with short <br className="hidden md:block" />
        commute <span className="text-blue-300">convenience.</span>
      </h1>
      <p className="text-white text-base md:text-lg max-w-2xl mx-auto mb-10 italic">
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised.
      </p>
      <motion.button
        onClick={goToLogin}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400 }}
        className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold font-['Barlow'] tracking-wide hover:bg-blue-100 shadow-lg"
      >
        Find Car
      </motion.button>
    </motion.div>
  </div>

  {/* Background Car Image */}
  <div className="absolute bottom-0 right-0 z-0 w-[50%] md:w-[40%] opacity-90">
    <img
      src="C:\Users\LapTop\OneDrive - Higher Education Commission\Documents\GitHub\Hi-Tech_Garage\public\assets\images\whitecar.png" // 🔁 Replace with your own car image path or URL
      alt="Car"
      className="object-contain w-full h-auto"
    />
  </div>

  {/* Arrow Decorations */}
  <div className="absolute top-10 left-10 z-20">
    <img
      src="/arrow-top-left.png" // 🔁 Custom decorative arrow image (optional)
      alt=""
      className="w-24 opacity-80"
    />
  </div>
  <div className="absolute top-[35%] right-[10%] z-20">
    <img
      src="/arrow-right.png" // 🔁 Custom decorative arrow image (optional)
      alt=""
      className="w-24 opacity-80"
    />
  </div>
</section>


      {/* Services Overview */}
      <section className="py-20 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-4"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-16 text-blue-900 font-['Barlow']"
          >
            Our Roadside Services
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[{ title: "Battery Jump Start", description: "Dead battery? We'll get you running in no time" }, { title: "Flat Tire Change", description: "Quick and professional tire replacement service" }, { title: "Fuel Delivery", description: "Run out of fuel? We'll bring it to you" }, { title: "Vehicle Towing", description: "Safe and secure towing to your preferred location" }].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex items-start p-6 bg-gray-50 rounded-lg"
              >
                <ChevronRight className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 font-['Barlow']">{service.title}</h3>
                  <p className="text-gray-600 italic">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-tr from-blue-600 to-blue-900 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-4"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-16 font-['Barlow']"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[{ step: 1, title: "Request Service", description: "Choose your location and describe the issue" }, { step: 2, title: "Connect with Workshop", description: "Get matched with the nearest available workshop" }, { step: 3, title: "Track Service", description: "Real-time updates on mechanic's arrival" }, { step: 4, title: "Problem Solved", description: "Get back on the road or get safely towed" }].map((step, index) => (
              <motion.div key={index} variants={fadeUp} className="text-center">
                <div className="w-16 h-16 bg-white text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 font-['Barlow']">{step.title}</h3>
                <p className="text-blue-100 italic">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-4"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-16 text-blue-900 font-['Barlow']"
          >
            Customer Testimonials
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ name: "Sarah M.", location: "Karachi", text: "Excellent service! They arrived within 20 minutes when my car broke down on the highway." }, { name: "Ahmed K.", location: "Lahore", text: "Professional and skilled mechanics. Fixed my car right on the spot!" }, { name: "Fatima R.", location: "Islamabad", text: "Very reliable service. The tracking feature gave me peace of mind while waiting." }].map((testimonial, index) => (
              <motion.div key={index} variants={fadeUp} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold font-['Barlow']">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

        {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-black text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-4 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold mb-8 font-['Barlow']"
          >
            Need Immediate Assistance?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl mb-8 max-w-2xl mx-auto italic">
            Our professional team is available 24/7 to help you get back on the road
          </motion.p>
          <motion.div 
          onClick={goToLogin}
          variants={fadeUp} className="flex flex-col md:flex-row justify-center items-center gap-4">
            <AnimatedButton className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </AnimatedButton>
            <AnimatedButton className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
              <Wrench className="w-5 h-5 mr-2" />
              Book Service
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Coverage Area */}
      <section className="py-20 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-4"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-16 text-blue-900 font-['Barlow']"
          >
            Coverage Areas
          </motion.h2>
          <motion.div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"].map((city, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex items-center bg-gray-50 p-4 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                <span>{city}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default RoadsideAssistance;

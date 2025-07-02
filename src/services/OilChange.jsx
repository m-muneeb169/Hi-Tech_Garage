// Enhanced OilChange.tsx with animations and font styling
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
  Wrench
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidenavbar from '../components/sidenavbar';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import '@fontsource/barlow/700.css';
import '@fontsource/open-sans/400-italic.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const OilChange = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 overflow-x-hidden font-['Open_Sans']">
      <Sidenavbar />
      <Link to="/">
        <Header />
      </Link>

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-900 to-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center px-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-['Barlow'] tracking-tight leading-tight">
              OIL CHANGE <span className="text-blue-300">SERVICE</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 italic">
              "Keep your engine running smoothly with quality oils and expert care."
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-['Barlow'] font-semibold tracking-wide"
            >
              Get Help Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 font-['Barlow'] tracking-tight">
              WHY CHOOSE OUR OIL SERVICE
            </h2>
            <div className="w-24 h-1 bg-blue-600 mt-4 mx-auto"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: <Shield size={28} />, title: 'PREMIUM OIL', description: 'High-quality synthetic and conventional oils.' },
              { icon: <Clock size={28} />, title: 'QUICK SERVICE', description: 'Oil change completed in 30 minutes or less.' },
              { icon: <CheckCircle size={28} />, title: 'FULL INSPECTION', description: 'Every oil change includes a full check-up.' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-200 text-center"
              >
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900 font-['Barlow']">{feature.title}</h3>
                <p className="text-gray-600 font-['Open_Sans']">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 font-['Barlow'] tracking-tight">
              WHAT'S INCLUDED IN OUR SERVICE
            </h2>
            <div className="w-24 h-1 bg-blue-600 mt-4 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10 text-lg text-gray-700 font-['Open_Sans']">
            <div className="space-y-4">
              <p>✔️ Complete oil and filter change using top-grade brands</p>
              <p>✔️ Multi-point inspection (tires, brakes, fluids, battery)</p>
              <p>✔️ Interior vacuum and windshield wash (on request)</p>
            </div>
            <div className="space-y-4">
              <p>✔️ Service record provided for future tracking</p>
              <p>✔️ Waste oil disposal following environmental standards</p>
              <p>✔️ Friendly advice and maintenance tips from certified mechanics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Regular Oil Change */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 font-['Barlow'] tracking-tight">
              BENEFITS OF REGULAR OIL CHANGES
            </h2>
            <div className="w-24 h-1 bg-blue-600 mt-4 mx-auto"></div>
          </motion.div>
          <ul className="max-w-3xl mx-auto space-y-4 list-disc list-inside text-lg text-gray-700 font-['Open_Sans']">
            <li>Improved engine performance and longevity</li>
            <li>Better fuel efficiency and reduced emissions</li>
            <li>Prevents sludge buildup and keeps engine clean</li>
            <li>Protects internal parts from wear and corrosion</li>
            <li>Maintains manufacturer warranty requirements</li>
          </ul>
        </div>
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
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-center items-center gap-4">
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

export default OilChange;

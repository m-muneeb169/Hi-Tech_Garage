import React from 'react';
import {
  Calendar,
  Clock,
  Wrench,
  Shield,
  Home,
  Phone,
  Settings,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidenavbar from '../components/sidenavbar';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import '@fontsource/barlow/700.css';
import '@fontsource/open-sans/400-italic.css';

// Animation variants
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

const AtHomeRepair = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 overflow-x-hidden">
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
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold text-white mb-6 font-['Barlow'] tracking-tight leading-tight"
            >
              AUTO REPAIR <span className="text-blue-300">AT YOUR DOORSTEP</span>
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-white/90 mb-8 font-['Open_Sans'] italic"
            >
              "Professional service delivered right to your driveway"
            </motion.p>
            <motion.div variants={fadeUp}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-['Barlow'] font-semibold tracking-wide flex items-center mx-auto"
              >
                <Calendar className="w-5 h-5 mr-2" />
                SCHEDULE SERVICE
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 font-['Barlow'] tracking-tight">WHY CHOOSE US</h2>
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
              { icon: <Home size={28} />, title: 'COMFORT & CONVENIENCE', description: 'We bring the garage to your home — zero hassle.' },
              { icon: <Clock size={28} />, title: 'TIME-SAVING', description: 'Book in minutes, get service without leaving home.' },
              { icon: <Shield size={28} />, title: 'QUALITY GUARANTEED', description: 'Skilled mechanics and genuine parts, always.' }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-200"
              >
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900 text-center font-['Barlow']">{benefit.title}</h3>
                <p className="text-gray-600 text-center font-['Open_Sans']">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 font-['Barlow'] tracking-tight">OUR SERVICES</h2>
            <div className="w-24 h-1 bg-blue-600 mt-4 mx-auto"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {[
              { icon: <Settings size={20} />, title: 'ENGINE DIAGNOSTICS', description: 'Computer-based issue detection & solutions.' },
              { icon: <Wrench size={20} />, title: 'MAINTENANCE', description: 'Oil change, filters, and full servicing.' },
              { icon: <Shield size={20} />, title: 'BRAKE SERVICE', description: 'Brake pad change & repairs with warranty.' },
              { icon: <Settings size={20} />, title: 'BATTERY', description: 'Battery checks, jumpstarts, and replacement.' },
              { icon: <Wrench size={20} />, title: 'AC REPAIR', description: 'Cooling system cleaning and gas recharge.' },
              { icon: <Shield size={20} />, title: 'ELECTRICAL FIXES', description: 'All wiring & system error corrections.' }
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800 font-['Barlow']">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 font-['Open_Sans']">{service.description}</p>
                <motion.button 
                  whileHover={{ x: 3 }}
                  className="text-blue-600 hover:text-blue-800 flex items-center font-medium transition-colors duration-300 font-['Barlow']"
                >
                  LEARN MORE <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.div 
        className="py-24 bg-gradient-to-r from-blue-900 to-black text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-5xl font-bold mb-6 font-['Barlow'] tracking-tighter"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-300">READY</span> TO BOOK?
          </motion.h2>
          
          <motion.p
            className="text-xl mb-10 max-w-2xl mx-auto font-['Open_Sans'] italic text-blue-100 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            "Get premium car care without leaving home"
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center font-['Barlow'] font-semibold tracking-wide uppercase text-sm"
            >
              <Calendar className="w-5 h-5 mr-2" />
              BOOK SERVICE
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent text-white border-2 border-blue-400 px-8 py-4 rounded-lg hover:bg-blue-900/30 transition-all duration-300 flex items-center font-['Barlow'] font-medium tracking-wide"
            >
              <Phone className="w-5 h-5 mr-2" />
              CALL OUR EXPERTS
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default AtHomeRepair;
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
<section className="relative h-[70vh] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center overflow-hidden">
  {/* Radial Gradient Overlay */}
  <div className="absolute inset-0 bg-radial-gradient opacity-70 z-0" />

  {/* Text Content */}
  <div className="absolute inset-0 z-20 flex items-center justify-center">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.8 }}
      className="max-w-4xl text-center px-6"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 font-['Barlow'] leading-tight drop-shadow-lg">
        On-Road Emergency Assistance
      </h1>
      <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 italic drop-shadow-md">
        Anytime. Anywhere. We’ve got your back.
      </p>
      <motion.button
        onClick={goToLogin}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(139, 92, 246, 0.6)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400 }}
        className="bg-red-600 text-white px-10 py-4 rounded-full font-bold font-['Barlow'] tracking-wide hover:bg-red-700 shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      >
        Request for Help
      </motion.button>
    </motion.div>
  </div>

  {/* Car Image with Animation */}
  <motion.div
    initial={{ x: '100%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
    className="absolute bottom-0 right-[-5%] md:right-0 z-10 w-[60%] md:w-[45%] lg:w-[40%] opacity-90"
  >
    <img
      src="/assets/images/whitecar.png"
      alt="Car"
      className="object-contain w-full h-auto drop-shadow-2xl"
    />
  </motion.div>

  {/* Subtle Grid Pattern Overlay */}
  <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />
</section>


{/* Our services */}
<section className="py-16 bg-white relative">
 <motion.div
   initial="hidden"
   whileInView="visible"
   viewport={{ once: false, amount: 0.3 }}
   className="container mx-auto px-8 max-w-6xl"
 >
   <motion.h2
     initial={{ opacity: 0, y: -20 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     className="text-4xl font-bold text-center mb-12 text-blue-900 font-['Barlow']"
   >
     Our Roadside Services
   </motion.h2>

   <div className="grid md:grid-cols-2 gap-6">
     {[
       { title: "Battery Jump Start", description: "Dead battery? We'll get you running in no time.", icon: "🔋" },
       { title: "Flat Tire Change", description: "Quick and professional tire replacement service.", icon: "🛞" },
       { title: "Fuel Delivery", description: "Run out of fuel? We'll bring it to you.", icon: "⛽" },
       { title: "Vehicle Towing", description: "Safe and secure towing to your preferred location.", icon: "🚛" }
     ].map((service, index) => (
       <motion.div
         key={index}
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         whileHover={{ y: -3, scale: 1.01 }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
         viewport={{ once: false, amount: 0.3 }}
         className="group relative overflow-hidden"
       >
         <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"></div>
         <div className="relative p-6 rounded-xl border border-blue-100">
           <div className="flex items-start space-x-4">
             <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xl shadow-sm">
               {service.icon}
             </div>
             <div className="flex-1">
               <h3 className="text-xl font-semibold mb-2 text-blue-900 font-['Barlow']">
                 {service.title}
               </h3>
               <p className="text-gray-600">{service.description}</p>
             </div>
           </div>
         </div>
       </motion.div>
     ))}
   </div>
 </motion.div>
</section>


{/* How it works */}
<section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
 {/* Background decorative elements */}
 <div className="absolute inset-0">
   <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
   <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
   <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/3 rounded-full blur-lg"></div>
 </div>

 <motion.div
   initial="hidden"
   whileInView="visible"
   viewport={{ once: true }}
   variants={staggerContainer}
   className="container mx-auto px-8 max-w-6xl relative z-10"
 >
   <motion.div
     variants={fadeUp}
     className="text-center mb-16"
   >
     <h2 className="text-4xl font-bold mb-4 font-['Barlow']">
       How It Works
     </h2>
     <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
   </motion.div>

   <div className="grid md:grid-cols-4 gap-8">
     {[
       { step: 1, title: "Request Service", description: "Choose your location and describe the issue" },
       { step: 2, title: "Connect with Workshop", description: "Get matched with the nearest available workshop" },
       { step: 3, title: "Track Service", description: "Real-time updates on mechanic's arrival" },
       { step: 4, title: "Problem Solved", description: "Get back on the road or get safely towed" }
     ].map((step, index) => (
       <motion.div 
         key={index} 
         variants={fadeUp} 
         className="text-center group relative"
       >
         <div className="relative mb-6">
           <div className="w-16 h-16 bg-white text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
             {step.step}
           </div>
           {index > 0 && index < 4 && (
             <div className="hidden md:block absolute top-8 right-full w-full h-0.5 bg-white/20">
               <div className="absolute left-0 top-0 w-2 h-2 bg-white/30 rounded-full -translate-y-0.5"></div>
             </div>
           )}
         </div>
         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 group-hover:bg-white/10 transition-all duration-300 h-32 flex flex-col justify-center">
           <h3 className="text-xl font-semibold mb-3 font-['Barlow'] group-hover:text-blue-100 transition-colors duration-300">
             {step.title}
           </h3>
           <p className="text-blue-100/80 leading-relaxed text-sm">
             {step.description}
           </p>
         </div>
       </motion.div>
     ))}
   </div>
 </motion.div>
</section>

      {/* features  */}
      <section className="py-20 bg-white relative overflow-hidden">
 {/* Background decorative elements */}
 <div className="absolute inset-0">
   <div className="absolute top-20 right-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
   <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
 </div>

 <motion.div
   initial="hidden"
   whileInView="visible"
   viewport={{ once: true }}
   variants={staggerContainer}
   className="container mx-auto px-8 max-w-6xl relative z-10"
 >
   <motion.div
     variants={fadeUp}
     className="text-center mb-16"
   >
     <h2 className="text-4xl font-bold mb-4 text-blue-900 font-['Barlow']">
       Features of Our 24/7 Service
     </h2>
     <p className="text-xl text-gray-600 max-w-3xl mx-auto">
       Advanced technology and dedicated support ensuring you're never stranded
     </p>
     <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
   </motion.div>

   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
     {[
       { 
         icon: "🕐", 
         title: "24-Hour Availability", 
         description: "Round-the-clock emergency assistance whenever you need it, day or night",
         color: "from-blue-500 to-blue-600"
       },
       { 
         icon: "📍", 
         title: "Location-Based Tracking", 
         description: "Real-time GPS tracking to locate you precisely and dispatch nearest help",
         color: "from-blue-600 to-blue-700"
       },
       { 
         icon: "🔔", 
         title: "Instant Workshop Notifications", 
         description: "Immediate alerts sent to partner workshops for fastest response times",
         color: "from-blue-700 to-blue-800"
       },
       { 
         icon: "📱", 
         title: "Mobile-First Design", 
         description: "Optimized mobile experience for easy access from any smartphone",
         color: "from-blue-500 to-blue-600"
       },
       { 
         icon: "🤖", 
         title: "AI Chatbot Support", 
         description: "Intelligent guided support to help diagnose issues and provide solutions",
         color: "from-blue-600 to-blue-700"
       },
       { 
         icon: "⚡", 
         title: "Rapid Response", 
         description: "Advanced dispatch system ensuring the fastest possible service delivery",
         color: "from-blue-700 to-blue-800"
       }
     ].map((feature, index) => (
       <motion.div
         key={index}
         variants={fadeUp}
         whileHover={{ y: -5, scale: 1.02 }}
         className="group relative"
       >
         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
         <div className="relative p-8 rounded-2xl border border-blue-100 h-full flex flex-col">
           <div className="flex items-center mb-6">
             <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
               {feature.icon}
             </div>
             <div className="ml-4 flex-1">
               <h3 className="text-xl font-bold text-blue-900 font-['Barlow'] group-hover:text-blue-700 transition-colors duration-300">
                 {feature.title}
               </h3>
             </div>
           </div>
           <p className="text-gray-600 leading-relaxed flex-1">
             {feature.description}
           </p>
           <div className="mt-4 h-1 bg-gradient-to-r from-blue-200 to-transparent rounded-full group-hover:from-blue-400 transition-all duration-300"></div>
         </div>
       </motion.div>
     ))}
   </div>

   <motion.div
     variants={fadeUp}
     className="text-center mt-16"
   >
     <motion.button
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
     >
       <Link
  to="/booking"
  className="inline-block bg-blue-600 text-white px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
>
  Experience Our Service
</Link>
       <motion.div
         animate={{ x: [0, 5, 0] }}
         transition={{ duration: 1.5, repeat: Infinity }}
       >
         →
       </motion.div>
     </motion.button>
   </motion.div>
 </motion.div>
</section>

        {/* CTA Section */}
      <section className="py-10 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white relative overflow-hidden">
  {/* Background decorative elements */}
  <div className="absolute inset-0">
    <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-1/2 left-1/4 w-52 h-52 bg-white/5 rounded-full blur-2xl"></div>
  </div>

  {/* Animated background pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full animate-ping"></div>
    <div className="absolute top-40 right-32 w-3 h-3 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
    <div className="absolute bottom-32 left-40 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
  </div>

  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    className="container mx-auto px-6 max-w-3xl text-center relative z-10"
  >
    <motion.div variants={fadeUp} className="mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm shadow-lg">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </div>
      <h2 className="text-4xl font-bold mb-4 font-['Barlow'] leading-tight">
        Need Immediate
        <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
          Assistance?
        </span>
      </h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto text-blue-100 leading-relaxed">
        Our professional team is available 24/7 to help you get back on the road safely
      </p>
    </motion.div>

    <motion.div
      variants={fadeUp}
      className="flex flex-col md:flex-row justify-center items-center gap-4"
    >
      <motion.button
        onClick={goToLogin}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 transition-all duration-300 group-hover:from-blue-50 group-hover:to-white"></div>
        <Phone className="w-5 h-5 mr-2 relative z-10 group-hover:animate-pulse" />
        <span className="relative z-10 text-base">Call Now</span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse"></div>
      </motion.button>

      <motion.button
        onClick={goToLogin}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:from-red-500 group-hover:to-orange-400"></div>
        <Wrench className="w-5 h-5 mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
        <span className="relative z-10 text-base">Book Service</span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse"></div>
      </motion.button>
    </motion.div>

    <motion.div
      variants={fadeUp}
      className="mt-6 flex justify-center items-center space-x-6 text-blue-100 text-sm"
    >
      <div className="flex items-center">
        <div className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
        <span>24/7 Available</span>
      </div>
      <div className="flex items-center">
        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
        <span>Fast Response</span>
      </div>
      <div className="flex items-center">
        <div className="w-2.5 h-2.5 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
        <span>Professional Team</span>
      </div>
    </motion.div>
  </motion.div>
</section>

{/* Coverage Area */}
<section className="py-10 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
  {/* Background decorative elements */}
  <div className="absolute inset-0">
    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
    <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-15"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
  </div>

  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    className="container mx-auto px-8 max-w-6xl relative z-10"
  >
    <motion.div
      variants={fadeUp}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-6 shadow-lg">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
      <h2 className="text-5xl font-bold mb-4 text-blue-900 font-['Barlow']">
        Service Coverage
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Proudly serving Faisalabad and surrounding areas with comprehensive roadside assistance
      </p>
    </motion.div>

    <div className="relative max-w-4xl mx-auto">
      {/* Main Faisalabad Card */}
      <motion.div
        variants={fadeUp}
        whileHover={{ scale: 1.02, y: -5 }}
        className="group relative mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"></div>
        <div className="relative p-12 rounded-3xl text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-6 backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2 font-['Barlow']">Faisalabad</h3>
                <p className="text-blue-100 text-lg">Manchester of Pakistan</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-blue-100">Available</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold mb-2">Rapid Response</h4>
              <p className="text-blue-100 text-sm">Average response time: 15-20 minutes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-2xl mb-2">🏢</div>
              <h4 className="font-semibold mb-2">City Wide</h4>
              <p className="text-blue-100 text-sm">All districts and industrial areas covered</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-2xl mb-2">🛣️</div>
              <h4 className="font-semibold mb-2">Highway Coverage</h4>
              <p className="text-blue-100 text-sm">M-3, M-4 and connecting routes</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    <motion.div
      variants={fadeUp}
      className="text-center mt-8"
    >
      <Link to="/booking">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Get Help in Faisalabad</span>
        </motion.button>
      </Link>
    </motion.div>
  </motion.div>
</section>


      <Footer />
    </div>
  );
};

export default RoadsideAssistance;

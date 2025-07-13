// Enhanced PeriodicServicing.tsx with full design and animations
import { useState, useEffect } from "react";
import {
  Calendar,
  Shield,
  Star,
  CheckCircle,
  Phone,
  Settings,
  Wrench
} from "lucide-react";
import { motion } from "framer-motion";
import Sidenavbar from "../components/sidenavbar";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import "@fontsource/barlow/700.css";
import "@fontsource/open-sans/400-italic.css";
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const PeriodicServicing = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login/user"); // Adjust route if different
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 overflow-x-hidden font-['Open_Sans']">
      <Sidenavbar />
      <Link to="/">
        <Header />
      </Link>

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2070&auto=format&fit=crop')`,
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-slate-900/90"></div>
              
              {/* Bottom Blur Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-900/95 via-blue-800/70 to-transparent backdrop-blur-sm"></div>
              
              {/* Animated Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-300/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
      
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.8 }}
                className="max-w-4xl text-center px-6"
              >
                <motion.h1
                  variants={fadeUp}
                  className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Barlow'] tracking-tight leading-tight"
                >
                  AUTO REPAIR{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 drop-shadow-lg">
                    AT WORKSHOP
                  </span>
                </motion.h1>
                
                <motion.p
                  variants={fadeUp}
                  className="text-xl md:text-2xl text-blue-100/90 mb-10 font-['Open_Sans'] italic drop-shadow-md"
                >
                  "Drive in, relax, and let our experts handle the rest"
                </motion.p>
                
                <motion.div variants={fadeUp}>
                  <motion.button
                    onClick={goToLogin}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-4 rounded-xl font-['Barlow'] font-semibold tracking-wide flex items-center mx-auto shadow-2xl border border-blue-400/30 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent rounded-xl group-hover:from-blue-300/30 transition-all duration-300"></div>
                    <Calendar className="w-6 h-6 mr-3 relative z-10" />
                    <span className="relative z-10 text-lg">SCHEDULE SERVICE</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </section>

      {/* Benefits Section */}
<section className="py-20 bg-gradient-to-br from-white to-blue-50/30 relative overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-20 right-20 w-40 h-40 bg-blue-600 transform rotate-45"></div>
    <div className="absolute bottom-20 left-20 w-32 h-32 bg-cyan-500 transform rotate-12"></div>
    <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-blue-400 transform rotate-45"></div>
  </div>

  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    className="container mx-auto px-8 lg:px-16 relative z-10"
  >
    <motion.h2
      variants={fadeUp}
      className="text-4xl font-bold text-center mb-16 text-blue-900 font-['Barlow'] tracking-tight"
    >
      Why Choose Workshop Maintenance
    </motion.h2>
    
    <div className="grid md:grid-cols-3 gap-10 lg:gap-12 max-w-7xl mx-auto">
      {[{
        icon: <Shield className="w-12 h-12 text-white" />,
        title: "Access to Specialized Tools & Equipment",
        description: "Workshops are equipped with advanced tools and diagnostics that ensure deeper inspections and precision repairs.",
        gradient: "from-blue-500 to-blue-600"
      }, {
        icon: <Settings className="w-12 h-12 text-white" />,
        title: "Expert Technicians at Your Service",
        description: "Skilled mechanics offer hands-on expertise and handle complex issues that may not be feasible with at-home service.",
        gradient: "from-cyan-500 to-blue-500"
      }, {
        icon: <Star className="w-12 h-12 text-white" />,
        title: "Reliable and Thorough Servicing",
        description: "Workshops provide a controlled environment for comprehensive maintenance, ensuring quality assurance and safety.",
        gradient: "from-indigo-500 to-blue-600"
      }].map((benefit, index) => (
        <motion.div
          key={index}
          variants={fadeUp}
          whileHover={{ 
            y: -8,
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 10 }
          }}
          className="group relative h-full"
        >
          {/* Card Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 group-hover:border-blue-200/80 h-full flex flex-col">
            {/* Top Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient} rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            
            {/* Icon */}
            <div className="mb-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                {benefit.icon}
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-semibold mb-4 font-['Barlow'] text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
              {benefit.title}
            </h3>
            
            {/* Description */}
            <div className="flex-1">
              <p className="text-gray-600 italic font-['Open_Sans'] leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {benefit.description}
              </p>
            </div>

            {/* Side Accent */}
            <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b ${benefit.gradient} rounded-r-full group-hover:h-16 transition-all duration-500`}></div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>


{/* Process */}
<section
  className="py-24 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white"
  data-aos="fade-up"
  data-aos-once="false"
>
  <div className="container mx-auto px-6 md:px-20">
    <h2
      data-aos="fade-up"
      data-aos-once="false"
      className="text-4xl font-bold text-center mb-16 font-['Barlow'] text-white"
    >
      How It Works
    </h2>

    <div className="grid md:grid-cols-4 gap-12 relative">
      {[
        {
          step: 1,
          title: "Log In",
          description: "Access your account to get started with the booking.",
        },
        {
          step: 2,
          title: "Fill Booking Form",
          description: "Choose your preferred workshop, services, and time slot.",
        },
        {
          step: 3,
          title: "Confirm Booking",
          description: "Review your selection and confirm the appointment.",
        },
        {
          step: 4,
          title: "Visit Workshop",
          description: "Bring your vehicle to the selected workshop at the scheduled time.",
        },
      ].map((step, index) => (
        <div
          key={index}
          data-aos="fade-up"
          data-aos-delay={index * 200}
          data-aos-once="false"
          className="relative text-center bg-white text-blue-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
        >
          <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">
            {step.step}
          </div>
          <h3 className="text-xl font-semibold mb-2 font-['Barlow']">
            {step.title}
          </h3>
          <p className="text-blue-700 italic">{step.description}</p>

          {index < 3 && (
            <div className="hidden md:block absolute top-10 right-[-40px] w-20 h-0.5 bg-blue-400"></div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>





{/* Why people are excited */}
<section className="py-20 bg-white relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.06)_0%,transparent_50%)]"></div>
  <div className="absolute top-10 right-10 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl"></div>
  <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"></div>

  <div className="container mx-auto px-10 md:px-24 relative z-10">
    <h2 className="text-4xl font-bold text-center mb-16 text-blue-800 font-['Barlow'] tracking-wide">
      Why People are Excited
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          name: "Hassan Rana",
          location: "Faisalabad",
          text: "This platform completely changes how we approach our workflow.",
        },
        {
          name: "Amina Shafqat",
          location: "Lahore",
          text: "Finally, a solution that understands what we need.",
        },
        {
          name: "Usman Mansoor",
          location: "Faisalabad",
          text: "The user experience is absolutely phenomenal.",
        },
      ].map((testimonial, index) => (
        <div
          key={index}
          className="group relative bg-gray-50 p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="false"
        >
          {/* Gradient border hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-sm"></div>

          {/* Quote icon */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>

          <div className="relative z-10">
            <p className="text-gray-800 mb-6 text-lg leading-relaxed font-medium">
              "{testimonial.text}"
            </p>

            <div className="flex items-center">
              <div className="relative mr-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-900 font-['Barlow'] text-lg">
                  {testimonial.name}
                </p>
                <p className="text-blue-500 text-sm font-medium tracking-wide uppercase">
                  {testimonial.location}
                </p>
              </div>
            </div>
          </div>

          {/* Top right soft circle */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-300 rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  </div>
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

export default PeriodicServicing;

// Enhanced OilChange.tsx with animations and font styling
import { useState, useEffect } from 'react';
import {
  Clock,
  Shield,
  Phone,
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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login/user"); // Adjust route if different
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
 const AnimatedButton = ({ children, className }) => (
    <motion.button
      onClick={goToLogin}
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
              onClick={goToLogin}
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

export default OilChange;

import { useState, useEffect } from "react";
import {
  Calendar,
  Star,
  CheckCircle,
  Phone,
  Sliders,
  Wrench,
  Gauge
} from "lucide-react";
import { motion } from "framer-motion";
import Sidenavbar from "../components/sidenavbar";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import "@fontsource/barlow/700.css";
import "@fontsource/open-sans/400-italic.css";

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

const Tuning = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 overflow-x-hidden font-['Open_Sans']">
      <Sidenavbar />
      <Link to="/">
        <Header />
      </Link>

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-900 to-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center px-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-['Barlow'] tracking-tight leading-tight">
              VEHICLE <span className="text-blue-300">TUNING SERVICE</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 italic">
              Experience enhanced engine performance, smoother rides, and increased fuel efficiency with our expert vehicle tuning
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-['Barlow'] font-semibold tracking-wide"
            >
              Book Tuning Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
            className="text-4xl font-bold text-center mb-16 text-blue-900 font-['Barlow']"
          >
            Benefits of Tuning Service
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              icon: <Gauge className="w-12 h-12 text-blue-600" />,
              title: "Boosted Performance",
              description: "Improve engine response, acceleration, and overall vehicle power output",
            }, {
              icon: <Sliders className="w-12 h-12 text-blue-600" />,
              title: "Customized Optimization",
              description: "Tune your car's software for maximum efficiency according to your driving style",
            }, {
              icon: <Wrench className="w-12 h-12 text-blue-600" />,
              title: "Extended Engine Life",
              description: "Prevent long-term engine damage by keeping components balanced and clean",
            }].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 font-['Barlow']">{benefit.title}</h3>
                <p className="text-gray-600 italic">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
{/* Process Section */}
<section className="py-20 bg-blue-900 text-white">
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    className="container mx-auto px-4"
  >
    <motion.h2
      variants={fadeUp}
      className="text-4xl font-bold text-center mb-16 font-['Barlow']"
    >
      How Our Periodic Servicing Works
    </motion.h2>
    <div className="grid md:grid-cols-4 gap-8">
      {[
        {
          step: 1,
          title: "Book Online",
          description: "Schedule a convenient time for service",
        },
        {
          step: 2,
          title: "Mechanic Arrives",
          description: "Our certified mechanic comes to your location",
        },
        {
          step: 3,
          title: "Inspection & Quote",
          description: "Thorough inspection and transparent pricing",
        },
        {
          step: 4,
          title: "Service Complete",
          description: "Professional repair with warranty",
        },
      ].map((step, index) => (
        <motion.div
          key={index}
          variants={fadeUp}
          className="relative text-center"
        >
          <div className="w-16 h-16 bg-white text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            {step.step}
          </div>
          <h3 className="text-xl font-semibold mb-2 font-['Barlow']">
            {step.title}
          </h3>
          <p className="text-blue-100 italic">{step.description}</p>
          {index < 3 && (
            <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-700 -z-10"></div>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>
{/* Testimonials Section */}
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
      className="text-4xl font-bold text-center mb-16 text-blue-900 font-['Barlow']"
    >
      What Our Customers Say
    </motion.h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          name: "Hassan R.",
          location: "Karachi",
          text: "The convenience of having my car serviced at home is unmatched. Excellent service!",
        },
        {
          name: "Amina S.",
          location: "Lahore",
          text: "Very professional mechanics. They explained everything and completed the work efficiently.",
        },
        {
          name: "Usman M.",
          location: "Islamabad",
          text: "Great experience! The mechanic was punctual and very knowledgeable.",
        },
      ].map((testimonial, index) => (
        <motion.div
          key={index}
          variants={fadeUp}
          className="bg-gray-50 p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current"
              />
            ))}
          </div>
          <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3 font-bold text-blue-900">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold font-['Barlow']">{testimonial.name}</p>
              <p className="text-sm text-gray-500 italic">
                {testimonial.location}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>
{/* Booking CTA Section */}
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
      className="text-4xl font-bold mb-8 font-['Barlow']"
    >
      Ready to Book Periodic Services?
    </motion.h2>
    <motion.p
      variants={fadeUp}
      className="text-xl mb-8 max-w-2xl mx-auto italic"
    >
      Professional auto repair and maintenance at your convenience
    </motion.p>
    <motion.div
      variants={fadeUp}
      className="flex flex-col md:flex-row justify-center items-center gap-4"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center font-['Barlow'] font-semibold"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Schedule Now
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center font-['Barlow'] font-semibold"
      >
        <Phone className="w-5 h-5 mr-2" />
        Call Us
      </motion.button>
    </motion.div>
  </motion.div>
</section>


      {/* Service Areas Section */}
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
            className="text-4xl font-bold text-center mb-16 text-blue-900 font-['Barlow']"
          >
            Service Areas
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"].map((city, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex items-center bg-white p-4 rounded-lg shadow-sm"
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

export default Tuning;

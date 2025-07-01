import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Users,
  Wrench,
  Star,
  Award,
  PhoneCall,
  Clock,
  MapPin,
  Settings,
  Shield,
  Hammer,
} from "lucide-react";
import Sidenavbar from "../components/sidenavbar";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

// Define data first
const achievements = [
  { number: "50", text: "Expert Technicians" },
  { number: "25", text: "Partner Workshops" },
  { number: "10000", text: "Happy Customers" },
  { number: "24", text: "Hour Support" },
];

// Expanded technicians data
const leadTechnicians = [
  // Original technicians
  {
    name: "James Wilson",
    role: "Master Mechanic",
    specialty: "Engine Specialist",
    experience: "15+ years",
    workshop: "Central Auto Care",
    image: "./assets/images/team/bilal.jpg",
  },
  {
    name: "Sarah Chen",
    role: "Senior Technician",
    specialty: "Electrical Systems",
    experience: "12+ years",
    workshop: "Elite Motors",
    image: "./assets/images/team/muneeb_ch.jpeg",
  },
  {
    name: "Mike Rodriguez",
    role: "Lead Diagnostic Expert",
    specialty: "Computer Diagnostics",
    experience: "10+ years",
    workshop: "Tech Auto Solutions",
    image: "./assets/images/team/tariq.jpg",
  },
  {
    name: "David Kumar",
    role: "Emergency Response Lead",
    specialty: "Roadside Assistance",
    experience: "8+ years",
    workshop: "Rapid Auto Care",
    image: "./assets/images/team/bilal.jpg",
  },
  // Additional technicians
  {
    name: "Emma Thompson",
    role: "Hybrid Specialist",
    specialty: "Electric & Hybrid Vehicles",
    experience: "11+ years",
    workshop: "Green Auto Tech",
    image: "./assets/images/team/bilal.jpg",
  },
  {
    name: "Carlos Martinez",
    role: "Performance Expert",
    specialty: "Performance Tuning",
    experience: "13+ years",
    workshop: "Speed Masters",
    image: "./assets/images/team/bilal.jpg",
  },
  {
    name: "Lisa Wang",
    role: "Transmission Specialist",
    specialty: "Automatic & Manual Transmissions",
    experience: "9+ years",
    workshop: "Gear Pro Auto",
    image: "./assets/images/team/bilal.jpg",
  },
  {
    name: "John Smith",
    role: "Body Work Expert",
    specialty: "Body & Paint Work",
    experience: "14+ years",
    workshop: "Premium Auto Body",
    image: "./assets/images/team/bilal.jpg",
  },
];

// Create an infinite loop array by repeating technicians
const infiniteLeadTechnicians = [
  ...leadTechnicians,
  ...leadTechnicians,
  ...leadTechnicians,
];

const Team = () => {
  const [countedValues, setCountedValues] = useState(achievements.map(() => 0));
  const [slideIndex, setSlideIndex] = useState(0);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Counter animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            achievements.forEach((achievement, index) => {
              const finalValue = parseInt(achievement.number);
              let currentValue = 0;
              const duration = 2000;
              const steps = 60;
              const increment = finalValue / steps;
              const stepTime = duration / steps;

              const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                  clearInterval(timer);
                  setCountedValues((prev) => {
                    const newValues = [...prev];
                    newValues[index] = finalValue;
                    return newValues;
                  });
                } else {
                  setCountedValues((prev) => {
                    const newValues = [...prev];
                    newValues[index] = Math.floor(currentValue);
                    return newValues;
                  });
                }
              }, stepTime);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const statsSection = document.querySelector("#stats-section");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Continuous auto-sliding for technicians
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(
        (prev) => (prev + 1) % (infiniteLeadTechnicians.length - 4)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">

      <Sidenavbar />
      <Link to="/"><Header /></Link>
      {/* Hero Section */}
      <motion.section
      className="relative h-96 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('./assets/images/2.jpg')" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold mb-4">Meet Our Expert Team</h1>
        <p className="text-xl max-w-2xl">
          Dedicated professionals committed to keeping you safe on the road
        </p>
      </div>
    </motion.section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                {...fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-4xl font-bold text-blue-900 mb-2">
                  {countedValues[index]}
                  {index === 3 ? "/7" : "+"}
                </h3>
                <p className="text-gray-600">{achievement.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Technicians Section with Continuous Slider */}
      <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Our Lead Technicians
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our highly skilled team of certified technicians who bring
            years of experience and expertise to solve any vehicle-related
            challenge.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="flex gap-8"
            initial={{ x: 0 }}
            animate={{ x: `${-slideIndex * 25}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {infiniteLeadTechnicians.map((tech, index) => (
              <motion.div
                key={index}
                className="w-1/4 flex-none"
                {...fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      {tech.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{tech.role}</p>
                    <p className="text-sm text-gray-500 mb-1">
                      Specialty: {tech.specialty}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      Experience: {tech.experience}
                    </p>
                    <p className="text-sm text-blue-600">{tech.workshop}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(leadTechnicians.length / 4) }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(slideIndex / 4) === index
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 w-2'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>

      {/* Updated Services Section */}
      <section className="py-20 bg-blue-50 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="text-black text-4xl font-bold font-serif mb-4">
              Our Services
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500">
              Comprehensive automotive solutions delivered with excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Wrench className="w-12 h-12" />,
                title: "Emergency Repairs",
                description:
                  "24/7 roadside assistance and emergency repair services",
              },
              {
                icon: <Settings className="w-12 h-12" />,
                title: "Preventive Maintenance",
                description:
                  "Regular servicing to prevent unexpected breakdowns",
              },
              {
                icon: <Hammer className="w-12 h-12" />,
                title: "Performance Tuning",
                description: "Custom performance upgrades and optimization",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden group rounded-xl"
                {...fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900  group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="relative p-8">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-200">{service.description}</p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      {/* Quality Standards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Our Quality Standards
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards of service quality and customer
              satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Award className="w-12 h-12 text-blue-900" />,
                title: "Certified Technicians",
                description:
                  "All our technicians are certified and regularly trained on the latest automotive technologies.",
              },
              {
                icon: <Clock className="w-12 h-12 text-blue-900" />,
                title: "Quick Response Time",
                description:
                  "We guarantee fast response times for emergency services and regular appointments.",
              },
            ].map((standard, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg flex items-start gap-6"
                {...fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <div>{standard.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {standard.title}
                  </h3>
                  <p className="text-gray-600">{standard.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold mb-4">
              Need Emergency Assistance?
            </h2>
            <p className="text-xl mb-8">
              Our team is available 24/7 to help you with any vehicle-related
              emergency
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Us Now
            </button>
          </motion.div>
        </div>
      </section>

<Footer/>

    </div>
  );
};

export default Team;

// import React, { useEffect, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import {
//   Users,
//   Wrench,
//   Star,
//   Award,
//   PhoneCall,
//   Clock,
//   MapPin,
//   Settings,
//   Shield,
//   Hammer,
// } from "lucide-react";
// import Sidenavbar from "../components/sidenavbar";
// import Header from "../components/header";
// import Footer from "../components/footer";
// import { Link } from "react-router-dom";

// // Define data first
// const achievements = [
//   { number: "50", text: "Expert Technicians" },
//   { number: "25", text: "Partner Workshops" },
//   { number: "10000", text: "Happy Customers" },
//   { number: "24", text: "Hour Support" },
// ];

// // Expanded technicians data
// const leadTechnicians = [
//   // Original technicians
//   {
//     name: "James Wilson",
//     role: "Master Mechanic",
//     specialty: "Engine Specialist",
//     experience: "15+ years",
//     workshop: "Central Auto Care",
//     image: "./assets/images/team/bilal.jpg",
//   },
//   {
//     name: "Sarah Chen",
//     role: "Senior Technician",
//     specialty: "Electrical Systems",
//     experience: "12+ years",
//     workshop: "Elite Motors",
//     image: "./assets/images/team/muneeb_ch.jpeg",
//   },
//   {
//     name: "Mike Rodriguez",
//     role: "Lead Diagnostic Expert",
//     specialty: "Computer Diagnostics",
//     experience: "10+ years",
//     workshop: "Tech Auto Solutions",
//     image: "./assets/images/team/tariq.jpg",
//   },
//   {
//     name: "David Kumar",
//     role: "Emergency Response Lead",
//     specialty: "Roadside Assistance",
//     experience: "8+ years",
//     workshop: "Rapid Auto Care",
//     image: "./assets/images/team/bilal.jpg",
//   },
//   // Additional technicians
//   {
//     name: "Emma Thompson",
//     role: "Hybrid Specialist",
//     specialty: "Electric & Hybrid Vehicles",
//     experience: "11+ years",
//     workshop: "Green Auto Tech",
//     image: "./assets/images/team/bilal.jpg",
//   },
//   {
//     name: "Carlos Martinez",
//     role: "Performance Expert",
//     specialty: "Performance Tuning",
//     experience: "13+ years",
//     workshop: "Speed Masters",
//     image: "./assets/images/team/bilal.jpg",
//   },
//   {
//     name: "Lisa Wang",
//     role: "Transmission Specialist",
//     specialty: "Automatic & Manual Transmissions",
//     experience: "9+ years",
//     workshop: "Gear Pro Auto",
//     image: "./assets/images/team/bilal.jpg",
//   },
//   {
//     name: "John Smith",
//     role: "Body Work Expert",
//     specialty: "Body & Paint Work",
//     experience: "14+ years",
//     workshop: "Premium Auto Body",
//     image: "./assets/images/team/bilal.jpg",
//   },
// ];

// // Create an infinite loop array by repeating technicians
// const infiniteLeadTechnicians = [
//   ...leadTechnicians,
//   ...leadTechnicians,
//   ...leadTechnicians,
// ];

// const Team = () => {
//   const [countedValues, setCountedValues] = useState(achievements.map(() => 0));
//   const [slideIndex, setSlideIndex] = useState(0);

//   // Animation variants
//   const fadeIn = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//   };

//   // Smooth scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   // Counter animation for stats
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             achievements.forEach((achievement, index) => {
//               const finalValue = parseInt(achievement.number);
//               let currentValue = 0;
//               const duration = 2000;
//               const steps = 60;
//               const increment = finalValue / steps;
//               const stepTime = duration / steps;

//               const timer = setInterval(() => {
//                 currentValue += increment;
//                 if (currentValue >= finalValue) {
//                   clearInterval(timer);
//                   setCountedValues((prev) => {
//                     const newValues = [...prev];
//                     newValues[index] = finalValue;
//                     return newValues;
//                   });
//                 } else {
//                   setCountedValues((prev) => {
//                     const newValues = [...prev];
//                     newValues[index] = Math.floor(currentValue);
//                     return newValues;
//                   });
//                 }
//               }, stepTime);
//             });
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const statsSection = document.querySelector("#stats-section");
//     if (statsSection) {
//       observer.observe(statsSection);
//     }

//     return () => observer.disconnect();
//   }, []);

//   // Continuous auto-sliding for technicians
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSlideIndex(
//         (prev) => (prev + 1) % (infiniteLeadTechnicians.length - 4)
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-white">

//       <Sidenavbar />
//       <Link to="/"><Header /></Link>
//       {/* Hero Section */}
//       <motion.section
//       className="relative h-96 bg-cover bg-center bg-no-repeat text-white"
//       style={{ backgroundImage: "url('./assets/images/2.jpg')" }}
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1 }}
//     >
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
//         <h1 className="text-5xl font-bold mb-4">Meet Our Expert Team</h1>
//         <p className="text-xl max-w-2xl">
//           Dedicated professionals committed to keeping you safe on the road
//         </p>
//       </div>
//     </motion.section>

//       {/* Stats Section */}
//       <section id="stats-section" className="py-20 bg-blue-50">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {achievements.map((achievement, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white p-8 rounded-lg shadow-lg text-center"
//                 {...fadeIn}
//                 transition={{ delay: index * 0.2 }}
//               >
//                 <h3 className="text-4xl font-bold text-blue-900 mb-2">
//                   {countedValues[index]}
//                   {index === 3 ? "/7" : "+"}
//                 </h3>
//                 <p className="text-gray-600">{achievement.text}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Lead Technicians Section with Continuous Slider */}
//       <section className="py-20 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <motion.div className="text-center mb-16" {...fadeIn}>
//           <h2 className="text-4xl font-bold text-blue-900 mb-4">
//             Our Lead Technicians
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Meet our highly skilled team of certified technicians who bring
//             years of experience and expertise to solve any vehicle-related
//             challenge.
//           </p>
//         </motion.div>

//         <div className="relative">
//           <motion.div
//             className="flex gap-8"
//             initial={{ x: 0 }}
//             animate={{ x: `${-slideIndex * 25}%` }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//           >
//             {infiniteLeadTechnicians.map((tech, index) => (
//               <motion.div
//                 key={index}
//                 className="w-1/4 flex-none"
//                 {...fadeIn}
//                 transition={{ delay: index * 0.2 }}
//               >
//                 <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
//                   <img
//                     src={tech.image}
//                     alt={tech.name}
//                     className="w-full h-64 object-cover"
//                   />
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-blue-900 mb-2">
//                       {tech.name}
//                     </h3>
//                     <p className="text-gray-600 mb-2">{tech.role}</p>
//                     <p className="text-sm text-gray-500 mb-1">
//                       Specialty: {tech.specialty}
//                     </p>
//                     <p className="text-sm text-gray-500 mb-1">
//                       Experience: {tech.experience}
//                     </p>
//                     <p className="text-sm text-blue-600">{tech.workshop}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         {/* Progress indicators */}
//         <div className="flex justify-center mt-8 gap-2">
//           {Array.from({ length: Math.ceil(leadTechnicians.length / 4) }).map((_, index) => (
//             <div
//               key={index}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 Math.floor(slideIndex / 4) === index
//                   ? 'bg-blue-600 w-8'
//                   : 'bg-gray-300 w-2'
//               }`}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </section>

//       {/* Updated Services Section */}
//       <section className="py-20 bg-blue-50 text-white">
//         <div className="container mx-auto px-4">
//           <motion.div className="text-center mb-16" {...fadeIn}>
//             <h2 className="text-black text-4xl font-bold font-serif mb-4">
//               Our Services
//             </h2>
//             <p className="max-w-2xl mx-auto text-gray-500">
//               Comprehensive automotive solutions delivered with excellence
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Wrench className="w-12 h-12" />,
//                 title: "Emergency Repairs",
//                 description:
//                   "24/7 roadside assistance and emergency repair services",
//               },
//               {
//                 icon: <Settings className="w-12 h-12" />,
//                 title: "Preventive Maintenance",
//                 description:
//                   "Regular servicing to prevent unexpected breakdowns",
//               },
//               {
//                 icon: <Hammer className="w-12 h-12" />,
//                 title: "Performance Tuning",
//                 description: "Custom performance upgrades and optimization",
//               },
//             ].map((service, index) => (
//               <motion.div
//                 key={index}
//                 className="relative overflow-hidden group rounded-xl"
//                 {...fadeIn}
//                 transition={{ delay: index * 0.2 }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900  group-hover:opacity-90 transition-opacity duration-300"></div>
//                 <div className="relative p-8">
//                   <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
//                     {service.icon}
//                   </div>
//                   <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
//                   <p className="text-gray-200">{service.description}</p>
//                   <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
//                       Learn More
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Rest of the sections remain the same */}
//       {/* Quality Standards Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <motion.div className="text-center mb-16" {...fadeIn}>
//             <h2 className="text-4xl font-bold text-blue-900 mb-4">
//               Our Quality Standards
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               We maintain the highest standards of service quality and customer
//               satisfaction.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {[
//               {
//                 icon: <Award className="w-12 h-12 text-blue-900" />,
//                 title: "Certified Technicians",
//                 description:
//                   "All our technicians are certified and regularly trained on the latest automotive technologies.",
//               },
//               {
//                 icon: <Clock className="w-12 h-12 text-blue-900" />,
//                 title: "Quick Response Time",
//                 description:
//                   "We guarantee fast response times for emergency services and regular appointments.",
//               },
//             ].map((standard, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white p-8 rounded-lg shadow-lg flex items-start gap-6"
//                 {...fadeIn}
//                 transition={{ delay: index * 0.2 }}
//               >
//                 <div>{standard.icon}</div>
//                 <div>
//                   <h3 className="text-xl font-bold text-blue-900 mb-2">
//                     {standard.title}
//                   </h3>
//                   <p className="text-gray-600">{standard.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-black text-white">
//         <div className="container mx-auto px-4 text-center">
//           <motion.div {...fadeIn}>
//             <h2 className="text-4xl font-bold mb-4">
//               Need Emergency Assistance?
//             </h2>
//             <p className="text-xl mb-8">
//               Our team is available 24/7 to help you with any vehicle-related
//               emergency
//             </p>
//             <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
//               Contact Us Now
//             </button>
//           </motion.div>
//         </div>
//       </section>

// <Footer/>

//     </div>
//   );
// };

// export default Team;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  Mail,
  Phone,
} from "lucide-react";
import Sidenavbar from "../components/sidenavbar";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";

// Data
const achievements = [
  { number: "50", text: "Expert Technicians" },
  { number: "25", text: "Partner Workshops" },
  { number: "10000", text: "Happy Customers" },
  { number: "24", text: "Hour Support" },
];

const leadTechnicians = [
  {
    name: "Manal Khan",
    role: "Project Manager",
    specialty: "Management",
    experience: "2+ year",
    workshop: "Central Auto Care",
    image: "./assets/images/profile.png",
    phone: "03287348758",
    email: "manalkhan@gmail.com",
  },
  {
    name: "Muneeb Shahid",
    role: "Front-End Developer",
    specialty: "Development",
    experience: "2+ years",
    workshop: "Elite Motors",
    image: "./assets/images/team/muneeb_ch.jpeg",
    phone: "03649264940",
    email: "muneebshahid@gmail.com",
  },
  {
    name: "Salihah Sadiq",
    role: "Back-End Developer",
    specialty: "Computer Diagnostics",
    experience: "2+ years",
    workshop: "Tech Auto Solutions",
    image: "./assets/images/profile.png",
    phone: "03649275926",
    email: "salihahsagiq@gmail.com",
  },
];

const Team = () => {
  const [countedValues, setCountedValues] = useState(achievements.map(() => 0));
  const navigate = useNavigate(); // 👈 Hook for navigation

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.1 });

    const statsSection = document.querySelector("#stats-section");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      <Sidenavbar />
      <Link to="/"><Header /></Link>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Design */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border-2 border-white rounded-full"></div>
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 transform -rotate-12">
            <Wrench className="w-20 h-20" />
          </div>
          <div className="absolute top-1/3 right-1/4 transform rotate-45">
            <Settings className="w-16 h-16" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 transform rotate-12">
            <Hammer className="w-18 h-18" />
          </div>
        </div>

        <div className="relative container mx-auto px-4 h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  Expert Automotive Team
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Meet Our
                <span className="block text-blue-200">Expert Team</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-lg">
                Dedicated professionals with decades of combined experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/contact")} // 👈 Navigate to contact page
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Our Team
                </button>
                <button
                  onClick={() => {
                    navigate("/"); // 👈 Navigate to home
                    window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 Scroll to top
                  }}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
                >
                  View Services
                </button>
              </div>
            </motion.div>

            {/* Right Image Placeholder */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="bg-white/20 rounded-lg h-80 flex items-center justify-center">
                  <div className="text-center">
                    <Wrench className="w-16 h-16 mx-auto mb-4 text-white/70" />
                    <p className="text-white/70 text-lg">Professional Workshop</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white text-blue-900 p-4 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </motion.section>

{/* Stats Section */}
<section id="stats-section" className="py-20 bg-blue-50">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {achievements.map((achievement, index) => (
        <motion.div
          key={index}
          className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
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

{/* Lead Technicians Section */}
<section className="py-20 bg-white">
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

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {leadTechnicians.map((tech, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          {...fadeIn}
          transition={{ delay: index * 0.2 }}
        >
          <div className="relative">
            <img
              src={tech.image}
              alt={tech.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {tech.experience}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              {tech.name}
            </h3>
            <p className="text-blue-600 font-semibold mb-1">{tech.role}</p>
            <p className="text-gray-600 mb-3">{tech.specialty}</p>
            <p className="text-sm text-gray-500 mb-4">{tech.workshop}</p>

            <div className="border-t pt-4">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <a
                  href={`tel:${tech.phone}`}
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {tech.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <a
                  href={`mailto:${tech.email}`}
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {tech.email}
                </a>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact {tech.name.split(" ")[0]}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Services Section */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="relative p-8">
            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-200">{service.description}</p>
            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link to="/">
                <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

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
<section className="py-20 bg-gradient-to-br from-blue-800 to-black text-white">

  <div className="container mx-auto px-4 text-center">
    <motion.div {...fadeIn}>
      <h2 className="text-4xl font-bold mb-4">Need Emergency Assistance?</h2>
      <p className="text-xl mb-8">
        Our team is available 24/7 to help you with any vehicle-related
        emergency
      </p>
     <button
  onClick={() => navigate("/contact")}
  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
>
  Contact Us Now
</button>

    </motion.div>
  </div>
</section>

<Footer />

    </div>
  );
};

export default Team;

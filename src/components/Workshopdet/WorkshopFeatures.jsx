// // 

// import React from "react";
// import { Wrench, Car, LineChart, Clock } from "lucide-react";

// const WorkshopFeatures = () => {
//   const features = [
//     {
//       icon: <Wrench className="w-6 h-6" />,
//       title: "VEHICLE MAINTENANCE",
//       description:
//         "Vehicle maintenance is crucial to your car's long-term performance and quality of operation.",
//     },
//     {
//       icon: <Car className="w-6 h-6" />,
//       title: "SERVICE WARRANTY",
//       description:
//         "The parts and services offered by Workshop Plus are covered under our warranty plan.",
//     },
//     {
//       icon: <LineChart className="w-6 h-6" />,
//       title: "RELIABLE DELIVERY SCHEDULE",
//       description:
//         "Accurate time slots and delivery times are allotted to each vehicle delivered to us.",
//     },
//     {
//       icon: <Clock className="w-6 h-6" />,
//       title: "ROUND THE CLOCK SERVICE",
//       description:
//         "Our team attends to emergency breakdown and repairs at any time of the day, and even on weekends and holidays.",
//     },
//   ];

//   return (
//     <div className="relative w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400/20 rounded-full blur-lg animate-pulse delay-500"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
//             OUR SERVICES
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Professional Workshop
//             <span className="text-blue-600 block">Features</span>
//           </h2>
//           <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100/50"
//             >
//               {/* Hover Effect Background */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//               {/* Content */}
//               <div className="relative z-10">
//                 {/* Icon Container */}
//                 <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
//                   <div className="text-white group-hover:text-white transition-colors duration-300">
//                     {feature.icon}
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-gray-900 group-hover:text-white text-lg font-bold mb-4 transition-colors duration-300">
//                   {feature.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-gray-600 group-hover:text-blue-100 text-sm leading-relaxed transition-colors duration-300">
//                   {feature.description}
//                 </p>

//                 {/* Decorative Element */}
//                 <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
//               </div>

//               {/* Bottom Border Accent */}
//               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//             </div>
//           ))}
//         </div>

//         {/* Call to Action */}
//         <div className="text-center mt-16">
//           <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
//             Learn More About Our Services
//             <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkshopFeatures;

import React, { useState, useEffect } from "react";
import { Wrench, Car, LineChart, Clock } from "lucide-react";

const WorkshopFeatures = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('workshop-features');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const features = [
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "VEHICLE MAINTENANCE",
      description: "Vehicle maintenance is crucial to your car's long-term performance and quality of operation.",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "SERVICE WARRANTY",
      description: "The parts and services offered by Workshop Plus are covered under our warranty plan.",
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "RELIABLE DELIVERY SCHEDULE",
      description: "Accurate time slots and delivery times are allotted to each vehicle delivered to us.",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "ROUND THE CLOCK SERVICE",
      description: "Our team attends to emergency breakdown and repairs at any time of the day, and even on weekends and holidays.",
      color: "from-blue-600 to-blue-800"
    },
  ];

  return (
    <section
      id="workshop-features"
      className="relative w-full bg-gradient-to-br from-white via-blue-50/60 to-blue-100/80 py-12 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-blue-100/20 animate-pulse"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-200/10 to-transparent"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Workshop</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
        </div>

        {/* Interactive Feature Display */}
        <div className="max-w-6xl mx-auto">
          {/* Feature Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-100">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                    activeFeature === index
                      ? `bg-gradient-to-r ${feature.color} text-white scale-110 shadow-lg`
                      : 'bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
                  }`}
                >
                  {feature.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Main Feature Display */}
          <div className="relative h-80 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  activeFeature === index
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  {/* Icon Display */}
                  <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-12">
                    <div className={`w-28 h-28 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-2xl relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      <div className="relative z-10 text-white">
                        {React.cloneElement(feature.icon, { className: "w-10 h-10" })}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left max-w-2xl">
                    <h3 className={`text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center mb-8">
            <div className="w-64 h-2 bg-white/80 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full transition-all duration-300"
                style={{ width: `${((activeFeature + 1) / features.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => console.log('Navigate to services')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Explore All Services</span>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WorkshopFeatures;
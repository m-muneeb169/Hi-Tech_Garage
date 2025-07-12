// import React, { useState, useEffect } from "react";
// import { Wrench, Car, LineChart, Clock } from "lucide-react";

// const WorkshopFeatures = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.3 }
//     );

//     const section = document.getElementById('workshop-features');
//     if (section) observer.observe(section);

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % features.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setMousePosition({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top
//     });
//   };

//   const features = [
//     {
//       icon: <Wrench className="w-6 h-6" />,
//       title: "VEHICLE MAINTENANCE",
//       description: "Vehicle maintenance is crucial to your car's long-term performance and quality of operation.",
//       color: "from-blue-500 to-blue-700"
//     },
//     {
//       icon: <Car className="w-6 h-6" />,
//       title: "SERVICE WARRANTY",
//       description: "The parts and services offered by Workshop Plus are covered under our warranty plan.",
//       color: "from-blue-600 to-blue-800"
//     },
//     {
//       icon: <LineChart className="w-6 h-6" />,
//       title: "RELIABLE DELIVERY SCHEDULE",
//       description: "Accurate time slots and delivery times are allotted to each vehicle delivered to us.",
//       color: "from-blue-500 to-blue-700"
//     },
//     {
//       icon: <Clock className="w-6 h-6" />,
//       title: "ROUND THE CLOCK SERVICE",
//       description: "Our team attends to emergency breakdown and repairs at any time of the day, and even on weekends and holidays.",
//       color: "from-blue-600 to-blue-800"
//     },
//   ];

//   // Generate random circles with different properties
//   const generateCircles = () => {
//     const circles = [];
//     for (let i = 0; i < 15; i++) {
//       circles.push({
//         id: i,
//         size: Math.random() * 80 + 30, // 30px to 110px
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         opacity: Math.random() * 0.3 + 0.05, // 0.05 to 0.35
//         duration: Math.random() * 10 + 6, // 6s to 16s
//         delay: Math.random() * 8, // 0s to 8s delay
//         shade: Math.floor(Math.random() * 4), // 0-3 for different light shades
//         pulseSpeed: Math.random() * 4 + 3, // 3s to 7s pulse
//       });
//     }
//     return circles;
//   };

//   const circles = generateCircles();

//   return (
//     <section
//       id="workshop-features"
//       className="relative w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       {/* Animated Circle Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         {circles.map((circle) => {
//           const getShadeClass = (shade) => {
//             switch(shade) {
//               case 0: return 'bg-blue-100';
//               case 1: return 'bg-blue-50';
//               case 2: return 'bg-slate-100';
//               case 3: return 'bg-blue-200';
//               default: return 'bg-blue-100';
//             }
//           };

//           const getInnerShadeClass = (shade) => {
//             switch(shade) {
//               case 0: return 'bg-blue-200';
//               case 1: return 'bg-blue-100';
//               case 2: return 'bg-slate-200';
//               case 3: return 'bg-blue-300';
//               default: return 'bg-blue-200';
//             }
//           };

//           return (
//             <div
//               key={circle.id}
//               className={`absolute rounded-full ${getShadeClass(circle.shade)} animate-float-fade`}
//               style={{
//                 width: `${circle.size}px`,
//                 height: `${circle.size}px`,
//                 left: `${circle.x}%`,
//                 top: `${circle.y}%`,
//                 opacity: circle.opacity,
//                 animationDuration: `${circle.duration}s`,
//                 animationDelay: `${circle.delay}s`,
//                 transform: 'translate(-50%, -50%)',
//               }}
//             >
//               {/* Inner pulsing effect */}
//               <div 
//                 className={`absolute inset-0 rounded-full ${getInnerShadeClass(circle.shade)} animate-pulse-scale`}
//                 style={{
//                   animationDuration: `${circle.pulseSpeed}s`,
//                   animationDelay: `${circle.delay * 0.5}s`,
//                 }}
//               />
//             </div>
//           );
//         })}
//       </div>

//       {/* Animated Mesh Background */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-blue-100/20 animate-pulse"></div>
//         <div 
//           className="absolute inset-0 bg-gradient-to-br from-blue-200/10 to-transparent"
//           style={{
//             background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
//           }}
//         ></div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-ping"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 2}s`
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="relative z-10 container mx-auto px-6">
//         {/* Header */}
//         <div className={`text-center mb-6 transition-all duration-1000 transform ${
//           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//         }`}>
//           <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-2">
//             OUR SERVICES
//           </span>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
//             Professional <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Workshop</span>
//           </h2>
//           <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
//         </div>

//         {/* Interactive Feature Display */}
//         <div className="max-w-6xl mx-auto">
//           {/* Feature Navigation */}
//           <div className="flex justify-center mb-6">
//             <div className="flex space-x-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-100">
//               {features.map((feature, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveFeature(index)}
//                   className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform ${
//                     activeFeature === index
//                       ? `bg-gradient-to-r ${feature.color} text-white scale-110 shadow-lg`
//                       : 'bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
//                   }`}
//                 >
//                   {feature.icon}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Main Feature Display */}
//           <div className="relative h-80 mb-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-700 transform ${
//                   activeFeature === index
//                     ? 'opacity-100 translate-y-0 scale-100'
//                     : 'opacity-0 translate-y-8 scale-95'
//                 }`}
//               >
//                 <div className="flex flex-col lg:flex-row items-center justify-center h-full">
//                   {/* Icon Display */}
//                   <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-12">
//                     <div className={`w-28 h-28 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-2xl relative overflow-hidden`}>
//                       <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
//                       <div className="relative z-10 text-white">
//                         {React.cloneElement(feature.icon, { className: "w-10 h-10" })}
//                       </div>
//                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 text-center lg:text-left max-w-2xl">
//                     <h3 className={`text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-600 text-lg leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }

//         @keyframes float-fade {
//           0% { 
//             opacity: 0;
//             transform: translate(-50%, -50%) scale(0.8) translateY(20px);
//           }
//           20% { 
//             opacity: 1;
//             transform: translate(-50%, -50%) scale(1) translateY(0px);
//           }
//           80% { 
//             opacity: 1;
//             transform: translate(-50%, -50%) scale(1) translateY(-10px);
//           }
//           100% { 
//             opacity: 0;
//             transform: translate(-50%, -50%) scale(0.8) translateY(-30px);
//           }
//         }

//         @keyframes pulse-scale {
//           0% { 
//             transform: scale(0.8);
//             opacity: 0.8;
//           }
//           50% { 
//             transform: scale(1.1);
//             opacity: 0.4;
//           }
//           100% { 
//             transform: scale(0.8);
//             opacity: 0.8;
//           }
//         }

//         .animate-shimmer {
//           animation: shimmer 3s ease-in-out infinite;
//         }

//         .animate-float-fade {
//           animation: float-fade infinite ease-in-out;
//         }

//         .animate-pulse-scale {
//           animation: pulse-scale infinite ease-in-out;
//         }
//       `}</style>
//     </section>
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

    const section = document.getElementById("workshop-features");
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
    // Only track mouse movements, not touch events
    if (e.type === 'mousemove') {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const features = [
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "VEHICLE MAINTENANCE",
      description:
        "Vehicle maintenance is crucial to your car's long-term performance and quality of operation.",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "SERVICE WARRANTY",
      description:
        "The parts and services offered by Workshop Plus are covered under our warranty plan.",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "RELIABLE DELIVERY SCHEDULE",
      description:
        "Accurate time slots and delivery times are allotted to each vehicle delivered to us.",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "ROUND THE CLOCK SERVICE",
      description:
        "Our team attends to emergency breakdown and repairs at any time of the day, and even on weekends and holidays.",
      color: "from-blue-600 to-blue-800",
    },
  ];

  const generateCircles = () => {
    const circles = [];
    for (let i = 0; i < 8; i++) {
      circles.push({
        id: i,
        size: Math.random() * 50 + 30,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.2 + 0.05,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
        shade: Math.floor(Math.random() * 4),
        pulseSpeed: Math.random() * 4 + 3,
      });
    }
    return circles;
  };

  const circles = generateCircles();

  return (
    <section
      id="workshop-features"
      className="relative w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Background Circles */}
      <div className="absolute inset-0 pointer-events-none">
        {circles.map((circle) => {
          const getShadeClass = (shade) => {
            switch (shade) {
              case 0:
                return "bg-blue-100";
              case 1:
                return "bg-blue-50";
              case 2:
                return "bg-slate-100";
              case 3:
                return "bg-blue-200";
              default:
                return "bg-blue-100";
            }
          };

          const getInnerShadeClass = (shade) => {
            switch (shade) {
              case 0:
                return "bg-blue-200";
              case 1:
                return "bg-blue-100";
              case 2:
                return "bg-slate-200";
              case 3:
                return "bg-blue-300";
              default:
                return "bg-blue-200";
            }
          };

          return (
            <div
              key={circle.id}
              className={`absolute rounded-full ${getShadeClass(circle.shade)} animate-float-fade`}
              style={{
                width: `${circle.size}px`,
                height: `${circle.size}px`,
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                opacity: circle.opacity,
                animationDuration: `${circle.duration}s`,
                animationDelay: `${circle.delay}s`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className={`absolute inset-0 rounded-full ${getInnerShadeClass(
                  circle.shade
                )} animate-pulse-scale`}
                style={{
                  animationDuration: `${circle.pulseSpeed}s`,
                  animationDelay: `${circle.delay * 0.5}s`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Mesh Background */}
      <div className="absolute inset-0 opacity-30 will-change-transform contain-layout">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-blue-100/20 animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-200/10 to-transparent"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
            willChange: "transform",
          }}
        ></div>
      </div>

      {/* Floating Pings */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/10 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-2">
            OUR SERVICES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Workshop
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
        </div>

        {/* Feature Buttons */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-100">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                  activeFeature === index
                    ? `bg-gradient-to-r ${feature.color} text-white scale-110 shadow-lg`
                    : "bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
                }`}
              >
                {feature.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Display */}
        <div className="relative h-80 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 transform ${
                activeFeature === index
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-12">
                  <div
                    className={`w-28 h-28 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-2xl relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <div className="relative z-10 text-white">
                      {React.cloneElement(feature.icon, { className: "w-10 h-10" })}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left max-w-2xl">
                  <h3
                    className={`text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes float-fade {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) translateY(20px);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) translateY(0px);
          }
          80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) translateY(-10px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) translateY(-30px);
          }
        }
        @keyframes pulse-scale {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.8;
          }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-float-fade {
          animation: float-fade infinite ease-in-out;
        }
        .animate-pulse-scale {
          animation: pulse-scale infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default WorkshopFeatures;

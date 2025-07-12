// import React, { useEffect, useState } from 'react';

// const LogoSlider = () => {
//   const [position, setPosition] = useState(0);
  
//   // Workshop/company data
//   const logos = [
//     { name: "Shelby Mustang", logo: "./assets/images/logos/shelby.png" },
//     { name: "Audi", logo: "./assets/images/logos/audi.png" },
//     { name: "Mustang", logo: "./assets/images/logos/mustang.png" },
//     { name: "Chevrolet", logo: "./assets/images/logos/chevrolet.png" },
//     { name: "Honda", logo: "./assets/images/logos/honda.png" },
//     { name: "Hyundai", logo: "./assets/images/logos/hyundai.png" },
//     { name: "Kia", logo: "./assets/images/logos/kia.png" },
//     { name: "land Rover", logo: "./assets/images/logos/landRover.png" },
//     { name: "Mazda", logo: "./assets/images/logos/mazda.png" },
//     { name: "Nissan", logo: "./assets/images/logos/nissan.png" },
//     { name: "Toyota", logo: "./assets/images/logos/toyota.png" },
//     { name: "Michelin", logo: "./assets/images/logos/michelin.png" },
//     { name: "BMW", logo: "./assets/images/logos/bmw.png" },
//     { name: "Volkswagen", logo: "./assets/images/logos/Volks.png" },
//     { name: "Volvo", logo: "./assets/images/logos/volvo.png" }
//   ];

//   // Duplicate logos for seamless infinite scroll
//   const duplicatedLogos = [...logos, ...logos];

//   useEffect(() => {
//     const animationSpeed = 0.5; // pixels per frame
//     let animationFrameId;
    
//     const animate = () => {
//       setPosition((prevPosition) => {
//         // Reset position when all logos have scrolled
//         if (prevPosition <= -logos.length * 220) {
//           return 0;
//         }
//         return prevPosition - animationSpeed;
//       });
      
//       animationFrameId = requestAnimationFrame(animate);
//     };
    
//     animationFrameId = requestAnimationFrame(animate);
    
//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [logos.length]);

//   return (
//     <section className="w-full py-28 overflow-hidden">
//       <div className="container mx-auto px-4 mb-8">
//         <h2 className="text-4xl font-bold font-serif text-black text-center mb-28">
//           Our Trusted Partners
//         </h2>
//       </div>
      
//       <div className="relative w-full overflow-hidden">
//         <div 
//           className="flex"
//           style={{
//             transform: `translateX(${position}px)`,
//             width: 'fit-content'
//           }}
//         >
//           {duplicatedLogos.map((logo, index) => (
//             <div
//               key={`${logo.name}-${index}`}
//               className="flex-shrink-0 mx-8 w-48 filter grayscale hover:grayscale-0 transition-all duration-300"
//             >
//               <div className="bg-white rounded-lg p-6 h-32 flex items-center justify-center shadow-lg">
//                 <img
//                   src={logo.logo}
//                   alt={logo.name}
//                   className="max-w-full max-h-full object-contain"
//                 />
//               </div>
//               <p className="text-black text-center mt-3 text-lg font-medium">
//                 {logo.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LogoSlider;
import React, { useEffect, useState, useRef } from 'react';

const LogoSlider = () => {
  const [position, setPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Workshop/company data
  const logos = [
    { name: "Shelby Mustang", logo: "./assets/images/logos/shelby.png" },
    { name: "Audi", logo: "./assets/images/logos/audi.png" },
    { name: "Mustang", logo: "./assets/images/logos/mustang.png" },
    { name: "Chevrolet", logo: "./assets/images/logos/chevrolet.png" },
    { name: "Honda", logo: "./assets/images/logos/honda.png" },
    { name: "Hyundai", logo: "./assets/images/logos/hyundai.png" },
    { name: "Kia", logo: "./assets/images/logos/kia.png" },
    { name: "Land Rover", logo: "./assets/images/logos/landRover.png" },
    { name: "Mazda", logo: "./assets/images/logos/mazda.png" },
    { name: "Nissan", logo: "./assets/images/logos/nissan.png" },
    { name: "Toyota", logo: "./assets/images/logos/toyota.png" },
    { name: "Michelin", logo: "./assets/images/logos/michelin.png" },
    { name: "BMW", logo: "./assets/images/logos/bmw.png" },
    { name: "Volkswagen", logo: "./assets/images/logos/Volks.png" },
    { name: "Volvo", logo: "./assets/images/logos/volvo.png" }
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    const animationSpeed = 0.8;
    let animationFrameId;

    const animate = () => {
      setPosition((prevPosition) => {
        if (prevPosition <= -logos.length * 240) {
          return 0;
        }
        return prevPosition - animationSpeed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [logos.length]);

  // Scroll Animation Observer with re-trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-800 opacity-20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-700 rounded-full opacity-10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 mb-16 relative z-10">
        {/* Header */}
        <div className={`text-center mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`inline-block px-6 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Trusted by Industry Leaders
          </div>
          <h2 className={`text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent mb-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our Trusted Partners
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Collaborating with world-class automotive brands to deliver exceptional service and quality
          </p>
        </div>

        {/* Decorative Line */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Logo Slider */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-blue-50 via-blue-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-blue-50 via-blue-50 to-transparent z-10"></div>

        <div
          className="flex items-center"
          style={{
            transform: `translateX(${position}px)`,
            width: 'fit-content'
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 mx-4 w-56 group"
            >
              <div className="relative bg-white rounded-2xl p-8 h-36 flex items-center justify-center shadow-lg border border-blue-100 
                              group-hover:shadow-2xl group-hover:border-blue-200 group-hover:-translate-y-2 
                              transition-all duration-500 ease-out overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 
                             transition-all duration-500 relative z-10"
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-700 text-lg font-semibold group-hover:text-blue-800 transition-colors duration-300">
                  {logo.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;

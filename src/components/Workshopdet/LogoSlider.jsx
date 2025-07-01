import React, { useEffect, useState } from 'react';

const LogoSlider = () => {
  const [position, setPosition] = useState(0);
  
  // Workshop/company data
  const logos = [
    { name: "Shelby Mustang", logo: "./assets/images/logos/shelby.png" },
    { name: "Audi", logo: "./assets/images/logos/audi.png" },
    { name: "Mustang", logo: "./assets/images/logos/mustang.png" },
    { name: "Chevrolet", logo: "./assets/images/logos/chevrolet.png" },
    { name: "Honda", logo: "./assets/images/logos/honda.png" },
    { name: "Hyundai", logo: "./assets/images/logos/hyundai.png" },
    { name: "Kia", logo: "./assets/images/logos/kia.png" },
    { name: "land Rover", logo: "./assets/images/logos/landRover.png" },
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
    const animationSpeed = 0.5; // pixels per frame
    let animationFrameId;
    
    const animate = () => {
      setPosition((prevPosition) => {
        // Reset position when all logos have scrolled
        if (prevPosition <= -logos.length * 220) {
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

  return (
    <section className="w-full py-28 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-4xl font-bold font-serif text-black text-center mb-28">
          Our Trusted Partners
        </h2>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex"
          style={{
            transform: `translateX(${position}px)`,
            width: 'fit-content'
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 mx-8 w-48 filter grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="bg-white rounded-lg p-6 h-32 flex items-center justify-center shadow-lg">
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-black text-center mt-3 text-lg font-medium">
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
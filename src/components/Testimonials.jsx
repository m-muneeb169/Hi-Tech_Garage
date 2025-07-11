// import React from 'react';
// import { QuoteIcon } from 'lucide-react';

// const Testimonials = () => {
//   const testimonials = [
//     {
//       id: 1,
//       content: "The website design is clean and easy to navigate. It looks like a powerful tool that will make car maintenance more efficient and stress-free for vehicle owners.",
//       author: "Ahsan Nazeer",
//       date: "26 May, 2025"
//     },
//     {
//       id: 2,
//       content: "A very innovative idea! The way it brings together workshops and users in one platform will save time and make the whole process much smoother!",
//       author: "Maryam Rana",
//       date: "09 June, 2015"
//     },
//     {
//       id: 3,
//       content: "Even before going live, the platform already shows great potential. The features like emergency assistance and AI chatbot can truly make a difference in users' experience.",
//       author: "Zara Noor",
//       date: "01 July, 2018"
//     },
//     {
//       id: 4,
//       content: "The booking system and service layout are very well thought out. It feels like this platform will bring real change to how we manage our vehicle issues.",
//       author: "Umaira Ahmed",
//       date: "15 March, 2025"
//     },
//     {
//       id: 5,
//       content: "This website is more than just a booking portal — it's a complete solution for workshop and customer interaction. I’m really looking forward to using it.",
//       author: "Imitiaz Ali",
//       date: "20 March, 2025"
//     },
//     {
//       id: 6,
//       content: "The integration of emergency roadside help and user-friendly service scheduling makes it very practical. It's clear a lot of planning and care went into this project.",
//       author: "Ahmed Nawaz",
//       date: "25 April, 2025"
//     },
//     {
//         "id": 7,
//         "content": "It’s rare to find such a well-organized platform before launch. The way everything is structured shows that this will be a valuable resource for both customers and workshops.",
//         "author": "Sara Hassan",
//         "date": "02 November, 2025"
//       },
//       {
//         "id": 8,
//         "content": "I’m genuinely impressed with how this system is built. From AI chatbot support to real-time service tracking, it looks like a modern, smart solution.",
//         "author": "Sher Dil Ijaz",
//         "date": "10 April, 2025"
//       },
//       {
//         "id": 9,
//         "content": "This will be a lifesaver for people who face unexpected breakdowns or need urgent repairs. The features are exactly what users have been waiting for!",
//         "author": "Hamza Sheikh",
//         "date": "18 June, 2025"
//       }
      
//   ];

//   const [currentSlide, setCurrentSlide] = React.useState(0);

//   // Calculate slides
//   const slides = [];
//   for (let i = 0; i < testimonials.length; i += 3) {
//     slides.push(testimonials.slice(i, Math.min(i + 3, testimonials.length)));
//   }

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000); // Increased to 5 seconds

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-16">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl font-bold mb-2">
//           EARLY IMPRESSIONS
//         </h2>
//         <p className="text-gray-500 uppercase">What Our Viewers Think About Hi-Tech Garage So Far</p>
//       </div>

//       <div className="relative overflow-hidden">
//         <div 
//           className="flex transition-transform duration-1000 ease-in-out"
//           style={{ 
//             transform: `translateX(-${currentSlide * 100}%)`,
//           }}
//         >
//           {slides.map((slideGroup, index) => (
//             <div key={index} className="min-w-full flex gap-6 px-4">
//               {slideGroup.map((testimonial) => (
//                 <div key={testimonial.id} className="flex-1">
//                   <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
//                     <QuoteIcon className="w-8 h-8 text-orange-400 mb-4 flex-shrink-0" />
//                     <p className="text-gray-600 mb-6 text-sm flex-grow">{testimonial.content}</p>
//                     <div className="mt-auto">
//                       <p className="font-bold text-gray-900">{testimonial.author}</p>
//                       <p className="text-gray-500 text-xs">{testimonial.date}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-center mt-8 gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full transition-colors ${
//               currentSlide === index ? 'bg-orange-400' : 'bg-gray-300'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Testimonials;


import React from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "The website design is clean and easy to navigate. It looks like a powerful tool that will make car maintenance more efficient and stress-free for vehicle owners.",
      author: "Ahsan Nazeer",
      date: "26 May, 2025"
    },
    {
      id: 2,
      content: "A very innovative idea! The way it brings together workshops and users in one platform will save time and make the whole process much smoother!",
      author: "Maryam Rana",
      date: "09 June, 2015"
    },
    {
      id: 3,
      content: "Even before going live, the platform already shows great potential. The features like emergency assistance and AI chatbot can truly make a difference in users' experience.",
      author: "Zara Noor",
      date: "01 July, 2018"
    },
    {
      id: 4,
      content: "The booking system and service layout are very well thought out. It feels like this platform will bring real change to how we manage our vehicle issues.",
      author: "Umaira Ahmed",
      date: "15 March, 2025"
    },
    {
      id: 5,
      content: "This website is more than just a booking portal — it's a complete solution for workshop and customer interaction. I'm really looking forward to using it.",
      author: "Imitiaz Ali",
      date: "20 March, 2025"
    },
    {
      id: 6,
      content: "The integration of emergency roadside help and user-friendly service scheduling makes it very practical. It's clear a lot of planning and care went into this project.",
      author: "Ahmed Nawaz",
      date: "25 April, 2025"
    },
    {
      id: 7,
      content: "It's rare to find such a well-organized platform before launch. The way everything is structured shows that this will be a valuable resource for both customers and workshops.",
      author: "Sara Hassan",
      date: "02 November, 2025"
    },
    {
      id: 8,
      content: "I'm genuinely impressed with how this system is built. From AI chatbot support to real-time service tracking, it looks like a modern, smart solution.",
      author: "Sher Dil Ijaz",
      date: "10 April, 2025"
    },
    {
      id: 9,
      content: "This will be a lifesaver for people who face unexpected breakdowns or need urgent repairs. The features are exactly what users have been waiting for!",
      author: "Hamza Sheikh",
      date: "18 June, 2025"
    }
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);

  // Calculate slides
  const slides = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    slides.push(testimonials.slice(i, Math.min(i + 3, testimonials.length)));
  }

  React.useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);

      return () => clearInterval(timer);
    }
  }, [slides.length, isHovering]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 rounded-full blur-3xl transform scale-150"></div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              EARLY IMPRESSIONS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-md font-medium tracking-wide uppercase">
              What Our Viewers Think About Hi-Tech Garage So Far
            </p>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-all duration-1000 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map((slideGroup, index) => (
                <div key={index} className="min-w-full flex gap-6 px-4">
                  {slideGroup.map((testimonial, cardIndex) => (
                    <div 
                      key={testimonial.id} 
                      className="flex-1 group"
                      style={{
                        animation: `fadeInUp 0.8s ease-out ${cardIndex * 0.2}s both`
                      }}
                    >
                      <div className="relative h-full">
                        {/* 3D Shadow Layer 1 (Furthest) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-300/40 rounded-xl transform translate-x-3 translate-y-3 blur-sm group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300"></div>
                        
                        {/* 3D Shadow Layer 2 (Middle) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-150/25 to-blue-250/35 rounded-xl transform translate-x-2 translate-y-2 blur-[1px] group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300"></div>
                        
                        {/* 3D Shadow Layer 3 (Closest) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-blue-200/30 rounded-xl transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                        
                        {/* Main Card */}
                        <div className="relative bg-white rounded-xl p-6 h-full flex flex-col border border-blue-100 group-hover:border-blue-200 transition-all duration-300 shadow-2xl shadow-blue-500/15 group-hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25)] group-hover:-translate-y-2 group-hover:-translate-x-1">
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Quote Icon */}
                          <div className="relative mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Quote className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="relative flex-grow">
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                              {testimonial.content}
                            </p>
                          </div>
                          
                          {/* Author Info */}
                          <div className="relative mt-auto pt-4 border-t border-blue-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">
                                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{testimonial.author}</p>
                                <p className="text-blue-600 text-xs font-medium">{testimonial.date}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-blue-100 hover:bg-blue-500 hover:text-white transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-blue-100 hover:bg-blue-500 hover:text-white transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-12 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-blue-200 hover:bg-blue-300'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {currentSlide === index && (
                <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        /* Enhanced 3D shadow system */
        .testimonial-card {
          filter: drop-shadow(0 4px 6px rgba(59, 130, 246, 0.1)) 
                  drop-shadow(0 10px 25px rgba(59, 130, 246, 0.15));
        }
        
        .testimonial-card:hover {
          filter: drop-shadow(0 10px 25px rgba(59, 130, 246, 0.2)) 
                  drop-shadow(0 25px 50px rgba(59, 130, 246, 0.25));
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
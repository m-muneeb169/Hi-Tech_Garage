
// import React, { useEffect, useState } from 'react';
// import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

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
//       content: "This website is more than just a booking portal — it's a complete solution for workshop and customer interaction. I'm really looking forward to using it.",
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
//       id: 7,
//       content: "It's rare to find such a well-organized platform before launch. The way everything is structured shows that this will be a valuable resource for both customers and workshops.",
//       author: "Sara Hassan",
//       date: "02 November, 2025"
//     },
//     {
//       id: 8,
//       content: "I'm genuinely impressed with how this system is built. From AI chatbot support to real-time service tracking, it looks like a modern, smart solution.",
//       author: "Sher Dil Ijaz",
//       date: "10 April, 2025"
//     },
//     {
//       id: 9,
//       content: "This will be a lifesaver for people who face unexpected breakdowns or need urgent repairs. The features are exactly what users have been waiting for!",
//       author: "Hamza Sheikh",
//       date: "18 June, 2025"
//     }
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });
//   }, []);

//   const slides = [];
//   for (let i = 0; i < testimonials.length; i += 3) {
//     slides.push(testimonials.slice(i, i + 3));
//   }

//   useEffect(() => {
//     if (!isHovering) {
//       const timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//       }, 6000);
//       return () => clearInterval(timer);
//     }
//   }, [isHovering, slides.length]);

//   return (
//     <div className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16 relative">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 rounded-full blur-3xl transform scale-150"></div>
//           <div className="relative">
//             <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
//               EARLY IMPRESSIONS
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6 rounded-full"></div>
//             <p className="text-gray-600 text-md font-medium tracking-wide uppercase">
//               What Our Viewers Think About Hi-Tech Garage So Far
//             </p>
//           </div>
//         </div>

//         {/* Carousel */}
//         <div
//           className="relative"
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//         >
//           <div className="overflow-hidden rounded-xl">
//             <div
//               className="flex transition-all duration-1000 ease-in-out"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {slides.map((slideGroup, index) => (
//                 <div key={index} className="min-w-full flex gap-6 px-4">
//                   {slideGroup.map((testimonial) => (
//                     <div
//                       key={testimonial.id}
//                       className="flex-1"
//                       data-aos="fade-up"
//                       data-aos-delay={testimonial.id * 100}
//                     >
//                       <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
//                         <div className="mb-4">
//                           <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-3">
//                             <Quote className="w-5 h-5 text-white" />
//                           </div>
//                           <p className="text-gray-700 text-sm leading-relaxed">
//                             {testimonial.content}
//                           </p>
//                         </div>
//                         <div className="pt-4 border-t border-gray-100">
//                           <div className="flex items-center gap-3 mt-2">
//                             <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-semibold text-xs">
//                               {testimonial.author.split(" ").map(n => n[0]).join("")}
//                             </div>
//                             <div>
//                               <p className="font-bold text-sm text-gray-800">{testimonial.author}</p>
//                               <p className="text-xs text-blue-600 font-medium">{testimonial.date}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation */}
//           <button
//             onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
//             className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition"
//             aria-label="Next slide"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center mt-10 gap-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 currentSlide === index ? "bg-blue-500 scale-110" : "bg-blue-200 hover:bg-blue-300"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

import React, { useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    slides.push(testimonials.slice(i, i + 3));
  }

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 2 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Carousel */}
        <div className="relative px-6 sm:px-12 md:px-20">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-all duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideGroup, index) => (
                <div key={index} className="min-w-full flex gap-6">
                  {slideGroup.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="flex-1"
                      data-aos="fade-up"
                      data-aos-delay={testimonial.id * 100}
                    >
                      <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                        <div className="mb-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-3">
                            <Quote className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {testimonial.content}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 mt-2">
                            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-semibold text-xs">
                              {testimonial.author.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-800">{testimonial.author}</p>
                              <p className="text-xs text-blue-600 font-medium">{testimonial.date}</p>
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

          {/* Navigation */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-blue-500 scale-110" : "bg-blue-200 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;


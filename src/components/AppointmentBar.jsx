// import React, { useEffect } from 'react';
// import { Calendar, MapPin, Clock, Wrench, Shield, Star, ArrowRight, Phone } from 'lucide-react';

// const AppointmentBar = () => {
//   useEffect(() => {
//     // Initialize animations
//     const elements = document.querySelectorAll('[data-animate]');
//     elements.forEach((el, index) => {
//       setTimeout(() => {
//         el.style.opacity = '1';
//         el.style.transform = 'translateY(0) scale(1)';
//       }, index * 150);
//     });

//     // Floating animation for decorative elements
//     const floatingElements = document.querySelectorAll('[data-float]');
//     floatingElements.forEach((el, index) => {
//       el.style.animation = `float 4s ease-in-out infinite ${index * 0.8}s`;
//     });
//   }, []);

//   const handleBookAppointment = () => {
//     // Navigate to booking page
//     window.location.href = '/booking';
//     // Alternative: if using React Router
//     // navigate('/booking');
//   };

//   return (
//     <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
//       {/* Enhanced Background Pattern */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30"></div>
//         <div className="absolute top-0 left-0 w-full h-full" style={{
//           backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%),
//                            radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 70%),
//                            radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
//         }}></div>
//       </div>

//       {/* Floating Decorative Elements */}
//       <div className="absolute top-6 right-20 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 blur-sm" data-float></div>
//       <div className="absolute bottom-8 left-20 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 blur-sm" data-float></div>
//       <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 blur-sm" data-float></div>

//       {/* Main Content - Reduced padding */}
//       <div className="relative z-10 container mx-auto px-16 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          
//           {/* Left Section - Brand & Services */}
//           <div 
//             className="space-y-5"
//             data-animate
//             style={{ opacity: 0, transform: 'translateY(30px) scale(0.95)', transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
//           >
//             <div className="space-y-3">
//               <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-300/30">
//                 <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-semibold text-cyan-100 tracking-wide">PROFESSIONAL SERVICE</span>
//               </div>
              
//               <h1 className="text-3xl lg:text-3xl font-bold text-white leading-tight">
//                 Professional
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mt-1">
//                   Auto Services
//                 </span>
//               </h1>
              
//               <p className="text-gray-300 text-base leading-relaxed">
//                 Your trusted local automotive service center for all your car care needs in Faisalabad.
//               </p>
//             </div>
            
//             {/* Service Features */}
//             <div className="grid grid-cols-3 gap-3">
//               <div className="flex flex-col items-center space-y-2 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
//                 <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg">
//                   <Wrench className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-xs text-gray-300 font-medium">Quality Repair</span>
//               </div>
              
//               <div className="flex flex-col items-center space-y-2 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
//                 <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
//                   <Shield className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-xs text-gray-300 font-medium">Quality Assured</span>
//               </div>
              
//               <div className="flex flex-col items-center space-y-2 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
//                 <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
//                   <Star className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-xs text-gray-300 font-medium">Reliable Service</span>
//               </div>
//             </div>
//           </div>

//           {/* Center Section - Call to Action */}
//           <div 
//             className="flex flex-col items-center space-y-5"
//             data-animate
//             style={{ opacity: 0, transform: 'translateY(30px) scale(0.9)', transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)', transitionDelay: '0.2s' }}
//           >
//             {/* Professional Car Icon */}
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/40 via-blue-500/40 to-purple-500/40 rounded-3xl blur-2xl transform scale-110"></div>
              
//               <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-gray-700/50">
//                 <div className="w-20 h-14 mx-auto mb-3">
//                   <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-2xl">
//                     <defs>
//                       <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                         <stop offset="0%" stopColor="#06b6d4" />
//                         <stop offset="50%" stopColor="#3b82f6" />
//                         <stop offset="100%" stopColor="#8b5cf6" />
//                       </linearGradient>
//                       <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                         <stop offset="0%" stopColor="#1e293b" />
//                         <stop offset="100%" stopColor="#475569" />
//                       </linearGradient>
//                     </defs>
                    
//                     {/* Car Body */}
//                     <path d="M10 55 Q10 45 20 45 L30 45 Q35 30 45 30 L75 30 Q85 30 90 45 L100 45 Q110 45 110 55 L110 65 Q110 70 105 70 L95 70 Q90 75 85 75 Q80 75 75 70 L45 70 Q40 75 35 75 Q30 75 25 70 L15 70 Q10 70 10 65 Z" fill="url(#carBodyGradient)" stroke="#1e293b" strokeWidth="1" />
                    
//                     {/* Windows */}
//                     <path d="M40 45 Q45 35 50 35 L70 35 Q75 35 80 45 L75 45 Q70 40 65 40 L55 40 Q50 40 45 45 Z" fill="url(#windowGradient)" />
                    
//                     {/* Wheels */}
//                     <circle cx="35" cy="70" r="8" fill="#374151" stroke="#1e293b" strokeWidth="1" />
//                     <circle cx="85" cy="70" r="8" fill="#374151" stroke="#1e293b" strokeWidth="1" />
//                     <circle cx="35" cy="70" r="5" fill="url(#carBodyGradient)" />
//                     <circle cx="85" cy="70" r="5" fill="url(#carBodyGradient)" />
                    
//                     {/* Headlights */}
//                     <ellipse cx="105" cy="55" rx="3" ry="2" fill="#fbbf24" />
//                     <ellipse cx="15" cy="55" rx="3" ry="2" fill="#ef4444" />
                    
//                     {/* Details */}
//                     <rect x="50" y="50" width="20" height="2" fill="#64748b" rx="1" />
//                     <rect x="45" y="53" width="30" height="1" fill="#64748b" rx="0.5" />
//                   </svg>
//                 </div>
                
//                 <div className="text-center">
//                   <div className="text-white font-bold text-lg">Hi-Tech Garage</div>
//                   <div className="text-cyan-300 text-sm">Auto Service Center</div>
//                 </div>
//               </div>
              
//               <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
//                 Open
//               </div>
//             </div>
            
//             {/* Main CTA Button */}
//             <button
//               onClick={handleBookAppointment}
//               className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="relative flex items-center space-x-3">
//                 <Calendar className="w-5 h-5" />
//                 <span>Book Your Appointment</span>
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//             </button>
//           </div>

//           {/* Right Section - Business Info */}
//           <div 
//             className="space-y-3"
//             data-animate
//             style={{ opacity: 0, transform: 'translateY(30px) scale(0.95)', transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)', transitionDelay: '0.4s' }}
//           >
//             {/* Location */}
//             <div className="group">
//               <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transform hover:-translate-y-1 transition-all duration-300">
//                 <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg">
//                   <MapPin className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="font-bold text-white">Location</div>
//                   <div className="text-sm text-gray-300">Faisalabad, Punjab</div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Service Hours */}
//             <div className="group">
//               <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transform hover:-translate-y-1 transition-all duration-300">
//                 <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
//                   <Clock className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="font-bold text-white">24/7 Service</div>
//                   <div className="text-sm text-gray-300">Always Available</div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-3 pt-2">
//               <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
//                 <div className="text-2xl font-bold text-cyan-400">500+</div>
//                 <div className="text-xs text-gray-400">Happy Clients</div>
//               </div>
//               <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
//                 <div className="text-2xl font-bold text-purple-400">15+</div>
//                 <div className="text-xs text-gray-400">Years Experience</div>
//               </div>
//             </div>
            
//             {/* Secondary CTA */}
//             <button className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 hover:border-white/30 transform hover:-translate-y-1 transition-all duration-300">
//               Learn More About Our Services
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Bottom Accent */}
//       <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-80"></div>
      
//       {/* CSS for enhanced animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           25% { transform: translateY(-8px) rotate(1deg); }
//           50% { transform: translateY(-4px) rotate(0deg); }
//           75% { transform: translateY(-6px) rotate(-1deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AppointmentBar;


import React, { useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

const AppointmentBar = () => {
  useEffect(() => {
    // Initialize animations
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
      }, index * 150);
    });

    // Floating animation for decorative elements
    const floatingElements = document.querySelectorAll('[data-float]');
    floatingElements.forEach((el, index) => {
      el.style.animation = `float 4s ease-in-out infinite ${index * 0.8}s`;
    });
  }, []);

  const handleBookAppointment = () => {
    // Navigate to booking page
    window.location.href = '/booking';
    // Alternative: if using React Router
    // navigate('/booking');
  };

  return (
    <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30"></div>
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%),
                           radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 70%),
                           radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-6 right-20 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 blur-sm" data-float></div>
      <div className="absolute bottom-8 left-20 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 blur-sm" data-float></div>
      <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 blur-sm" data-float></div>

      {/* Main Content - Enhanced spacing */}
      <div className="relative z-10 container mx-auto px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          
          {/* Left Section - Brand Only */}
          <div 
            className="space-y-5"
            data-animate
            style={{ opacity: 0, transform: 'translateY(30px) scale(0.95)', transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
          >
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-300/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-cyan-100 tracking-wide">PROFESSIONAL SERVICE</span>
              </div>
              
              <h1 className="text-3xl lg:text-3xl font-bold text-white leading-tight">
                Professional
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mt-3">
                  Auto Services
                </span>
              </h1>
              
              <p className="text-gray-300 text-base leading-relaxed">
                Your trusted local automotive service center for all your car care needs in Faisalabad.
              </p>
            </div>
          </div>

          {/* Center Section - Call to Action */}
          <div 
            className="flex flex-col items-center space-y-7"
            data-animate
            style={{ opacity: 0, transform: 'translateY(30px) scale(0.9)', transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)', transitionDelay: '0.2s' }}
          >
            {/* Professional Car Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/40 via-blue-500/40 to-purple-500/40 rounded-3xl blur-2xl transform scale-110"></div>
              
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-gray-700/50">
                <div className="w-20 h-14 mx-auto mb-3">
                  <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                      <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                    </defs>
                    
                    {/* Car Body */}
                    <path d="M10 55 Q10 45 20 45 L30 45 Q35 30 45 30 L75 30 Q85 30 90 45 L100 45 Q110 45 110 55 L110 65 Q110 70 105 70 L95 70 Q90 75 85 75 Q80 75 75 70 L45 70 Q40 75 35 75 Q30 75 25 70 L15 70 Q10 70 10 65 Z" fill="url(#carBodyGradient)" stroke="#1e293b" strokeWidth="1" />
                    
                    {/* Windows */}
                    <path d="M40 45 Q45 35 50 35 L70 35 Q75 35 80 45 L75 45 Q70 40 65 40 L55 40 Q50 40 45 45 Z" fill="url(#windowGradient)" />
                    
                    {/* Wheels */}
                    <circle cx="35" cy="70" r="8" fill="#374151" stroke="#1e293b" strokeWidth="1" />
                    <circle cx="85" cy="70" r="8" fill="#374151" stroke="#1e293b" strokeWidth="1" />
                    <circle cx="35" cy="70" r="5" fill="url(#carBodyGradient)" />
                    <circle cx="85" cy="70" r="5" fill="url(#carBodyGradient)" />
                    
                    {/* Headlights */}
                    <ellipse cx="105" cy="55" rx="3" ry="2" fill="#fbbf24" />
                    <ellipse cx="15" cy="55" rx="3" ry="2" fill="#ef4444" />
                    
                    {/* Details */}
                    <rect x="50" y="50" width="20" height="2" fill="#64748b" rx="1" />
                    <rect x="45" y="53" width="30" height="1" fill="#64748b" rx="0.5" />
                  </svg>
                </div>
                
                <div className="text-center">
                  <div className="text-white font-bold text-lg">Hi-Tech Garage</div>
                  <div className="text-cyan-300 text-sm">Auto Service Center</div>
                </div>
              </div>
              
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                Open
              </div>
            </div>
            
            {/* Main CTA Button */}
            <button
              onClick={handleBookAppointment}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <Calendar className="w-5 h-5" />
                <span>Book Your Appointment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>

          {/* Right Section - Essential Info Only */}
          <div 
            className="space-y-16"
            data-animate
            style={{ opacity: 0, transform: 'translateY(30px) scale(0.95)', transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)', transitionDelay: '0.4s' }}
          >
            {/* Location */}
            <div className="group">
              <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transform hover:-translate-y-1 transition-all duration-300">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white">Location</div>
                  <div className="text-sm text-gray-300">Faisalabad, Punjab</div>
                </div>
              </div>
            </div>
            
            {/* Service Hours */}
            <div className="group">
              <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transform hover:-translate-y-1 transition-all duration-300">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white">24/7 Service</div>
                  <div className="text-sm text-gray-300">Always Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-80"></div>
      
      {/* CSS for enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(1deg); }
          50% { transform: translateY(-4px) rotate(0deg); }
          75% { transform: translateY(-6px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default AppointmentBar;
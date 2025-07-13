// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../firebase";
// import Header from '../components/header';
// import Footer from '../components/footer';
// import Sidenavbar from '../components/sidenavbar';

// function Cart() {
//   const [userServices, setUserServices] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userDocRef = doc(db, "users", user.uid);
//           const userDocSnap = await getDoc(userDocRef);

//           if (userDocSnap.exists()) {
//             const data = userDocSnap.data();
//             const orders = data.orders || [];

//             if (orders.length > 0) {
//               const latestOrder = orders[orders.length - 1];
//               setUserServices(latestOrder.userselectedservices || []);
//               setTotalPrice(latestOrder.totalprice || "0.00");
//             } else {
//               setUserServices([]);
//               setTotalPrice("0.00");
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching latest order:", error);
//         }
//       } else {
//         console.log("User not logged in");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleCheckout = () => {
//     localStorage.removeItem("selectedServices");
//     localStorage.removeItem("selectedWorkshop");
//     localStorage.removeItem("selectedTimeSlot");
//     navigate('/address');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
//       <Sidenavbar />
//       <Link to="/">
//         <Header />
//       </Link>

//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-4xl mx-auto">
//           {/* Header Section */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-0" />
//               </svg>
//             </div>
//             <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h1>
//             <p className="text-gray-600">Review your selected services before checkout</p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Services List */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
//                   <h2 className="text-2xl font-bold text-white flex items-center">
//                     <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                     Selected Services
//                   </h2>
//                   <p className="text-blue-100 mt-2">
//                     {userServices.length} {userServices.length === 1 ? 'service' : 'services'} selected
//                   </p>
//                 </div>

//                 <div className="p-6">
//                   {userServices.length > 0 ? (
//                     <div className="space-y-4">
//                       {userServices.map((service, index) => (
//                         <div
//                           key={index}
//                           className="group relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
//                         >
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-4">
//                               <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                                 {index + 1}
//                               </div>
//                               <div>
//                                 <h3 className="font-semibold text-gray-800 text-lg">{service.name}</h3>
//                                 <p className="text-gray-600 text-sm">Premium service</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <div className="text-2xl font-bold text-blue-600">Rs. {service.price}</div>
//                               <div className="text-sm text-gray-500">per service</div>
//                             </div>
//                           </div>
                          
//                           {/* Decorative elements */}
//                           <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-20"></div>
//                           <div className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-100 rounded-full -ml-8 -mb-8 opacity-20"></div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16">
//                       <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                         <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
//                       <p className="text-gray-500">No services selected yet. Start shopping to add services to your cart.</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8">
//                 <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6">
//                   <h3 className="text-xl font-bold text-white flex items-center">
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                     </svg>
//                     Order Summary
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center py-3 border-b border-gray-100">
//                       <span className="text-gray-600">Items ({userServices.length})</span>
//                       <span className="font-semibold text-gray-800">Rs. {totalPrice}</span>
//                     </div>
                    
//                     <div className="flex justify-between items-center py-3 border-b border-gray-100">
//                       <span className="text-gray-600">Service Fee</span>
//                       <span className="font-semibold text-green-600">Free</span>
//                     </div>

//                     <div className="flex justify-between items-center py-4 bg-blue-50 rounded-xl px-4">
//                       <span className="text-lg font-bold text-gray-800">Total Amount</span>
//                       <span className="text-2xl font-bold text-blue-600">Rs. {totalPrice}</span>
//                     </div>
//                   </div>

//                   <div className="mt-8 space-y-4">
//                     <button
//                       onClick={handleCheckout}
//                       className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                       </svg>
//                       <span>Proceed to Checkout</span>
//                     </button>
                    
//                     <div className="text-center">
//                       <Link to="/onsite" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
//                         ← Continue Shopping
//                       </Link>
//                     </div>
//                   </div>

//                   {/* Trust badges */}
//                   <div className="mt-6 pt-6 border-t border-gray-100">
//                     <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
//                       <div className="flex items-center">
//                         <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         Secure Payment
//                       </div>
//                       <div className="flex items-center">
//                         <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                         </svg>
//                         24/7 Support
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Cart;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Header from '../components/header';
import Footer from '../components/footer';
import Sidenavbar from '../components/sidenavbar';

function Cart() {
  const [userServices, setUserServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            const orders = data.orders || [];

            if (orders.length > 0) {
              const latestOrder = orders[orders.length - 1];
              setUserServices(latestOrder.userselectedservices || []);
              setTotalPrice(latestOrder.totalprice || "0.00");
            } else {
              setUserServices([]);
              setTotalPrice("0.00");
            }
          }
        } catch (error) {
          console.error("Error fetching latest order:", error);
        }
      } else {
        console.log("User not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCheckout = () => {
    localStorage.removeItem("selectedServices");
    localStorage.removeItem("selectedWorkshop");
    localStorage.removeItem("selectedTimeSlot");
    navigate('/address');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Sidenavbar />
      <Link to="/">
        <Header />
      </Link>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-0" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h1>
            <p className="text-gray-600">Review your selected services before checkout</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Services List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Selected Services
                  </h2>
                  <p className="text-blue-100 mt-2">
                    {userServices.length} {userServices.length === 1 ? 'service' : 'services'} selected
                  </p>
                </div>

                <div className="p-6">
                  {userServices.length > 0 ? (
                    <div className="space-y-4">
                      {userServices.map((service, index) => (
                        <div
                          key={index}
                          className="group relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800 text-lg">{service.name}</h3>
                                <p className="text-gray-600 text-sm">Premium service</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">Rs. {service.price}</div>
                              <div className="text-sm text-gray-500">per service</div>
                            </div>
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-20"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-100 rounded-full -ml-8 -mb-8 opacity-20"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                      <p className="text-gray-500">No services selected yet. Start shopping to add services to your cart.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Order Summary
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Items ({userServices.length})</span>
                      <span className="font-semibold text-gray-800">Rs. {totalPrice}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>

                    <div className="flex justify-between items-center py-4 bg-blue-50 rounded-xl px-4">
                      <span className="text-lg font-bold text-gray-800">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-600">Rs. {totalPrice}</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>Proceed to Checkout</span>
                    </button>
                    
                    <div className="text-center">
                      <Link to="/onsite" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                        ← Continue Shopping
                      </Link>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Secure Payment
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        24/7 Support
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { db } from "../firebase";
// import { ShoppingCartIcon, MapPinIcon, ClockIcon, CheckCircle2Icon, CalendarIcon, WrenchIcon } from 'lucide-react';
// import { useLocation, Link, useNavigate } from 'react-router-dom';
// import Header from '../components/header';
// import Footer from '../components/footer';
// import Sidenavbar from '../components/sidenavbar';

// function OnSite() {
//   const [selectedServices, setSelectedServices] = useState([]);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
//   const [selectedWorkshop, setSelectedWorkshop] = useState('');
//   const [workshops, setWorkshops] = useState([]);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [maintenanceServices, setMaintenanceServices] = useState([]);
//   // const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();
//   const auth = getAuth();

//   useEffect(() => {
//     const fetchWorkshops = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "workshops"));
//         const workshopsData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           name: doc.data().workshopName,
//         }));
//         setWorkshops(workshopsData);
//       } catch (error) {
//         console.error("Error fetching workshops: ", error);
//       }
//     };
//     fetchWorkshops();
//   }, []);

//   useEffect(() => {
//     const fetchServicesAndSlots = async () => {
//       if (selectedWorkshop) {
//         try {
//           const workshopDoc = await getDoc(doc(db, "workshops", selectedWorkshop));
//           if (workshopDoc.exists()) {
//             const data = workshopDoc.data();
//             const services = (data.services || []).map((service, index) => ({
//               ...service,
//               id: service.id || `service-${index}`
//             }));
//             setMaintenanceServices(services);
//             const fullSlots = (data.timeSlots || []).map((slot, index) => ({
//               ...slot,
//               id: slot.id || `slot-${index}`
//             }));
//             setTimeSlots(fullSlots);
//           }
//         } catch (error) {
//           console.error("Error fetching workshop data: ", error);
//         }
//       } else {
//         setMaintenanceServices([]);
//         setTimeSlots([]);
//       }
//     };
//     fetchServicesAndSlots();
//   }, [selectedWorkshop]);

//   const toggleService = (service) => {
//     setSelectedServices((prevSelected) => {
//       const isSelected = prevSelected.some(s => s.id === service.id);
//       return isSelected ? prevSelected.filter(s => s.id !== service.id) : [...prevSelected, service];
//     });
//   };

//   const isServiceSelected = (serviceId) => {
//     return selectedServices.some(service => service.id === serviceId);
//   };

//   const addToCart = async () => {
//     const user = auth.currentUser;
//     if (!user) {
//       alert("User not logged in");
//       return;
//     }

//     try {
//       const userDocRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userDocRef);
//       const userFullName = userSnap.exists() ? userSnap.data().fullName || "Unknown User" : "Unknown User";
//       let existingOrders = userSnap.exists() && userSnap.data().orders ? userSnap.data().orders : [];

//       const servicesData = selectedServices.map(service => ({
//         id: service.id,
//         name: service.name,
//         price: service.price
//       }));

//       const selectedWorkshopData = workshops.find(w => w.id === selectedWorkshop);

//       const totalPrice = selectedServices
//         .reduce((total, service) => total + parseFloat(service.price.replace('$', '')), 0)
//         .toFixed(2);

//       const newOrderData = {
//         userselectedservices: servicesData,
//         userselectedworkshop: selectedWorkshopData
//           ? {
//             id: selectedWorkshopData.id,
//             name: selectedWorkshopData.name
//           }
//           : null,
//         usertimeselected: selectedTimeSlot || null,
//         totalprice: totalPrice,
//         orderStatus: "pending"
//       };

//       if (existingOrders.length > 0) {
//         const lastOrder = existingOrders[existingOrders.length - 1];
//         if (!lastOrder.orderStatus || lastOrder.orderStatus !== "confirmed") {
//           existingOrders[existingOrders.length - 1] = {
//             ...lastOrder,
//             ...newOrderData,
//           };
//         } else {
//           existingOrders.push(newOrderData);
//           setSelectedWorkshop("");
//           setSelectedServices([]);
//           setSelectedTimeSlot(null);
//         }
//       } else {
//         existingOrders.push(newOrderData);
//       }

//       await setDoc(userDocRef, {
//         orders: existingOrders
//       }, { merge: true });

//       if (selectedWorkshop) {
//         const workshopDocRef = doc(db, "workshops", selectedWorkshop);
//         const workshopSnap = await getDoc(workshopDocRef);
//         let workshopOrders = workshopSnap.exists() && workshopSnap.data().orders ? workshopSnap.data().orders : [];

//         const orderForWorkshop = {
//           userFullName: userFullName,
//           userId: user.uid,
//           userselectedservices: servicesData,
//           usertimeselected: selectedTimeSlot || null,
//           totalprice: totalPrice,
//           orderStatus: "pending",
//           typeOrder: "onSite",
//           orderId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//           orderAddress: userSnap.data().address || "Not Provided",
//           orderPhoneNumber: userSnap.data().phoneNumber || "Not Provided"
//         };

//         workshopOrders.push(orderForWorkshop);

//         await setDoc(workshopDocRef, {
//           orders: workshopOrders
//         }, { merge: true });
//       }

//       navigate('/cart');
//     } catch (error) {
//       console.error("Error saving to Firestore:", error);
//       alert("Failed to save data.");
//     }
//   };

//   useEffect(() => {
//     const fetchLastOrder = async () => {
//       const user = auth.currentUser;
//       if (!user) return;
//       try {
//         const userDocRef = doc(db, "users", user.uid);
//         const userSnap = await getDoc(userDocRef);
//         if (userSnap.exists()) {
//           const orders = userSnap.data().orders || [];
//           const lastOrder = orders[orders.length - 1];
//           if (lastOrder && (!lastOrder.orderStatus || lastOrder.orderStatus === "pending")) {
//             if (lastOrder.userselectedworkshop?.id) {
//               setSelectedWorkshop(lastOrder.userselectedworkshop.id);
//             }
//             if (Array.isArray(lastOrder.userselectedservices)) {
//               setSelectedServices(lastOrder.userselectedservices);
//             }
//             if (lastOrder.usertimeselected) {
//               setSelectedTimeSlot(lastOrder.usertimeselected);
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error restoring last order:", error);
//       }
//     };

//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) fetchLastOrder();
//     });

//     return () => unsubscribe();
//   }, []);

//   const calculateTotalPrice = () => {
//     return selectedServices.reduce((total, service) => total + parseFloat(service.price.replace('$', '')), 0).toFixed(2);
//   };

//   // const getCartItemsCount = () => {
//   //   return cartItems.reduce((count, item) => count + item.services.length, 0);
//   // };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
//       <Sidenavbar />
//       <Link to="/"><Header /></Link>
//       <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/90"></div>
//         <img 
//           className="absolute inset-0 w-full h-full object-cover" 
//           src="./assets/images/Workrepair.jpg" 
//           alt="Booking Background" 
//         />
//         <div className="relative z-10 text-center text-white px-4">
//           <div className="animate-fadeIn">
//             <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
//               On-Site Maintenance
//             </h1>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
//               Professional vehicle maintenance delivered to your doorstep with expert precision
//             </p>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-16 relative -mt-10">
//         <div className="max-w-7xl mx-auto">

//           {/* Progress Indicator */}
//           <div className="mb-12">
//             <div className="flex items-center justify-center space-x-8 mb-8">
//               <div className={`flex items-center space-x-2 ${selectedWorkshop ? 'text-blue-600' : 'text-gray-400'}`}>
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedWorkshop ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
//                   {selectedWorkshop ? <CheckCircle2Icon className="w-5 h-5" /> : <MapPinIcon className="w-5 h-5" />}
//                 </div>
//                 <span className="font-semibold">Workshop</span>
//               </div>
//               <div className={`w-20 h-1 ${selectedWorkshop ? 'bg-blue-600' : 'bg-gray-200'} rounded-full`}></div>
//               <div className={`flex items-center space-x-2 ${selectedServices.length > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedServices.length > 0 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
//                   {selectedServices.length > 0 ? <CheckCircle2Icon className="w-5 h-5" /> : <WrenchIcon className="w-5 h-5" />}
//                 </div>
//                 <span className="font-semibold">Services</span>
//               </div>
//               <div className={`w-20 h-1 ${selectedServices.length > 0 ? 'bg-blue-600' : 'bg-gray-200'} rounded-full`}></div>
//               <div className={`flex items-center space-x-2 ${selectedTimeSlot ? 'text-blue-600' : 'text-gray-400'}`}>
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedTimeSlot ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
//                   {selectedTimeSlot ? <CheckCircle2Icon className="w-5 h-5" /> : <CalendarIcon className="w-5 h-5" />}
//                 </div>
//                 <span className="font-semibold">Schedule</span>
//               </div>
//             </div>
//           </div>

//           {/* Booking Form */}
//           <div className="grid lg:grid-cols-3 gap-8">

//             {/* Left Column - Workshop & Services */}
//             <div className="lg:col-span-2 space-y-8">

//               {/* Workshop Selection */}
//               <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
//                     <MapPinIcon className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">Select Workshop</h2>
//                     <p className="text-gray-600">Choose your preferred service location</p>
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <select
//                     value={selectedWorkshop}
//                     onChange={(e) => {
//                       setSelectedWorkshop(e.target.value);
//                       setSelectedServices([]);
//                     }}
//                     className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none appearance-none text-gray-700 font-medium transition-all duration-200"
//                   >
//                     {!selectedWorkshop && (
//                       <option value="" disabled hidden>
//                         Choose a workshop near you
//                       </option>
//                     )}
//                     {workshops.map((workshop) => (
//                       <option key={workshop.id} value={workshop.id}>
//                         {workshop.name}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-blue-600">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Services Selection */}
//               <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
//                     <WrenchIcon className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">Select Services</h2>
//                     <p className="text-gray-600">Choose the maintenance services you need</p>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {maintenanceServices.length === 0 ? (
//                     <div className="text-center py-12">
//                       <WrenchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                       <p className="text-gray-500 text-lg">Select a workshop to view available services</p>
//                     </div>
//                   ) : (
//                     maintenanceServices.map((service) => (
//                       <div
//                         key={service.id}
//                         className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
//                           isServiceSelected(service.id)
//                             ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg'
//                             : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
//                         }`}
//                         onClick={() => toggleService(service)}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex-1">
//                             <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
//                             <p className="text-gray-600 text-sm">{service.description}</p>
//                           </div>
//                           <div className="flex items-center space-x-4">
//                             <span className="text-2xl font-bold text-blue-600">{service.price}</span>
//                             <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                               isServiceSelected(service.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
//                             }`}>
//                               {isServiceSelected(service.id) && <CheckCircle2Icon className="w-4 h-4 text-white" />}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Time Slots & Summary */}
//             <div className="space-y-8">

//               {/* Time Slots */}
//               <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
//                     <CalendarIcon className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">Schedule</h2>
//                     <p className="text-gray-600">Pick your preferred time</p>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   {timeSlots.length === 0 ? (
//                     <div className="text-center py-8">
//                       <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                       <p className="text-gray-500">Select a workshop first</p>
//                     </div>
//                   ) : (
//                     timeSlots.map((slot) => (
//                       <button
//                         key={slot.id}
//                         onClick={() => setSelectedTimeSlot(slot)}
//                         className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
//                           selectedTimeSlot?.id === slot.id
//                             ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
//                             : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <div className="font-semibold">{slot.day}</div>
//                             <div className="text-sm opacity-90">{slot.date}</div>
//                           </div>
//                           <div className="font-bold">{slot.time}</div>
//                         </div>
//                       </button>
//                     ))
//                   )}
//                 </div>
//               </div>

//               {/* Order Summary */}
//               <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white sticky top-8">
//                 <h3 className="text-2xl font-bold mb-6 flex items-center">
//                   <ShoppingCartIcon className="w-6 h-6 mr-3" />
//                   Order Summary
//                 </h3>

//                 <div className="space-y-4 mb-6">
//                   {selectedServices.length === 0 ? (
//                     <p className="text-blue-100">No services selected</p>
//                   ) : (
//                     selectedServices.map((service) => (
//                       <div key={service.id} className="flex justify-between items-center">
//                         <span className="text-blue-100">{service.name}</span>
//                         <span className="font-semibold">{service.price}</span>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 <div className="border-t border-blue-400 pt-4 mb-6">
//                   <div className="flex justify-between items-center text-xl font-bold">
//                     <span>Total</span>
//                     <span>Rs. {calculateTotalPrice()}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={addToCart}
//                   disabled={selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop}
//                   className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
//                     selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop
//                       ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
//                       : 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:scale-105'
//                   }`}
//                 >
//                   {selectedServices.length === 0 ? 'Select Services' : 
//                    !selectedWorkshop ? 'Choose Workshop' :
//                    !selectedTimeSlot ? 'Pick Time Slot' : 'Add to Cart'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default OnSite;

// OnSite.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { ShoppingCartIcon, MapPinIcon, ClockIcon, CheckCircle2Icon, CalendarIcon, WrenchIcon } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidenavbar from '../components/sidenavbar';

function OnSite() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  const [workshops, setWorkshops] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [maintenanceServices, setMaintenanceServices] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "workshops"));
        const workshopsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().workshopName,
        }));
        setWorkshops(workshopsData);
      } catch (error) {
        console.error("Error fetching workshops: ", error);
      }
    };
    fetchWorkshops();
  }, []);

  useEffect(() => {
    const fetchServicesAndSlots = async () => {
      if (selectedWorkshop) {
        try {
          const workshopDoc = await getDoc(doc(db, "workshops", selectedWorkshop));
          if (workshopDoc.exists()) {
            const data = workshopDoc.data();
            const services = (data.services || []).map((service, index) => ({
              ...service,
              id: service.id || `service-${index}`
            }));
            setMaintenanceServices(services);
            const fullSlots = (data.timeSlots || []).map((slot, index) => ({
              ...slot,
              id: slot.id || `slot-${index}`
            }));
            setTimeSlots(fullSlots);
          }
        } catch (error) {
          console.error("Error fetching workshop data: ", error);
        }
      } else {
        setMaintenanceServices([]);
        setTimeSlots([]);
      }
    };
    fetchServicesAndSlots();
  }, [selectedWorkshop]);

  const toggleService = (service) => {
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.some(s => s.id === service.id);
      return isSelected ? prevSelected.filter(s => s.id !== service.id) : [...prevSelected, service];
    });
  };

  const isServiceSelected = (serviceId) => {
    return selectedServices.some(service => service.id === serviceId);
  };

  const clearFormData = () => {
    setSelectedWorkshop('');
    setSelectedServices([]);
    setSelectedTimeSlot('');
  };

  const addToCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      const userFullName = userSnap.exists() ? userSnap.data().fullName || "Unknown User" : "Unknown User";
      let existingOrders = userSnap.exists() && userSnap.data().orders ? userSnap.data().orders : [];

      const servicesData = selectedServices.map(service => ({
        id: service.id,
        name: service.name,
        price: service.price
      }));

      const selectedWorkshopData = workshops.find(w => w.id === selectedWorkshop);

      const totalPrice = selectedServices
        .reduce((total, service) => total + parseFloat(service.price.replace('$', '')), 0)
        .toFixed(2);

      const newOrderData = {
        userselectedservices: servicesData,
        userselectedworkshop: selectedWorkshopData
          ? {
            id: selectedWorkshopData.id,
            name: selectedWorkshopData.name
          }
          : null,
        usertimeselected: selectedTimeSlot || null,
        totalprice: totalPrice,
        orderStatus: "pending"
      };

      if (existingOrders.length > 0) {
        const lastOrder = existingOrders[existingOrders.length - 1];
        if (!lastOrder.orderStatus || lastOrder.orderStatus !== "confirmed") {
          existingOrders[existingOrders.length - 1] = {
            ...lastOrder,
            ...newOrderData,
          };
        } else {
          existingOrders.push(newOrderData);
        }
      } else {
        existingOrders.push(newOrderData);
      }

      await setDoc(userDocRef, {
        orders: existingOrders
      }, { merge: true });

      if (selectedWorkshop) {
        const workshopDocRef = doc(db, "workshops", selectedWorkshop);
        const workshopSnap = await getDoc(workshopDocRef);
        let workshopOrders = workshopSnap.exists() && workshopSnap.data().orders ? workshopSnap.data().orders : [];

        const orderForWorkshop = {
          userFullName: userFullName,
          userId: user.uid,
          userselectedservices: servicesData,
          usertimeselected: selectedTimeSlot || null,
          totalprice: totalPrice,
          orderStatus: "pending",
          typeOrder: "onSite",
          orderId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          orderAddress: userSnap.data().address || "Not Provided",
          orderPhoneNumber: userSnap.data().phoneNumber || "Not Provided"
        };

        workshopOrders.push(orderForWorkshop);

        await setDoc(workshopDocRef, {
          orders: workshopOrders
        }, { merge: true });
      }

      clearFormData(); // reset form but keep form visible
      navigate('/cart');
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      alert("Failed to save data.");
    }
  };

  useEffect(() => {
    const fetchLastOrder = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const orders = userSnap.data().orders || [];
          const lastOrder = orders[orders.length - 1];
          if (lastOrder && (!lastOrder.orderStatus || lastOrder.orderStatus === "pending")) {
            if (lastOrder.userselectedworkshop?.id) {
              setSelectedWorkshop(lastOrder.userselectedworkshop.id);
            }
            if (Array.isArray(lastOrder.userselectedservices)) {
              setSelectedServices(lastOrder.userselectedservices);
            }
            if (lastOrder.usertimeselected) {
              setSelectedTimeSlot(lastOrder.usertimeselected);
            }
          }
        }
      } catch (error) {
        console.error("Error restoring last order:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) fetchLastOrder();
    });

    return () => unsubscribe();
  }, []);

  const calculateTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + parseFloat(service.price.replace('$', '')), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Sidenavbar />
      <Link to="/"><Header /></Link>

      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/90"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="./assets/images/Workrepair.jpg"
          alt="Booking Background"
        />
        <div className="relative z-10 text-center text-white px-4">
          <div className="animate-fadeIn">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              On-Site Maintenance
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Professional vehicle maintenance delivered to your doorstep with expert precision
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* MAIN FORM SECTION STAYS ALWAYS VISIBLE */}
      <div className="container mx-auto px-4 py-16 relative -mt-10">
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className={`flex items-center space-x-2 ${selectedWorkshop ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedWorkshop ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {selectedWorkshop ? <CheckCircle2Icon className="w-5 h-5" /> : <MapPinIcon className="w-5 h-5" />}
                </div>
                <span className="font-semibold">Workshop</span>
              </div>
              <div className={`w-20 h-1 ${selectedWorkshop ? 'bg-blue-600' : 'bg-gray-200'} rounded-full`}></div>
              <div className={`flex items-center space-x-2 ${selectedServices.length > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedServices.length > 0 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {selectedServices.length > 0 ? <CheckCircle2Icon className="w-5 h-5" /> : <WrenchIcon className="w-5 h-5" />}
                </div>
                <span className="font-semibold">Services</span>
              </div>
              <div className={`w-20 h-1 ${selectedServices.length > 0 ? 'bg-blue-600' : 'bg-gray-200'} rounded-full`}></div>
              <div className={`flex items-center space-x-2 ${selectedTimeSlot ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedTimeSlot ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {selectedTimeSlot ? <CheckCircle2Icon className="w-5 h-5" /> : <CalendarIcon className="w-5 h-5" />}
                </div>
                <span className="font-semibold">Schedule</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-16 relative -mt-10">
            <div className="max-w-7xl mx-auto">

              {/* Form Sections */}
              <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Column - Workshop & Services */}
                <div className="lg:col-span-2 space-y-8">

                  {/* Workshop Selection */}
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                        <MapPinIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">Select Workshop</h2>
                        <p className="text-gray-600">Choose your preferred service location</p>
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        value={selectedWorkshop}
                        onChange={(e) => {
                          setSelectedWorkshop(e.target.value);
                          setSelectedServices([]);
                        }}
                        className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none appearance-none text-gray-700 font-medium transition-all duration-200"
                      >
                        {!selectedWorkshop && (
                          <option value="" disabled hidden>
                            Choose a workshop near you
                          </option>
                        )}
                        {workshops.map((workshop) => (
                          <option key={workshop.id} value={workshop.id}>
                            {workshop.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Services Selection */}
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                        <WrenchIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">Select Services</h2>
                        <p className="text-gray-600">Choose the maintenance services you need</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {maintenanceServices.length === 0 ? (
                        <div className="text-center py-12">
                          <WrenchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 text-lg">Select a workshop to view available services</p>
                        </div>
                      ) : (
                        maintenanceServices.map((service) => (
                          <div
                            key={service.id}
                            className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedServices.some(s => s.id === service.id)
                                ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg'
                                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                              }`}
                            onClick={() => toggleService(service)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                                <p className="text-gray-600 text-sm">{service.description}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedServices.some(s => s.id === service.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                  }`}>
                                  {selectedServices.some(s => s.id === service.id) && <CheckCircle2Icon className="w-4 h-4 text-white" />}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Time Slots & Summary */}
                <div className="space-y-8">

                  {/* Time Slots */}
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">Schedule</h2>
                        <p className="text-gray-600">Pick your preferred time</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {timeSlots.length === 0 ? (
                        <div className="text-center py-8">
                          <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">Select a workshop first</p>
                        </div>
                      ) : (
                        timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${selectedTimeSlot?.id === slot.id
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold">{slot.day}</div>
                                <div className="text-sm opacity-90">{slot.date}</div>
                              </div>
                              <div className="font-bold">{slot.time}</div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white sticky top-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <ShoppingCartIcon className="w-6 h-6 mr-3" />
                      Order Summary
                    </h3>

                    <div className="space-y-4 mb-6">
                      {selectedServices.length === 0 ? (
                        <p className="text-blue-100">No services selected</p>
                      ) : (
                        selectedServices.map((service) => (
                          <div key={service.id} className="flex justify-between items-center">
                            <span className="text-blue-100">{service.name}</span>
                            <span className="font-semibold">{service.price}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="border-t border-blue-400 pt-4 mb-6">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total</span>
                        <span>Rs. {calculateTotalPrice()}</span>
                      </div>
                    </div>

                    <button
                      onClick={addToCart}
                      disabled={selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:scale-105'
                        }`}
                    >
                      {selectedServices.length === 0 ? 'Select Services' :
                        !selectedWorkshop ? 'Choose Workshop' :
                          !selectedTimeSlot ? 'Pick Time Slot' : 'Add to Cart'}
                    </button>
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

export default OnSite;

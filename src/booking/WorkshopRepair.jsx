// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { db } from "../firebase";
// import { ShoppingCartIcon } from 'lucide-react';
// import { useLocation, Link, useNavigate } from 'react-router-dom';
// import Header from '../components/header';
// import Footer from '../components/footer';
// import Sidenavbar from '../components/sidenavbar';

// function WorkshopRepair() {
//   const [selectedServices, setSelectedServices] = useState([]);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
//   const [selectedWorkshop, setSelectedWorkshop] = useState('');
//   const [workshops, setWorkshops] = useState([]);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [maintenanceServices, setMaintenanceServices] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();
//   const auth = getAuth(); // initialize firebase auth


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

//             // Assign index as fallback ID to services if missing
//             const services = (data.services || []).map((service, index) => ({
//               ...service,
//               id: service.id || `service-${index}`
//             }));
//             setMaintenanceServices(services);

//             // Load full slot objects instead of just times
//             const fullSlots = (data.timeSlots || []).map((slot, index) => ({
//               ...slot,
//               id: slot.id || `slot-${index}` // ensure unique ID
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
//       if (isSelected) {
//         return prevSelected.filter(s => s.id !== service.id);
//       } else {
//         return [...prevSelected, service];
//       }
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

//       // ✅ Check and update last unconfirmed order
//       if (existingOrders.length > 0) {
//         const lastOrder = existingOrders[existingOrders.length - 1];

//         if (!lastOrder.orderStatus || lastOrder.orderStatus !== "confirmed") {
//           // Update the last order instead of creating a new one
//           existingOrders[existingOrders.length - 1] = {
//             ...lastOrder,
//             ...newOrderData,
//           };
//         } else {
//           // Last order is confirmed, add a new one
//           existingOrders.push(newOrderData);



//           setSelectedWorkshop("");
//           setSelectedServices([]);
//           setSelectedTimeSlot(null);
//         }
//       } else {
//         // No existing order, add the first one
//         existingOrders.push(newOrderData);
//       }

//       await setDoc(userDocRef, {
//         orders: existingOrders
//       }, { merge: true });


//       navigate('/cart-workshop-repair');
//     } catch (error) {
//       console.error("Error saving to Firestore:", error);
//       alert("Failed to save data.");
//     }
//   };

//   useEffect(() => {
//     const fetchLastOrder = async () => {
//       const user = auth.currentUser;

//       if (!user) return; // Wait for auth to be ready

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

//     // ✅ Wait for Firebase auth to be ready
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) fetchLastOrder();
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   const calculateTotalPrice = () => {
//     return selectedServices
//       .reduce((total, service) => {
//         return total + parseFloat(service.price.replace('$', ''));
//       }, 0)
//       .toFixed(2);
//   };

//   const getCartItemsCount = () => {
//     return cartItems.reduce((count, item) => count + item.services.length, 0);
//   };

//   return (
//     <div>
//       <Sidenavbar />
//       <Link to="/"><Header /></Link>

//       <div className="fixed top-20 right-8 z-50">
//         <Link to="/cart" className="relative flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all">
//           <ShoppingCartIcon className="w-6 h-6" />
//           {getCartItemsCount() > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
//               {getCartItemsCount()}
//             </span>
//           )}
//         </Link>
//       </div>

//       <div className="page-header relative flex items-center justify-center overflow-hidden">
//         <img className="absolute inset-0 w-full h-full object-cover" src="./assets/images/Workrepair.jpg" alt="Booking Background" />
//         <div className="absolute inset-0 bg-black/30"></div>
//         <div className="container mx-auto px-4 relative z-10">
//           <p className="text-white text-4xl font-bold">At Workshop Maintenance</p>
//         </div>
//       </div>

//       <div className="bg-[#0F172A] text-white min-h-screen">
//         <div className="container mx-auto px-4 py-12">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white mb-4">
//               Maintenance at Workshop
//             </h1>
//             <p className="text-gray-300 max-w-2xl mx-auto">
//               Drive in for dependable auto care — professionally handled at your chosen workshop.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Services Grid */}
//             <div className="space-y-6">
//               <div className="mb-8">
//                 <h2 className="text-2xl font-bold mb-4">Select Workshop</h2>
//                 <div className="relative mb-8">
//                   <div className="flex items-center">

//                     <select
//                       value={selectedWorkshop}
//                       onChange={(e) => {
//                         setSelectedWorkshop(e.target.value);
//                         setSelectedServices([]);
//                       }}
//                       className="w-full p-3 pl-4 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none appearance-none"
//                     >
//                       {!selectedWorkshop && (
//                         <option value="" disabled hidden>
//                           Select Workshop
//                         </option>
//                       )}
//                       {workshops.map((workshop) => (
//                         <option key={workshop.id} value={workshop.id}>
//                           {workshop.name}
//                         </option>
//                       ))}
//                     </select>



//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <h2 className="text-2xl font-bold mb-4">Select Services</h2>
//                 <div className="grid gap-6">
//                   {maintenanceServices.map((service) => (
//                     <div
//                       key={service.id}
//                       className={`p-6 rounded-xl border ${isServiceSelected(service.id)
//                         ? 'border-blue-500 bg-blue-900/20'
//                         : 'border-gray-700'
//                         } hover:border-blue-500 transition-all duration-300 cursor-pointer flex items-center justify-between`}
//                       onClick={() => toggleService(service)}
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div>
//                           <h3 className="text-xl font-semibold">{service.name}</h3>
//                           <p className="text-gray-400 text-sm">{service.description}</p>
//                         </div>
//                       </div>
//                       <div className="text-lg font-bold">{service.price}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div>
//               {/* SLOT SELECTION BUTTONS */}
//               <div className="grid grid-cols-2 gap-4">
//                 {timeSlots.map((slot) => (
//                   <button
//                     key={slot.id}
//                     onClick={() => setSelectedTimeSlot(slot)}
//                     className={`py-2 px-3 rounded-lg text-sm transition-all duration-300 ${selectedTimeSlot?.id === slot.id
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
//                       }`}
//                   >
//                     {slot.day} {slot.date} - {slot.time}
//                   </button>
//                 ))}
//               </div>

//               {/* TOTAL + ADD TO CART */}
//               <div className="mt-8 pt-6 border-t border-gray-700">
//                 <div className="flex justify-between items-center">
//                   <div className="text-xl font-bold">
//                     Total: Rs. {calculateTotalPrice()}
//                   </div>
//                   <button
//                     onClick={addToCart}
//                     disabled={selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop}
//                     className={`px-6 py-3 rounded-lg transition-all ${selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop
//                         ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                         : 'bg-blue-600 hover:bg-blue-700 text-white'
//                       }`}
//                   >
//                     Add to Cart
//                   </button>
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

// export default WorkshopRepair;

import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { ShoppingCartIcon, MapPinIcon, ClockIcon, CheckCircle2Icon, CalendarIcon, WrenchIcon } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidenavbar from '../components/sidenavbar';

function WorkshopRepair() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  const [workshops, setWorkshops] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [maintenanceServices, setMaintenanceServices] = useState([]);
  const [cartItems, setCartItems] = useState([]);
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

      clearFormData();
      navigate('/cart-workshop-repair');
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

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.services.length, 0);
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
              Workshop Maintenance
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Drive in for dependable auto care — professionally handled at your chosen workshop
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
                        className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedServices.some(s => s.id === service.id)
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
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedServices.some(s => s.id === service.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
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
                        className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                          selectedTimeSlot?.id === slot.id
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
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop
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

      <Footer />
    </div>
  );
}

export default WorkshopRepair;
// import React, { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const AddressWorkshopRepair = () => {
//   const [phone, setPhone] = useState('');
//   const [showDialog, setShowDialog] = useState(false);
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     email: '',
//     workshopName: '',
//     totalPrice: 0,
//     services: [],
//   });

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const db = getFirestore();
//         const userDocRef = doc(db, 'users', user.uid);
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//           const data = userDocSnap.data();
//           const orders = data.orders || [];
//           const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

//           setPhone(data.contactNo || '');

//           setUserData({
//             email: data.email || '',
//             workshopName: latestOrder?.userselectedworkshop?.name || '',
//             totalPrice: latestOrder?.totalprice || 0,
//             services: latestOrder?.userselectedservices || [],
//           });
//         } else {
//           console.log('No such document!');
//         }
//       } else {
//         console.log('User not logged in');
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowDialog(true);
//   };

//   const handleConfirmBooking = async () => {
//     const auth = getAuth();
//     const db = getFirestore();
//     const user = auth.currentUser;

//     if (!user) {
//       alert("User not logged in.");
//       return;
//     }

//     const userRef = doc(db, "users", user.uid);

//     try {
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         console.log("User document not found");
//         return;
//       }

//       const data = userSnap.data();
//       const orders = data.orders || [];

//       if (orders.length === 0) {
//         console.log("No orders to update");
//         return;
//       }

//       const updatedOrders = [...orders];
//       const latestOrderIndex = updatedOrders.length - 1;
//       const latestOrder = updatedOrders[latestOrderIndex];

//       const orderId = uuidv4();

//       const confirmedOrder = {
//         ...latestOrder,
//         orderStatus: "confirmed",
//         userId: user.uid,
//         orderId: orderId,
//         orderPhoneNumber: phone,
//       };

//       updatedOrders[latestOrderIndex] = confirmedOrder;

//       await updateDoc(userRef, {
//         orders: updatedOrders,
//       });

//       const workshopId = latestOrder?.userselectedworkshop?.id;

//       if (workshopId) {
//         const workshopRef = doc(db, "workshops", workshopId);
//         const workshopSnap = await getDoc(workshopRef);
//         const workshopData = workshopSnap.exists() ? workshopSnap.data() : {};
//         const workshopOrders = workshopData.orders || [];

//         await updateDoc(workshopRef, {
//           orders: [...workshopOrders, confirmedOrder],
//         });
//       }

//       console.log("Order confirmed and saved in both collections.");
//       navigate('/');
//     } catch (error) {
//       console.error("Error confirming order:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0F172A] text-white py-10 px-4 flex justify-center">
//       <div className="bg-[#1E293B] rounded-xl shadow-lg p-6 w-full max-w-2xl">
//         <h2 className="text-2xl font-bold mb-6 border-b border-gray-500 pb-3 text-blue-400">
//           📞 Enter Your Contact
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="bg-slate-600 p-4 rounded-md">
//             <label className="block text-sm font-medium mb-2 text-white">Phone Number</label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (/^\d{0,11}$/.test(value)) {
//                   setPhone(value);
//                 }
//               }}
//               className="w-full p-3 rounded-md bg-[#334155] text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="e.g. 03XXXXXXXXX"
//               required
//             />
//             {phone && phone.length !== 11 && (
//               <p className="text-red-300 text-sm mt-1">Phone number must be exactly 11 digits.</p>
//             )}
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-2 rounded-lg font-semibold"
//             >
//               Save Details
//             </button>
//           </div>
//         </form>

//         {showDialog && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-slate-900 text-white p-6 rounded shadow-lg w-80 text-center border border-gray-600">
//               <h3 className="text-xl font-semibold mb-4">Confirm Your Booking</h3>
//               <button
//                 onClick={handleConfirmBooking}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
//               >
//                 Confirm Booking
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="mt-10 border-t border-gray-600 pt-6">
//           <h3 className="text-xl font-bold mb-4 text-blue-400">📋 Booking Summary</h3>
//           <div className="space-y-2 text-sm text-gray-300">
//             <div className="flex justify-between">
//               <span className="font-medium">Email:</span>
//               <span>{userData.email || 'Not fetched yet'}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Workshop:</span>
//               <span>{userData.workshopName || 'Not fetched yet'}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Total Price:</span>
//               <span className="text-green-400">Rs. {userData.totalPrice || 0}</span>
//             </div>
//           </div>

//           <div className="mt-5">
//             <h4 className="font-semibold mb-2 text-white">Selected Services:</h4>
//             {userData.services.length > 0 ? (
//               <ul className="space-y-2">
//                 {userData.services.map((service, index) => (
//                   <li
//                     key={index}
//                     className="flex justify-between items-center bg-[#334155] text-white px-4 py-2 rounded"
//                   >
//                     <span>{service.name}</span>
//                     <span className="text-green-400">Rs. {service.price}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-400">No services fetched yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressWorkshopRepair;



import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddressWorkshopRepair = () => {
  const [phone, setPhone] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  //firstchange
  const [userData, setUserData] = useState({
    email: '',
    workshopName: '',
    totalPrice: 0,
    services: [],
    workshopId: '',
    selectedTimeSlot: null,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          const orders = data.orders || [];
          const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

          // Only set phone if there's an unconfirmed order
          if (latestOrder && latestOrder.orderStatus !== 'confirmed') {
            setPhone(data.contactNo || '');
            setUserData({
              email: data.email || '',
              workshopName: latestOrder?.userselectedworkshop?.name || '',
              totalPrice: latestOrder?.totalprice || 0,
              services: latestOrder?.userselectedservices || [],
              //2
              workshopId: latestOrder?.userselectedworkshop?.id || '',
              selectedTimeSlot: latestOrder?.usertimeselected || null,
            });
          } else {
            // Clear data if no pending orders
            setPhone('');
            setUserData({
              email: data.email || '',
              workshopName: '',
              totalPrice: 0,
              services: [],
              //3
              workshopId: '',
              selectedTimeSlot: null,
            });
          }
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('User not logged in');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowDialog(true);
  };


  const updateSlotAvailability = async (workshopId, slotId) => {
  try {
    const db = getFirestore();
    const workshopRef = doc(db, 'workshops', workshopId);
    const workshopSnap = await getDoc(workshopRef);
    if (!workshopSnap.exists()) return;
    const workshopData = workshopSnap.data();

    const updatedSlots = (workshopData.timeSlots || []).map(slot => {
      if (slot.id === slotId) {
        return { ...slot, available: false };
      }
      return slot;
    });

    await updateDoc(workshopRef, { timeSlots: updatedSlots });
    console.log('Time slot availability updated.');
  } catch (error) {
    console.error('Failed to update time slot:', error);
  }
};

  
    // const updateSlotAvailability = async (workshopId, slotId) => {
    //   try {
    //     const db = getFirestore();
    //     const workshopRef = doc(db, 'workshops', workshopId);
    //     const workshopSnap = await getDoc(workshopRef);
    //     if (!workshopSnap.exists()) return;
    //     const workshopData = workshopSnap.data();
  
    //     const updatedSlots = (workshopData.timeSlots || []).map(slot => {
    //       if (slot.id === slotId) {
    //         return { ...slot, available: false };
    //       }
    //       return slot;
    //     });
  
    //     await updateDoc(workshopRef, { timeSlots: updatedSlots });
    //     console.log('Time slot availability updated.');
    //   } catch (error) {
    //     console.error('Failed to update time slot:', error);
    //   }
    // };

const handleConfirmBooking = async () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  if (!user) {
    alert("User not logged in.");
    return;
  }

  const userRef = doc(db, "users", user.uid);

  try {
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("User document not found");
      return;
    }

    const data = userSnap.data();
    const orders = data.orders || [];

    if (orders.length === 0) {
      console.log("No orders to update");
      return;
    }

    const updatedOrders = [...orders];
    const latestOrderIndex = updatedOrders.length - 1;
    const latestOrder = updatedOrders[latestOrderIndex];

    const orderId = uuidv4();

    const confirmedOrder = {
      ...latestOrder,
      orderStatus: "confirmed",
      userId: user.uid,
      orderId: orderId,
      orderPhoneNumber: phone,
      createdAt: new Date().toISOString(), // ✅ Added createdAt field
    };

    updatedOrders[latestOrderIndex] = confirmedOrder;

    await updateDoc(userRef, {
      orders: updatedOrders,
    });

    const workshopId = latestOrder?.userselectedworkshop?.id;

    if (workshopId) {
      const workshopRef = doc(db, "workshops", workshopId);
      const workshopSnap = await getDoc(workshopRef);
      const workshopData = workshopSnap.exists() ? workshopSnap.data() : {};
      const workshopOrders = workshopData.orders || [];

      await updateDoc(workshopRef, {
        orders: [...workshopOrders, confirmedOrder],
      });

      // 🔥 Mark the selected time slot as unavailable
      const selectedSlotId = latestOrder?.usertimeselected?.id;
      if (selectedSlotId) {
        await updateSlotAvailability(workshopId, selectedSlotId);
      }
    }

    console.log("Order confirmed and saved in both collections. Time slot marked unavailable.");
    navigate('/');
  } catch (error) {
    console.error("Error confirming order:", error);
  }
};



  // const handleConfirmBooking = async () => {
  //   const auth = getAuth();
  //   const db = getFirestore();
  //   const user = auth.currentUser;

  //   if (!user) {
  //     alert("User not logged in.");
  //     return;
  //   }

  //   const userRef = doc(db, "users", user.uid);

  //   try {
  //     const userSnap = await getDoc(userRef);

  //     if (!userSnap.exists()) {
  //       console.log("User document not found");
  //       return;
  //     }

  //     const data = userSnap.data();
  //     const orders = data.orders || [];

  //     if (orders.length === 0) {
  //       console.log("No orders to update");
  //       return;
  //     }

  //     const updatedOrders = [...orders];
  //     const latestOrderIndex = updatedOrders.length - 1;
  //     const latestOrder = updatedOrders[latestOrderIndex];

  //     const orderId = uuidv4();

  //     const confirmedOrder = {
  //       ...latestOrder,
  //       orderStatus: "confirmed",
  //       userId: user.uid,
  //       orderId: orderId,
  //       orderPhoneNumber: phone,
  //     };

  //     updatedOrders[latestOrderIndex] = confirmedOrder;

  //     await updateDoc(userRef, {
  //       orders: updatedOrders,
  //     });

  //     const workshopId = latestOrder?.userselectedworkshop?.id;

  //     if (workshopId) {
  //       const workshopRef = doc(db, "workshops", workshopId);
  //       const workshopSnap = await getDoc(workshopRef);
  //       const workshopData = workshopSnap.exists() ? workshopSnap.data() : {};
  //       const workshopOrders = workshopData.orders || [];

  //       await updateDoc(workshopRef, {
  //         orders: [...workshopOrders, confirmedOrder],
  //       });
  //     }

  //     console.log("Order confirmed and saved in both collections.");
  //     navigate('/');
  //   } catch (error) {
  //     console.error("Error confirming order:", error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Details</h1>
            <p className="text-gray-600">Please provide your contact information for workshop repair</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-900 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Information
                </h2>
                <p className="text-blue-100 mt-2">Fill in your details to proceed</p>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,11}$/.test(value)) setPhone(value);
                      }}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter your 11-digit phone number"
                      required
                    />
                    {phone && phone.length !== 11 && (
                      <div className="flex items-center mt-2 text-red-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Phone number must be exactly 11 digits</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save Details</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-500 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Booking Summary
                </h3>
                <p className="text-indigo-100 mt-2">Review your order details</p>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {/* User Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email Address</p>
                          <p className="font-semibold text-gray-800">{userData.email || 'Not available'}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Workshop</p>
                          <p className="font-semibold text-gray-800">{userData.workshopName || 'Not available'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Selected Services
                    </h4>

                    {userData.services.length > 0 ? (
                      <div className="space-y-3">
                        {userData.services.map((service, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <span className="font-medium text-gray-800">{service.name}</span>
                            </div>
                            <span className="font-bold text-blue-600">Rs. {service.price}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p>No services selected</p>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-base">₨</span> {/* Smaller rupee symbol */}
                        </div>
                        <span className="text-lg font-bold text-gray-800">Total Amount</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">
                        <span className="text-base font-medium mr-1">Rs.</span>{userData.totalPrice}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-t-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Almost Done!</h3>
                <p className="text-green-100">Ready to confirm your booking?</p>
              </div>
            </div>

            <div className="p-8 text-center">
              <p className="text-gray-600 mb-6">
                Your details have been saved successfully. Click below to finalize your booking.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Confirm Booking</span>
                </button>

                <button
                  onClick={() => setShowDialog(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressWorkshopRepair;

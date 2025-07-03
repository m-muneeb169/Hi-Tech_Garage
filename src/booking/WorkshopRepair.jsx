import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { db } from "../firebase";
import { ShoppingCartIcon } from 'lucide-react';
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
  const auth = getAuth(); // initialize firebase auth


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
  
            // Assign index as fallback ID to services if missing
            const services = (data.services || []).map((service, index) => ({
              ...service,
              id: service.id || `service-${index}`
            }));
            setMaintenanceServices(services);
  
            // Load full slot objects instead of just times
            const fullSlots = (data.timeSlots || []).map((slot, index) => ({
              ...slot,
              id: slot.id || `slot-${index}` // ensure unique ID
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
  

  // useEffect(() => {
  //   const fetchServicesAndSlots = async () => {
  //     if (selectedWorkshop) {
  //       try {
  //         const workshopDoc = await getDoc(doc(db, "workshops", selectedWorkshop));
  //         if (workshopDoc.exists()) {
  //           const data = workshopDoc.data();
  //           const allSlots = data.timeSlots || [];

  //           // Assign index as fallback id to services if missing
  //           const services = (data.services || []).map((service, index) => ({
  //             ...service,
  //             id: service.id || `service-${index}`
  //           }));

  //           const slotTimes = allSlots.map(slot => slot.time);

  //           setMaintenanceServices(services);
  //           setTimeSlots(slotTimes);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching workshop data: ", error);
  //       }
  //     } else {
  //       setMaintenanceServices([]);
  //       setTimeSlots([]);
  //     }
  //   };
  //   fetchServicesAndSlots();
  // }, [selectedWorkshop]);



  const toggleService = (service) => {
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.some(s => s.id === service.id);
      if (isSelected) {
        return prevSelected.filter(s => s.id !== service.id);
      } else {
        return [...prevSelected, service];
      }
    });
  };



  const isServiceSelected = (serviceId) => {
    return selectedServices.some(service => service.id === serviceId);
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

      // ✅ Check and update last unconfirmed order
      if (existingOrders.length > 0) {
        const lastOrder = existingOrders[existingOrders.length - 1];

        if (!lastOrder.orderStatus || lastOrder.orderStatus !== "confirmed") {
          // Update the last order instead of creating a new one
          existingOrders[existingOrders.length - 1] = {
            ...lastOrder,
            ...newOrderData,
          };
        } else {
          // Last order is confirmed, add a new one
          existingOrders.push(newOrderData);

      

          setSelectedWorkshop("");
          setSelectedServices([]);
          setSelectedTimeSlot(null);
        }
      } else {
        // No existing order, add the first one
        existingOrders.push(newOrderData);
      }

      await setDoc(userDocRef, {
        orders: existingOrders
      }, { merge: true });


      navigate('/cart-workshop-repair');
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      alert("Failed to save data.");
    }
  };

useEffect(() => {
  const fetchLastOrder = async () => {
    const user = auth.currentUser;

    if (!user) return; // Wait for auth to be ready

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

  // ✅ Wait for Firebase auth to be ready
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) fetchLastOrder();
  });

  return () => unsubscribe(); // Cleanup listener
}, []);

  const calculateTotalPrice = () => {
    return selectedServices
      .reduce((total, service) => {
        return total + parseFloat(service.price.replace('$', ''));
      }, 0)
      .toFixed(2);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.services.length, 0);
  };

  return (
    <div>
      <Sidenavbar />
      <Link to="/"><Header /></Link>

      <div className="fixed top-20 right-8 z-50">
        <Link to="/cart" className="relative flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all">
          <ShoppingCartIcon className="w-6 h-6" />
          {getCartItemsCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {getCartItemsCount()}
            </span>
          )}
        </Link>
      </div>

      <div className="page-header relative flex items-center justify-center overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover" src="./assets/images/Workrepair.jpg" alt="Booking Background" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-white text-4xl font-bold">At Workshop Maintenance</p>
        </div>
      </div>

      <div className="bg-[#0F172A] text-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white mb-4">
              Maintenance at Workshop
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Drive in for dependable auto care — professionally handled at your chosen workshop.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Services Grid */}
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Select Workshop</h2>
                <div className="relative mb-8">
                  <div className="flex items-center">

                    <select
                      value={selectedWorkshop}
                      onChange={(e) => {
                        setSelectedWorkshop(e.target.value);
                        setSelectedServices([]);
                      }}
                      className="w-full p-3 pl-4 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none appearance-none"
                    >
                      {!selectedWorkshop && (
                        <option value="" disabled hidden>
                          Select Workshop
                        </option>
                      )}
                      {workshops.map((workshop) => (
                        <option key={workshop.id} value={workshop.id}>
                          {workshop.name}
                        </option>
                      ))}
                    </select>


                    {/* <select
                      value={selectedWorkshop}
                      // onChange={(e) => setSelectedWorkshop(e.target.value)}
                      onChange={(e) => {
                        setSelectedWorkshop(e.target.value);
                        setSelectedServices([]); // clear previous selected services
                      }}
                      className="w-full p-3 pl-4 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none appearance-none"
                    >
                      <option value="">Select Workshop</option>
                      {workshops.map((workshop) => (
                        <option key={workshop.id} value={workshop.id}>
                          {workshop.name}
                        </option>
                      ))}
                    </select> */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">Select Services</h2>
                <div className="grid gap-6">
                  {maintenanceServices.map((service) => (
                    <div
                      key={service.id}
                      className={`p-6 rounded-xl border ${isServiceSelected(service.id)
                        ? 'border-blue-500 bg-blue-900/20'
                        : 'border-gray-700'
                        } hover:border-blue-500 transition-all duration-300 cursor-pointer flex items-center justify-between`}
                      onClick={() => toggleService(service)}
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-xl font-semibold">{service.name}</h3>
                          <p className="text-gray-400 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-lg font-bold">{service.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
  {/* SLOT SELECTION BUTTONS */}
  <div className="grid grid-cols-2 gap-4">
    {timeSlots.map((slot) => (
      <button
        key={slot.id}
        onClick={() => setSelectedTimeSlot(slot)}
        className={`py-2 px-3 rounded-lg text-sm transition-all duration-300 ${
          selectedTimeSlot?.id === slot.id
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        {slot.day} {slot.date} - {slot.time}
      </button>
    ))}
  </div>

  {/* TOTAL + ADD TO CART */}
  <div className="mt-8 pt-6 border-t border-gray-700">
    <div className="flex justify-between items-center">
      <div className="text-xl font-bold">
        Total: Rs. {calculateTotalPrice()}
      </div>
      <button
        onClick={addToCart}
        disabled={selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop}
        className={`px-6 py-3 rounded-lg transition-all ${
          selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        Add to Cart
      </button>
    </div>

    {/* Optional: Show selected slot summary */}
    {/* {selectedTimeSlot && (
      <div className="mt-4 text-sm text-gray-300">
        <span className="font-medium">Selected Slot: </span>
        {selectedTimeSlot.day}, {selectedTimeSlot.date} - {selectedTimeSlot.time}
      </div>
    )} */}
  </div>
</div>


            {/* Time Slots Section */}
            {/* <div className="bg-[#1E293B] rounded-xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-center mb-4">Select Time Slot</h2>

              <div>
                <div className="grid grid-cols-2 gap-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 rounded-lg transition-all duration-300 ${selectedTimeSlot === slot
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold">
                    Total: ${calculateTotalPrice()}
                  </div>
                  <button
                    onClick={addToCart}
                    disabled={selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop}
                    className={`px-6 py-3 rounded-lg transition-all ${selectedServices.length === 0 || !selectedTimeSlot || !selectedWorkshop
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default WorkshopRepair;

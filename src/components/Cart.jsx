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
    <div className="min-h-screen bg-[#0F172A] text-white">
      <Sidenavbar />
      <Link to="/">
        <Header />
      </Link>

      <div className="flex justify-center px-4 py-10">
        <div className="bg-[#1E293B] w-full max-w-2xl rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-500 pb-3 text-blue-400">
            🛒 Your Selected Services
          </h2>

          <div className="space-y-4 text-sm text-gray-300">
            {userServices.length > 0 ? (
              userServices.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#334155] text-white px-4 py-2 rounded"
                >
                  <span>{service.name}</span>
                  <span className="text-green-400">Rs. {service.price}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No services selected yet.</p>
            )}
          </div>

          <div className="mt-6 flex justify-between text-xl font-semibold text-white">
            <span>Total Price:</span>
            <span className="text-green-400">Rs. {totalPrice}</span>
          </div>

          <div className="mt-8 text-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-2 rounded-lg font-semibold"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
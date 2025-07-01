import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  Trash2Icon, 
  ArrowLeftIcon,
  CheckCircleIcon
} from 'lucide-react';
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import Header from '../components/header';
import Footer from '../components/footer';
import Sidenavbar from '../components/sidenavbar';

function CartWorkshopRepair() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  const handleCheckout = () => {
    localStorage.removeItem("selectedServices");
    localStorage.removeItem("selectedWorkshop");
    localStorage.removeItem("selectedTimeSlot");
    navigate('/address-workshop-repair');
  };

  return (
    <div>
      <Sidenavbar />
      <Link to="/">
        <Header />
      </Link>

      <div className="bg-[#0F172A] text-white min-h-screen py-10 px-4 flex justify-center">
        <div className="bg-[#1E293B] rounded-xl shadow-lg p-6 w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">🛠️ Selected Services</h2>

          {userServices.length > 0 ? (
            <ul className="space-y-4 text-gray-300">
              {userServices.map((service, index) => (
                <li 
                  key={index} 
                  className="flex justify-between items-center bg-[#334155] px-4 py-3 rounded-lg shadow-md"
                >
                  <span className="text-lg">{service.name}</span>
                  <span className="text-green-400 font-semibold">Rs {service.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No services selected.</p>
          )}

          <div className="mt-6 text-right text-xl font-semibold text-white">
            Total Price: <span className="text-green-400">Rs {totalPrice}</span>
          </div>

          <div className="mt-8 text-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white text-lg px-8 py-3 rounded-lg font-semibold"
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

export default CartWorkshopRepair;

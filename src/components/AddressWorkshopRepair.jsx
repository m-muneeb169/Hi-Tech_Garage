import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddressWorkshopRepair = () => {
  const [phone, setPhone] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    workshopName: '',
    totalPrice: 0,
    services: [],
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

          setPhone(data.contactNo || '');

          setUserData({
            email: data.email || '',
            workshopName: latestOrder?.userselectedworkshop?.name || '',
            totalPrice: latestOrder?.totalprice || 0,
            services: latestOrder?.userselectedservices || [],
          });
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
      }

      console.log("Order confirmed and saved in both collections.");
      navigate('/');
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-10 px-4 flex justify-center">
      <div className="bg-[#1E293B] rounded-xl shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-500 pb-3 text-blue-400">
          📞 Enter Your Contact
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-slate-600 p-4 rounded-md">
            <label className="block text-sm font-medium mb-2 text-white">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,11}$/.test(value)) {
                  setPhone(value);
                }
              }}
              className="w-full p-3 rounded-md bg-[#334155] text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 03XXXXXXXXX"
              required
            />
            {phone && phone.length !== 11 && (
              <p className="text-red-300 text-sm mt-1">Phone number must be exactly 11 digits.</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Save Details
            </button>
          </div>
        </form>

        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-slate-900 text-white p-6 rounded shadow-lg w-80 text-center border border-gray-600">
              <h3 className="text-xl font-semibold mb-4">Confirm Your Booking</h3>
              <button
                onClick={handleConfirmBooking}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 border-t border-gray-600 pt-6">
          <h3 className="text-xl font-bold mb-4 text-blue-400">📋 Booking Summary</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{userData.email || 'Not fetched yet'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Workshop:</span>
              <span>{userData.workshopName || 'Not fetched yet'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Price:</span>
              <span className="text-green-400">Rs. {userData.totalPrice || 0}</span>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="font-semibold mb-2 text-white">Selected Services:</h4>
            {userData.services.length > 0 ? (
              <ul className="space-y-2">
                {userData.services.map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-[#334155] text-white px-4 py-2 rounded"
                  >
                    <span>{service.name}</span>
                    <span className="text-green-400">Rs. {service.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No services fetched yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressWorkshopRepair;

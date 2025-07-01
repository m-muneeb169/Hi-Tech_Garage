import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const [address, setAddress] = useState('');
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

          setAddress(data.address || '');
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
    await saveAddressToFirestore();
    setShowDialog(true);
  };

  const saveAddressToFirestore = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.uid);

    try {
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) return;

      const data = userSnap.data();
      const orders = data.orders || [];

      if (orders.length === 0) return;

      const updatedOrders = [...orders];
      const latestOrderIndex = updatedOrders.length - 1;
      updatedOrders[latestOrderIndex] = {
        ...updatedOrders[latestOrderIndex],
        orderAddress: address,
        orderPhoneNumber: phone,
      };

      await updateDoc(userDocRef, {
        orders: updatedOrders,
      });

      console.log('Order address and phone number saved inside latest order');
    } catch (error) {
      console.error('Error saving order address/phone:', error);
      alert('Failed to save address.');
    }
  };

  const handleConfirmBooking = async () => {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    if (!user) return;

    const userRef = doc(db, 'users', user.uid);

    try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;

      const data = userSnap.data();
      const orders = data.orders || [];

      if (orders.length === 0) return;

      const updatedOrders = [...orders];
      const latestOrderIndex = updatedOrders.length - 1;
      const latestOrder = updatedOrders[latestOrderIndex];

      const orderId = uuidv4();

      const confirmedOrder = {
        ...latestOrder,
        orderStatus: 'confirmed',
        userId: user.uid,
        orderId: orderId,
      };

      updatedOrders[latestOrderIndex] = confirmedOrder;

      await updateDoc(userRef, {
        orders: updatedOrders,
      });

      const workshopId = latestOrder?.userselectedworkshop?.id;

      if (workshopId) {
        const workshopRef = doc(db, 'workshops', workshopId);
        const workshopSnap = await getDoc(workshopRef);
        const workshopData = workshopSnap.exists() ? workshopSnap.data() : {};
        const workshopOrders = workshopData.orders || [];

        await updateDoc(workshopRef, {
          orders: [...workshopOrders, confirmedOrder],
        });
      }

      console.log('Order confirmed and saved in both collections.');
      navigate('/');
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6">
      <div className="max-w-3xl mx-auto bg-[#1E293B] rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center border-b border-gray-600 pb-2">
          Enter Your Details
        </h2>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 rounded bg-[#0F172A] border border-gray-600 text-white"
              placeholder="Enter your address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,11}$/.test(value)) setPhone(value);
              }}
              className="w-full p-2 rounded bg-[#0F172A] border border-gray-600 text-white"
              placeholder="Enter your phone number"
              required
            />
            {phone && phone.length !== 11 && (
              <p className="text-red-400 text-sm mt-1">
                Phone number must be exactly 11 digits.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Save Details
          </button>
        </form>

        {/* Dialog */}
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded shadow-xl w-80 text-center">
              <h3 className="text-xl font-semibold mb-4">Confirm Your Booking</h3>
              <button
                onClick={handleConfirmBooking}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        {/* Fetched Details */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-center text-white border-b border-gray-600 pb-2">
            Your Booking Summary
          </h3>

          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-6 shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-white font-medium">
                  {userData.email || 'Not available'}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Workshop Name</p>
                <p className="text-white font-medium">
                  {userData.workshopName || 'Not available'}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Total Price</p>
                <p className="text-green-400 font-semibold">
                  Rs. {userData.totalPrice}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2">Selected Services</h4>
              {userData.services.length > 0 ? (
                <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
                  {userData.services.map((service, index) => (
                    <li key={index}>
                      {service.name} — <span className="text-green-400">Rs. {service.price}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No services selected.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

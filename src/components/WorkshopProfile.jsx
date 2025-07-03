import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function WorkshopProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    workshopName: '',
    fullName: '',
    email: '',
    address: '',
    cnic: '',
    ntn: '',
    mobileNo: '',
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Handle browser back
  useEffect(() => {
    const fromDashboard = location.state?.fromDashboard;
    const handlePopState = () => {
      if (fromDashboard) {
        navigate('/aslam-dashboard', { replace: true });
      } else {
        navigate(-1);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location.state, navigate]);

  // 🚀 Fetch workshop data after auth is ready
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'workshops', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            workshopName: data.workshopName || '',
            fullName: data.fullName || '',
            email: data.email || '',
            address: data.address || '',
            cnic: data.cnic || '',
            ntn: data.ntn || '',
            mobileNo: data.mobileNo || '',
          });
          setOrders(data.orders || []);
        }
        setLoading(false);
      } else {
        navigate('/login/workshop'); // fallback if no user
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 📝 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 💾 Save to Firestore
  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'workshops', user.uid);
      await updateDoc(docRef, formData);
      alert('Profile updated successfully!');
    }
  };

  // ❌ Delete Order
  const handleDeleteOrder = async (orderToDelete) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, 'workshops', user.uid);
      const updatedOrders = orders.filter(order =>
        !(order.orderPhoneNumber === orderToDelete.orderPhoneNumber &&
          order.orderAddress === orderToDelete.orderAddress)
      );
      await updateDoc(docRef, {
        orders: updatedOrders,
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // 🚪 Logout logic
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/pages/home");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 relative">
      <h1 className="text-2xl font-bold text-center mb-4">Workshop Profile</h1>

      {/* 🧾 Editable Form */}
      <div className="bg-white shadow-md rounded p-6 space-y-4">
        {['workshopName', 'fullName', 'email', 'address', 'cnic', 'ntn', 'mobileNo'].map((field) => (
          <div key={field}>
            <label className="block font-medium text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>

      {/* 📦 Orders Display */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Orders Received</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders available.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div key={idx} className="border p-4 rounded shadow bg-gray-50 relative">
                <p><strong>Phone:</strong> {order.orderPhoneNumber}</p>
                <p><strong>Address:</strong> {order.orderAddress}</p>
                <button
                  onClick={() => handleDeleteOrder(order)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
                >
                  Delete Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔴 Logout Button (fixed bottom-right) */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default WorkshopProfile;

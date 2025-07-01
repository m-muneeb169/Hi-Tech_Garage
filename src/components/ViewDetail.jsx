import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const ViewDetail = () => {
  const { state } = useLocation();
  const { userId, orderIndex } = state || {};

  const [orderData, setOrderData] = useState(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [userTimeSelected, setUserTimeSelected] = useState({ date: '', time: '' });
  const navigate = useNavigate();

  useEffect(() => {
  window.history.pushState(null, null, window.location.pathname);
}, []);

useEffect(() => {
  const handlePopState = () => {
    navigate('/aslam-dashboard'); // ✅ always go here on browser back
  };

  window.addEventListener('popstate', handlePopState);

  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, [navigate]);


  // 🔁 Fetch user and order data
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!userId || orderIndex === undefined) return;

      setIsLoading(true);

      try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const order = userData.orders?.[orderIndex];

          setUserName(userData.fullName || 'Unknown');
          setEmail(userData.email || 'Not Found');

          if (order) {
            setOrderData(order);

            // ✅ Set time slot details from usertimeselected object
            if (order.usertimeselected && typeof order.usertimeselected === 'object') {
              const { date, time } = order.usertimeselected;
              setUserTimeSelected({ date: date || '', time: time || '' });
            } else {
              setUserTimeSelected({ date: '', time: '' });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setStatusMessage("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [userId, orderIndex]);

  // 🔄 Real-time workshoporderstatus listener
  useEffect(() => {
    if (!orderData || !orderData.userselectedworkshop?.id || !userId || !orderData.orderId) return;

    const workshopRef = doc(db, 'workshops', orderData.userselectedworkshop.id);

    const unsubscribe = onSnapshot(workshopRef, (docSnap) => {
      if (docSnap.exists()) {
        const workshopData = docSnap.data();
        const workshopOrders = workshopData.orders || [];

        const matchingOrder = workshopOrders.find(
          (order) => order.orderId === orderData.orderId && order.userId === userId
        );

        if (matchingOrder && matchingOrder.workshoporderstatus) {
          setOrderData((prevData) => ({
            ...prevData,
            workshoporderstatus: matchingOrder.workshoporderstatus,
          }));
        }
      }
    });

    return () => unsubscribe();
  }, [orderData, userId]);

  // 🔧 Update status in Firestore
  const updateWorkshopOrderStatus = async (status) => {
  if (!orderData || !orderData.userselectedworkshop?.id || !userId || !orderData.orderId) return;

  setIsLoading(true);
  setStatusMessage('');

  try {
    const workshopId = orderData.userselectedworkshop.id;
    const workshopRef = doc(db, 'workshops', workshopId);
    const workshopSnap = await getDoc(workshopRef);

    if (workshopSnap.exists()) {
      const workshopData = workshopSnap.data();
      const updatedOrders = [...(workshopData.orders || [])];

      const targetIndex = updatedOrders.findIndex(
        (order) => order.orderId === orderData.orderId && order.userId === userId
      );

      if (targetIndex !== -1) {
        updatedOrders[targetIndex].workshoporderstatus = status;

        await updateDoc(workshopRef, {
          orders: updatedOrders,
        });

        // ✅ Local state update bhi karo:
        setOrderData((prevData) => ({
          ...prevData,
          workshoporderstatus: status,
        }));

        setStatusMessage(`Order status updated to: ${status}`);
      } else {
        updatedOrders.push({
          orderId: orderData.orderId,
          userId: userId,
          workshoporderstatus: status,
        });

        await updateDoc(workshopRef, {
          orders: updatedOrders,
        });

        // ✅ Local state update
        setOrderData((prevData) => ({
          ...prevData,
          workshoporderstatus: status,
        }));

        setStatusMessage(`Order status set to: ${status}`);
      }
    } else {
      setStatusMessage('Workshop not found.');
    }
  } catch (error) {
    console.error("Error updating workshop order status:", error);
    setStatusMessage("Failed to update status");
  } finally {
    setIsLoading(false);
  }
};

  // const updateWorkshopOrderStatus = async (status) => {
  //   if (!orderData || !orderData.userselectedworkshop?.id || !userId || !orderData.orderId) return;

  //   setIsLoading(true);
  //   setStatusMessage('');

  //   try {
  //     const workshopId = orderData.userselectedworkshop.id;
  //     const workshopRef = doc(db, 'workshops', workshopId);
  //     const workshopSnap = await getDoc(workshopRef);

  //     if (workshopSnap.exists()) {
  //       const workshopData = workshopSnap.data();
  //       const updatedOrders = [...(workshopData.orders || [])];

  //       const targetIndex = updatedOrders.findIndex(
  //         (order) => order.orderId === orderData.orderId && order.userId === userId
  //       );

  //       if (targetIndex !== -1) {
  //         updatedOrders[targetIndex].workshoporderstatus = status;

  //         await updateDoc(workshopRef, {
  //           orders: updatedOrders,
  //         });

  //         setStatusMessage(`Order status updated to: ${status}`);
  //       } else {
  //         updatedOrders.push({
  //           orderId: orderData.orderId,
  //           userId: userId,
  //           workshoporderstatus: status
  //         });

  //         await updateDoc(workshopRef, {
  //           orders: updatedOrders,
  //         });

  //         setStatusMessage(`Order status set to: ${status}`);
  //       }
  //     } else {
  //       setStatusMessage('Workshop not found.');
  //     }
  //   } catch (error) {
  //     console.error("Error updating workshop order status:", error);
  //     setStatusMessage("Failed to update status");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  if (!orderData) {
    return <div className="p-4 text-center text-gray-500">No order details found</div>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-blue-100 rounded-2xl shadow-lg p-8 border border-blue-300">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Booking Details</h2>

        {statusMessage && (
          <div className="mb-4 py-2 px-4 bg-blue-200 text-blue-800 rounded-lg text-center">
            {statusMessage}
          </div>
        )}

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Workshop Order Status:</span>
          <span className={`font-medium ${
            orderData.workshoporderstatus === 'completed' ? 'text-green-600' :
            orderData.workshoporderstatus === 'active' ? 'text-blue-600' : 'text-yellow-600'
          }`}>
            {orderData.workshoporderstatus || 'Pending'}
          </span>
        </div>

        <div className="space-y-4 text-black">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">User ID:</span>
            <span>{userId}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Name:</span>
            <span>{userName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Email:</span>
            <span>{email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Phone:</span>
            <span>{orderData.orderPhoneNumber}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Order Type:</span>
            <span>{orderData.typeOrder}</span>
          </div>

          {/* ✅ Selected Time Slot */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Selected Date:</span>
            <span>{userTimeSelected.date || 'N/A'}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Selected Time:</span>
            <span>{userTimeSelected.time || 'N/A'}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Address:</span>
            <span>{orderData.orderAddress}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Status:</span>
            <span>{orderData.orderStatus}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Total Price:</span>
            <span>{orderData.totalprice} PKR</span>
          </div>

          <div className="border-b pb-2">
            <span className="font-semibold block">Workshop:</span>
            <div className="ml-2 mt-1">
              {orderData.userselectedworkshop?.name || 'N/A'}
            </div>
          </div>

          <div className="border-b pb-2">
            <span className="font-semibold block">Selected Services:</span>
            <div className="mt-1 ml-2 space-y-1">
              {Array.isArray(orderData.userselectedservices) ? (
                orderData.userselectedservices.map((service, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{service.name}</span>
                    <span>{service.price} PKR</span>
                  </div>
                ))
              ) : (
                <span>No services selected.</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-evenly">
          <button
            onClick={() => updateWorkshopOrderStatus("active")}
            disabled={isLoading}
            className={`${
              orderData.workshoporderstatus === 'active' 
                ? 'bg-blue-400' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold py-2 px-6 rounded-lg transition-all`}
          >
            {orderData.workshoporderstatus === 'active' ? 'Currently Active' : 'Set Active'}
          </button>

          <button
            onClick={() => updateWorkshopOrderStatus("completed")}
            disabled={isLoading}
            className={`${
              orderData.workshoporderstatus === 'completed' 
                ? 'bg-green-400' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white font-semibold py-2 px-6 rounded-lg transition-all`}
          >
            {orderData.workshoporderstatus === 'completed' ? 'Completed' : 'Mark Completed'}
          </button>

<button
  onClick={() => navigate('/aslam-dashboard')}
  className="mt-4 mb-2 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
>
  ⬅ Go Back to Dashboard
</button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;

import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import { getFirestore, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    fullName: 'Loading...',
    contactNo: 'Loading...',
    email: 'Loading...'
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    fullName: '',
    contactNo: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUserData(data);
              setUpdateData({
                fullName: data.fullName,
                contactNo: data.contactNo
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        navigate('/login/user', { replace: true });
      }
    });

    return () => unsubscribe();
  }, [auth, db, navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('loggedInUserId');
        navigate('/login/user', { replace: true });
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await deleteDoc(userDocRef);
        await deleteUser(user);

        localStorage.removeItem('loggedInUserId');
        setShowDeleteConfirm(false);
        setSuccessMessage("Account deleted successfully!");

        setTimeout(() => {
          setSuccessMessage('');
          navigate('/login/user', { replace: true });
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleUpdateAccount = async () => {
    const { fullName, contactNo } = updateData;

    if (fullName.trim() === '' || contactNo.trim() === '') {
      alert("Both fields are required!");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { fullName, contactNo });

        setUserData({ ...userData, fullName, contactNo });
        setShowUpdateForm(false);
        setSuccessMessage("Account updated successfully!");

        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update. Please try again.");
    }
  };

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Information</h2>

        <div className="text-gray-700 mb-6">
          <p><strong>Full Name:</strong> {userData.fullName}</p>
          <p><strong>Contact Number:</strong> {userData.contactNo}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Delete Account
          </button>
          <button 
            onClick={() => setShowUpdateForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update Account
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-80">
            <button 
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-6">Do you really want to delete your account?</h3>
            <div className="flex justify-center gap-6">
              <button 
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Yes
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-80">
            <button 
              onClick={() => setShowUpdateForm(false)}
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Update Account</h3>

            <div className="flex flex-col gap-4">
              <input 
                id="newFullName" 
                name="fullName"
                type="text" 
                placeholder="Full Name" 
                value={updateData.fullName}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input 
                id="newContactNo" 
                name="contactNo"
                type="text" 
                placeholder="Contact Number" 
                value={updateData.contactNo}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={handleUpdateAccount}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
              >
                Save
              </button>
              <button 
                onClick={() => setShowUpdateForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-green-800 font-semibold px-6 py-4 rounded-lg shadow-lg text-center z-50">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../firebase';

// function WorkshopProfile() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     workshopName: '',
//     fullName: '',
//     email: '',
//     address: '',
//     cnic: '',
//     ntn: '',
//     mobileNo: '',
//   });
//   const [loading, setLoading] = useState(true);

//   // 🧠 Handle browser back
//   useEffect(() => {
//     const fromDashboard = location.state?.fromDashboard;
//     const handlePopState = () => {
//       if (fromDashboard) {
//         navigate('/aslam-dashboard', { replace: true });
//       } else {
//         navigate(-1);
//       }
//     };
//     window.addEventListener('popstate', handlePopState);
//     return () => window.removeEventListener('popstate', handlePopState);
//   }, [location.state, navigate]);

//   // 🚀 Fetch workshop data after auth is ready
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const docRef = doc(db, 'workshops', user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setFormData({
//             workshopName: data.workshopName || '',
//             fullName: data.fullName || '',
//             email: data.email || '',
//             address: data.address || '',
//             cnic: data.cnic || '',
//             ntn: data.ntn || '',
//             mobileNo: data.mobileNo || '',
//           });
//         }
//         setLoading(false);
//       } else {
//         navigate('/login/workshop'); // fallback if no user
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   // 📝 Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // 💾 Save to Firestore
//   const handleSave = async () => {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     if (user) {
//       const docRef = doc(db, 'workshops', user.uid);
//       await updateDoc(docRef, formData);
//       alert('Profile updated successfully!');
//     }
//   };

//   // 🚪 Logout logic
//   const handleLogout = () => {
//     const auth = getAuth();
//     signOut(auth)
//       .then(() => {
//         localStorage.clear();
//         sessionStorage.clear();
//         navigate("/pages/home");
//       })
//       .catch((error) => {
//         console.error("Logout Error:", error);
//       });
//   };

//   if (loading) {
//     return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-8 relative">
//       <h1 className="text-2xl font-bold text-center mb-4">Workshop Profile</h1>

//       {/* 🧾 Editable Form */}
//       <div className="bg-white shadow-md rounded p-6 space-y-4">
//         {['workshopName', 'fullName', 'email', 'address', 'cnic', 'ntn', 'mobileNo'].map((field) => (
//           <div key={field}>
//             <label className="block font-medium text-gray-700 capitalize">{field}</label>
//             <input
//               type="text"
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded"
//             />
//           </div>
//         ))}
//         <button
//           onClick={handleSave}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Save Changes
//         </button>
//       </div>

//       {/* 🔴 Logout Button (fixed bottom-left) */}
//       <div className="fixed bottom-4 left-4">
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700 transition"
//         >
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// }

// export default WorkshopProfile;

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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

  // 🗑️ Delete account logic
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.'
    );
    
    if (confirmDelete) {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        try {
          // Delete workshop document from Firestore
          const docRef = doc(db, 'workshops', user.uid);
          await deleteDoc(docRef);
          
          // Delete user authentication account
          await deleteUser(user);
          
          // Clear storage and redirect
          localStorage.clear();
          sessionStorage.clear();
          alert('Account deleted successfully!');
          navigate('/pages/home');
        } catch (error) {
          console.error('Delete Account Error:', error);
          alert('Error deleting account. Please try again.');
        }
      }
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

  const fieldLabels = {
    workshopName: 'Workshop Name',
    fullName: 'Full Name',
    email: 'Email Address',
    address: 'Address',
    cnic: 'CNIC',
    ntn: 'NTN',
    mobileNo: 'Mobile Number'
  };

  const fieldIcons = {
    workshopName: (
      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    fullName: (
      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    email: (
      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    address: (
      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    cnic: (
      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
    ntn: (
      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    mobileNo: (
      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-blue-400 animate-pulse mx-auto"></div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mb-2">Loading Profile</p>
          <p className="text-slate-600">Please wait while we fetch your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Workshop Profile</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Manage and update your workshop information with ease
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden backdrop-blur-sm">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-indigo-700/95"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full"></div>
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center">
                <svg className="w-8 h-8 mr-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Profile Information
              </h2>
              <p className="text-blue-100 mt-3 text-center text-lg">Update your workshop details and manage your account</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(fieldLabels).map(([field, label]) => (
                <div key={field} className="group">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center">
                    <span className="mr-2">{fieldIcons[field]}</span>
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-500 font-medium group-hover:border-slate-300 shadow-sm focus:shadow-md"
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <div className="w-2 h-2 bg-slate-300 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons Section */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center space-x-3 min-w-[200px] justify-center"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save Changes</span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center space-x-3 min-w-[200px] justify-center"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log Out</span>
                </button>

                {/* Delete Account Button */}
                <button
                  onClick={handleDeleteAccount}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center space-x-3 min-w-[200px] justify-center"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-8 shadow-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl">
              <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Professional Tips</h3>
              <div className="space-y-2 text-slate-700">
                <p className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Keep your profile information up-to-date for seamless communication with clients
                </p>
                <p className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Ensure all contact details are accurate for better customer service experience
                </p>
                <p className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Complete profiles help build trust and credibility with your clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkshopProfile;
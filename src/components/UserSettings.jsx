// import React, { useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
// import { db } from '../firebase';
// import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const UserSettings = () => {
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState({
//     fullName: '',
//     address: '',
//     contactNo: '',
//     email: ''
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = getAuth();

//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         setUser(firebaseUser);
//         try {
//           const userRef = doc(db, 'users', firebaseUser.uid);
//           const userSnap = await getDoc(userRef);
//           if (userSnap.exists()) {
//             setUserData(userSnap.data());
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setUser(null);
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleChange = (e) => {
//     setUserData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSave = async () => {
//     if (!user) return;
//     setSaving(true);
//     setMessage('');

//     try {
//       const userRef = doc(db, 'users', user.uid);
//       await updateDoc(userRef, { ...userData });
//       setMessage('✅ Changes saved successfully.');
//     } catch (error) {
//       console.error('Error updating user data:', error);
//       setMessage('❌ Error saving changes.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = async () => {
//     const auth = getAuth();
//     try {
//       await signOut(auth);
//       localStorage.setItem('isLoggedIn', 'false');
//       navigate('/pages/home', { replace: true });
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     const confirmation = window.confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.");
//     if (!confirmation) return;

//     try {
//       const auth = getAuth();
//       const currentUser = auth.currentUser;

//       // 1. Delete Firestore user document
//       await deleteDoc(doc(db, 'users', currentUser.uid));

//       // 2. Delete Firebase Auth account
//       await deleteUser(currentUser);

//       localStorage.setItem('isLoggedIn', 'false');
//       navigate('/pages/home', { replace: true });
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       alert("❌ Failed to delete account. Please re-login and try again.");
//     }
//   };

//   if (loading) return <div className="p-6 text-white">Loading user data...</div>;
//   if (!user) return <div className="p-6 text-red-400">❌ No user logged in.</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-10 flex justify-center">
//       <div className="bg-[#1E2533] w-full max-w-xl rounded-2xl shadow-xl p-8 space-y-6 border border-blue-500/20">
//         <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-200">
//           🛠️ User Settings
//         </h1>

//         <div className="space-y-4">
//           <Input label="Full Name" name="fullName" value={userData.fullName} onChange={handleChange} />
//           <Input label="Address" name="address" value={userData.address} onChange={handleChange} />
//           <Input label="Contact No" name="contactNo" value={userData.contactNo} onChange={handleChange} />
//           <Input label="Email" name="email" value={userData.email} onChange={handleChange} />
//         </div>

//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold shadow transition-all"
//         >
//           {saving ? 'Saving...' : '💾 Save Changes'}
//         </button>

//         {message && (
//           <div className="text-sm text-green-400 text-center">{message}</div>
//         )}

//         <div className="flex justify-between items-center mt-6 gap-4">
//           <button
//             onClick={handleLogout}
//             className="w-1/2 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl shadow transition"
//           >
//             🚪 Logout
//           </button>
//           <button
//             onClick={handleDeleteAccount}
//             className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow transition"
//           >
//             🗑️ Delete Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 👇 Reusable Input Component
// const Input = ({ label, name, value, onChange }) => (
//   <div>
//     <label className="block text-sm mb-1 text-gray-300">{label}</label>
//     <input
//       type="text"
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//     />
//   </div>
// );

// export default UserSettings;


import React, { useEffect, useState } from 'react';

const UserSettings = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    fullName: '',
    address: '',
    contactNo: '',
    email: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mock auth state for demo
    const mockUser = { uid: 'demo123' };
    setUser(mockUser);
    
    // Mock user data
    setUserData({
      fullName: 'John Doe',
      address: '123 Main Street, City, State',
      contactNo: '+1 234 567 8900',
      email: 'john.doe@example.com'
    });
    
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setUserData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      setMessage('✅ Changes saved successfully.');
      setSaving(false);
    }, 2000);
  };

  const handleLogout = async () => {
    alert('🚪 Logout functionality would be implemented here');
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmation) return;

    alert('🗑️ Account deletion functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600 text-lg font-medium">Loading your settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">No user logged in. Please log in to access your settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your profile information and preferences</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
            <p className="text-blue-100 mt-1">Update your personal details below</p>
          </div>

          {/* Card Body */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Full Name" 
                name="fullName" 
                value={userData.fullName} 
                onChange={handleChange}
                icon={
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <Input 
                label="Contact Number" 
                name="contactNo" 
                value={userData.contactNo} 
                onChange={handleChange}
                icon={
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
            </div>

            <Input 
              label="Email Address" 
              name="email" 
              value={userData.email} 
              onChange={handleChange}
              icon={
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            <Input 
              label="Address" 
              name="address" 
              value={userData.address} 
              onChange={handleChange}
              icon={
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {saving ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving Changes...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Changes
                </span>
              )}
            </button>

            {/* Success/Error Message */}
            {message && (
              <div className={`text-center p-4 rounded-xl font-medium ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-600 border border-green-200' 
                  : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <button
            onClick={handleLogout}
            className="group py-4 px-6 bg-white border-2 border-blue-200 hover:border-blue-300 text-blue-600 font-semibold rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-[1.02]"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </span>
          </button>

          <button
            onClick={handleDeleteAccount}
            className="group py-4 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-[1.02]"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Modern Input Component with floating labels and icons
const Input = ({ label, name, value, onChange, icon }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          {icon}
        </div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 font-medium transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 ${
            focused || hasValue ? 'pt-6 pb-2' : 'py-4'
          }`}
          placeholder=" "
        />
        <label
          className={`absolute left-12 transition-all duration-200 pointer-events-none ${
            focused || hasValue
              ? 'top-3 text-xs text-blue-600 font-semibold'
              : 'top-1/2 transform -translate-y-1/2 text-gray-500 font-medium'
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default UserSettings;
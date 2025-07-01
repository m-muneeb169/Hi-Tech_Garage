import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
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

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { ...userData });
      setMessage('✅ Changes saved successfully.');
    } catch (error) {
      console.error('Error updating user data:', error);
      setMessage('❌ Error saving changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/pages/home', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmation) return;

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      // 1. Delete Firestore user document
      await deleteDoc(doc(db, 'users', currentUser.uid));

      // 2. Delete Firebase Auth account
      await deleteUser(currentUser);

      localStorage.setItem('isLoggedIn', 'false');
      navigate('/pages/home', { replace: true });
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("❌ Failed to delete account. Please re-login and try again.");
    }
  };

  if (loading) return <div className="p-6 text-white">Loading user data...</div>;
  if (!user) return <div className="p-6 text-red-400">❌ No user logged in.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-10 flex justify-center">
      <div className="bg-[#1E2533] w-full max-w-xl rounded-2xl shadow-xl p-8 space-y-6 border border-blue-500/20">
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-200">
          🛠️ User Settings
        </h1>

        <div className="space-y-4">
          <Input label="Full Name" name="fullName" value={userData.fullName} onChange={handleChange} />
          <Input label="Address" name="address" value={userData.address} onChange={handleChange} />
          <Input label="Contact No" name="contactNo" value={userData.contactNo} onChange={handleChange} />
          <Input label="Email" name="email" value={userData.email} onChange={handleChange} />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold shadow transition-all"
        >
          {saving ? 'Saving...' : '💾 Save Changes'}
        </button>

        {message && (
          <div className="text-sm text-green-400 text-center">{message}</div>
        )}

        <div className="flex justify-between items-center mt-6 gap-4">
          <button
            onClick={handleLogout}
            className="w-1/2 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl shadow transition"
          >
            🚪 Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow transition"
          >
            🗑️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

// 👇 Reusable Input Component
const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-300">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default UserSettings;

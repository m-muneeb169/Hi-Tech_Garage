// import React, { useState, useEffect } from "react";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   sendEmailVerification,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const LoginUser = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     contactNo: "",
//     email: "",
//     password: "",
//     address: "",
//   });
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const auth = getAuth();
//   const db = getFirestore();
//   const redirectTo = location.state?.redirectTo || "/onsite";

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const showMessage = (text, type = "success") => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage({ text: "", type: "" }), 5000);
//   };

//   const handleLogin = async () => {
//     const { email, password } = formData;
//     if (!email || !password) {
//       showMessage("Email and password are required", "error");
//       return;
//     }
//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       if (!user.emailVerified) {
//         showMessage("Please verify your email first!", "error");
//         return;
//       }
//       showMessage("Login successful", "success");
//       localStorage.setItem("loggedInUserId", user.uid);
//       localStorage.setItem("isLoggedIn", "true");
//       setTimeout(() => navigate(redirectTo, { replace: true }), 1000);
//     } catch (error) {
//       let errorMessage = "Login failed";
//       switch (error.code) {
//         case "auth/wrong-password":
//         case "auth/user-not-found":
//         case "auth/invalid-credential":
//           errorMessage = "Incorrect Email or Password";
//           break;
//         case "auth/too-many-requests":
//           errorMessage = "Too many failed attempts. Try again later.";
//           break;
//         case "auth/network-request-failed":
//           errorMessage = "Network error! Check your internet connection.";
//           break;
//         default:
//           errorMessage = "Login error: " + error.message;
//       }
//       showMessage(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignUp = async () => {
//     const { fullName, contactNo, email, password, address } = formData;
//     if (!fullName || !contactNo || !email || !password || !address) {
//       showMessage("All fields are required!", "error");
//       return;
//     }
//     if (password.length < 6) {
//       showMessage("Password must be at least 6 characters long", "error");
//       return;
//     }
//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       await setDoc(doc(db, "users", user.uid), { fullName, contactNo, email, address });
//       await sendEmailVerification(user);
//       showMessage("Account created. Verification email sent!", "success");
//       setTimeout(() => {
//         setIsLogin(true);
//         setFormData({ fullName: "", contactNo: "", email: "", password: "", address: "" });
//       }, 3000);
//     } catch (error) {
//       let errorMessage = "Unable to create user";
//       if (error.code === "auth/email-already-in-use") {
//         errorMessage = "Email Address Already Exists!";
//       }
//       showMessage(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     isLogin ? await handleLogin() : await handleSignUp();
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       localStorage.setItem("loggedInUserId", user.uid);
//       localStorage.setItem("isLoggedIn", "true");
//       showMessage("Google login successful", "success");
//       setTimeout(() => navigate(redirectTo, { replace: true }), 1000);
//     } catch (error) {
//       showMessage("Google Sign-in failed: " + error.message, "error");
//     }
//   };

//   const getRedirectMessage = () => {
//     switch (redirectTo) {
//       case "/booking": return "You'll be redirected to Booking page after login";
//       case "/workshopRepair": return "You'll be redirected to Workshop Repair after login";
//       case "/maintenanceAtHome":
//       case "/onsite":
//         return "You'll be redirected to On-Site Maintenance after login";
//       default: return "";
//     }
//   };

//   useEffect(() => {
//     const handleBackButton = (event) => {
//       event.preventDefault();
//       navigate("/", { replace: true });
//     };
//     window.addEventListener("popstate", handleBackButton);
//     return () => {
//       window.removeEventListener("popstate", handleBackButton);
//     };
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="relative max-w-md w-full">
//         <AnimatePresence>
//           {message.text && (
//             <motion.div
//               key="alert"
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -50 }}
//               transition={{ duration: 0.5 }}
//               className={`absolute top-0 left-1/2 transform -translate-x-1/2 bg-opacity-90 px-4 py-3 rounded shadow-lg text-white z-50 ${message.type === "error" ? "bg-red-500" : "bg-green-500"}`}
//             >
//               {message.text}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white shadow-xl rounded-lg p-6 pt-10 relative z-10"
//         >
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {isLogin ? "Login to Your Account" : "Sign Up Now"}
//             </h2>
//             {isLogin && redirectTo && (
//               <p className="text-sm text-blue-600 mt-1">{getRedirectMessage()}</p>
//             )}
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-3">
//             {!isLogin && (
//               <>
//                 <input type="text" name="fullName" placeholder="Full Name"
//                   value={formData.fullName} onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded" />

//                 <input type="tel" name="contactNo" placeholder="Contact No (11-digits)"
//                   maxLength="11" pattern="[0-9]{11}"
//                   value={formData.contactNo} onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded" />
//               </>
//             )}

//             <input type="email" name="email" placeholder="Email"
//               value={formData.email} onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded" />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded pr-10"
//               />
//               <span
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//               </span>
//             </div>

//             {!isLogin && (
//               <input type="text" name="address" placeholder="Address"
//                 value={formData.address} onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded" />
//             )}

//             <button type="submit" disabled={loading}
//               className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
//               {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
//             </button>

//             <div className="text-center text-sm text-gray-600">
//               {isLogin ? (
//                 <>Don't have an account? <button type="button" onClick={() => { setIsLogin(false); setFormData({ fullName: "", contactNo: "", email: "", password: "", address: "" }); }} className="text-blue-600 hover:underline">Sign Up</button></>
//               ) : (
//                 <>Already have an account? <button type="button" onClick={() => { setIsLogin(true); setFormData({ fullName: "", contactNo: "", email: "", password: "", address: "" }); }} className="text-blue-600 hover:underline">Login</button></>
//               )}
//             </div>

//             {isLogin && (
//               <div className="text-center mt-4">
//                 <p className="text-sm mb-2">Or login with</p>
//                 <div className="flex justify-center gap-4 text-xl">
//                   <i className="fab fa-google text-red-600 cursor-pointer hover:scale-110 transition" onClick={handleGoogleSignIn} />
//                 </div>
//               </div>
//             )}
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LoginUser;
import React, { useState } from "react";

import { motion,AnimatePresence } from "framer-motion";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

const LoginUser = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNo: "",
    email: "",
    password: "",
    address: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/onsite";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      contactNo: "",
      email: "",
      password: "",
      address: "",
    });
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      showMessage("Email and password are required", "error");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        showMessage("Please verify your email first!", "error");
        return;
      }
      showMessage("Login successful", "success");
      localStorage.setItem("loggedInUserId", user.uid);
      localStorage.setItem("isLoggedIn", "true");
      setTimeout(() => navigate(redirectTo, { replace: true }), 1000);
    } catch (error) {
      let msg = "Login error: " + error.message;
      if (["auth/wrong-password", "auth/user-not-found", "auth/invalid-credential"].includes(error.code)) {
        msg = "Incorrect Email or Password";
      } else if (error.code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Try again later.";
      } else if (error.code === "auth/network-request-failed") {
        msg = "Network error! Check your internet connection.";
      }
      showMessage(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    const { fullName, contactNo, email, password, address } = formData;
    if (!fullName || !contactNo || !email || !password || !address) {
      showMessage("All fields are required!", "error");
      return;
    }
    if (password.length < 6) {
      showMessage("Password must be at least 6 characters", "error");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), { fullName, contactNo, email, address });
      await sendEmailVerification(user);
      showMessage("Account created. Check your email!", "success");
      setTimeout(() => {
        setIsLogin(true);
        resetForm();
      }, 3000);
    } catch (error) {
      const msg = error.code === "auth/email-already-in-use"
        ? "Email already registered"
        : "Signup error: " + error.message;
      showMessage(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isLogin ? await handleLogin() : await handleSignUp();
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("loggedInUserId", user.uid);
      localStorage.setItem("isLoggedIn", "true");
      showMessage("Google login successful", "success");
      setTimeout(() => navigate(redirectTo, { replace: true }), 1000);
    } catch (error) {
      showMessage("Google Sign-in failed: " + error.message, "error");
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4 py-10 overflow-y-auto">
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row transition-all duration-700"
    >
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 w-full bg-blue-600 text-white flex flex-col items-center justify-center p-10 space-y-6"
      >
        <img src="/assets/images/user.png" alt="User Icon" className="w-40 rounded-lg" />
        <h1 className="text-2xl font-bold text-center">Book vehicle services in just a few clicks.</h1>
        <p className="text-sm text-center">Login or sign up to continue</p>
      </motion.div>

      {/* Right Panel (Form) */}
      <motion.div
        key={isLogin ? "login" : "signup"}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="md:w-1/2 w-full flex flex-col p-6 relative"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4 sticky top-0 bg-white z-10 py-2">
          {isLogin ? "Login to Your Account" : "Create User Account"}
        </h2>

        {message.text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-4 p-2 text-sm text-white rounded text-center ${message.type === "error" ? "bg-red-600" : "bg-green-600"}`}
          >
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 max-h-[70vh] pr-2">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="signup-fields"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} className="input" placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact No</label>
                  <input name="contactNo" value={formData.contactNo} maxLength="11" onChange={handleChange} className="input" placeholder="11-digit Contact No" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className="input" placeholder="Email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input pr-10"
                placeholder="Password"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>

          {!isLogin && (
            <motion.div
              key="address"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input name="address" value={formData.address} onChange={handleChange} className="input" placeholder="Address" />
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </motion.button>

          <p className="text-sm text-center text-gray-600 mt-2">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span className="text-blue-700 cursor-pointer hover:underline" onClick={() => { setIsLogin(false); resetForm(); }}>
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="text-blue-700 cursor-pointer hover:underline" onClick={() => { setIsLogin(true); resetForm(); }}>
                  Login
                </span>
              </>
            )}
          </p>

          {isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4"
            >
              <p className="text-sm mb-2">Or login with</p>
              <div className="flex justify-center gap-4 text-xl">
                <i className="fab fa-google text-red-600 cursor-pointer hover:scale-110 transition" onClick={handleGoogleSignIn} />
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </motion.div>
  </div>
);


};

export default LoginUser;

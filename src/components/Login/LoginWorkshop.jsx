// import React, { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   sendEmailVerification
// } from "firebase/auth";
// import {
//   doc,
//   setDoc,
//   getDoc
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";

// const LoginWorkshop = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     workshopName: "",
//     fullName: "",
//     mobileNo: "",
//     email: "",
//     password: "",
//     cnic: "",
//     ntn: ""
//   });
//   const [available247, setAvailable247] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const showMessage = (text, type) => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage({ text: "", type: "" }), 5000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     if (isLogin) {
//       if (!email || !password) {
//         showMessage("Email and password are required", "error");
//         return;
//       }

//       try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         const workshopRef = doc(db, "workshops", user.uid);
//         const workshopSnap = await getDoc(workshopRef);

//         if (!workshopSnap.exists()) {
//           showMessage("No workshop account found with these credentials", "error");
//           return;
//         }

//         const workshopData = workshopSnap.data();

//         if (workshopData.status === "request") {
//           showMessage("Your workshop request is still pending. Please wait for admin approval.", "error");
//           return;
//         }

//         if (!user.emailVerified) {
//           showMessage("Please verify your email first!", "error");
//           return;
//         }

//         showMessage("Login successful", "success");
//         localStorage.setItem('loggedInWorkshopId', user.uid);

//         setTimeout(() => {
//           navigate('/aslam-dashboard');
//         }, 1000);

//       } catch (error) {
//         let errorMessage = "Login failed";

//         switch (error.code) {
//           case 'auth/wrong-password':
//           case 'auth/user-not-found':
//           case 'auth/invalid-credential':
//             errorMessage = "Incorrect Email or Password";
//             break;
//           case 'auth/too-many-requests':
//             errorMessage = "Too many failed attempts. Try again later.";
//             break;
//           case 'auth/network-request-failed':
//             errorMessage = "Network error! Check your internet connection.";
//             break;
//           default:
//             errorMessage = "Login error: " + error.message;
//         }

//         showMessage(errorMessage, "error");
//       }

//     } else {
//       const { workshopName, fullName, mobileNo, email, password, cnic, ntn } = formData;

//       if (!workshopName || !fullName || !mobileNo || !email || !password || !cnic || !ntn) {
//         showMessage("All fields are required!", "error");
//         return;
//       }

//       if (!/^\d{13}$/.test(cnic)) {
//         showMessage("CNIC must be 13 digits (no dashes)", "error");
//         return;
//       }

//       if (!/^\d{7}$/.test(ntn)) {
//         showMessage("NTN must be 7 digits", "error");
//         return;
//       }

//       if (!available247) {
//         showMessage("You must confirm your workshop is 24/7 available for emergency help.", "error");
//         return;
//       }

//       try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         const workshopData = {
//           uid: user.uid,
//           workshopName,
//           fullName,
//           mobileNo,
//           email,
//           cnic,
//           ntn,
//           available247: true,
//           createdAt: new Date(),
//           status: "request"
//         };

//         await setDoc(doc(db, "workshops", user.uid), workshopData);
//         await sendEmailVerification(user);

//         showMessage("Workshop Account Created Successfully. Verification email sent! Please verify before login.", "success");

//         setTimeout(() => {
//           setIsLogin(true);
//           setFormData({
//             workshopName: "",
//             fullName: "",
//             mobileNo: "",
//             email: "",
//             password: "",
//             cnic: "",
//             ntn: ""
//           });
//           setAvailable247(false);
//         }, 3000);

//       } catch (error) {
//         let errorMessage = "Unable to create workshop account";
//         if (error.code === 'auth/email-already-in-use') {
//           errorMessage = "Email Address Already Exists!";
//         }
//         showMessage(errorMessage, "error");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl transition-all duration-500 transform hover:scale-[1.01]">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6 transition-all duration-500">
//           {isLogin ? "Login to Your Workshop Account" : "Workshop Sign Up"}
//         </h2>

//         {message.text && (
//           <div className={`mb-4 p-3 rounded text-white text-center ${message.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
//             {message.text}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <>
//               <div>
//                 <label className="block mb-1 text-sm text-gray-700">Workshop Name</label>
//                 <input
//                   type="text"
//                   name="workshopName"
//                   placeholder="e.g. Al-Madina Auto Repair"
//                   value={formData.workshopName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm text-gray-700">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Full Name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm text-gray-700">Mobile No</label>
//                 <input
//                   type="tel"
//                   name="mobileNo"
//                   placeholder="e.g. 03001234567"
//                   maxLength="11"
//                   pattern="[0-9]{11}"
//                   value={formData.mobileNo}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm text-gray-700">CNIC</label>
//                 <input
//                   type="text"
//                   name="cnic"
//                   placeholder="13 digits only"
//                   maxLength="13"
//                   pattern="\d{13}"
//                   value={formData.cnic}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm text-gray-700">NTN Number</label>
//                 <input
//                   type="text"
//                   name="ntn"
//                   placeholder="7 digits only"
//                   maxLength="7"
//                   pattern="\d{7}"
//                   value={formData.ntn}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//               </div>
//             </>
//           )}

//           <div>
//             <label className="block mb-1 text-sm text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Minimum 8 characters"
//               minLength="8"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//           </div>

//           {!isLogin && (
//             <div className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 id="available247"
//                 checked={available247}
//                 onChange={(e) => setAvailable247(e.target.checked)}
//                 className="mt-1"
//                 required
//               />
//               <label htmlFor="available247" className="text-sm text-gray-700">
//                 I confirm that my workshop is <strong>24/7 available</strong> for emergency help.
//               </label>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>

//           <div className="text-center text-sm mt-3 text-gray-600">
//             {isLogin ? (
//               <>
//                 Don't have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => setIsLogin(false)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Sign Up
//                 </button>
//               </>
//             ) : (
//               <>
//                 Already have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => setIsLogin(true)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Login
//                 </button>
//               </>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginWorkshop;

import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";

const LoginWorkshop = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    workshopName: "",
    fullName: "",
    mobileNo: "",
    email: "",
    password: "",
    cnic: "",
    ntn: "",
  });
  const [available247, setAvailable247] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({
      workshopName: "",
      fullName: "",
      mobileNo: "",
      email: "",
      password: "",
      cnic: "",
      ntn: "",
    });
    setAvailable247(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (isLogin) {
      if (!email || !password) {
        showMessage("Email and password are required", "error");
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const workshopRef = doc(db, "workshops", user.uid);
        const workshopSnap = await getDoc(workshopRef);

        if (!workshopSnap.exists()) {
          showMessage("No workshop found", "error");
          return;
        }

        const workshopData = workshopSnap.data();
        if (workshopData.status === "request") {
          showMessage("Workshop request still pending", "error");
          return;
        }

        if (!user.emailVerified) {
          showMessage("Please verify your email first", "error");
          return;
        }

        showMessage("Login successful", "success");
        localStorage.setItem("loggedInWorkshopId", user.uid);
        setTimeout(() => navigate("/aslam-dashboard"), 1000);
      } catch (error) {
        showMessage("Login error: " + error.message, "error");
      }
    } else {
      const { workshopName, fullName, mobileNo, cnic, ntn } = formData;

      if (!workshopName || !fullName || !mobileNo || !email || !password || !cnic || !ntn) {
        showMessage("All fields are required", "error");
        return;
      }

      if (!/^\d{13}$/.test(cnic)) {
        showMessage("CNIC must be 13 digits", "error");
        return;
      }

      if (!/^\d{7}$/.test(ntn)) {
        showMessage("NTN must be 7 digits", "error");
        return;
      }

      if (!available247) {
        showMessage("Confirm 24/7 availability", "error");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const workshopData = {
          uid: user.uid,
          workshopName,
          fullName,
          mobileNo,
          email,
          cnic,
          ntn,
          available247: true,
          createdAt: new Date(),
          status: "request",
        };

        await setDoc(doc(db, "workshops", user.uid), workshopData);
        await sendEmailVerification(user);
        showMessage("Account created. Verify your email!", "success");

        setTimeout(() => {
          setIsLogin(true);
          resetForm();
        }, 3000);
      } catch (error) {
        showMessage("Signup error: " + error.message, "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 w-full bg-blue-600 text-white flex flex-col items-center justify-center p-10 space-y-6">
          <img src="/images/mechanic.png" alt="Mechanic" className="w-48 rounded-lg" />
          <h1 className="text-2xl font-bold text-center">Offer your services online — bookings to emergency help.</h1>
          <p className="text-sm text-center">Grow your garage, serve more customers</p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 w-full flex flex-col relative">
          {/* Fixed Heading */}
          <div className="sticky top-0 bg-white z-10 px-8 pt-6 pb-2 shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-700">
              {isLogin ? "Login to Your Workshop" : "Create Workshop Account"}
            </h2>
            {message.text && (
              <div className={`mt-2 p-2 text-sm text-white rounded text-center ${message.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
                {message.text}
              </div>
            )}
          </div>

          {/* Scrollable Form */}
          <div className="overflow-y-auto px-8 py-4 space-y-4 max-h-[70vh]">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Workshop Name</label>
                    <input name="workshopName" value={formData.workshopName} onChange={handleChange} className="input" placeholder="Workshop Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} className="input" placeholder="Full Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No</label>
                    <input name="mobileNo" value={formData.mobileNo} maxLength="11" onChange={handleChange} className="input" placeholder="Mobile No" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CNIC</label>
                    <input name="cnic" value={formData.cnic} maxLength="13" onChange={handleChange} className="input" placeholder="CNIC (13 digits)" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NTN</label>
                    <input name="ntn" value={formData.ntn} maxLength="7" onChange={handleChange} className="input" placeholder="NTN (7 digits)" />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="input" placeholder="Email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} className="input" placeholder="Password" />
              </div>

              {!isLogin && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={available247} onChange={(e) => setAvailable247(e.target.checked)} required />
                  <label>I confirm 24/7 emergency availability</label>
                </div>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {isLogin ? "Login" : "Sign Up"}
              </button>

              <p className="text-sm text-center text-gray-600 mt-2">
                {isLogin ? (
                  <>
                    Don’t have an account?{" "}
                    <span
                      className="text-blue-700 cursor-pointer hover:underline"
                      onClick={() => {
                        setIsLogin(false);
                        resetForm();
                      }}
                    >
                      Sign Up
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span
                      className="text-blue-700 cursor-pointer hover:underline"
                      onClick={() => {
                        setIsLogin(true);
                        resetForm();
                      }}
                    >
                      Login
                    </span>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWorkshop;



import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase"; // ✅ Imported from initialized firebase.js

const LoginWorkshop = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    email: "",
    password: "",
   
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
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
          showMessage("No workshop account found with these credentials", "error");
          return;
        }

            const workshopData = workshopSnap.data();

    // 🚫 Block login if status is 'request'
    if (workshopData.status === "request") {
      showMessage("Your workshop request is still pending. Please wait for admin approval.", "error");
      return;
    }

        if (!user.emailVerified) {
          showMessage("Please verify your email first!", "error");
          return;
        }

        showMessage("Login successful", "success");
        localStorage.setItem('loggedInWorkshopId', user.uid);

        setTimeout(() => {
          navigate('/aslam-dashboard');
        }, 1000);

      } catch (error) {
        let errorMessage = "Login failed";

        switch (error.code) {
          case 'auth/wrong-password':
          case 'auth/user-not-found':
          case 'auth/invalid-credential':
            errorMessage = "Incorrect Email or Password";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Too many failed attempts. Try again later.";
            break;
          case 'auth/network-request-failed':
            errorMessage = "Network error! Check your internet connection.";
            break;
          default:
            errorMessage = "Login error: " + error.message;
        }

        showMessage(errorMessage, "error");
      }

    } else {
      const { fullName, mobileNo, email, password} = formData;

      if (!fullName || !mobileNo || !email || !password ) {
        showMessage("All fields are required!", "error");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
      
        const workshopData = {
          uid: user.uid, // ✅ Save uid also
          fullName,
          mobileNo,
          email,
          createdAt: new Date(), // ✅ (optional) you can also save created time
          status: "request"  // ✅ NEW field added here
        };
      
        await setDoc(doc(db, "workshops", user.uid), workshopData);
        await sendEmailVerification(user);
      
        showMessage("Workshop Account Created Successfully. Verification email sent! Please verify before login.", "success");
      
        setTimeout(() => {
          setIsLogin(true);
          setFormData({
            fullName: "",
            mobileNo: "",
            email: "",
            password: "",
          });
        }, 3000);
      
      } catch (error) {
        let errorMessage = "Unable to create workshop account";
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = "Email Address Already Exists!";
        }
        showMessage(errorMessage, "error");
      }
      

      // try {
      //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      //   const user = userCredential.user;

      //   const workshopData = {
      //     fullName,
      //     mobileNo,
      //     email,
      //   };

      //   await setDoc(doc(db, "workshops", user.uid), workshopData);
      //   await sendEmailVerification(user);

      //   showMessage("Workshop Account Created Successfully. Verification email sent! Please verify before login.", "success");

      //   setTimeout(() => {
      //     setIsLogin(true);
      //     setFormData({
      //       fullName: "",
      //       mobileNo: "",
      //       email: "",
      //       password: "",
      //     });
      //   }, 3000);

      // } catch (error) {
      //   let errorMessage = "Unable to create workshop account";
      //   if (error.code === 'auth/email-already-in-use') {
      //     errorMessage = "Email Address Already Exists!";
      //   }
      //   showMessage(errorMessage, "error");
      // }
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row w-full h-full max-w-[1200px]">
        {/* Form Section */}
        <div className="lg:w-1/2 w-full flex items-center justify-center p-4">
          <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-lg w-full max-w-md p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {isLogin ? "Login to Your Workshop Account" : "Workshop Sign Up"}
              </h2>
            </div>

            {message.text && (
              <div className={`mb-4 p-3 rounded text-white text-center ${message.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="tel"
                      name="mobileNo"
                      placeholder="Mobile No (11-digits)"
                      maxLength="11"
                      pattern="[0-9]{11}"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                </>
              )}

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 8 characters)"
                  minLength="8"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>

             
       

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>

              <div className="text-center mt-4 text-sm text-gray-600">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-blue-600 hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-blue-600 hover:underline"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>

              {isLogin && (
                <div className="text-center mt-6">
                  <p className="text-sm mb-2">Or login with</p>
                  <div className="flex justify-center gap-4 text-xl">
                    <i className="fab fa-facebook text-blue-600 cursor-pointer hover:scale-110 transition" />
                    <i className="fab fa-google text-red-600 cursor-pointer hover:scale-110 transition" />
                    <i className="fab fa-twitter text-blue-400 cursor-pointer hover:scale-110 transition" />
                    <i className="fab fa-github text-gray-800 cursor-pointer hover:scale-110 transition" />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 h-full">
          <img
            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
            alt="Workshop visual"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginWorkshop;

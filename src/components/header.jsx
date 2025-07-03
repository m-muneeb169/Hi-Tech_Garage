// import React, { useState, useEffect} from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from "../firebase";

// function Header() {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [user, setUser] = useState(null);
//     const [showLocationModal, setShowLocationModal] = useState(false);
//     const db = getFirestore(app);
    
//     const navigate = useNavigate();
//     const auth = getAuth(app);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//         });
//         return () => unsubscribe(); // Cleanup
//     }, [auth]);

// const handleWorkshopLogin = async () => {
//     if (user) {
//         try {
//             const docRef = doc(db, "workshops", user.uid);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 navigate("/aslam-dashboard");
//             } else {
//                 // fallback: redirect to login
//                 navigate("/login/workshop");
//             }
//         } catch (error) {
//             console.error("Error checking workshop account:", error);
//             alert("Error checking account type");
//         }
//     } else {
//         navigate("/login/workshop");
//     }
// };

//     // // Check if already logged in and redirect accordingly
//     // const handleWorkshopLogin = async () => {
//     //     if (user) {
//     //         // User is already logged in, check if it's a workshop account
//     //         try {
//     //             const docRef = doc(db, "workshops", user.uid);
//     //             const docSnap = await getDoc(docRef);
                
//     //             if (docSnap.exists()) {
//     //                 // Workshop account found, go to dashboard
//     //                 navigate("/aslam-dashboard");
//     //             } else {
//     //                 // Not a workshop account
//     //                 alert("This is not a workshop account");
//     //             }
//     //         } catch (error) {
//     //             console.error("Error checking workshop account:", error);
//     //             alert("Error checking account type");
//     //         }
//     //     } else {
//     //         // Not logged in, go to login page
//     //         navigate("/login/workshop");
//     //     }
//     // };

//     const handleEmergencyClick = () => {
//         if (!user) {
//             navigate("/login"); // 🔁 Redirect to login if not logged in
//         } else {
//             setShowLocationModal(true); // ✅ Show location modal if logged in
//         }
//     };

//     const handleLocationPermission = () => {
//         setShowLocationModal(false); // Hide modal
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     console.log("Location granted:", position.coords);
//                     navigate("/emergency"); // Redirect after permission granted
//                 },
//                 (error) => {
//                     alert("Location permission denied or unavailable.");
//                     console.error(error);
//                 }
//             );
//         } else {
//             alert("Geolocation is not supported by this browser.");
//         }
//     };

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY;
//             setIsScrolled(scrollPosition > 0);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const routerLocation = useLocation();

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [routerLocation]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (showDropdown && !event.target.closest('.login-dropdown')) {
//                 setShowDropdown(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, [showDropdown]);

//     const toggleDropdown = () => {
//         setShowDropdown(!showDropdown);
//     };

//     return (
//         <div>
//             <div
//                 id="logo-header"
//                 className={`d-flex align-items-center justify-content-between ${isScrolled ? "header-scrolled" : ""}`}
//             >
//                 <div className="logo">
//                     <h3><img style={{ marginLeft: "10px" }} height="80" src="./assets/images/logs1.png" alt="" /></h3>
//                 </div>

//                 <div className="d-flex header-buttons me-3">
//                     <div className="login-dropdown position-relative me-2">
//                         <button className="btn btn-primary" onClick={toggleDropdown}>Login</button>
//                         {showDropdown && (
//                             <div className="dropdown-menu show position-absolute mt-1">
//                                 <button className="dropdown-item text-black" onClick={handleWorkshopLogin}>
//                                     Login as Workshop
//                                 </button>
//                                 <Link to="/login/user" className="dropdown-item text-black">
//                                     Login as User
//                                 </Link>
//                             </div>
//                         )}
//                     </div>

//                     <button className="btn btn-danger" onClick={handleEmergencyClick}>Emergency</button>
//                 </div>
//             </div>

//             {/* Modal Dialog for Location Permission */}
//             {showLocationModal && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h5>Allow Location Access</h5>
//                         <p>This website wants to access your location for emergency assistance. Do you allow?</p>
//                         <div className="d-flex justify-content-end">
//                             <button className="btn btn-secondary me-2" onClick={() => setShowLocationModal(false)}>Cancel</button>
//                             <button className="btn btn-primary" onClick={handleLocationPermission}>OK</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* CSS */}
//             <style jsx>{`
//                 .header-buttons {
//                     display: flex;
//                     align-items: center;
//                 }

//                 .dropdown-menu {
//                     right: 0;
//                     left: auto;
//                     min-width: 180px;
//                     z-index: 1000;
//                     background: white;
//                     border: 1px solid rgba(0,0,0,0.15);
//                     border-radius: 0.25rem;
//                     box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.175);
//                 }

//                 .dropdown-item {
//                     padding: 0.5rem 1rem;
//                     text-decoration: none;
//                     color: #212529;
//                 }

//                 .dropdown-item:hover {
//                     background-color: #f8f9fa;
//                 }

//                 @media (max-width: 768px) {
//                     .header-buttons {
//                         flex-direction: column;
//                         align-items: flex-end;
//                     }

//                     .login-dropdown {
//                         margin-bottom: 0.5rem;
//                         margin-right: 0 !important;
//                     }

//                     .dropdown-menu {
//                         position: absolute;
//                         right: 0;
//                         width: 160px;
//                     }
//                 }

//                 @media (max-width: 576px) {
//                     #logo-header {
//                         flex-direction: column;
//                         align-items: flex-start !important;
//                     }

//                     .header-buttons {
//                         margin-top: 1rem;
//                         align-self: flex-end;
//                         margin-bottom: 0.5rem;
//                     }
//                 }

//                 /* Modal Styles */
//                 .modal-overlay {
//                     position: fixed;
//                     top: 0;
//                     left: 0;
//                     right: 0;
//                     bottom: 0;
//                     background: rgba(0,0,0,0.5);
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     z-index: 1050;
//                 }

//                 .modal-content {
//                     background: white;
//                     padding: 20px;
//                     border-radius: 10px;
//                     max-width: 400px;
//                     width: 90%;
//                     box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.3);
//                     text-align: center;
//                 }
//             `}</style>
//         </div>
//     );
// }

// export default Header;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null);
    const db = getFirestore(app);
    
    const navigate = useNavigate();
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleWorkshopLogin = async () => {
        if (user) {
            try {
                const docRef = doc(db, "workshops", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    navigate("/aslam-dashboard");
                } else {
                    navigate("/login/workshop");
                }
            } catch (error) {
                console.error("Error checking workshop account:", error);
                alert("Error checking account type");
            }
        } else {
            navigate("/login/workshop");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const routerLocation = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [routerLocation]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.login-dropdown')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
            <div
                id="logo-header"
                className={`d-flex align-items-center justify-content-between ${isScrolled ? "header-scrolled" : ""}`}
            >
                <div className="logo">
                    <h3><img style={{ marginLeft: "10px" }} height="80" src="./assets/images/logs1.png" alt="" /></h3>
                </div>

                <div className="d-flex header-buttons me-3">
                    <div className="login-dropdown position-relative me-2">
                        <button className="btn btn-primary" onClick={toggleDropdown}>Login</button>
                        {showDropdown && (
                            <div className="dropdown-menu show position-absolute mt-1">
                                <button className="dropdown-item text-black" onClick={handleWorkshopLogin}>
                                    Login as Workshop
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CSS */}
            <style jsx>{`
                .header-buttons {
                    display: flex;
                    align-items: center;
                }

                .dropdown-menu {
                    right: 0;
                    left: auto;
                    min-width: 180px;
                    z-index: 1000;
                    background: white;
                    border: 1px solid rgba(0,0,0,0.15);
                    border-radius: 0.25rem;
                    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.175);
                }

                .dropdown-item {
                    padding: 0.5rem 1rem;
                    text-decoration: none;
                    color: #212529;
                }

                .dropdown-item:hover {
                    background-color: #f8f9fa;
                }

                @media (max-width: 768px) {
                    .header-buttons {
                        flex-direction: column;
                        align-items: flex-end;
                    }

                    .login-dropdown {
                        margin-bottom: 0.5rem;
                        margin-right: 0 !important;
                    }

                    .dropdown-menu {
                        position: absolute;
                        right: 0;
                        width: 160px;
                    }
                }

                @media (max-width: 576px) {
                    #logo-header {
                        flex-direction: column;
                        align-items: flex-start !important;
                    }

                    .header-buttons {
                        margin-top: 1rem;
                        align-self: flex-end;
                        margin-bottom: 0.5rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default Header;

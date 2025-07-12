
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from "../firebase";

// function Header() {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [user, setUser] = useState(null);
//     const db = getFirestore(app);
    
//     const navigate = useNavigate();
//     const auth = getAuth(app);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//         });
//         return () => unsubscribe();
//     }, [auth]);

//     const handleWorkshopLogin = async () => {
//         if (user) {
//             try {
//                 const docRef = doc(db, "workshops", user.uid);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                     navigate("/aslam-dashboard");
//                 } else {
//                     navigate("/login/workshop");
//                 }
//             } catch (error) {
//                 console.error("Error checking workshop account:", error);
//                 alert("Error checking account type");
//             }
//         } else {
//             navigate("/login/workshop");
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
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

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
//             `}</style>
//         </div>
//     );
// }

// export default Header;





// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from "../firebase";

// function Header() {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [user, setUser] = useState(null);
//     const db = getFirestore(app);

//     const navigate = useNavigate();
//     const auth = getAuth(app);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//         });
//         return () => unsubscribe();
//     }, [auth]);

//     const handleWorkshopLogin = async () => {
//         if (user) {
//             try {
//                 const docRef = doc(db, "workshops", user.uid);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                     navigate("/aslam-dashboard");
//                 } else {
//                     navigate("/login/workshop");
//                 }
//             } catch (error) {
//                 console.error("Error checking workshop account:", error);
//                 alert("Error checking account type");
//             }
//         } else {
//             navigate("/login/workshop");
//         }
//     };

//     const handleUserLogin = () => {
//         navigate("/booking");
//     };

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 0);
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
//             if (showDropdown && !event.target.closest(".login-dropdown")) {
//                 setShowDropdown(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
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
//                     <h3>
//                         <img
//                             style={{ marginLeft: "10px" }}
//                             height="80"
//                             src="./assets/images/logs1.png"
//                             alt="logo"
//                         />
//                     </h3>
//                 </div>

//                 <div className="d-flex header-buttons me-3">
//                     <div className="login-dropdown position-relative me-2">
//                         <button className="btn btn-primary" onClick={toggleDropdown}>
//                             Login
//                         </button>
//                         {showDropdown && (
//                             <div className="dropdown-menu show position-absolute mt-1">
//                                 <button
//                                     className="dropdown-item"
//                                     onClick={handleWorkshopLogin}
//                                 >
//                                     Login as Workshop
//                                 </button>
//                                 <button
//                                     className="dropdown-item"
//                                     onClick={handleUserLogin}
//                                 >
//                                     Login as User
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* CSS */}
//             <style jsx>{`
//                 #logo-header {
//                     position: fixed;
//                     top: 0;
//                     left: 0;
//                     width: 100%;
//                     z-index: 9999;
//                     padding: 10px 20px;
//                     background-color: transparent;
//                     transition: background-color 0.3s ease, box-shadow 0.3s ease;
//                 }

//                 .header-scrolled {
//                     background-color: white !important;
//                     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//                 }

//                 .header-buttons {
//                     display: flex;
//                     align-items: center;
//                 }

//                 .dropdown-menu {
//                     right: 0;
//                     left: auto;
//                     min-width: 180px;
//                     z-index: 10000;
//                     background: white;
//                     border: 1px solid rgba(0, 0, 0, 0.15);
//                     border-radius: 0.25rem;
//                     box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
//                 }

//                 .dropdown-item {
//                     padding: 0.5rem 1rem;
//                     text-decoration: none;
//                     color: #212529 !important;
//                     background-color: white !important;
//                     border: none;
//                     width: 100%;
//                     text-align: left;
//                     cursor: pointer;
//                     transition: background-color 0.15s ease-in-out;
//                 }

//                 .dropdown-item:hover {
//                     background-color: #f8f9fa !important;
//                     color: #212529 !important;
//                 }

//                 .dropdown-item:focus {
//                     background-color: #f8f9fa !important;
//                     color: #212529 !important;
//                     outline: none;
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

    const handleUserLogin = () => {
        navigate("/booking");
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
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
            if (showDropdown && !event.target.closest(".login-dropdown")) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
                    <h3>
                        <img
                            style={{ marginLeft: "10px" }}
                            height="80"
                            src="./assets/images/logs1.png"
                            alt="logo"
                        />
                    </h3>
                </div>

                <div className="d-flex header-buttons me-3">
                    <div className="login-dropdown position-relative me-2">
                        <button className="btn btn-primary" onClick={toggleDropdown}>
                            Login
                        </button>
                        {showDropdown && (
                            <div className="dropdown-menu show position-absolute mt-1">
                                <button
                                    className="dropdown-item"
                                    onClick={handleWorkshopLogin}
                                >
                                    Login as Workshop
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={handleUserLogin}
                                >
                                    Login as User
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CSS */}
            <style jsx>{`
                #logo-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 9999;
                    padding: 10px 20px;
                    background-color: transparent;
                    transition: background-color 0.3s ease, box-shadow 0.3s ease;
                }

                .header-scrolled {
                    background-color: white !important;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header-buttons {
                    display: flex;
                    align-items: center;
                }

                .dropdown-menu {
                    right: 0;
                    left: auto;
                    min-width: 180px;
                    z-index: 10000;
                    background: white;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    border-radius: 0.25rem;
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
                    transition: background-color 0.3s ease;
                }

                .header-scrolled .dropdown-menu {
    background: linear-gradient(to bottom, #b3dfff, #007bff) !important;
}


                .dropdown-item {
                    padding: 0.5rem 1rem;
                    text-decoration: none;
                    color: #212529 !important;
                    background-color: transparent !important;
                    border: none;
                    width: 100%;
                    text-align: left;
                    cursor: pointer;
                    transition: background-color 0.15s ease-in-out, color 0.3s ease;
                }

                .dropdown-item:hover {
                    background-color: rgba(0, 0, 0, 0.1) !important;
                    color: #212529 !important;
                }

                .dropdown-item:focus {
                    background-color: rgba(0, 0, 0, 0.1) !important;
                    color: #212529 !important;
                    outline: none;
                }

                .header-scrolled .dropdown-item {
                    color: white !important;
                }

                .header-scrolled .dropdown-item:hover {
                    background-color: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                }

                .header-scrolled .dropdown-item:focus {
                    background-color: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
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
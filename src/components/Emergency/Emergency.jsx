// import React, { useState, useEffect } from 'react';
// import { getAuth } from 'firebase/auth';
// import { db } from '../../firebase';
// import {
//   collection,
//   doc,
//   getDoc,
//   arrayUnion,
//   updateDoc,
//   getDocs
// } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Red Marker Icon
// const redIcon = new L.Icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const Emergency = () => {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [problem, setProblem] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [acceptedWorkshops, setAcceptedWorkshops] = useState([]);
//   const [bookedWorkshops, setBookedWorkshops] = useState([]);
//   const [hasBookedWorkshop, setHasBookedWorkshop] = useState(false);

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by this browser.');
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ lat: latitude, lng: longitude });
//         setLoading(false);
//       },
//       () => {
//         setError('Unable to retrieve your location.');
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   const reverseGeocode = async (lat, lng) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//       );
//       const data = await response.json();
//       if (data?.display_name) {
//         setLocation((prev) => ({ ...prev, address: data.display_name }));
//       }
//     } catch {
//       setError('Failed to fetch address.');
//     }
//   };

//   useEffect(() => {
//     if (location?.lat && location?.lng && !location?.address) {
//       reverseGeocode(location.lat, location.lng);
//     }
//   }, [location?.lat, location?.lng]);

//   // ✅ Updated fetchUserEmergencies function
//   const fetchUserEmergencies = async () => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       if (userSnap.exists()) {
//         const emergencies = (userSnap.data().emergency || []).sort(
//           (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//         );
//         const confirmed = emergencies.filter((e) => e.status === 'confirmed');
//         if (confirmed.length > 0) {
//           setHasBookedWorkshop(true);
//           setBookedWorkshops(confirmed);
//           // ✅ Clear accepted workshops if user has confirmed booking
//           setAcceptedWorkshops([]);
//         } else {
//           setHasBookedWorkshop(false);
//           setBookedWorkshops([]);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Fixed fetchAcceptedWorkshops function
//   const fetchAcceptedWorkshops = async () => {
//     if (!user) return;
    
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userEmergencies = userSnap.data().emergency || [];

//       // ✅ Check if user already has confirmed workshop
//       const hasConfirmedWorkshop = userEmergencies.some(e => e.status === 'confirmed');
      
//       if (hasConfirmedWorkshop) {
//         setAcceptedWorkshops([]);
//         return;
//       }

//       const latestUnconfirmed = userEmergencies
//         .filter((e) => e.status !== 'confirmed')
//         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

//       if (!latestUnconfirmed) {
//         setAcceptedWorkshops([]);
//         return;
//       }

//       const snap = await getDocs(collection(db, 'workshops'));
//       const acceptedList = [];

//       for (const docSnap of snap.docs) {
//         const data = docSnap.data();
//         const reqs = data.requestemergencyorder || [];

//         for (const req of reqs) {
//           if (
//             req.userId === user.uid &&
//             req.status === 'accepted' &&
//             req.emergencyId === latestUnconfirmed.emergencyId
//           ) {
//             acceptedList.push({
//               workshopId: docSnap.id,
//               fullName: data.fullName || 'Workshop',
//               phone: req.workshopPhone || data.phone || 'N/A',
//               email: req.workshopEmail || data.email || 'N/A',
//               problem: req.problem || 'N/A',
//               acceptedAt: req.acceptedAt || req.timestamp || '',
//               emergencyId: req.emergencyId || ''
//             });
//           }
//         }
//       }

//       setAcceptedWorkshops(acceptedList);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleHelpRequest = async () => {
//     if (!user || !problem.trim()) return;
//     setSubmitting(true);
//     try {
//       const emergency = {
//         emergencyId: uuidv4(),
//         userId: user.uid,
//         userEmail: user.email,
//         address: location?.address || '',
//         problem: problem.trim(),
//         location: { lat: location?.lat, lng: location?.lng },
//         timestamp: new Date().toISOString(),
//         status: 'pending',
//       };
//       const userRef = doc(db, 'users', user.uid);
//       await updateDoc(userRef, {
//         emergency: arrayUnion(emergency)
//       });
//       alert('Help request sent.');
//       setProblem('');
//       fetchUserEmergencies();
//       fetchAcceptedWorkshops();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const confirmBooking = async (w) => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userData = userSnap.data();

//       const updatedEmergencies = (userData.emergency || []).map((e) =>
//         e.emergencyId === w.emergencyId
//           ? {
//               ...e,
//               status: 'confirmed',
//               bookedWorkshop: {
//                 workshopId: w.workshopId,
//                 workshopName: w.fullName,
//                 workshopPhone: w.phone,
//                 workshopEmail: w.email,
//               },
//               bookedAt: new Date().toISOString(),
//             }
//           : e
//       );

//       await updateDoc(userRef, {
//         emergency: updatedEmergencies,
//       });

//       // ✅ Clear accepted workshops immediately after booking
//       setAcceptedWorkshops([]);
//       setHasBookedWorkshop(true);

//       // ✅ Refresh user emergencies to get updated booked workshops
//       await fetchUserEmergencies();

//       alert('Workshop confirmed successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to confirm workshop.');
//     }
//   };

//   const markCompleted = async (emergencyId) => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userData = userSnap.data();

//       const updatedEmergencies = (userData.emergency || []).map((e) =>
//         e.emergencyId === emergencyId
//           ? {
//               ...e,
//               status: 'completed',
//               completedAt: new Date().toISOString(),
//             }
//           : e
//       );

//       await updateDoc(userRef, {
//         emergency: updatedEmergencies,
//       });

//       // Clear both accepted workshops and booked workshops
//       setAcceptedWorkshops([]);
//       setBookedWorkshops([]);
//       setHasBookedWorkshop(false);
      
//       // Refresh the data
//       fetchUserEmergencies();
//       alert('Workshop marked as completed!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to mark workshop as completed.');
//     }
//   };

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   // ✅ Main useEffect to handle initialization
//   useEffect(() => {
//     const initializeEmergencyState = async () => {
//       if (!user) return;
      
//       // First fetch user emergencies to check if already booked
//       await fetchUserEmergencies();
      
//       // Then check for accepted workshops only if no confirmed booking exists
//       // This will be handled by the next useEffect that depends on hasBookedWorkshop
//     };

//     initializeEmergencyState();
//   }, [user]);

//   // ✅ Separate useEffect to handle accepted workshops based on booking status
//   useEffect(() => {
//     if (user && !hasBookedWorkshop) {
//       fetchAcceptedWorkshops();
//     } else if (hasBookedWorkshop) {
//       // Clear accepted workshops if user has booked workshop
//       setAcceptedWorkshops([]);
//     }
//   }, [user, hasBookedWorkshop]);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p>Please log in to use emergency services.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-xl mx-auto space-y-6">
//       <div className="bg-white rounded shadow p-4">
//         <h1 className="text-xl font-bold text-center mb-4">Emergency Help</h1>

//         {location && (
//           <div className="mb-4">
//             <label className="block text-sm font-semibold mb-1">Your Current Location</label>
//             <div className="h-64 rounded overflow-hidden">
//               <MapContainer center={[location.lat, location.lng]} zoom={15} scrollWheelZoom={false} className="h-full w-full">
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="&copy; OpenStreetMap contributors"
//                 />
//                 <Marker position={[location.lat, location.lng]} icon={redIcon} />
//               </MapContainer>
//             </div>
//             <p className="text-sm text-gray-600 mt-2">
//               {location.address || 'Fetching address...'}
//             </p>
//             <p className="text-xs text-gray-500">
//               Lat: {location.lat}, Lng: {location.lng}
//             </p>
//           </div>
//         )}

//         {/* ✅ Only show request form if no booked workshop */}
//         {!hasBookedWorkshop && (
//           <>
//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">Describe Your Problem</label>
//               <textarea
//                 value={problem}
//                 onChange={(e) => setProblem(e.target.value)}
//                 rows="4"
//                 className="w-full border rounded p-2"
//                 placeholder="Explain your emergency situation..."
//               />
//             </div>

//             <button
//               onClick={handleHelpRequest}
//               disabled={submitting || !problem.trim()}
//               className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
//             >
//               {submitting ? 'Sending...' : 'Send Help Request'}
//             </button>
//           </>
//         )}
//       </div>

//       {/* Accepted Workshops Section - Only show if no booked workshop */}
//       {acceptedWorkshops.length > 0 && !hasBookedWorkshop && (
//         <div className="bg-white rounded shadow p-4">
//           <h2 className="text-lg font-semibold mb-3">Workshops That Accepted Your Request</h2>
//           <ul className="space-y-3">
//             {acceptedWorkshops.map((w, i) => (
//               <li key={i} className="border p-3 rounded space-y-1">
//                 <p><strong>Name:</strong> {w.fullName}</p>
//                 <p><strong>Phone:</strong> {w.phone}</p>
//                 <p><strong>Email:</strong> {w.email}</p>
//                 <p><strong>Problem:</strong> {w.problem}</p>
//                 <p><strong>Accepted At:</strong> {new Date(w.acceptedAt).toLocaleString()}</p>
//                 <button
//                   onClick={() => confirmBooking(w)}
//                   className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-1.5 rounded"
//                 >
//                   Confirm Booking
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Booked Workshop Section */}
//       {bookedWorkshops.length > 0 && hasBookedWorkshop && (
//         <div className="bg-white rounded shadow p-4">
//           <h2 className="text-lg font-semibold mb-3">Your Booked Workshop</h2>
//           <ul className="space-y-3">
//             {bookedWorkshops.map((b, i) => (
//               <li key={i} className="border p-3 rounded">
//                 <p><strong>Name:</strong> {b.bookedWorkshop?.workshopName}</p>
//                 <p><strong>Phone:</strong> {b.bookedWorkshop?.workshopPhone}</p>
//                 <p><strong>Email:</strong> {b.bookedWorkshop?.workshopEmail}</p>
//                 <p><strong>Problem:</strong> {b.problem}</p>
//                 <p><strong>Booked At:</strong> {new Date(b.bookedAt).toLocaleString()}</p>
//                 <p className="text-green-700 font-semibold mb-2">Confirmed</p>
//                 <button
//                   onClick={() => markCompleted(b.emergencyId)}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded"
//                 >
//                   Mark Completed
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Emergency;

// import React, { useState, useEffect } from 'react';
// import { getAuth } from 'firebase/auth';
// import { db } from '../../firebase';
// import {
//   collection,
//   doc,
//   getDoc,
//   arrayUnion,
//   updateDoc,
//   getDocs
// } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Red Marker Icon
// const redIcon = new L.Icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const Emergency = () => {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [problem, setProblem] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [acceptedWorkshops, setAcceptedWorkshops] = useState([]);
//   const [bookedWorkshops, setBookedWorkshops] = useState([]);
//   const [hasBookedWorkshop, setHasBookedWorkshop] = useState(false);

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by this browser.');
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ lat: latitude, lng: longitude });
//         setLoading(false);
//       },
//       () => {
//         setError('Unable to retrieve your location.');
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   const reverseGeocode = async (lat, lng) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//       );
//       const data = await response.json();
//       if (data?.display_name) {
//         setLocation((prev) => ({ ...prev, address: data.display_name }));
//       }
//     } catch {
//       setError('Failed to fetch address.');
//     }
//   };

//   useEffect(() => {
//     if (location?.lat && location?.lng && !location?.address) {
//       reverseGeocode(location.lat, location.lng);
//     }
//   }, [location?.lat, location?.lng]);

//   // ✅ Updated fetchUserEmergencies function
//   const fetchUserEmergencies = async () => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       if (userSnap.exists()) {
//         const emergencies = (userSnap.data().emergency || []).sort(
//           (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//         );
//         const confirmed = emergencies.filter((e) => e.status === 'confirmed');
//         if (confirmed.length > 0) {
//           setHasBookedWorkshop(true);
//           setBookedWorkshops(confirmed);
//         } else {
//           setHasBookedWorkshop(false);
//           setBookedWorkshops([]);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Fixed fetchAcceptedWorkshops function
//   const fetchAcceptedWorkshops = async () => {
//     if (!user) return;
    
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userEmergencies = userSnap.data().emergency || [];

//       const latestUnconfirmed = userEmergencies
//         .filter((e) => e.status !== 'confirmed' && e.status !== 'completed')
//         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

//       if (!latestUnconfirmed) {
//         setAcceptedWorkshops([]);
//         return;
//       }

//       const snap = await getDocs(collection(db, 'workshops'));
//       const acceptedList = [];

//       for (const docSnap of snap.docs) {
//         const data = docSnap.data();
//         const reqs = data.requestemergencyorder || [];

//         for (const req of reqs) {
//           if (
//             req.userId === user.uid &&
//             req.status === 'accepted' &&
//             req.emergencyId === latestUnconfirmed.emergencyId
//           ) {
//             acceptedList.push({
//               workshopId: docSnap.id,
//               fullName: data.fullName || 'Workshop',
//               phone: req.workshopPhone || data.phone || 'N/A',
//               email: req.workshopEmail || data.email || 'N/A',
//               problem: req.problem || 'N/A',
//               acceptedAt: req.acceptedAt || req.timestamp || '',
//               emergencyId: req.emergencyId || ''
//             });
//           }
//         }
//       }

//       setAcceptedWorkshops(acceptedList);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleHelpRequest = async () => {
//     if (!user || !problem.trim()) return;
//     setSubmitting(true);
//     try {
//       const emergency = {
//         emergencyId: uuidv4(),
//         userId: user.uid,
//         userEmail: user.email,
//         address: location?.address || '',
//         problem: problem.trim(),
//         location: { lat: location?.lat, lng: location?.lng },
//         timestamp: new Date().toISOString(),
//         status: 'pending',
//       };
//       const userRef = doc(db, 'users', user.uid);
//       await updateDoc(userRef, {
//         emergency: arrayUnion(emergency)
//       });
//       alert('Help request sent.');
//       setProblem('');
//       fetchUserEmergencies();
//       fetchAcceptedWorkshops();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const confirmBooking = async (w) => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userData = userSnap.data();

//       const updatedEmergencies = (userData.emergency || []).map((e) =>
//         e.emergencyId === w.emergencyId
//           ? {
//               ...e,
//               status: 'confirmed',
//               bookedWorkshop: {
//                 workshopId: w.workshopId,
//                 workshopName: w.fullName,
//                 workshopPhone: w.phone,
//                 workshopEmail: w.email,
//               },
//               bookedAt: new Date().toISOString(),
//             }
//           : e
//       );

//       await updateDoc(userRef, {
//         emergency: updatedEmergencies,
//       });

//       // ✅ Clear accepted workshops after booking and set booked status
//       setAcceptedWorkshops([]);
//       setHasBookedWorkshop(true);

//       // ✅ Refresh user emergencies to get updated booked workshops
//       await fetchUserEmergencies();

//       alert('Workshop confirmed successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to confirm workshop.');
//     }
//   };

//   const markCompleted = async (emergencyId) => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userData = userSnap.data();

//       const updatedEmergencies = (userData.emergency || []).map((e) =>
//         e.emergencyId === emergencyId
//           ? {
//               ...e,
//               status: 'completed',
//               completedAt: new Date().toISOString(),
//             }
//           : e
//       );

//       await updateDoc(userRef, {
//         emergency: updatedEmergencies,
//       });

//       // Clear both accepted workshops and booked workshops
//       setAcceptedWorkshops([]);
//       setBookedWorkshops([]);
//       setHasBookedWorkshop(false);
      
//       // Refresh the data
//       fetchUserEmergencies();
//       alert('Workshop marked as completed!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to mark workshop as completed.');
//     }
//   };

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   // ✅ Main useEffect to handle initialization
//   useEffect(() => {
//     const initializeEmergencyState = async () => {
//       if (!user) return;
      
//       // First fetch user emergencies to check if already booked
//       await fetchUserEmergencies();
      
//       // Then check for accepted workshops only if no confirmed booking exists
//       // This will be handled by the next useEffect that depends on hasBookedWorkshop
//     };

//     initializeEmergencyState();
//   }, [user]);

//   // ✅ Separate useEffect to handle accepted workshops
//   useEffect(() => {
//     if (user) {
//       fetchAcceptedWorkshops();
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p>Please log in to use emergency services.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-xl mx-auto space-y-6">
//       <div className="bg-white rounded shadow p-4">
//         <h1 className="text-xl font-bold text-center mb-4">Emergency Help</h1>

//         {location && (
//           <div className="mb-4">
//             <label className="block text-sm font-semibold mb-1">Your Current Location</label>
//             <div className="h-64 rounded overflow-hidden">
//               <MapContainer center={[location.lat, location.lng]} zoom={15} scrollWheelZoom={false} className="h-full w-full">
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="&copy; OpenStreetMap contributors"
//                 />
//                 <Marker position={[location.lat, location.lng]} icon={redIcon} />
//               </MapContainer>
//             </div>
//             <p className="text-sm text-gray-600 mt-2">
//               {location.address || 'Fetching address...'}
//             </p>
//             <p className="text-xs text-gray-500">
//               Lat: {location.lat}, Lng: {location.lng}
//             </p>
//           </div>
//         )}

//         {/* ✅ Show request form always */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1">Describe Your Problem</label>
//           <textarea
//             value={problem}
//             onChange={(e) => setProblem(e.target.value)}
//             rows="4"
//             className="w-full border rounded p-2"
//             placeholder="Explain your emergency situation..."
//           />
//         </div>

//         <button
//           onClick={handleHelpRequest}
//           disabled={submitting || !problem.trim()}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
//         >
//           {submitting ? 'Sending...' : 'Send Help Request'}
//         </button>
//       </div>

//       {/* Accepted Workshops Section - Always show if available */}
//       {acceptedWorkshops.length > 0 && (
//         <div className="bg-white rounded shadow p-4">
//           <h2 className="text-lg font-semibold mb-3">Workshops That Accepted Your Request</h2>
//           <ul className="space-y-3">
//             {acceptedWorkshops.map((w, i) => (
//               <li key={i} className="border p-3 rounded space-y-1">
//                 <p><strong>Name:</strong> {w.fullName}</p>
//                 <p><strong>Phone:</strong> {w.phone}</p>
//                 <p><strong>Email:</strong> {w.email}</p>
//                 <p><strong>Problem:</strong> {w.problem}</p>
//                 <p><strong>Accepted At:</strong> {new Date(w.acceptedAt).toLocaleString()}</p>
//                 <button
//                   onClick={() => confirmBooking(w)}
//                   className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-1.5 rounded"
//                 >
//                   Confirm Booking
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Booked Workshop Section */}
//       {bookedWorkshops.length > 0 && (
//         <div className="bg-white rounded shadow p-4">
//           <h2 className="text-lg font-semibold mb-3">Your Booked Workshop</h2>
//           <ul className="space-y-3">
//             {bookedWorkshops.map((b, i) => (
//               <li key={i} className="border p-3 rounded">
//                 <p><strong>Name:</strong> {b.bookedWorkshop?.workshopName}</p>
//                 <p><strong>Phone:</strong> {b.bookedWorkshop?.workshopPhone}</p>
//                 <p><strong>Email:</strong> {b.bookedWorkshop?.workshopEmail}</p>
//                 <p><strong>Problem:</strong> {b.problem}</p>
//                 <p><strong>Booked At:</strong> {new Date(b.bookedAt).toLocaleString()}</p>
//                 <p className="text-green-700 font-semibold mb-2">Confirmed</p>
//                 <button
//                   onClick={() => markCompleted(b.emergencyId)}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded"
//                 >
//                   Mark Completed
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Emergency;


// import React, { useState, useEffect } from 'react';
// import { getAuth } from 'firebase/auth';
// import { db } from '../../firebase';
// import {
//   collection,
//   doc,
//   getDoc,
//   arrayUnion,
//   updateDoc,
//   getDocs
// } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const centerDefault = {
//   lat: 33.6844,
//   lng: 73.0479
// };

// const Emergency = () => {
//   const [location, setLocation] = useState(centerDefault);
//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [problem, setProblem] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [acceptedWorkshops, setAcceptedWorkshops] = useState([]);
//   const [bookedWorkshops, setBookedWorkshops] = useState([]);
//   const [hasBookedWorkshop, setHasBookedWorkshop] = useState(false);

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'AIzaSyCilowLu5cbVvLSETFYIk-fAow0OCL4Bm8',
//     libraries: ['places']
//   });

//   // Get current position and reverse geocode
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const coords = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           setLocation(coords);
//           await fetchAddress(coords.lat, coords.lng);
//           setLoading(false);
//         },
//         () => {
//           alert("Failed to get location");
//           setLoading(false);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//       setLoading(false);
//     }
//   }, []);

//   const fetchAddress = async (lat, lng) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCilowLu5cbVvLSETFYIk-fAow0OCL4Bm8`
//       );
//       const data = await response.json();
//       if (data.status === 'OK') {
//         setAddress(data.results[0].formatted_address);
//       } else {
//         setAddress('Unable to fetch address');
//       }
//     } catch (error) {
//       setAddress('Error fetching address');
//     }
//   };

//   const handleHelpRequest = async () => {
//     if (!user || !problem.trim()) return;
//     setSubmitting(true);
//     try {
//       const emergency = {
//         emergencyId: uuidv4(),
//         userId: user.uid,
//         userEmail: user.email,
//         address: address || '',
//         problem: problem.trim(),
//         location: { lat: location.lat, lng: location.lng },
//         timestamp: new Date().toISOString(),
//         status: 'pending',
//       };
//       const userRef = doc(db, 'users', user.uid);
//       await updateDoc(userRef, {
//         emergency: arrayUnion(emergency)
//       });
//       alert('Help request sent.');
//       setProblem('');
//       fetchUserEmergencies();
//       fetchAcceptedWorkshops();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const fetchUserEmergencies = async () => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       if (userSnap.exists()) {
//         const emergencies = (userSnap.data().emergency || []).sort(
//           (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//         );
//         const confirmed = emergencies.filter((e) => e.status === 'confirmed');
//         if (confirmed.length > 0) {
//           setHasBookedWorkshop(true);
//           setBookedWorkshops(confirmed);
//         } else {
//           setHasBookedWorkshop(false);
//           setBookedWorkshops([]);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchAcceptedWorkshops = async () => {
//     if (!user) return;
    
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userEmergencies = userSnap.data().emergency || [];

//       const latestUnconfirmed = userEmergencies
//         .filter((e) => e.status !== 'confirmed' && e.status !== 'completed')
//         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

//       if (!latestUnconfirmed) {
//         setAcceptedWorkshops([]);
//         return;
//       }

//       const snap = await getDocs(collection(db, 'workshops'));
//       const acceptedList = [];

//       for (const docSnap of snap.docs) {
//         const data = docSnap.data();
//         const reqs = data.requestemergencyorder || [];

//         for (const req of reqs) {
//           if (
//             req.userId === user.uid &&
//             req.status === 'accepted' &&
//             req.emergencyId === latestUnconfirmed.emergencyId
//           ) {
//             acceptedList.push({
//               workshopId: docSnap.id,
//               fullName: data.fullName || 'Workshop',
//               phone: req.workshopPhone || data.phone || 'N/A',
//               email: req.workshopEmail || data.email || 'N/A',
//               problem: req.problem || 'N/A',
//               acceptedAt: req.acceptedAt || req.timestamp || '',
//               emergencyId: req.emergencyId || ''
//             });
//           }
//         }
//       }

//       setAcceptedWorkshops(acceptedList);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const confirmBooking = async (w) => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userData = userSnap.data();

//       const updatedEmergencies = (userData.emergency || []).map((e) =>
//         e.emergencyId === w.emergencyId
//           ? {
//               ...e,
//               status: 'confirmed',
//               bookedWorkshop: {
//                 workshopId: w.workshopId,
//                 workshopName: w.fullName,
//                 workshopPhone: w.phone,
//                 workshopEmail: w.email,
//               },
//               bookedAt: new Date().toISOString(),
//             }
//           : e
//       );

//       await updateDoc(userRef, {
//         emergency: updatedEmergencies,
//       });

//       setAcceptedWorkshops([]);
//       setHasBookedWorkshop(true);
//       await fetchUserEmergencies();
//       alert('Workshop confirmed successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to confirm workshop.');
//     }
//   };

//   const markCompleted = async (emergencyId) => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userData = userSnap.data();

//       const updatedEmergencies = (userData.emergency || []).map((e) =>
//         e.emergencyId === emergencyId
//           ? {
//               ...e,
//               status: 'completed',
//               completedAt: new Date().toISOString(),
//             }
//           : e
//       );

//       await updateDoc(userRef, {
//         emergency: updatedEmergencies,
//       });

//       setAcceptedWorkshops([]);
//       setBookedWorkshops([]);
//       setHasBookedWorkshop(false);
//       fetchUserEmergencies();
//       alert('Workshop marked as completed!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to mark workshop as completed.');
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchUserEmergencies();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user) {
//       fetchAcceptedWorkshops();
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p>Please log in to use emergency services.</p>
//       </div>
//     );
//   }

//   return isLoaded ? (
//     <div className="p-4 max-w-xl mx-auto space-y-6">
//       <div className="bg-white rounded shadow p-4">
//         <h1 className="text-xl font-bold text-center mb-4">Emergency Help</h1>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-1">Your Current Location</label>
//           <div className="rounded overflow-hidden">
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={location}
//               zoom={17}
//             >
//               <Marker
//   position={location}
//   icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
// />


//             </GoogleMap>
//           </div>
//           <p className="text-sm text-gray-600 mt-2">{loading ? 'Fetching address...' : address}</p>
//           <p className="text-xs text-gray-500">Lat: {location.lat}, Lng: {location.lng}</p>
//         </div>

//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1">Describe Your Problem</label>
//           <textarea
//             value={problem}
//             onChange={(e) => setProblem(e.target.value)}
//             rows="4"
//             className="w-full border rounded p-2"
//             placeholder="Explain your emergency situation..."
//           />
//         </div>

//         <button
//           onClick={handleHelpRequest}
//           disabled={submitting || !problem.trim()}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
//         >
//           {submitting ? 'Sending...' : 'Send Help Request'}
//         </button>
//       </div>

//       {acceptedWorkshops.length > 0 && (
//         <div className="bg-white rounded shadow p-4">
//           <h2 className="text-lg font-semibold mb-3">Workshops That Accepted Your Request</h2>
//           <ul className="space-y-3">
//             {acceptedWorkshops.map((w, i) => (
//               <li key={i} className="border p-3 rounded space-y-1">
//                 <p><strong>Name:</strong> {w.fullName}</p>
//                 <p><strong>Phone:</strong> {w.phone}</p>
//                 <p><strong>Email:</strong> {w.email}</p>
//                 <p><strong>Problem:</strong> {w.problem}</p>
//                 <p><strong>Accepted At:</strong> {new Date(w.acceptedAt).toLocaleString()}</p>
//                 <button
//                   onClick={() => confirmBooking(w)}
//                   className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-1.5 rounded"
//                 >
//                   Confirm Booking
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {bookedWorkshops.length > 0 && (
//         <div className="bg-white rounded shadow p-4">
//           <h2 className="text-lg font-semibold mb-3">Your Booked Workshop</h2>
//           <ul className="space-y-3">
//             {bookedWorkshops.map((b, i) => (
//               <li key={i} className="border p-3 rounded">
//                 <p><strong>Name:</strong> {b.bookedWorkshop?.workshopName}</p>
//                 <p><strong>Phone:</strong> {b.bookedWorkshop?.workshopPhone}</p>
//                 <p><strong>Email:</strong> {b.bookedWorkshop?.workshopEmail}</p>
//                 <p><strong>Problem:</strong> {b.problem}</p>
//                 <p><strong>Booked At:</strong> {new Date(b.bookedAt).toLocaleString()}</p>
//                 <p className="text-green-700 font-semibold mb-2">Confirmed</p>
//                 <button
//                   onClick={() => markCompleted(b.emergencyId)}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded"
//                 >
//                   Mark Completed
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   ) : (
//     <p className="text-center mt-10">Loading Map...</p>
//   );
// };

// export default Emergency;










// import React, { useState, useEffect } from 'react';
// import { getAuth } from 'firebase/auth';
// import { db } from '../../firebase';
// import {
//   collection,
//   doc,
//   getDoc,
//   arrayUnion,
//   updateDoc,
//   getDocs
// } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';
// import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const centerDefault = {
//   lat: 33.6844,
//   lng: 73.0479
// };

// const Emergency = () => {
//   const [location, setLocation] = useState(centerDefault);
//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [problem, setProblem] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [acceptedWorkshops, setAcceptedWorkshops] = useState([]);
//   const [bookedWorkshops, setBookedWorkshops] = useState([]);
//   const [hasBookedWorkshop, setHasBookedWorkshop] = useState(false);

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'AIzaSyCilowLu5cbVvLSETFYIk-fAow0OCL4Bm8',
//     libraries: ['places']
//   });

//   const getRedMarkerIcon = () => {
//     if (isLoaded && window.google && window.google.maps) {
//       return {
//         url: 'https://maps.google.com/mapfiles/ms/icons/red.png',
//         scaledSize: new window.google.maps.Size(64, 64),
//         origin: new window.google.maps.Point(0, 0),
//         anchor: new window.google.maps.Point(32, 64)
//       };
//     }
//     return null;
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const coords = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           setLocation(coords);
//           await fetchAddress(coords.lat, coords.lng);
//           setLoading(false);
//         },
//         () => {
//           alert("Failed to get location");
//           setLoading(false);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//       setLoading(false);
//     }
//   }, []);

//   const fetchAddress = async (lat, lng) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCilowLu5cbVvLSETFYIk-fAow0OCL4Bm8`
//       );
//       const data = await response.json();
//       if (data.status === 'OK') {
//         setAddress(data.results[0].formatted_address);
//       } else {
//         setAddress('Unable to fetch address');
//       }
//     } catch (error) {
//       setAddress('Error fetching address');
//     }
//   };

//   const handleHelpRequest = async () => {
//     if (!user || !problem.trim()) return;
//     setSubmitting(true);
//     try {
//       const emergency = {
//         emergencyId: uuidv4(),
//         userId: user.uid,
//         userEmail: user.email,
//         address: address || '',
//         problem: problem.trim(),
//         location: { lat: location.lat, lng: location.lng },
//         timestamp: new Date().toISOString(),
//         status: 'pending',
//       };
//       const userRef = doc(db, 'users', user.uid);
//       await updateDoc(userRef, {
//         emergency: arrayUnion(emergency)
//       });
//       alert('Help request sent.');
//       setProblem('');
//       fetchUserEmergencies();
//       fetchAcceptedWorkshops();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const fetchUserEmergencies = async () => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       if (userSnap.exists()) {
//         const emergencies = (userSnap.data().emergency || []).sort(
//           (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//         );
//         const confirmed = emergencies.filter((e) => e.status === 'confirmed');
//         if (confirmed.length > 0) {
//           setHasBookedWorkshop(true);
//           setBookedWorkshops(confirmed);
//         } else {
//           setHasBookedWorkshop(false);
//           setBookedWorkshops([]);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchAcceptedWorkshops = async () => {
//     if (!user) return;

//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userEmergencies = userSnap.data().emergency || [];

//       const latestUnconfirmed = userEmergencies
//         .filter((e) => e.status !== 'confirmed' && e.status !== 'completed')
//         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

//       if (!latestUnconfirmed) {
//         setAcceptedWorkshops([]);
//         return;
//       }

//       const snap = await getDocs(collection(db, 'workshops'));
//       const acceptedList = [];

//       for (const docSnap of snap.docs) {
//         const data = docSnap.data();
//         const reqs = data.requestemergencyorder || [];

//         for (const req of reqs) {
//           if (
//             req.userId === user.uid &&
//             req.status === 'accepted' &&
//             req.emergencyId === latestUnconfirmed.emergencyId
//           ) {
//             acceptedList.push({
//               workshopId: docSnap.id,
//               fullName: data.fullName || 'Workshop',
//               phone: req.workshopPhone || data.phone || 'N/A',
//               email: req.workshopEmail || data.email || 'N/A',
//               problem: req.problem || 'N/A',
//               acceptedAt: req.acceptedAt || req.timestamp || '',
//               emergencyId: req.emergencyId || ''
//             });
//           }
//         }
//       }

//       setAcceptedWorkshops(acceptedList);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const confirmBooking = async (w) => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userData = userSnap.data();

//       const updatedEmergencies = (userData.emergency || []).map((e) =>
//         e.emergencyId === w.emergencyId
//           ? {
//               ...e,
//               status: 'confirmed',
//               bookedWorkshop: {
//                 workshopId: w.workshopId,
//                 workshopName: w.fullName,
//                 workshopPhone: w.phone,
//                 workshopEmail: w.email,
//               },
//               bookedAt: new Date().toISOString(),
//             }
//           : e
//       );

//       await updateDoc(userRef, {
//         emergency: updatedEmergencies,
//       });

//       setAcceptedWorkshops([]);
//       setHasBookedWorkshop(true);
//       await fetchUserEmergencies();
//       alert('Workshop confirmed successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to confirm workshop.');
//     }
//   };

//   const markCompleted = async (emergencyId) => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       const userData = userSnap.data();

//       const updatedEmergencies = (userData.emergency || []).map((e) =>
//         e.emergencyId === emergencyId
//           ? {
//               ...e,
//               status: 'completed',
//               completedAt: new Date().toISOString(),
//             }
//           : e
//       );

//       await updateDoc(userRef, {
//         emergency: updatedEmergencies,
//       });

//       setAcceptedWorkshops([]);
//       setBookedWorkshops([]);
//       setHasBookedWorkshop(false);
//       fetchUserEmergencies();
//       alert('Workshop marked as completed!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to mark workshop as completed.');
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchUserEmergencies();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user) {
//       fetchAcceptedWorkshops();
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p>Please log in to use emergency services.</p>
//       </div>
//     );
//   }

//   return isLoaded ? (
//     <div className="p-4 max-w-xl mx-auto space-y-6">
//       <div className="bg-white rounded shadow p-4">
//         <h1 className="text-xl font-bold text-center mb-4">Emergency Help</h1>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-1">Your Current Location</label>
//           <div className="rounded overflow-hidden">
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={location}
//               zoom={17}
//               mapTypeId="roadmap"
//             >
//              <MarkerF position={location} />
//             </GoogleMap>
//           </div>
//           <p className="text-sm text-gray-600 mt-2">{loading ? 'Fetching address...' : address}</p>
//           <p className="text-xs text-gray-500">Lat: {location.lat}, Lng: {location.lng}</p>
//         </div>

//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1">Describe Your Problem</label>
//           <textarea
//             value={problem}
//             onChange={(e) => setProblem(e.target.value)}
//             rows="4"
//             className="w-full border rounded p-2"
//             placeholder="Explain your emergency situation..."
//           />
//         </div>

//         <button
//           onClick={handleHelpRequest}
//           disabled={submitting || !problem.trim()}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
//         >
//           {submitting ? 'Sending...' : 'Send Help Request'}
//         </button>
//       </div>

//       {acceptedWorkshops.length > 0 && (
//         <div className="bg-white rounded shadow p-4">
//           <h2 className="text-lg font-semibold mb-3">Workshops That Accepted Your Request</h2>
//           <ul className="space-y-3">
//             {acceptedWorkshops.map((w, i) => (
//               <li key={i} className="border p-3 rounded space-y-1">
//                 <p><strong>Name:</strong> {w.fullName}</p>
//                 <p><strong>Phone:</strong> {w.phone}</p>
//                 <p><strong>Email:</strong> {w.email}</p>
//                 <p><strong>Problem:</strong> {w.problem}</p>
//                 <p><strong>Accepted At:</strong> {new Date(w.acceptedAt).toLocaleString()}</p>
//                 <button
//                   onClick={() => confirmBooking(w)}
//                   className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-1.5 rounded"
//                 >
//                   Confirm Booking
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {bookedWorkshops.length > 0 && (
//         <div className="bg-white rounded shadow p-4">
//           <h2 className="text-lg font-semibold mb-3">Your Booked Workshop</h2>
//           <ul className="space-y-3">
//             {bookedWorkshops.map((b, i) => (
//               <li key={i} className="border p-3 rounded">
//                 <p><strong>Name:</strong> {b.bookedWorkshop?.workshopName}</p>
//                 <p><strong>Phone:</strong> {b.bookedWorkshop?.workshopPhone}</p>
//                 <p><strong>Email:</strong> {b.bookedWorkshop?.workshopEmail}</p>
//                 <p><strong>Problem:</strong> {b.problem}</p>
//                 <p><strong>Booked At:</strong> {new Date(b.bookedAt).toLocaleString()}</p>
//                 <p className="text-green-700 font-semibold mb-2">Confirmed</p>
//                 <button
//                   onClick={() => markCompleted(b.emergencyId)}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded"
//                 >
//                   Mark Completed
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   ) : (
//     <p className="text-center mt-10">Loading Map...</p>
//   );
// };

// export default Emergency;

import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';
import {
  collection,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  getDocs
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const centerDefault = {
  lat: 33.6844,
  lng: 73.0479
};

// Workshop Car Animation Component
const WorkshopCarAnimation = () => {
  return (
    <div className="relative w-full h-24 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg mb-4 overflow-hidden">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-blue-500"></div>
      
      {/* Road */}
      <div className="absolute bottom-0 w-full h-8 bg-gray-600">
        {/* Road lines */}
        <div className="absolute top-1/2 w-full h-0.5 bg-yellow-300 transform -translate-y-1/2">
          <div className="animate-pulse">
            <div className="inline-block w-8 h-0.5 bg-yellow-300 mr-4"></div>
            <div className="inline-block w-8 h-0.5 bg-yellow-300 mr-4"></div>
            <div className="inline-block w-8 h-0.5 bg-yellow-300 mr-4"></div>
            <div className="inline-block w-8 h-0.5 bg-yellow-300 mr-4"></div>
            <div className="inline-block w-8 h-0.5 bg-yellow-300 mr-4"></div>
          </div>
        </div>
      </div>
      
      {/* Moving car */}
      <div className="absolute bottom-2">
        <div className="animate-pulse">
          <div className="car-moving flex items-center">
            {/* Car body */}
            <div className="relative">
              <div className="w-16 h-8 bg-blue-600 rounded-lg shadow-lg">
                {/* Car windows */}
                <div className="absolute top-1 left-2 w-3 h-2 bg-blue-200 rounded"></div>
                <div className="absolute top-1 right-2 w-3 h-2 bg-blue-200 rounded"></div>
                
                {/* Car details */}
                <div className="absolute top-4 left-1 w-2 h-1 bg-yellow-400 rounded"></div>
                <div className="absolute top-4 right-1 w-2 h-1 bg-red-500 rounded"></div>
              </div>
              
              {/* Wheels */}
              <div className="absolute -bottom-1 left-1 w-3 h-3 bg-black rounded-full animate-spin"></div>
              <div className="absolute -bottom-1 right-1 w-3 h-3 bg-black rounded-full animate-spin"></div>
            </div>
            
            {/* Exhaust smoke */}
            <div className="ml-1 opacity-60">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Text overlay */}
      <div className="absolute top-2 left-4 text-white font-semibold text-sm">
        🔧 Workshop on the way...
      </div>
      
      {/* Background elements */}
      <div className="absolute top-4 right-8 text-yellow-500 text-xl animate-pulse">☀️</div>
      <div className="absolute top-2 right-20 text-white text-xs animate-bounce">☁️</div>
    </div>
  );
};

const Emergency = () => {
  const [location, setLocation] = useState(centerDefault);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [acceptedWorkshops, setAcceptedWorkshops] = useState([]);
  const [bookedWorkshops, setBookedWorkshops] = useState([]);
  const [hasBookedWorkshop, setHasBookedWorkshop] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCilowLu5cbVvLSETFYIk-fAow0OCL4Bm8',
    libraries: ['places']
  });

  const getRedMarkerIcon = () => {
    if (isLoaded && window.google && window.google.maps) {
      return {
        url: 'https://maps.google.com/mapfiles/ms/icons/red.png',
        scaledSize: new window.google.maps.Size(64, 64),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(32, 64)
      };
    }
    return null;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(coords);
          await fetchAddress(coords.lat, coords.lng);
          setLoading(false);
        },
        () => {
          alert("Failed to get location");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCilowLu5cbVvLSETFYIk-fAow0OCL4Bm8`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('Unable to fetch address');
      }
    } catch (error) {
      setAddress('Error fetching address');
    }
  };

  const handleHelpRequest = async () => {
    if (!user || !problem.trim()) return;
    setSubmitting(true);
    try {
      const emergency = {
        emergencyId: uuidv4(),
        userId: user.uid,
        userEmail: user.email,
        address: address || '',
        problem: problem.trim(),
        location: { lat: location.lat, lng: location.lng },
        timestamp: new Date().toISOString(),
        status: 'pending',
      };
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        emergency: arrayUnion(emergency)
      });
      alert('Help request sent.');
      setProblem('');
      fetchUserEmergencies();
      fetchAcceptedWorkshops();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchUserEmergencies = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const emergencies = (userSnap.data().emergency || []).sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        const confirmed = emergencies.filter((e) => e.status === 'confirmed');
        if (confirmed.length > 0) {
          setHasBookedWorkshop(true);
          setBookedWorkshops(confirmed);
        } else {
          setHasBookedWorkshop(false);
          setBookedWorkshops([]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAcceptedWorkshops = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const userEmergencies = userSnap.data().emergency || [];

      const latestUnconfirmed = userEmergencies
        .filter((e) => e.status !== 'confirmed' && e.status !== 'completed')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

      if (!latestUnconfirmed) {
        setAcceptedWorkshops([]);
        return;
      }

      const snap = await getDocs(collection(db, 'workshops'));
      const acceptedList = [];

      for (const docSnap of snap.docs) {
        const data = docSnap.data();
        const reqs = data.requestemergencyorder || [];

        for (const req of reqs) {
          if (
            req.userId === user.uid &&
            req.status === 'accepted' &&
            req.emergencyId === latestUnconfirmed.emergencyId
          ) {
            acceptedList.push({
              workshopId: docSnap.id,
              workshopName: data.workshopName || 'Workshop',
              phone: req.workshopPhone || data.phone || 'N/A',
              email: req.workshopEmail || data.email || 'N/A',
              problem: req.problem || 'N/A',
              acceptedAt: req.acceptedAt || req.timestamp || '',
              emergencyId: req.emergencyId || ''
            });
          }
        }
      }

      setAcceptedWorkshops(acceptedList);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmBooking = async (w) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      const updatedEmergencies = (userData.emergency || []).map((e) =>
        e.emergencyId === w.emergencyId
          ? {
              ...e,
              status: 'confirmed',
              bookedWorkshop: {
                workshopId: w.workshopId,
                workshopName: w.workshopName || 'Workshop',
                workshopPhone: w.phone,
                workshopEmail: w.email,
              },
              bookedAt: new Date().toISOString(),
            }
          : e
      );

      await updateDoc(userRef, {
        emergency: updatedEmergencies,
      });

      setAcceptedWorkshops([]);
      setHasBookedWorkshop(true);
      await fetchUserEmergencies();
      alert('Workshop confirmed successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to confirm workshop.');
    }
  };

  const markCompleted = async (emergencyId) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      const updatedEmergencies = (userData.emergency || []).map((e) =>
        e.emergencyId === emergencyId
          ? {
              ...e,
              status: 'completed',
              completedAt: new Date().toISOString(),
            }
          : e
      );

      await updateDoc(userRef, {
        emergency: updatedEmergencies,
      });

      setAcceptedWorkshops([]);
      setBookedWorkshops([]);
      setHasBookedWorkshop(false);
      fetchUserEmergencies();
      alert('Workshop marked as completed!');
    } catch (err) {
      console.error(err);
      alert('Failed to mark workshop as completed.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserEmergencies();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAcceptedWorkshops();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Please log in to use emergency services.</p>
      </div>
    );
  }

  return isLoaded ? (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <style jsx>{`
        .car-moving {
          animation: moveRight 6s linear infinite;
        }
        
        @keyframes moveRight {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(calc(100vw - 100px)); }
        }
        
        @media (max-width: 640px) {
          @keyframes moveRight {
            0% { transform: translateX(-20px); }
            100% { transform: translateX(calc(90vw - 100px)); }
          }
        }
      `}</style>
      
      <div className="bg-white rounded shadow p-4 border border-blue-100">
        <h1 className="text-lg md:text-3xl font-bold text-center mb-4 text-red-800">Emergency Help</h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-blue-700">Your Current Location</label>
          <div className="rounded overflow-hidden border border-blue-200">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={17}
              mapTypeId="roadmap"
            >
             <MarkerF position={location} />
            </GoogleMap>
          </div>
          <p className="text-sm text-black mt-2">{loading ? 'Fetching address...' : address}</p>
          <p className="text-xs text-black">Lat: {location.lat}, Lng: {location.lng}</p>
        </div>

        <div className="mb-3">
          <label className="block text-md font-medium mb-1 text-blue-700">Describe Your Problem</label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows="4"
            className="w-full border border-blue-200 rounded p-2 focus:border-blue-500 focus:outline-none text-justify"
            placeholder="Explain your emergency situation..."
          />
        </div>

        <button
          onClick={handleHelpRequest}
          disabled={submitting || !problem.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 rounded"
        >
          {submitting ? 'Sending...' : 'Send Help Request'}
        </button>
      </div>

      {acceptedWorkshops.length > 0 && (
        <div className="bg-white rounded shadow p-4 border border-blue-100">
          <h2 className="text-lg font-semibold mb-3 text-blue-800">Workshops Ready to Help</h2>
          <ul className="space-y-6">
            {acceptedWorkshops.map((w, i) => (
              <li key={i} className="border border-blue-800 p-3 rounded bg-blue-50 space-y-1">
                <p className="text-blue-800 text-justify"><strong className="text-blue-600">Name:</strong> {w.workshopName}</p>
                <p className="text-blue-800 text-justify"><strong className="text-blue-600">Phone:</strong> {w.phone}</p>
                <p className="text-blue-800 text-justify"><strong className="text-blue-600">Email:</strong> {w.email}</p>
                <p className="text-blue-800 text-justify"><strong className="text-blue-600">Problem:</strong> <span className="text-justify">{w.problem}</span></p>
                <p className="text-blue-800 text-justify"><strong className="text-blue-600">Accepted At:</strong> {new Date(w.acceptedAt).toLocaleString()}</p>
                <button
                  onClick={() => confirmBooking(w)}
                  className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-1.5 rounded"
                >
                  Confirm Booking
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {bookedWorkshops.length > 0 && (
        <div className="bg-white rounded shadow p-4 border border-blue-100">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">Your Booked Workshop</h2>
          
          <ul className="space-y-3 pb-6">
            {bookedWorkshops.map((b, i) => (
              <li key={i} className="border border-blue-200 p-3 rounded bg-blue-50">
  <div className="space-y-2"> {/* Add vertical spacing between items */}
    <p className="text-blue-800 text-justify">
      <strong className="text-blue-600">Name:</strong> {b.bookedWorkshop?.workshopName}
    </p>
    <p className="text-blue-800 text-justify">
      <strong className="text-blue-600">Phone:</strong> {b.bookedWorkshop?.workshopPhone}
    </p>
    <p className="text-blue-800 text-justify">
      <strong className="text-blue-600">Email:</strong> {b.bookedWorkshop?.workshopEmail}
    </p>
    <p className="text-blue-800 text-justify">
      <strong className="text-blue-600">Problem:</strong> <span className="text-justify">{b.problem}</span>
    </p>
    <p className="text-blue-800 text-justify">
      <strong className="text-blue-600">Booked At:</strong> {new Date(b.bookedAt).toLocaleString()}
    </p>
    <p className="text-green-700 font-semibold text-center">Confirmed</p>
  </div>

  <button
    onClick={() => markCompleted(b.emergencyId)}
    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded"
  >
    Mark Completed
  </button>
</li>

            ))}
          </ul>

          {/* Workshop Car Animation - Only shows when booked workshop table appears */}
          <WorkshopCarAnimation />


        </div>
      )}
    </div>
  ) : (
    <p className="text-center mt-10 text-blue-600">Loading Map...</p>
  );
};

export default Emergency;

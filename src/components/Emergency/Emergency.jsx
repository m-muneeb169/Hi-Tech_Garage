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
//         setLocation({ lat: latitude, lng: longitude, address: '' });
//         reverseGeocode(latitude, longitude);
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

//   const fetchUserEmergencies = async () => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       if (userSnap.exists()) {
//         const emergencies = (userSnap.data().emergency || []).sort(
//           (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//         );
//         const confirmed = emergencies.find((e) => e.status === 'confirmed');
//         if (confirmed) {
//           setHasBookedWorkshop(true);
//           setBookedWorkshops([confirmed]);
//         } else {
//           setHasBookedWorkshop(false);
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

//       setAcceptedWorkshops([]);
//       setBookedWorkshops([
//         {
//           problem: w.problem,
//           bookedWorkshop: {
//             workshopName: w.fullName,
//             workshopPhone: w.phone,
//             workshopEmail: w.email,
//           },
//           bookedAt: new Date().toISOString(),
//         },
//       ]);
//       setHasBookedWorkshop(true);
//       alert('Workshop confirmed successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to confirm workshop.');
//     }
//   };

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchUserEmergencies();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user && !hasBookedWorkshop) {
//       fetchAcceptedWorkshops();
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
//             <p className="text-sm text-gray-600 mt-2">{location.address}</p>
//           </div>
//         )}

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

//       {/* Accepted Workshops Section */}
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
//                 <p className="text-green-700 font-semibold">Confirmed</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
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
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Red Marker Icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Emergency = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [problem, setProblem] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [acceptedWorkshops, setAcceptedWorkshops] = useState([]);
  const [bookedWorkshops, setBookedWorkshops] = useState([]);
  const [hasBookedWorkshop, setHasBookedWorkshop] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setLoading(false);
      },
      () => {
        setError('Unable to retrieve your location.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data?.display_name) {
        setLocation((prev) => ({ ...prev, address: data.display_name }));
      }
    } catch {
      setError('Failed to fetch address.');
    }
  };

  useEffect(() => {
    if (location?.lat && location?.lng && !location?.address) {
      reverseGeocode(location.lat, location.lng);
    }
  }, [location?.lat, location?.lng]);

  const fetchUserEmergencies = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const emergencies = (userSnap.data().emergency || []).sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        const confirmed = emergencies.find((e) => e.status === 'confirmed');
        if (confirmed) {
          setHasBookedWorkshop(true);
          setBookedWorkshops([confirmed]);
        } else {
          setHasBookedWorkshop(false);
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
        .filter((e) => e.status !== 'confirmed')
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
              fullName: data.fullName || 'Workshop',
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

  const handleHelpRequest = async () => {
    if (!user || !problem.trim()) return;
    setSubmitting(true);
    try {
      const emergency = {
        emergencyId: uuidv4(),
        userId: user.uid,
        userEmail: user.email,
        address: location?.address || '',
        problem: problem.trim(),
        location: { lat: location?.lat, lng: location?.lng },
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
                workshopName: w.fullName,
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
      setBookedWorkshops([
        {
          problem: w.problem,
          bookedWorkshop: {
            workshopName: w.fullName,
            workshopPhone: w.phone,
            workshopEmail: w.email,
          },
          bookedAt: new Date().toISOString(),
        },
      ]);
      setHasBookedWorkshop(true);
      alert('Workshop confirmed successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to confirm workshop.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserEmergencies();
    }
  }, [user]);

  useEffect(() => {
    if (user && !hasBookedWorkshop) {
      fetchAcceptedWorkshops();
    }
  }, [user, hasBookedWorkshop]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Please log in to use emergency services.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <div className="bg-white rounded shadow p-4">
        <h1 className="text-xl font-bold text-center mb-4">Emergency Help</h1>

        {location && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Your Current Location</label>
            <div className="h-64 rounded overflow-hidden">
              <MapContainer center={[location.lat, location.lng]} zoom={15} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[location.lat, location.lng]} icon={redIcon} />
              </MapContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {location.address || 'Fetching address...'}
            </p>
            <p className="text-xs text-gray-500">
              Lat: {location.lat}, Lng: {location.lng}
            </p>
          </div>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Describe Your Problem</label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows="4"
            className="w-full border rounded p-2"
            placeholder="Explain your emergency situation..."
          />
        </div>

        <button
          onClick={handleHelpRequest}
          disabled={submitting || !problem.trim()}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          {submitting ? 'Sending...' : 'Send Help Request'}
        </button>
      </div>

      {/* Accepted Workshops Section */}
      {acceptedWorkshops.length > 0 && (
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Workshops That Accepted Your Request</h2>
          <ul className="space-y-3">
            {acceptedWorkshops.map((w, i) => (
              <li key={i} className="border p-3 rounded space-y-1">
                <p><strong>Name:</strong> {w.fullName}</p>
                <p><strong>Phone:</strong> {w.phone}</p>
                <p><strong>Email:</strong> {w.email}</p>
                <p><strong>Problem:</strong> {w.problem}</p>
                <p><strong>Accepted At:</strong> {new Date(w.acceptedAt).toLocaleString()}</p>
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

      {/* Booked Workshop Section */}
      {bookedWorkshops.length > 0 && (
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Your Booked Workshop</h2>
          <ul className="space-y-3">
            {bookedWorkshops.map((b, i) => (
              <li key={i} className="border p-3 rounded">
                <p><strong>Name:</strong> {b.bookedWorkshop?.workshopName}</p>
                <p><strong>Phone:</strong> {b.bookedWorkshop?.workshopPhone}</p>
                <p><strong>Email:</strong> {b.bookedWorkshop?.workshopEmail}</p>
                <p><strong>Problem:</strong> {b.problem}</p>
                <p><strong>Booked At:</strong> {new Date(b.bookedAt).toLocaleString()}</p>
                <p className="text-green-700 font-semibold">Confirmed</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Emergency;

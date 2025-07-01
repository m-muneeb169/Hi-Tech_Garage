import React, { useState, useEffect } from 'react'; // useEffect is needed for fetching services
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  Layout,
  LayoutGrid,
  Users,
  Calendar,
  Settings,
  Bell,
  Clock,
  DollarSign,
  Wrench,
  BarChart,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash,
  X
} from 'lucide-react';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove, getDoc, onSnapshot, query, where } from "firebase/firestore"; // getDoc is needed to read services
import { auth, db } from "../../firebase"; // make sure this path points to your Firebase config
import { useNavigate } from 'react-router-dom';
// Date imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AslamDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [currentService, setCurrentService] = useState(null);
  const [services, setServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [workshopInfo, setWorkshopInfo] = useState(null);

  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const auth = getAuth();
  const workshopId = auth.currentUser?.uid;

  // Consts for days of week
  // const [selectedDay, setSelectedDay] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [confirmedDate, setConfirmedDate] = useState("");

  // New state variables for time range inputs
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  // Changed to track multiple selected time slots
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [tempSelectedSlot, setTempSelectedSlot] = useState('');
  // New state to track available slots separately from selected ones
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [dataDashboard, setDataDashboard] = useState({ recentBookings: [] });
  const navigate = useNavigate();
  const [confirmedEmergencies, setConfirmedEmergencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

const currentWorkshopId = auth.currentUser?.uid;


  //location map
  const redIcon = new L.Icon({
    iconUrl: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });


  const dashboardData = {
    workshopInfo: {
      name: "Aslam Authorized Workshop",
      address: "123 Main Street, City Center",
      phone: "+92 300 1234567",
      email: "Aslam@workshop.com",
      rating: 4.7,
      totalReviews: 256,
      operatingHours: "8:00 AM - 8:00 PM",
      specialists: 12,
      servicesCompleted: 1500
    },
    metrics: {
      pendingRequests: 8,
      activeBookings: 15,
      completedToday: 12,
      totalEarnings: "₨ 45,000"
    },
    recentBookings: [
      {
        id: "B001",
        customerName: "Ahmed Khan",
        service: "Oil Change",
        status: "Pending",
        time: "10:30 AM",
        type: "On-Site"
      },
      {
        id: "B002",
        customerName: "Sara Ali",
        service: "Brake Service",
        status: "In Progress",
        time: "11:00 AM",
        type: "Workshop"
      },
    ],
    notifications: [
      {
        id: 1,
        message: "New booking request from Muhammad Ali",
        time: "5 minutes ago",
        type: "new"
      },
      {
        id: 2,
        message: "Service completed for booking #B001",
        time: "10 minutes ago",
        type: "success"
      },
    ]
  };

  // refresh karne p data naa ghaib ho completed requests ka 
  const refreshConfirmedEmergencies = async () => {
    const fetchConfirmedEmergencies = async () => {
      setLoading(true);
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const confirmedList = [];

        usersSnapshot.forEach(doc => {
          const userData = doc.data();
          const userId = doc.id;

          if (userData.emergency && Array.isArray(userData.emergency)) {
            userData.emergency.forEach((emergency, emergencyIndex) => {
              if (emergency.location && Array.isArray(emergency.location)) {
                emergency.location.forEach((loc, locationIndex) => {
                  if (loc.status === "confirmed") {
                    confirmedList.push({
                      userId: userId,
                      userEmail: userData.email || "No Email",
                      userName: userData.name || userData.firstName || "No Name",
                      userPhone: userData.phone || userData.phoneNumber || "No Phone",
                      address: loc.address || "No Address",
                      emergencyType: emergency.type || "Emergency",
                      confirmedAt: loc.confirmedAt || new Date().toISOString(),
                      locationIndex: locationIndex,
                      emergencyIndex: emergencyIndex
                    });
                  }
                });
              } else if (emergency.status === "confirmed") {
                confirmedList.push({
                  userId: userId,
                  userEmail: userData.email || "No Email",
                  userName: userData.name || userData.firstName || "No Name",
                  userPhone: userData.phone || userData.phoneNumber || "No Phone",
                  address: emergency.address || "No Address",
                  emergencyType: emergency.type || "Emergency",
                  confirmedAt: emergency.confirmedAt || new Date().toISOString(),
                  emergencyIndex: emergencyIndex
                });
              }
            });
          }
        });

        confirmedList.sort((a, b) => new Date(b.confirmedAt) - new Date(a.confirmedAt));
        setConfirmedEmergencies(confirmedList);
      } catch (error) {
        console.error("Error refreshing confirmed emergencies:", error);
      } finally {
        setLoading(false);
      }
    };

    await fetchConfirmedEmergencies();
  };

  // Enhanced useEffect with better error handling and debugging

  useEffect(() => {
    const fetchConfirmedEmergencies = async () => {
      setLoading(true); // Add loading state
      try {
        console.log("Fetching confirmed emergencies...");

        // Get all users from Firestore
        const usersSnapshot = await getDocs(collection(db, "users"));
        const confirmedList = [];

        console.log(`Found ${usersSnapshot.size} users in database`);

        usersSnapshot.forEach(doc => {
          const userData = doc.data();
          const userId = doc.id;

          console.log(`Processing user: ${userId}`, userData);

          // Check if user has emergency array
          if (userData.emergency && Array.isArray(userData.emergency)) {
            console.log(`User ${userId} has ${userData.emergency.length} emergency entries`);

            userData.emergency.forEach((emergency, emergencyIndex) => {
              console.log(`Processing emergency ${emergencyIndex}:`, emergency);

              // Check if emergency has location array
              if (emergency.location && Array.isArray(emergency.location)) {
                emergency.location.forEach((loc, locationIndex) => {
                  console.log(`Processing location ${locationIndex}:`, loc);

                  // If status is confirmed, add user details
                  if (loc.status === "confirmed") {
                    console.log(`Found confirmed booking for user: ${userData.email}`);

                    confirmedList.push({
                      userId: userId,
                      userEmail: userData.email || "No Email",
                      userName: userData.name || userData.firstName || "No Name",
                      userPhone: userData.phone || userData.phoneNumber || "No Phone",
                      address: loc.address || "No Address",
                      emergencyType: emergency.type || "Emergency",
                      confirmedAt: loc.confirmedAt || new Date().toISOString(),
                      locationIndex: locationIndex,
                      emergencyIndex: emergencyIndex
                    });
                  }
                });
              } else {
                // If emergency has direct status (alternative structure)
                if (emergency.status === "confirmed") {
                  console.log(`Found confirmed emergency (direct status) for user: ${userData.email}`);

                  confirmedList.push({
                    userId: userId,
                    userEmail: userData.email || "No Email",
                    userName: userData.name || userData.firstName || "No Name",
                    userPhone: userData.phone || userData.phoneNumber || "No Phone",
                    address: emergency.address || "No Address",
                    emergencyType: emergency.type || "Emergency",
                    confirmedAt: emergency.confirmedAt || new Date().toISOString(),
                    emergencyIndex: emergencyIndex
                  });
                }
              }
            });
          }
        });

        console.log(`Total confirmed emergencies found: ${confirmedList.length}`);
        console.log("Confirmed emergencies list:", confirmedList);

        // Sort by confirmation date (newest first)
        confirmedList.sort((a, b) => new Date(b.confirmedAt) - new Date(a.confirmedAt));

        setConfirmedEmergencies(confirmedList);
      } catch (error) {
        console.error("Error fetching confirmed emergencies:", error);
        setConfirmedEmergencies([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmedEmergencies();
  }, []);



  // useEffect(() => {
  //   const fetchConfirmedEmergencies = async () => {
  //     setLoading(true); // Add loading state
  //     try {
  //       console.log("Fetching confirmed emergencies...");

  //       // Get all users from Firestore
  //       const usersSnapshot = await getDocs(collection(db, "users"));
  //       const confirmedList = [];

  //       console.log(`Found ${usersSnapshot.size} users in database`);

  //       usersSnapshot.forEach(doc => {
  //         const userData = doc.data();
  //         const userId = doc.id;

  //         console.log(`Processing user: ${userId}`, userData);

  //         // Check if user has emergency array
  //         if (userData.emergency && Array.isArray(userData.emergency)) {
  //           console.log(`User ${userId} has ${userData.emergency.length} emergency entries`);

  //           userData.emergency.forEach((emergency, emergencyIndex) => {
  //             console.log(`Processing emergency ${emergencyIndex}:`, emergency);

  //             // Check if emergency has location array
  //             if (emergency.location && Array.isArray(emergency.location)) {
  //               emergency.location.forEach((loc, locationIndex) => {
  //                 console.log(`Processing location ${locationIndex}:`, loc);

  //                 // If status is confirmed, add user details
  //                 if (loc.status === "confirmed") {
  //                   console.log(`Found confirmed booking for user: ${userData.email}`);

  //                   confirmedList.push({
  //                     userId: userId,
  //                     userEmail: userData.email || "No Email",
  //                     userName: userData.name || userData.firstName || "No Name",
  //                     userPhone: userData.phone || userData.phoneNumber || "No Phone",
  //                     address: loc.address || "No Address",
  //                     emergencyType: emergency.type || "Emergency",
  //                     confirmedAt: loc.confirmedAt || new Date().toISOString(),
  //                     locationIndex: locationIndex,
  //                     emergencyIndex: emergencyIndex
  //                   });
  //                 }
  //               });
  //             } else {
  //               // If emergency has direct status (alternative structure)
  //               if (emergency.status === "confirmed") {
  //                 console.log(`Found confirmed emergency (direct status) for user: ${userData.email}`);

  //                 confirmedList.push({
  //                   userId: userId,
  //                   userEmail: userData.email || "No Email",
  //                   userName: userData.name || userData.firstName || "No Name",
  //                   userPhone: userData.phone || userData.phoneNumber || "No Phone",
  //                   address: emergency.address || "No Address",
  //                   emergencyType: emergency.type || "Emergency",
  //                   confirmedAt: emergency.confirmedAt || new Date().toISOString(),
  //                   emergencyIndex: emergencyIndex
  //                 });
  //               }
  //             }
  //           });
  //         }
  //       });

  //       console.log(`Total confirmed emergencies found: ${confirmedList.length}`);
  //       console.log("Confirmed emergencies list:", confirmedList);

  //       // Sort by confirmation date (newest first)
  //       confirmedList.sort((a, b) => new Date(b.confirmedAt) - new Date(a.confirmedAt));

  //       setConfirmedEmergencies(confirmedList);
  //     } catch (error) {
  //       console.error("Error fetching confirmed emergencies:", error);
  //       setConfirmedEmergencies([]); // Set empty array on error
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchConfirmedEmergencies();
  // }, []);







  useEffect(() => {
    const unsubscribers = [];
    let activeOrderIds = new Set();
    let completedOrderIds = new Set();
    let pendingOrderIds = new Set();
    let totalEarningsSoFar = 0;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {


        // ✅ Workshop login hua
        const workshopId = user.uid;
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const initialBookings = [];

        for (const userDoc of usersSnapshot.docs) {
          const userData = userDoc.data();
          const orders = userData.orders || [];

          for (let index = 0; index < orders.length; index++) {
            const order = orders[index];
            const selectedWorkshop = order.userselectedworkshop;

            if (
              selectedWorkshop &&
              selectedWorkshop.id === workshopId // ✅ Sirf apne workshop ke liye
            ) {
              const workshopRef = doc(db, 'workshops', selectedWorkshop.id);

              const bookingObj = {
                id: userDoc.id,
                customerName: userData.fullName || 'Unknown',
                service: Array.isArray(order.userselectedservices)
                  ? order.userselectedservices
                    .map(service => `${service.name} - ${service.price} PKR`)
                    .join(', ')
                  : 'No Services Selected',
                typeOrder: order.typeOrder || 'N/A',
                status: 'Pending',
                orderIndex: index,
                workshopId: selectedWorkshop.id,
                orderId: order.orderId,
              };

              initialBookings.push(bookingObj);

              const unsubscribe = onSnapshot(workshopRef, (docSnap) => {
                if (docSnap.exists()) {
                  const workshopData = docSnap.data();
                  const workshopOrders = workshopData.orders || [];

                  const matchingOrder = workshopOrders.find(
                    (wOrder) =>
                      wOrder.userId === userDoc.id &&
                      wOrder.orderId === order.orderId
                  );

                  if (matchingOrder && matchingOrder.workshoporderstatus) {
                    setDataDashboard(prev => {
                      const updated = prev.recentBookings.map(b => {
                        if (
                          b.id === userDoc.id &&
                          b.orderIndex === index &&
                          b.workshopId === selectedWorkshop.id
                        ) {
                          return {
                            ...b,
                            status: matchingOrder.workshoporderstatus
                          };
                        }
                        return b;
                      });

                      return { ...prev, recentBookings: updated };
                    });
                  }

                  // ✅ Active count
                  const activeIds = new Set();
                  workshopOrders.forEach(order => {
                    if (order.workshoporderstatus === 'active') {
                      activeIds.add(order.orderId);
                    }
                  });
                  activeIds.forEach(id => activeOrderIds.add(id));
                  setActiveCount(activeOrderIds.size);

                  // ✅ Completed count
                  const completedIds = new Set();
                  workshopOrders.forEach(order => {
                    if (order.workshoporderstatus === 'completed') {
                      completedIds.add(order.orderId);
                    }
                  });
                  completedIds.forEach(id => completedOrderIds.add(id));
                  setCompletedCount(completedOrderIds.size);

                  // ✅ Pending count
                  const pendingIds = new Set();
                  workshopOrders.forEach(order => {
                    if (order.workshoporderstatus === 'pending') {
                      pendingIds.add(order.orderId);
                    }
                  });
                  pendingIds.forEach(id => pendingOrderIds.add(id));
                  setPendingCount(pendingOrderIds.size);

                  // ✅ Earnings
                  let earnings = 0;
                  workshopOrders.forEach(order => {
                    if (order.workshoporderstatus === 'completed') {
                      if (Array.isArray(order.userselectedservices)) {
                        order.userselectedservices.forEach(service => {
                          earnings += parseFloat(service.price) || 0;
                        });
                      }
                    }
                  });
                  totalEarningsSoFar += earnings;
                  setTotalEarnings(totalEarningsSoFar);
                }
              });

              unsubscribers.push(unsubscribe);
            }
          }
        }

        setDataDashboard(prev => ({ ...prev, recentBookings: initialBookings }));
      } else {
        // User Logout — listeners close karo, data clear karo
        unsubscribers.forEach(unsub => unsub());
        setDataDashboard({ recentBookings: [] });
        setActiveCount(0);
        setCompletedCount(0);
        setPendingCount(0);
        setTotalEarnings(0);
      }
    });

    return () => {
      // Component unmount hone par bhi sab cleanup ho
      unsubscribers.forEach(unsub => unsub());
      unsubscribeAuth();
    };
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const workshopRef = doc(db, "workshops", user.uid);
        const docSnap = await getDoc(workshopRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setServices(data.services || []);

          // Load all generated slots from 'generatedSlots' array
          let allAvailableSlots = [];

          if (data.generatedSlots && Array.isArray(data.generatedSlots)) {
            // Process each generated slot range
            data.generatedSlots.forEach(slotData => {
              if (slotData.range && slotData.range.includes(" - ")) {
                const [startStr, endStr] = slotData.range.split(" - ");
                if (startStr && endStr) {
                  try {
                    const start = convertTo24Hour(startStr.trim());
                    const end = convertTo24Hour(endStr.trim());
                    const slots = divideIntoHourSlots(start, end, slotData.day);
                    allAvailableSlots = [...allAvailableSlots, ...slots];
                  } catch (error) {
                    console.error("Error converting times:", error);
                  }
                }
              }
            });
          }
          // Legacy support: Check for old 'generatedSlot' field (single slot)
          else if (data.generatedSlot && data.generatedSlot.includes(" - ")) {
            const [startStr, endStr] = data.generatedSlot.split(" - ");
            if (startStr && endStr) {
              try {
                const start = convertTo24Hour(startStr.trim());
                const end = convertTo24Hour(endStr.trim());
                // For legacy data, we don't have day info, so use a default or empty
                const slots = divideIntoHourSlots(start, end, "");
                allAvailableSlots = slots;
              } catch (error) {
                console.error("Error converting times:", error);
              }
            }
          }

          // Show already saved selected time slots as cards
          if (data.timeSlots && Array.isArray(data.timeSlots)) {
            setSelectedTimeSlots(data.timeSlots); // Display saved cards

            // Remove selected slots from available slots
            const filteredAvailableSlots = allAvailableSlots.filter(availableSlot =>
              !data.timeSlots.some(selectedSlot =>
                selectedSlot.time === availableSlot.time && selectedSlot.day === availableSlot.day
              )

            );
            setAvailableTimeSlots(filteredAvailableSlots);
          } else {
            setSelectedTimeSlots([]); // No slots saved yet
            setAvailableTimeSlots(allAvailableSlots);
          }

          // Set all generated slots
          setTimeSlots(allAvailableSlots);
        }
      } else {
        console.log("No user is signed in");
      }
    });

    return () => unsubscribe();
  }, []);



  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const allBookings = [];

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          const userName = userData.name || userData.email || 'Unknown User';
          const emergencies = userData.emergency || [];

          emergencies.forEach((booking) => {
            if (booking.status === 'pending') {
              allBookings.push({
                userName,
                problem: booking.problem,
                address: booking.address,
              });
            }
          });
        });

        setBookings(allBookings);
      } catch (error) {
        console.error('Error fetching emergency bookings:', error);
      }
    };

    fetchBookings();
  }, []);



  // Logout button
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Clear local state / cache if any
        localStorage.clear(); // ya sirf token ya user id ko clear karen
        sessionStorage.clear();

        // Navigate to login
        navigate("/pages/home");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };


  const handleSaveService = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in");
        return;
      }

      const newService = {
        name: newServiceName,
        price: newServicePrice,
      };

      const workshopRef = doc(db, "workshops", user.uid);

      await updateDoc(workshopRef, {
        services: arrayUnion(newService),
      });

      // Update local state
      setServices((prev) => [...prev, newService]);

      console.log("Service added!");
      setShowAddServiceModal(false); // Close modal
    } catch (error) {
      console.error("Error adding service: ", error);
      setErrorMessage("Failed to add service.");
    }
  };

  // Function to normalize AM/PM case (handle lowercase am/pm)
  const normalizeTimePeriod = (time) => {
    if (!time) return '';

    // Replace 'am', 'Am', 'aM' with 'AM' and 'pm', 'Pm', 'pM' with 'PM'
    return time.replace(/([aApP])([mM])/g, (match, p1, p2) => {
      return p1.toUpperCase() + p2.toUpperCase();
    });
  };

  // Function to convert time to 24-hour format for easier calculations
  const convertTo24Hour = (time) => {
    // First normalize the time to handle lowercase am/pm
    const normalizedTime = normalizeTimePeriod(time);

    const [hourStr, rest] = normalizedTime.split(':');
    let [minuteStr, period] = rest.split(' ');

    let hour = parseInt(hourStr, 10);

    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }

    return { hour, minute: parseInt(minuteStr, 10) };
  };

  // Function to convert 24-hour format time to AM/PM format
  const convertTo12Hour = (hour, minute) => {
    let period = 'AM';
    let displayHour = hour;

    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        displayHour = hour - 12;
      }
    }

    if (hour === 0) {
      displayHour = 12;
    }

    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const generateTimeSlots = async () => {
    if (!startTime || !endTime || !selectedDate) {
      setErrorMessage('Please select a date, start time, and end time');
      return;
    }

    try {
      const start = convertTo24Hour(startTime);
      const end = convertTo24Hour(endTime);

      if (end.hour < start.hour || (end.hour === start.hour && end.minute <= start.minute)) {
        setErrorMessage('End time must be after start time');
        return;
      }

      const slotRange = `${convertTo12Hour(start.hour, start.minute)} - ${convertTo12Hour(end.hour, end.minute)}`;

      // Format date and day for the slot
      const formattedDate = format(selectedDate, "EEEE, MMMM d, yyyy");
      const dayName = format(selectedDate, "EEEE");

      // Generate slots for the selected date and time
      const newSlots = divideIntoHourSlots(start, end, formattedDate);  // Pass formattedDate instead of day

      // Filter out duplicates
      const filteredNewSlots = newSlots.filter(newSlot =>
        !selectedTimeSlots.some(selectedSlot =>
          selectedSlot.time === newSlot.time && selectedSlot.date === newSlot.date
        )
      );

      // Add to available slots and timeSlots
      setAvailableTimeSlots(prevAvailable => [...prevAvailable, ...filteredNewSlots]);
      setTimeSlots(prevTimeSlots => [...prevTimeSlots, ...filteredNewSlots]);

      // Clear form fields
      setStartTime('');
      setEndTime('');
      setSelectedDate(null);
      setTempSelectedSlot('');
      setConfirmedDate(formattedDate);  // For display
      setErrorMessage('');

      // Save the generated slot range in Firestore
      const user = auth.currentUser;
      if (user) {
        const workshopRef = doc(db, "workshops", user.uid);
        const docSnap = await getDoc(workshopRef);
        let existingSlots = [];

        if (docSnap.exists()) {
          const data = docSnap.data();
          existingSlots = data.generatedSlots || [];
        }

        const newSlotRange = {
          date: formattedDate,
          range: slotRange,
          timestamp: new Date().toISOString()
        };

        await updateDoc(workshopRef, {
          generatedSlots: [...existingSlots, newSlotRange]
        });
      }

    } catch (error) {
      setErrorMessage('Please enter a valid time (e.g., 6:00 AM)');
    }
  };

  const divideIntoHourSlots = (start, end, formattedDate) => {
    const slots = [];
    let currentHour = start.hour;
    let currentMinute = start.minute;

    while (
      currentHour < end.hour ||
      (currentHour === end.hour && currentMinute < end.minute)
    ) {
      const slotStart = convertTo12Hour(currentHour, currentMinute);

      let nextHour = currentHour;
      let nextMinute = currentMinute + 60;

      if (nextMinute >= 60) {
        nextHour += Math.floor(nextMinute / 60);
        nextMinute = nextMinute % 60;
      }

      if (nextHour > end.hour || (nextHour === end.hour && nextMinute > end.minute)) {
        break;
      }

      const slotEnd = convertTo12Hour(nextHour, nextMinute);

      slots.push({
        id: Date.now().toString() + Math.random(),
        time: `${slotStart} - ${slotEnd}`,
        date: formattedDate,
        available: true,
      });

      currentHour = nextHour;
      currentMinute = nextMinute;
    }

    return slots;
  };


  // code
  const handleCompleteRequest = async (user, index) => {
    try {
      console.log("Completing request for user:", user);

      // Show confirmation dialog
      const confirmComplete = window.confirm(
        `Are you sure you want to mark this emergency request as completed?\n\nUser: ${user.userName}\nEmail: ${user.userEmail}`
      );

      if (!confirmComplete) {
        return;
      }

      // Get reference to the specific user document
      const userDocRef = doc(db, "users", user.userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Create a copy of the emergency array
        let updatedEmergencies = [...userData.emergency];

        if (user.locationIndex !== undefined) {
          // Update nested location status
          if (updatedEmergencies[user.emergencyIndex] &&
            updatedEmergencies[user.emergencyIndex].location &&
            updatedEmergencies[user.emergencyIndex].location[user.locationIndex]) {

            updatedEmergencies[user.emergencyIndex].location[user.locationIndex].status = "completed";
            updatedEmergencies[user.emergencyIndex].location[user.locationIndex].completedAt = new Date().toISOString();
          }
        } else {
          // Update direct emergency status
          if (updatedEmergencies[user.emergencyIndex]) {
            updatedEmergencies[user.emergencyIndex].status = "completed";
            updatedEmergencies[user.emergencyIndex].completedAt = new Date().toISOString();
          }
        }

        // Update the document in Firestore
        await updateDoc(userDocRef, {
          emergency: updatedEmergencies
        });

        console.log("Request marked as completed successfully");

        // Remove from local state immediately for better UX
        const updatedConfirmedEmergencies = confirmedEmergencies.filter((_, i) => i !== index);
        setConfirmedEmergencies(updatedConfirmedEmergencies);

        // Show success message
        alert("Request marked as completed successfully!");

      } else {
        console.error("User document not found");
        alert("Error: User document not found");
      }

    } catch (error) {
      console.error("Error completing request:", error);
      alert("Error completing request. Please try again.");
    }
  };

  // Updated openViewDetail function that creates workshopOrderStatus in workshops collection
  const openViewDetail = async (userId, orderIndex) => {
    try {
      // First, get the user document to find the order details
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const order = userData.orders?.[orderIndex];

        if (order && order.userselectedworkshop?.id && order.orderId) {
          const workshopId = order.userselectedworkshop.id;
          const workshopRef = doc(db, 'workshops', workshopId);
          const workshopSnap = await getDoc(workshopRef);

          if (workshopSnap.exists()) {
            const workshopData = workshopSnap.data();
            const workshopOrders = [...(workshopData.orders || [])];

            // Find if this order already exists in workshop orders
            const existingOrderIndex = workshopOrders.findIndex(
              (workshopOrder) => workshopOrder.orderId === order.orderId && workshopOrder.userId === userId
            );

            if (existingOrderIndex !== -1) {
              // Order exists, set workshoporderstatus to "pending" if it doesn't exist
              if (!workshopOrders[existingOrderIndex].workshoporderstatus) {
                workshopOrders[existingOrderIndex].workshoporderstatus = "pending";

                // Update the workshop document
                await updateDoc(workshopRef, {
                  orders: workshopOrders
                });
              }
            } else {
              // Order doesn't exist in workshop, add it
              workshopOrders.push({
                orderId: order.orderId,
                userId: userId,
                workshoporderstatus: "pending"
                // Add any other required fields
              });

              // Update the workshop document
              await updateDoc(workshopRef, {
                orders: workshopOrders
              });
            }
          }
        }
      }

      // Navigate to the view detail page
      navigate('/view-detail', {
        state: { userId, orderIndex }
      });
    } catch (error) {
      console.error("Error updating workshop order status:", error);
      // Still navigate even if there's an error
      navigate('/view-detail', {
        state: { userId, orderIndex }
      });
    }
  };



  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const allBookings = [];

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          const userId = doc.id;
          const userName = userData.fullName || userData.name || userData.email || 'Unknown User';
          const emergencies = userData.emergency || [];

          emergencies.forEach((booking) => {
            if (booking.status && booking.status.toLowerCase() === 'pending') {
              allBookings.push({
                userId,
                userName,
                problem: booking.problem || 'No problem specified',
                address: booking.address || 'No address provided',
                emergencyId: booking.emergencyId || `${userId}_${Date.now()}`,
              });
            }
          });
        });

        console.log("Fetched bookings:", allBookings);
        setBookings(allBookings);
      } catch (error) {
        console.error('Error fetching emergency bookings:', error);
      }
    };

    fetchBookings();
  }, []);


  const handlePopState = () => {
    // Jab back button press ho, user ko homepage redirect karo
    navigate('/');
  };

  window.addEventListener('popstate', handlePopState);


  const handleAcceptRequest = async (booking) => {
    console.log("Booking object received:", booking);

    if (!auth.currentUser) {
      console.error("No authenticated user found.");
      alert("You must be logged in to accept requests.");
      return;
    }

    const workshopId = auth.currentUser.uid;

    let currentWorkshopInfo = workshopInfo;

    if (!currentWorkshopInfo) {
      console.log("Workshop info not in state, fetching directly...");
      try {
        const workshopRef = doc(db, "workshops", workshopId);
        const workshopSnap = await getDoc(workshopRef);

        if (!workshopSnap.exists()) {
          console.error("Workshop document does not exist");
          alert("Workshop document not found. Please contact support.");
          return;
        }

        currentWorkshopInfo = workshopSnap.data();
        console.log("Fetched workshop info:", currentWorkshopInfo);
      } catch (error) {
        console.error("Error fetching workshop info:", error);
        alert("Failed to load workshop information. Please try again.");
        return;
      }
    }

    const userId = booking.userId || booking.id;
    const userName = booking.userName || booking.customerName || 'Unknown User';
    const problem = booking.problem || 'No problem specified';
    const address = booking.address || 'No address provided';

    const workshopName = currentWorkshopInfo.fullname || currentWorkshopInfo.name || 'Unknown Workshop';
    const workshopPhone = currentWorkshopInfo.mobileNo || currentWorkshopInfo.phone || 'No phone';
    const workshopEmail = currentWorkshopInfo.email || 'No email';

    if (!userId) {
      console.error("Missing userId in booking data");
      alert("Invalid booking data: Missing user ID");
      return;
    }

    const emergencyRequest = {
      userId: userId,
      userName: userName,
      problem: problem,
      address: address,
      workshopId: workshopId,
      workshopName: workshopName,
      workshopPhone: workshopPhone,
      workshopEmail: workshopEmail,
      status: "accepted",
      timestamp: new Date().toISOString(),
      acceptedAt: new Date().toISOString(),
      emergencyId: booking.emergencyId,
    };

    console.log("Emergency request object:", emergencyRequest);

    try {
      const workshopRef = doc(db, "workshops", workshopId);
      await updateDoc(workshopRef, {
        requestemergencyorder: arrayUnion(emergencyRequest)
      });

      console.log("Emergency request added to workshop successfully!");

      // ✅ Update user's emergency array status to 'accepted'
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const updatedEmergencies = (userData.emergency || []).map(e => {
          if (
            e.emergencyId === booking.emergencyId &&
            e.problem === booking.problem &&
            e.address === booking.address
          ) {
            return { ...e, status: "accepted" };
          }
          return e;
        });

        await updateDoc(userRef, {
          emergency: updatedEmergencies
        });

        console.log("User's emergency status updated to accepted.");
      }

      alert("Emergency request accepted and saved successfully!");

      setBookings(prevBookings =>
        prevBookings.filter(b =>
          (b.userId || b.id) !== userId ||
          b.problem !== problem ||
          b.address !== address
        )
      );

      if (!workshopInfo) {
        setWorkshopInfo(currentWorkshopInfo);
      }

    } catch (error) {
      console.error("Error handling emergency request:", error);
      alert(`Failed to save emergency request: ${error.message}`);
    }
  };

  const addSelectedTimeSlot = async () => {
    if (!tempSelectedSlot) return;

    // Find selected slot using strict type match (string === string)
    const selectedSlot = availableTimeSlots.find(slot => slot.id.toString() === tempSelectedSlot);
    if (!selectedSlot) return;

    // Prevent duplicates just in case
    const alreadyAdded = selectedTimeSlots.some(slot => slot.id === selectedSlot.id);
    if (alreadyAdded) return;

    // Update selected and available slots
    const updatedSelected = [...selectedTimeSlots, selectedSlot];
    const updatedAvailable = availableTimeSlots.filter(slot => slot.id !== selectedSlot.id);

    setSelectedTimeSlots(updatedSelected);
    setAvailableTimeSlots(updatedAvailable);
    setTempSelectedSlot('');

    // 🔥 Save to Firestore
    const user = auth.currentUser;
    if (user) {
      const workshopRef = doc(db, "workshops", user.uid);

      try {
        await updateDoc(workshopRef, {
          timeSlots: arrayUnion(selectedSlot)
        });
      } catch (error) {
        console.error("Error saving time slot to Firestore:", error);
      }
    }
  };


  const removeSelectedTimeSlot = async (id) => {
    const removedSlot = selectedTimeSlots.find(slot => slot.id === id);
    const updatedSelected = selectedTimeSlots.filter(slot => slot.id !== id);
    const updatedAvailable = [...availableTimeSlots, removedSlot];

    setSelectedTimeSlots(updatedSelected);
    setAvailableTimeSlots(updatedAvailable);

    // 🔥 Remove from Firestore
    const user = auth.currentUser;
    if (user) {
      const workshopRef = doc(db, "workshops", user.uid);

      try {
        await updateDoc(workshopRef, {
          timeSlots: arrayRemove(removedSlot)
        });
      } catch (error) {
        console.error("Error removing slot from Firestore:", error);
      }
    }
  };

  const handleDeleteService = async (index) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in");
        return;
      }

      const updatedServices = [...services];
      updatedServices.splice(index, 1); // remove selected service

      const workshopRef = doc(db, "workshops", user.uid);

      await updateDoc(workshopRef, {
        services: updatedServices, // set new array to Firestore
      });

      setServices(updatedServices); // update local state
      console.log("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const saveEditedService = async () => {
    if (newServiceName && newServicePrice && currentService) {
      const isDuplicate = services.some(
        (service, idx) =>
          service.name.toLowerCase() === newServiceName.toLowerCase() &&
          idx !== currentService.index
      );

      if (isDuplicate) {
        setErrorMessage('A service with this name already exists!');
        return;
      }

      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("No user logged in");
          return;
        }

        const updatedServices = [...services];
        updatedServices[currentService.index] = {
          name: newServiceName,
          price: newServicePrice
        };

        const workshopRef = doc(db, "workshops", user.uid);

        await updateDoc(workshopRef, {
          services: updatedServices, // update services array in Firestore
        });

        setServices(updatedServices); // update local
        setNewServiceName('');
        setNewServicePrice('');
        setCurrentService(null);
        setErrorMessage('');
        setShowEditServiceModal(false);

        console.log("Service updated successfully!");
      } catch (error) {
        console.error("Error updating service:", error);
      }
    }
  };

  const handleEditService = (service, index) => {
    setCurrentService({ ...service, index });
    setNewServiceName(service.name);
    setNewServicePrice(service.price);
    setErrorMessage('');
    setShowEditServiceModal(true);
  };


  const addNewService = () => {
    if (newServiceName && newServicePrice) {
      // Check if the service name already exists
      const isDuplicate = services.some(
        service => service.name.toLowerCase() === newServiceName.toLowerCase()
      );

      if (isDuplicate) {
        setErrorMessage('A service with this name already exists!');
        return;
      }

      setServices([...services, { name: newServiceName, price: newServicePrice }]);
      setNewServiceName('');
      setNewServicePrice('');
      setErrorMessage('');
      setShowAddServiceModal(false);
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Metrics Cards */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Pending Requests</h3>
          <AlertCircle className="w-6 h-6 text-orange-500" />
        </div>
        <p className="text-3xl font-bold text-blue-600">{pendingCount}</p>
        <p className="text-sm text-gray-500 mt-2">Needs attention</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Active Bookings</h3>
          <Clock className="w-6 h-6 text-blue-500" />
        </div>
        <p className="text-3xl font-bold text-blue-600">{activeCount}</p>
        <p className="text-sm text-gray-500 mt-2">Currently Active</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Completed </h3>
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-blue-600">{completedCount}</p>
        <p className="text-sm text-gray-500 mt-2">Services done</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Earnings</h3>
          <DollarSign className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-blue-600">{totalEarnings} PKR</p>
        <p className="text-sm text-gray-500 mt-2">Total revenue</p>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Service</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataDashboard.recentBookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="px-4 py-3 text-sm">{booking.id}</td>
                <td className="px-4 py-3 text-sm">{booking.customerName}</td>
                <td className="px-4 py-3 text-sm">{booking.service}</td>
                <td className="px-4 py-3 text-sm">{booking.typeOrder}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'Completed' ? 'bg-green-500 text-white' :
                        'bg-gray-100 text-gray-800' // default color if status doesn't match
                    }`}>{booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openViewDetail(booking.id, booking.orderIndex)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTimeSlots = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Time Slots</h2>

      {/* Time Range Input Section */}
      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-md font-medium mb-3 text-blue-700">Set Time Range for Slots</h3>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="EEEE, MMMM d, yyyy"
              className="px-4 py-2 border rounded bg-white w-full"
              placeholderText="Click to select a date"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Start Time</label>
            <input
              type="text"
              placeholder="6:00 AM"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">End Time</label>
            <input
              type="text"
              placeholder="8:00 PM"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div>
            <button
              onClick={() => {
                setAvailableTimeSlots([]);
                generateTimeSlots(); // must include day & date in each slot
                setTempSelectedSlot('');
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Generate Slots
            </button>
          </div>
        </div>
      </div>

      {/* Time Slots Dropdown with Add Button */}
      <div className="mt-8">
        <h3 className="text-md font-medium mb-3">Select Available Time Slots</h3>

        {availableTimeSlots.length > 0 ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-full md:w-1/2">
              <select
                value={tempSelectedSlot}
                onChange={(e) => setTempSelectedSlot(e.target.value)}
                className="w-full px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Time Slot --</option>
                {availableTimeSlots.map((slot) => (
                  <option key={slot.id} value={slot.id.toString()}>
                    {slot.day} - {slot.time} {slot.available ? '(Available)' : '(Booked)'}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={addSelectedTimeSlot}
              disabled={!tempSelectedSlot}
              className={`px-6 py-2 rounded ${tempSelectedSlot
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Add Slot
            </button>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8">
            <Clock className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p>No time slots to display. Please set a time range above and click "Generate Slots".</p>
          </div>
        )}

        {/* Selected Time Slots Cards */}
        {selectedTimeSlots.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-medium mb-3">Selected Time Slots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedTimeSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-4 rounded-lg border bg-green-50 border-green-200 shadow-sm relative"
                >
                  <button
                    onClick={() => removeSelectedTimeSlot(slot.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="mt-1 text-sm text-gray-800">
                    <Calendar className="w-5 h-5 inline-block text-green-600 mr-2" />
                    <span className="font-medium">{slot.time}</span>
                  </div>

                  <div className="mt-1 text-sm text-gray-600">
                    <span>{slot.day}, {slot.date}</span>
                  </div>

                  <div className="mt-2 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="relative bg-white rounded-lg shadow-lg p-6 min-h-[300px]">
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      {services.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No services added yet. Add your first service below.</p>
      ) : (
        <div className="overflow-x-auto mb-24">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-center">Service Name</th>
                <th className="px-4 py-2 text-center">Price (Rs.)</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-center">{service.name}</td>
                  <td className="px-4 py-2 text-center">Rs. {service.price}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditService(service, index)}
                        className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100"
                        title="Edit Service"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(index)}
                        className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                        title="Delete Service"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="absolute bottom-6 right-6 bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
        onClick={() => {
          setErrorMessage('');
          setNewServiceName('');
          setNewServicePrice('');
          setShowAddServiceModal(true);
        }}
      >
        Add Service
      </button>

      {/* Modal for Adding Service */}
      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Service</h3>
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {errorMessage}
              </div>
            )}
            <input
              type="text"
              placeholder="Service Name"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price (Rs.)"
              value={newServicePrice}
              onChange={(e) => setNewServicePrice(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowAddServiceModal(false);
                  setNewServiceName('');
                  setNewServicePrice('');
                  setErrorMessage('');
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveService}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Service */}
      {showEditServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Service</h3>
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {errorMessage}
              </div>
            )}
            <input
              type="text"
              placeholder="Service Name"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price (Rs.)"
              value={newServicePrice}
              onChange={(e) => setNewServicePrice(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowEditServiceModal(false);
                  setNewServiceName('');
                  setNewServicePrice('');
                  setCurrentService(null);
                  setErrorMessage('');
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedService}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (


    <div className="min-h-screen bg-gray-100">
      {/* Navbar - Fixed at the top */}
      <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Layout className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Workshop Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 text-gray-600 hover:text-blue-600 relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {dashboardData.notifications.length}
                  </span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                      <div className="space-y-3">
                        {dashboardData.notifications.map((notification) => (
                          <div key={notification.id} className="flex items-start p-2 hover:bg-gray-50 rounded">
                            <div className="ml-2">
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <img src="./assets/images/team/bilal.jpg" alt="Admin" className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main container with padding-top to account for fixed navbar */}
      <div className="pt-16">
        {/* Sidebar and Main Content */}
        <div className="flex">
          {/* Sidebar - Fixed */}
          <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-16 overflow-y-auto">
            <div className="p-4">
              <div className="space-y-2">
                {[
                  { key: 'overview', icon: LayoutGrid, label: 'Overview' },
                  { key: 'bookings', icon: Calendar, label: 'Bookings' },
                  { key: 'customers', icon: Users, label: 'Customers' },
                  { key: 'services', icon: Wrench, label: 'Services' },
                  { key: 'analytics', icon: BarChart, label: 'Analytics' },
                  { key: 'settings', icon: Settings, label: 'Settings' },
                ].map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg ${activeTab === key ? 'bg-blue-50 text-blue-600' : 'text-gray-600  hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <div className='bg-red-600 rounded-md m-10'>
                <button className="text-black py-2 font-bold" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Margin left to account for sidebar */}
          <div className="flex-1 ml-64 p-8">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'overview' && (
                <>
                  {renderOverview()}
                  {renderBookings()}
                </>
              )}
              {activeTab === 'bookings' && (
                <>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

                    {bookings.length === 0 ? (
                      <p className="text-gray-600">No pending emergency bookings found.</p>
                    ) : (
                      <ul className="space-y-4">
                        {bookings.map((booking, index) => (
                          <li key={index} className="border rounded-lg p-4 bg-gray-50">
                            <p><strong>User:</strong> {booking.userName}</p>
                            <p><strong>Problem:</strong> {booking.problem}</p>
                            <p><strong>Address:</strong> {booking.address}</p>

                            {/* Accept Button */}
                            <button
                              className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 active:bg-green-800 transition"
                              onClick={() => handleAcceptRequest(booking)}
                            >
                              Accept Request
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* Bookings content goes here */}
                  </div>

                  {/* <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
  <h2 className="text-xl font-semibold mb-4">Your Booked Emergency Users</h2>
  {loading ? (
    <p className="text-gray-500">Loading confirmed bookings...</p>
  ) : confirmedEmergencies.length === 0 ? (
    <p className="text-gray-500">No confirmed bookings yet.</p>
  ) : (
    <ul className="space-y-4">
      {confirmedEmergencies.map((user, index) => (
        <li key={index} className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><strong className="text-green-700">Email:</strong> <span className="text-gray-800">{user.userEmail}</span></p>
            <p><strong className="text-green-700">Name:</strong> <span className="text-gray-800">{user.userName}</span></p>
            <p><strong className="text-green-700">Phone:</strong> <span className="text-gray-800">{user.userPhone}</span></p>
            <p className="md:col-span-2"><strong className="text-green-700">Address:</strong> <span className="text-gray-800">{user.address}</span></p>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Status: <span className="text-green-600 font-medium">Confirmed</span>
          </div>
        </li>
      ))}
    </ul>
  )}
</div> */}


                  <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">Your Booked Emergency Users</h2>
                    {loading ? (
                      <p className="text-gray-500">Loading confirmed bookings...</p>
                    ) : confirmedEmergencies.length === 0 ? (
                      <p className="text-gray-500">No confirmed bookings yet.</p>
                    ) : (
                      <ul className="space-y-4">
                        {confirmedEmergencies.map((user, index) => (
                          <li
                            key={index}
                            className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <p>
                                <strong className="text-green-700">Email:</strong>{' '}
                                <span className="text-gray-800">{user.userEmail}</span>
                              </p>
                              <p>
                                <strong className="text-green-700">Name:</strong>{' '}
                                <span className="text-gray-800">{user.userName}</span>
                              </p>
                              <p>
                                <strong className="text-green-700">Phone:</strong>{' '}
                                <span className="text-gray-800">{user.userPhone}</span>
                              </p>
                              <p className="md:col-span-2">
                                <strong className="text-green-700">Address:</strong>{' '}
                                <span className="text-gray-800">{user.address}</span>
                              </p>
                              <p className="md:col-span-2">
                                <strong className="text-green-700">User ID:</strong>{' '}
                                <span className="text-gray-800">{user.userId}</span>
                              </p>
                            </div>

                            <div className="mt-3 flex justify-between items-center gap-3 flex-wrap">
                              <div className="text-xs text-gray-500">
                                Status:{' '}
                                <span className="text-green-600 font-medium">Confirmed</span>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => navigate(`/view-location/${user.userId}`)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                  View Location
                                </button>

                                <button
                                  onClick={() => handleCompleteRequest(user, index)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                  Mark as Completed
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>





                  {/* <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
  <h2 className="text-xl font-semibold mb-4">Your Booked Emergency Users</h2>
  {loading ? (
    <p className="text-gray-500">Loading confirmed bookings...</p>
  ) : confirmedEmergencies.length === 0 ? (
    <p className="text-gray-500">No confirmed bookings yet.</p>
  ) : (
    <ul className="space-y-4">
      {confirmedEmergencies.map((user, index) => (
        <li key={index} className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><strong className="text-green-700">Email:</strong> <span className="text-gray-800">{user.userEmail}</span></p>
            <p><strong className="text-green-700">Name:</strong> <span className="text-gray-800">{user.userName}</span></p>
            <p><strong className="text-green-700">Phone:</strong> <span className="text-gray-800">{user.userPhone}</span></p>
            <p className="md:col-span-2"><strong className="text-green-700">Address:</strong> <span className="text-gray-800">{user.address}</span></p>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              Status: <span className="text-green-600 font-medium">Confirmed</span>
            </div>
            <button
              onClick={() => handleCompleteRequest(user, index)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Mark as Completed
            </button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div> */}




                  {renderTimeSlots()}
                </>
              )}
              {activeTab === 'services' && renderServices()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  window.removeEventListener('popstate', handlePopState);
};

export default AslamDashboard;
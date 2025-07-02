import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const redIcon = new L.Icon({
    iconUrl: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const ViewLocation = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [emergencyData, setEmergencyData] = useState(null);

    const closeModal = () => {
        navigate('/aslam-dashboaard');
    };

    const openGoogleMapsDirections = () => {
        if (location) {
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&travelmode=driving`;
            window.open(googleMapsUrl, '_blank');
        }
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, 'users'));
                let found = false;

                for (const docSnap of usersSnapshot.docs) {
                    const userData = docSnap.data();

                    if (docSnap.id === userId || userData.userId === userId) {
                        const emergencyArray = userData.emergency || [];
                        console.log('Emergency Array:', emergencyArray); // Debug log

                        const confirmedEmergency = [...emergencyArray]
                            .filter(e => e.status === 'confirmed')
                            .sort((a, b) => new Date(b.bookedAt || b.timestamp) - new Date(a.bookedAt || a.timestamp))[0];

                        console.log('Confirmed Emergency:', confirmedEmergency); // Debug log

                        if (confirmedEmergency) {
                            // Store the full emergency data
                            setEmergencyData(confirmedEmergency);

                            // Handle location data - check different possible structures
                            let locationData = null;
                            let addressData = '';

                            // Check if location exists and has lat/lng
                            if (confirmedEmergency.location) {
                                if (confirmedEmergency.location.lat && confirmedEmergency.location.lng) {
                                    locationData = {
                                        lat: confirmedEmergency.location.lat,
                                        lng: confirmedEmergency.location.lng
                                    };
                                } else if (confirmedEmergency.location.latitude && confirmedEmergency.location.longitude) {
                                    locationData = {
                                        lat: confirmedEmergency.location.latitude,
                                        lng: confirmedEmergency.location.longitude
                                    };
                                }
                            }

                            // Get address
                            if (confirmedEmergency.address) {
                                addressData = confirmedEmergency.address;
                            }

                            console.log('Location Data:', locationData); // Debug log
                            console.log('Address Data:', addressData); // Debug log

                            if (locationData && addressData) {
                                setLocation(locationData);
                                setAddress(addressData);
                                found = true;
                                break;
                            } else {
                                console.log('Missing location or address data');
                                setError('Emergency location or address data is incomplete.');
                            }
                        }
                    }
                }

                if (!found) {
                    setError('No confirmed emergency location found for this user.');
                }
            } catch (err) {
                console.error("Error fetching location:", err);
                setError('Failed to fetch emergency location.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchLocation();
        } else {
            setError('User ID not provided.');
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <div className="text-center text-gray-500">Loading emergency location...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-red-700">Error</h2>
                        <button 
                            onClick={closeModal}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-red-600">{error}</p>
                    <button 
                        onClick={closeModal}
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    if (!location) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-yellow-700">No Location</h2>
                        <button 
                            onClick={closeModal}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-yellow-600">Emergency location not found for this user.</p>
                    <button 
                        onClick={closeModal}
                        className="mt-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Emergency Location</h2>
                    <button 
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>
                <div className="p-4">
                    <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                        <h3 className="font-semibold text-red-700 mb-2">Emergency Details</h3>
                        <div className="space-y-1 text-sm">
                            <p className="text-gray-700">
                                <strong>User ID:</strong> {userId}
                            </p>
                            <p className="text-gray-700">
                                <strong>Address:</strong> {address}
                            </p>
                            <p className="text-gray-700">
                                <strong>Coordinates:</strong> {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                            </p>
                            {emergencyData && emergencyData.timestamp && (
                                <p className="text-gray-700">
                                    <strong>Emergency Time:</strong> {new Date(emergencyData.timestamp).toLocaleString()}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden shadow-md">
                        <MapContainer
                            center={[location.lat, location.lng]}
                            zoom={16}
                            scrollWheelZoom={true}
                            style={{ height: '300px', width: '100%' }}
                            key={`${location.lat}-${location.lng}`} // Force re-render when location changes
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[location.lat, location.lng]} icon={redIcon} />
                        </MapContainer>
                    </div>

                    <div className="mt-4">
                        <button 
                            onClick={openGoogleMapsDirections}
                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                        >
                            <span>🗺️</span>
                            Get Directions on Google Maps
                        </button>
                    </div>
                </div>
                <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                    <button 
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewLocation;
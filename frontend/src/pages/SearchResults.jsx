import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';

const SearchResults = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 40.7580, lng: -73.9855 }); // Default: NYC
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const locationQuery = searchParams.get('location');
    const checkIn = searchParams.get('checkIn') || searchParams.get('check_in');
    const checkOut = searchParams.get('checkOut') || searchParams.get('check_out');
    const guests = searchParams.get('guests') || searchParams.get('adults') || 1;

    // Geocode the search location to get coordinates for the map
    useEffect(() => {
        if (locationQuery && window.google) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: locationQuery }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const { lat, lng } = results[0].geometry.location;
                    setMapCenter({ lat: lat(), lng: lng() });
                }
            });
        }
    }, [locationQuery]);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            setError(null);
            try {
                // Construct API URL with query parameters
                let apiUrl = 'https://getmyhotels-com.onrender.com/hotels';
                const params = new URLSearchParams();

                // Default dates if missing
                const today = new Date();
                today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
                const todayStr = today.toISOString().split('T')[0];

                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tmrStr = tomorrow.toISOString().split('T')[0];

                const dayAfter = new Date(tomorrow);
                dayAfter.setDate(dayAfter.getDate() + 1);
                const dayAfterStr = dayAfter.toISOString().split('T')[0];

                const finalCheckIn = checkIn || tmrStr;
                const finalCheckOut = checkOut || dayAfterStr;

                if (locationQuery) params.append('location', locationQuery);
                params.append('check_in', finalCheckIn);
                params.append('check_out', finalCheckOut);
                if (guests) params.append('guests', guests);

                const response = await fetch(`${apiUrl}?${params.toString()}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                const data = await response.json();
                setHotels(data);
            } catch (err) {
                console.error("Error fetching hotels:", err);
                setError("Failed to load hotels. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [locationQuery, checkIn, checkOut, guests]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-white shadow-sm p-4">
                <div className="max-w-7xl mx-auto">
                    <SearchBar />
                </div>
            </div>

            <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    {locationQuery ? `Hotels in ${locationQuery}` : 'All Hotels'}
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-8">{error}</div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Hotel List */}
                        <div className="lg:w-3/5 space-y-6">
                            {hotels.length > 0 ? (
                                hotels.map(hotel => (
                                    <HotelCard key={hotel.id} hotel={hotel} />
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    No hotels found matching your criteria.
                                </div>
                            )}
                        </div>

                        {/* Map View */}
                        <div className="hidden lg:block lg:w-2/5 sticky top-4 h-[calc(100vh-120px)]">
                            <div className="bg-white rounded-lg shadow-md h-full overflow-hidden">
                                <MapComponent hotels={hotels} center={mapCenter} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;

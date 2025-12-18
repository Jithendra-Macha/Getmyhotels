import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard';

const HotelDetails = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://getmyhotels-com.onrender.com/hotels/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hotel details');
                }
                const data = await response.json();
                setHotel(data);
            } catch (err) {
                console.error("Error fetching hotel details:", err);
                setError("Failed to load hotel details.");
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen text-red-500">
            {error}
        </div>
    );

    if (!hotel) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hotel Header */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="h-64 md:h-96 relative">
                        <img
                            src={hotel.image_url || 'https://via.placeholder.com/1200x600'}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 p-6 w-full">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{hotel.name}</h1>
                            <p className="text-white/90 text-lg flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {hotel.location}
                            </p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <span className="bg-primary text-white px-3 py-1 rounded-md text-sm font-bold mr-4">{hotel.rating} / 5 Rating</span>
                            <span className="text-gray-600">Excellent Location</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About this hotel</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">{hotel.description}</p>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {['Free WiFi', 'Swimming Pool', 'Restaurant', 'Gym', 'Parking', 'Spa', 'Room Service', 'Bar'].map((amenity, index) => (
                                <div key={index} className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    {amenity}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rooms Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
                    <div className="space-y-4">
                        {hotel.rooms && hotel.rooms.length > 0 ? (
                            hotel.rooms.map(room => (
                                <RoomCard key={room.id} room={room} hotelId={hotel.id} />
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-8">
                                No rooms available at the moment.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;

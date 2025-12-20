import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Bookings = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirect if not logged in (or just show empty state)
                // navigate('/login'); 
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://getmyhotels-backend.vercel.app/my-bookings', {
                    headers: {
                        'Authorization': `Bearer ${token} `
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    // Transform backend attributes to frontend view structure if needed
                    // Backend returns: status, rating, hotel_name, check_in_date, etc.
                    const formattedData = data.map(b => ({
                        id: b.id.toString(),
                        hotelName: b.hotel_name || "Unknown Hotel",
                        checkIn: b.check_in_date,
                        checkOut: b.check_out_date,
                        status: b.status,
                        rating: b.rating,
                        image: b.hotel_image
                    }));

                    setReservations(formattedData);
                } else {
                    console.error("Failed to fetch bookings");
                    setError("Failed to load your bookings.");
                }
            } catch (err) {
                console.error("Error:", err);
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate]);

    const handleCancel = async (bookingId) => {
        const token = localStorage.getItem('token');
        if (!confirm("Are you sure you want to cancel this booking?")) return;

        try {
            const response = await fetch(`https://getmyhotels-backend.vercel.app/bookings/${bookingId}/cancel`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Update local state
                setReservations(prev => prev.map(r =>
                    r.id === bookingId ? { ...r, status: 'cancelled' } : r
                ));
            } else {
                alert("Failed to cancel booking");
            }
        } catch (err) {
            console.error("Error cancelling:", err);
        }
    };

    const filteredReservations = activeTab === 'all'
        ? reservations
        : reservations.filter(r => r.status === activeTab);

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming': return 'bg-blue-600';
            case 'completed': return 'bg-green-600';
            case 'past': return 'bg-blue-600';
            case 'cancelled': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading your trips...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Search & Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {['all', 'upcoming', 'ongoing', 'past', 'cancelled'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-bold border transition-colors whitespace-nowrap ${activeTab === tab
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)} Trips
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 mb-6 text-sm text-gray-500">
                    Showing {filteredReservations.length} of {reservations.length} reservations
                </div>

                {/* List */}
                <div className="space-y-6">
                    {filteredReservations.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-lg">No {activeTab} trips found.</p>
                            <Link to="/search" className="text-primary font-bold mt-2 inline-block">Start exploring hotels</Link>
                        </div>
                    ) : (
                        filteredReservations.map(res => (
                            <div key={res.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Reservation Code</p>
                                        <p className="font-bold text-gray-900 text-lg">#{res.id}</p>
                                        <p className="text-sm text-primary font-medium mt-1">{res.hotelName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Duration</p>
                                        <p className="font-bold text-gray-900 text-sm">{res.checkIn} - {res.checkOut}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                                        <span className={`${getStatusColor(res.status)} text-white px-4 py-1.5 rounded-full text-xs font-bold capitalize inline-block`}>
                                            {res.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Rating</p>
                                        <div className="flex text-gray-200 text-lg">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} className={star <= res.rating ? "text-yellow-400" : "text-gray-200"}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end gap-3">
                                    <button className="text-primary font-bold text-sm hover:underline">View Details</button>
                                    {res.status === 'past' && <button className="text-primary font-bold text-sm hover:underline">Write a review</button>}
                                    {res.status === 'upcoming' && (
                                        <button
                                            onClick={() => handleCancel(res.id)}
                                            className="text-red-500 border border-red-200 hover:bg-red-50 px-4 py-1.5 rounded-full text-sm font-bold transition-colors"
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookings;

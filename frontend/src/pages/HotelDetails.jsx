import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Components
import ImmersiveHero from '../components/Hotel/ImmersiveHero';
import StickySubNav from '../components/Hotel/StickySubNav';
import PricingWidget from '../components/Hotel/PricingWidget';
import RoomCard from '../components/RoomCard';
import AmenitiesSection from '../components/Hotel/AmenitiesSection';
import LocalInsights from '../components/Hotel/LocalInsights';
import BrandHighlights from '../components/Hotel/BrandHighlights';
import ReviewsSection from '../components/Hotel/ReviewsSection';
import HotelPolicies from '../components/Hotel/HotelPolicies';
import FaqSection from '../components/Hotel/FaqSection';
import StickyBookingBar from '../components/Hotel/StickyBookingBar';

const HotelDetails = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                // Auto-detect environment
                const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                // Prioritize Env Var, then fallback based on domain
                const envApiUrl = import.meta.env.VITE_API_URL;
                const apiUrl = (envApiUrl && envApiUrl.length > 0)
                    ? envApiUrl
                    : (isLocal ? 'http://localhost:8000' : 'https://getmyhotels-com.onrender.com');

                const response = await fetch(`${apiUrl}/hotels/${id}`);
                if (!response.ok) throw new Error(`Failed to fetch hotel details (${response.status})`);

                const data = await response.json();
                setHotel(data);
            } catch (err) {
                console.error(err);
                setError(`${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchHotel();
        }
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
    if (error || !hotel) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <div className="text-red-500 text-xl font-bold mb-2">Error Loading Hotel</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-xs text-gray-400 mb-6">
                Try refreshing or check your connection.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors"
            >
                Retry
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pb-20 font-sans">
            {/* 1. Immersive Hero Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* New Header Layout */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
                            {hotel.name}
                        </h1>
                        <div className="flex flex-wrap items-center text-gray-500 gap-x-4 gap-y-2 text-sm md:text-base">
                            <span className="flex items-center gap-1 text-gray-900 font-bold bg-gray-100 px-2 py-1 rounded-md">
                                ⭐ {hotel.rating}
                            </span>
                            <span className="flex items-center gap-1">
                                📍 {hotel.location}
                            </span>
                            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                                Show on map
                            </span>
                        </div>
                    </div>
                    {/* Price Peek for Mobile Header */}
                    <div className="md:hidden">
                        <span className="text-2xl font-bold text-gray-900">${hotel.price_per_night}</span>
                        <span className="text-gray-500 text-sm">/night</span>
                    </div>
                </div>

                <ImmersiveHero
                    images={hotel.images}
                    hotelName={hotel.name}
                />
            </div>

            {/* 2. Sticky Sub Nav */}
            <StickySubNav hotelName={hotel.name} price={hotel.price_per_night} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-12 relative">
                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:w-[65%] space-y-16">

                        {/* Overview Section */}
                        <div id="overview" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the stay</h2>
                            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                {hotel.long_description || hotel.description}
                            </p>

                            <div className="mt-8">
                                <BrandHighlights />
                            </div>
                        </div>

                        {/* Amenities */}
                        <div id="amenities" className="scroll-mt-32">
                            <AmenitiesSection amenities={hotel.amenities} />
                        </div>

                        {/* Rooms */}
                        <div id="rooms" className="scroll-mt-32 pt-4">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                Available Rooms
                            </h2>
                            <div className="space-y-6">
                                {hotel.rooms && hotel.rooms.length > 0 ? (
                                    hotel.rooms.map(room => (
                                        <RoomCard key={room.id} room={room} hotelId={hotel.id} />
                                    ))
                                ) : (
                                    <p>No rooms available.</p>
                                )}
                            </div>
                        </div>

                        {/* Local Insights */}
                        <LocalInsights insights={hotel.local_insights} />

                        {/* Reviews */}
                        <div id="reviews" className="scroll-mt-32">
                            <ReviewsSection rating={hotel.rating} count={hotel.reviews} />
                        </div>

                        {/* Map */}
                        <div id="location" className="scroll-mt-32 py-8 border-t border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore the Neighborhood</h2>
                            <div className="rounded-2xl overflow-hidden h-96 bg-gray-100 relative shadow-inner">
                                <iframe
                                    title="map"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`https://maps.google.com/maps?q=${hotel.location}&hl=es;z=14&output=embed`}
                                ></iframe>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg max-w-xs border border-gray-200">
                                    <h4 className="font-bold mb-3 text-gray-900 flex items-center">
                                        <span className="bg-green-100 p-1 rounded-full mr-2">📍</span>
                                        Nearby
                                    </h4>
                                    <ul className="text-sm space-y-3">
                                        {hotel.local_insights?.map((d, i) => (
                                            <li key={i} className="flex justify-between items-start">
                                                <span className="font-medium text-gray-900">{d.title}</span>
                                            </li>
                                        )).slice(0, 3)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <HotelPolicies policies={hotel.policies} />
                        <FaqSection faqs={hotel.faqs} />
                    </div>

                    {/* RIGHT COLUMN - Sticky Booking Widget */}
                    <div className="hidden lg:block lg:w-[35%] relative">
                        <div className="sticky top-28 space-y-6">
                            <PricingWidget basePrice={hotel.price_per_night} />

                            {/* Trust Card */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">Why book with us?</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex gap-2">✓ Lowest price guarantee</li>
                                    <li className="flex gap-2">✓ No hidden fees</li>
                                    <li className="flex gap-2">✓ 24/7 Customer support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bar */}
            <StickyBookingBar price={hotel.price_per_night} />
        </div>
    );
};

export default HotelDetails;

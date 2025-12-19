import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { hotelData } from '../mocks/hotelData';

// Components
import HotelHero from '../components/Hotel/HotelHero';
import ImageGallery from '../components/Hotel/ImageGallery';
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

    useEffect(() => {
        // Simulate API fetch with local mock data
        const foundHotel = hotelData.find(h => h.id === parseInt(id)) || hotelData[0]; // Fallback to first if not found for demo
        setHotel(foundHotel);
        setLoading(false);
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* 1. Hero Banner */}
                <HotelHero hotel={hotel} />

                {/* 2. Photo Gallery */}
                <ImageGallery mainImage={hotel.image_url} hotelName={hotel.name} />

                <div className="flex flex-col lg:flex-row gap-12 relative">
                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:w-2/3">

                        {/* 3. At-a-Glance Summary */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the stay</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                {hotel.longDescription || hotel.description}
                            </p>

                        </div>

                        {/* 7. Why We Love This (Brand Highlights) */}
                        <BrandHighlights />

                        {/* 5. Room Types */}
                        <div className="mb-12" id="rooms">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose your room</h2>
                            {hotel.rooms && hotel.rooms.length > 0 ? (
                                hotel.rooms.map(room => (
                                    <RoomCard key={room.id} room={room} hotelId={hotel.id} />
                                ))
                            ) : (
                                <p>No rooms available.</p>
                            )}
                        </div>

                        {/* 6. Amenities */}
                        <AmenitiesSection amenities={hotel.amenities} />

                        {/* 8. Local Insight */}
                        <LocalInsights />

                        {/* 9. Reviews */}
                        <ReviewsSection
                            rating={hotel.rating}
                            count={hotel.reviewsCount}
                            distribution={hotel.reviewDistribution}
                        />

                        {/* 10. Map & Nearby (Simple Embed for Demo) */}
                        <div className="py-8 border-t border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore the Neighborhood</h2>
                            <div className="rounded-xl overflow-hidden h-96 bg-gray-100 relative">
                                <iframe
                                    title="map"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`https://maps.google.com/maps?q=${hotel.coordinates?.lat},${hotel.coordinates?.lng}&hl=es;z=14&output=embed`}
                                ></iframe>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg max-w-xs border border-gray-200">
                                    <h4 className="font-bold mb-3 text-gray-900 flex items-center">
                                        <span className="bg-green-100 p-1 rounded-full mr-2">📍</span>
                                        Nearby Spots
                                    </h4>
                                    <ul className="text-sm space-y-3">
                                        {hotel.distances?.map((d, i) => (
                                            <li key={i} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">{d.to}</span>
                                                    <span className="text-xs text-gray-500">{d.type}</span>
                                                </div>
                                                <span className="font-bold text-primary bg-blue-50 px-2 py-1 rounded text-xs">{d.walkTime}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                                        <a href={`https://maps.google.com/?q=${hotel.address}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold hover:underline">
                                            Open in Google Maps ↗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 11. Policies */}
                        <HotelPolicies />

                        {/* 12. FAQ */}
                        <FaqSection />

                    </div>

                    {/* RIGHT COLUMN - Sticky Booking Widget (Desktop) */}
                    <div className="hidden lg:block lg:w-1/3 relative">
                        <PricingWidget basePrice={hotel.price_per_night} />
                    </div>
                </div>
            </div>

            {/* 13. Sticky Booking Bar (Mobile) */}
            <StickyBookingBar price={hotel.price_per_night} />

        </div>
    );
};

export default HotelDetails;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdvancedHotelCard = ({ hotel }) => {
    const [showFees, setShowFees] = useState(false);
    const totalPrice = hotel.price_per_night + hotel.taxes_and_fees;

    return (
        <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row relative">

            {/* 1. Hero Image Section */}
            <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                <img
                    src={hotel.image_url}
                    alt={hotel.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {hotel.is_boutique && (
                        <span className="bg-purple-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            ✨ Boutique
                        </span>
                    )}
                    {hotel.fair_rank_boost && (
                        <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                            💎 Hidden Gem
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>
            </div>

            {/* 2. Content Section */}
            <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                                {hotel.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                {hotel.location}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">Exceptional</span>
                                <div className="bg-primary text-white font-bold text-sm px-2 py-1 rounded-lg">
                                    {hotel.rating}
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{hotel.reviews} reviews</span>
                        </div>
                    </div>

                    {/* AI Tagline - The Differentiator */}
                    <div className="mt-3 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <div>
                                <p className="text-sm font-medium text-purple-900">AI Summary</p>
                                <p className="text-sm text-purple-700 leading-snug">{hotel.ai_tagline}</p>
                            </div>
                        </div>
                    </div>

                    {/* Amenities / Badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {hotel.sustainability_score >= 8 && (
                            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded border border-green-100 flex items-center gap-1">
                                🌿 Eco-Certified
                            </span>
                        )}
                        {hotel.amenities.slice(0, 3).map((am, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded border border-gray-100">
                                {am}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 3. Pricing & CTA */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between border-t border-gray-100 pt-4">

                    {/* Price Breakdown */}
                    <div className="mb-4 sm:mb-0">
                        {hotel.deal_tag && (
                            <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded mb-1">
                                {hotel.deal_tag}
                            </span>
                        )}
                        <div className="flex items-baseline gap-1 relative cursor-help" onMouseEnter={() => setShowFees(true)} onMouseLeave={() => setShowFees(false)}>
                            <span className="text-2xl font-bold text-gray-900">${totalPrice}</span>
                            <span className="text-sm text-gray-500">/ night</span>

                            {/* Fee Tooltip */}
                            {showFees && (
                                <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl z-20">
                                    <div className="flex justify-between mb-1"><span>Base Rate:</span> <span>${hotel.price_per_night}</span></div>
                                    <div className="flex justify-between font-bold text-yellow-400"><span>Taxes & Fees:</span> <span>${hotel.taxes_and_fees}</span></div>
                                    <div className="mt-1 pt-1 border-t border-gray-700 text-gray-400">No hidden resort fees.</div>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500">Includes taxes & fees</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Link
                            to={`/hotels/${hotel.id}`}
                            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                            View Availability
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedHotelCard;

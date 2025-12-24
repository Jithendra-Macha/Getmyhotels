import React, { useState } from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
    // Helper to toggle array items
    const handleCheckboxChange = (category, item) => {
        const currentItems = filters[category] || [];
        const newItems = currentItems.includes(item)
            ? currentItems.filter(i => i !== item)
            : [...currentItems, item];
        onFilterChange(category, newItems);
    };

    return (
        <div className="space-y-8">

            {/* Map Preview Widget - Keeping logic in SearchResults, but visual here is fine or remove if interactive map is main view */}
            {/* Removing static map preview since we will have a real map toggle in main view */}

            {/* AI Personalization Toggle (Visual for now) */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-4">
                {/* ... Keep AI UI ... */}
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        AI Personalization
                    </h3>
                    <div className="w-10 h-6 bg-purple-600 rounded-full p-1 flex items-center justify-end cursor-pointer">
                        <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                    </div>
                </div>
                <p className="text-xs text-gray-600">
                    Filters customized based on your preferences.
                </p>
            </div>

            {/* Filter Group: Price */}
            <div>
                <h3 className="font-bold text-gray-900 mb-4">Max Price (per night)</h3>
                <input
                    type="range"
                    min="50"
                    max="1000"
                    value={filters.maxPrice || 1000}
                    onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$50</span>
                    <span className="font-bold text-purple-700">${filters.maxPrice || 1000}+</span>
                </div>
            </div>

            {/* Filter Group: Payment Options (Requested by User) */}
            <div>
                <h3 className="font-bold text-gray-900 mb-3">Payment Options</h3>
                <div className="space-y-2">
                    {['Pay Later', 'Pay Now'].map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={(filters.paymentOptions || []).includes(item)}
                                onChange={() => handleCheckboxChange('paymentOptions', item)}
                                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-600">{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Filter Group: Property Type */}
            <div>
                <h3 className="font-bold text-gray-900 mb-3">Property Type</h3>
                <div className="space-y-2">
                    {['Hotel', 'Boutique', 'Apartment', 'Resort'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={(filters.types || []).includes(type)}
                                onChange={() => handleCheckboxChange('types', type)}
                                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-600 group-hover:text-gray-900">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Filter Group: Amenities */}
            <div>
                <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
                <div className="space-y-2">
                    {['Free WiFi', 'Breakfast', 'Pool', 'Pet Friendly', 'Gym'].map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={(filters.amenities || []).includes(item)}
                                onChange={() => handleCheckboxChange('amenities', item)}
                                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-600">{item}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;

import React, { useState } from 'react';

const FilterSidebar = () => {
    const [priceRange, setPriceRange] = useState(600);
    const [aiPersonalize, setAiPersonalize] = useState(true);

    return (
        <div className="space-y-8">

            {/* Map Preview Widget */}
            <div className="rounded-xl overflow-hidden shadow-md h-32 relative group cursor-pointer border border-gray-200">
                <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-73.9855,40.7580,12,0/600x300?access_token=YOUR_TOKEN"
                    alt="Map View"
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity bg-gray-200"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold text-gray-900 group-hover:scale-105 transition-transform">
                        Show on map
                    </button>
                </div>
            </div>

            {/* AI Personalization Toggle */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        AI Personalization
                    </h3>
                    <button
                        onClick={() => setAiPersonalize(!aiPersonalize)}
                        className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${aiPersonalize ? 'bg-purple-600' : 'bg-gray-300'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${aiPersonalize ? 'translate-x-4' : ''}`}></div>
                    </button>
                </div>
                <p className="text-xs text-gray-600">
                    {aiPersonalize
                        ? "Filters customized based on your search for 'Boutique' & 'Romantic'."
                        : "Showing standard results."}
                </p>
            </div>

            {/* Filter Group: Price */}
            <div>
                <h3 className="font-bold text-gray-900 mb-4">Total Price (per night)</h3>
                <input
                    type="range"
                    min="50"
                    max="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$50</span>
                    <span className="font-bold text-purple-700">${priceRange}+</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Includes taxes & fees. No surprises.</p>
            </div>

            {/* Filter Group: Property Type */}
            <div>
                <h3 className="font-bold text-gray-900 mb-3">Property Type</h3>
                <div className="space-y-2">
                    {['Hotels', 'Boutique', 'Apartments', 'Resorts'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                            <span className="text-gray-600 group-hover:text-gray-900">{type}</span>
                            {type === 'Boutique' && <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Popular</span>}
                        </label>
                    ))}
                </div>
            </div>

            {/* Filter Group: Amenities */}
            <div>
                <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
                <div className="space-y-2">
                    {['Free Wi-Fi', 'Breakfast Included', 'Pool', 'Pet Friendly', 'EV Charging'].map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                            <span className="text-gray-600">{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Filter Group: Sustainability */}
            <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    Sustainability
                    <span className="text-green-500">🌿</span>
                </h3>
                <div className="space-y-2">
                    {['Eco-Certified', 'Plastic-Free', 'Local Ownership'].map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                            <span className="text-gray-600">{item}</span>
                        </label>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default FilterSidebar;

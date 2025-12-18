import React, { useState } from 'react';

const destinations = [
    { id: 1, name: 'Paris', country: 'France', avgPrice: 128, hotels: 1240, top: '42%', left: '49%' },
    { id: 2, name: 'Tokyo', country: 'Japan', avgPrice: 165, hotels: 980, top: '45%', left: '82%' },
    { id: 3, name: 'New York', country: 'USA', avgPrice: 240, hotels: 1560, top: '43%', left: '22%' },
    { id: 4, name: 'Amsterdam', country: 'Netherlands', avgPrice: 185, hotels: 720, top: '40%', left: '49.5%' },
    { id: 5, name: 'Dubai', country: 'UAE', avgPrice: 210, hotels: 890, top: '47%', left: '60%' },
    { id: 6, name: 'London', country: 'UK', avgPrice: 195, hotels: 1340, top: '40.5%', left: '48.5%' },
    { id: 7, name: 'Barcelona', country: 'Spain', avgPrice: 145, hotels: 860, top: '44%', left: '48%' },
    { id: 8, name: 'Singapore', country: 'Singapore', avgPrice: 175, hotels: 650, top: '52%', left: '73%' }
];

const InteractiveMap = () => {
    const [selectedDestination, setSelectedDestination] = useState(null);

    return (
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Map Background Image */}
            <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
                alt="World Map"
                className="w-full h-full object-cover opacity-60"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>

            {/* Destination Markers */}
            {destinations.map((destination) => (
                <button
                    key={destination.id}
                    onClick={() => setSelectedDestination(destination)}
                    className="absolute w-10 h-10 -ml-5 -mt-5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full border-4 border-white shadow-lg hover:scale-125 transition-all duration-300 z-10 group"
                    style={{ top: destination.top, left: destination.left }}
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {destination.name}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-75"></div>
                </button>
            ))}

            {/* Info Window */}
            {selectedDestination && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 min-w-[280px] z-20 animate-fadeIn">
                    <button
                        onClick={() => setSelectedDestination(null)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {selectedDestination.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{selectedDestination.country}</p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Avg. Price:</span>
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                                ${selectedDestination.avgPrice}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Hotels:</span>
                            <span className="text-lg font-semibold text-gray-900">
                                {selectedDestination.hotels}+
                            </span>
                        </div>
                    </div>
                    <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg text-sm font-bold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md">
                        View Hotels
                    </button>
                </div>
            )}

            {/* Instructions Overlay */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg max-w-xs z-10">
                <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Explore Destinations
                </h4>
                <p className="text-sm text-gray-600">Click on any pulsing marker to see hotel prices</p>
            </div>
        </div>
    );
};

export default InteractiveMap;

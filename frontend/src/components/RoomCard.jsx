import React from 'react';

const RoomCard = ({ room }) => {
    // Fallback image if none provided
    const mainImage = room.images?.[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow mb-6 bg-white flex flex-col md:flex-row h-full">
            {/* 1. Image Section */}
            <div className="md:w-72 relative h-56 md:h-auto overflow-hidden">
                <img
                    src={mainImage}
                    alt={room.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    1/5
                </div>
            </div>

            {/* 2. Room Info Section */}
            <div className="flex-1 p-5 border-r border-gray-100 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                        {room.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                        Sleeps {room.capacity} • {room.size_sqft} sq ft
                    </p>

                    <div className="font-bold text-gray-900 text-sm mb-3">
                        {room.bed_type}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {room.breakfast_included && (
                            <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1 border border-green-100">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                Breakfast Included
                            </span>
                        )}
                        <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1 border border-green-100">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
                            Free WiFi
                        </span>
                    </div>

                    <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
                        Room Details and Photos
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                </div>
            </div>

            {/* 3. Pricing Section */}
            <div className="w-full md:w-64 p-5 bg-gray-50 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100">
                <div>
                    <div className={`text-sm font-bold mb-1 ${room.cancellation_policy === 'Non Refundable' ? 'text-blue-600' : 'text-green-600'}`}>
                        {room.cancellation_policy}
                    </div>
                    {room.cancellation_policy !== 'Non Refundable' && (
                        <div className="text-xs text-gray-500 mb-4">Book now, pay later</div>
                    )}
                </div>

                <div className="text-right mt-4 md:mt-0">
                    <div className="text-xs text-gray-500 mb-1">Per night</div>
                    <div className="text-2xl font-bold text-gray-900">${room.price}</div>
                    <div className="text-sm font-bold text-gray-900 mb-1">${room.price} Total</div>
                    <div className="text-xs text-gray-500 mb-3">1 night, 1 room</div>

                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors text-sm uppercase tracking-wide">
                        Book Now
                    </button>

                    {room.breakfast_included && (
                        <div className="flex items-center justify-end gap-1 mt-3 text-xs text-green-700 font-semibold">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                            Price includes breakfast
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomCard;

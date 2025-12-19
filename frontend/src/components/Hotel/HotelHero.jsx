import React from 'react';

const HotelHero = ({ hotel }) => {
    return (
        <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                            {hotel.neighborhoodDescription?.split(',')[0] || hotel.location}
                        </span>
                        {hotel.badges?.map((badge) => (
                            <span key={badge.id} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span>{badge.icon}</span> {badge.label}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                        {hotel.name}
                    </h1>

                    <div className="flex items-center text-gray-600 gap-4 flex-wrap">
                        <p className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {hotel.address}
                        </p>
                        <div className="flex items-center text-green-700 bg-green-50 px-2 py-0.5 rounded">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-bold mr-1">{hotel.rating}</span>
                            <span className="text-sm">({hotel.reviewsCount} verified reviews)</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                    <button className="text-primary hover:text-blue-700 font-medium flex items-center gap-2 text-sm transition-colors cursor-pointer">
                        <span className="p-2 bg-blue-50 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </span>
                        Questions? Chat with our Brooklyn team
                    </button>
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        All photos verified by our team — no stock imagery
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelHero;

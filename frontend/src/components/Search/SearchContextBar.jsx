import React from 'react';

const SearchContextBar = ({ locationQuery, checkIn, checkOut, guests }) => {
    return (
        <div className="bg-white border-b border-gray-200 sticky top-[72px] z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                {/* Left: Search Summary & Breadcrumbs */}
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span>USA</span>
                        <span>/</span>
                        <span>New York</span>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{locationQuery || 'Brooklyn'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-bold text-gray-900">
                            {locationQuery || 'Brooklyn, NY'}
                        </h1>
                        <div className="hidden sm:flex h-4 w-px bg-gray-300"></div>
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full">
                            <span>{new Date().toLocaleDateString()} — {new Date(Date.now() + 86400000).toLocaleDateString()}</span>
                            <span>• {guests} guests</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Sort by:</span>
                        <select className="form-select text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 py-1.5 pl-3 pr-8">
                            <option>✨ Artificial Intelligence (Recommended)</option>
                            <option>Price (Low to High)</option>
                            <option>Guest Rating</option>
                            <option>Distance from downtown</option>
                        </select>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-100 rounded-lg hover:bg-purple-100 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        Save Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchContextBar;

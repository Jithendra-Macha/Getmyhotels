import React from 'react';

const StickyBookingBar = ({ price }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl md:hidden z-40">
            <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col">
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500">From</span>
                        <span className="text-xl font-bold text-gray-900 ml-1">${price}</span>
                        <span className="text-xs text-gray-500">/night</span>
                    </div>
                    <div className="flex items-center text-xs text-green-700">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Total price guaranteed
                    </div>
                </div>
                <button className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg flex-1">
                    Reserve
                </button>
            </div>
        </div>
    );
};

export default StickyBookingBar;

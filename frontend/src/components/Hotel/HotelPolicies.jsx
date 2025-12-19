import React from 'react';

const HotelPolicies = () => {
    return (
        <div className="py-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Cancellation</h3>
                    <p className="text-gray-600 mb-4">Free up to 48 hours before 3 PM check-in. Reply to your confirmation — a real person will help.</p>

                    <h3 className="font-bold text-gray-900 mb-2">Check-in / Check-out</h3>
                    <p className="text-gray-600 mb-4">Check-in: 3 PM • Check-out: 11 AM<br />Early check-in? We’ll store bags and text when your room’s ready.</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Accessibility</h3>
                    <p className="text-gray-600 mb-4">No elevator — this is a historic 3-story brownstone. Rooms 1 & 2 are ground floor.</p>

                    <h3 className="font-bold text-gray-900 mb-2">Pets</h3>
                    <p className="text-gray-600">Dog-friendly (under 40lbs). One-time deep cleaning fee of $50.</p>
                </div>
            </div>
        </div>
    );
};

export default HotelPolicies;

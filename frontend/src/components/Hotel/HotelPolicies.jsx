import React from 'react';

const HotelPolicies = ({ policies }) => {
    const defaultPolicies = [
        { title: "Cancellation", description: "Free up to 48 hours before 3 PM check-in. Reply to your confirmation — a real person will help." },
        { title: "Check-in / Check-out", description: "Check-in: 3 PM • Check-out: 11 AM\nEarly check-in? We’ll store bags and text when your room’s ready." },
        { title: "Accessibility", description: "No elevator — this is a historic 3-story brownstone. Rooms 1 & 2 are ground floor." },
        { title: "Pets", description: "Dog-friendly (under 40lbs). One-time deep cleaning fee of $50." }
    ];

    const data = (policies && policies.length > 0) ? policies : defaultPolicies;

    return (
        <div className="py-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {data.map((policy, idx) => (
                    <div key={idx}>
                        <h3 className="font-bold text-gray-900 mb-2">{policy.title}</h3>
                        <p className="text-gray-600 mb-4 whitespace-pre-line">{policy.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelPolicies;

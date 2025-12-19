import React from 'react';

const AmenitiesSection = ({ amenities }) => {
    // Group amenities (Mock logic - reusing the flat list or new structured data if available)
    // For now, we'll map the flat list to categories based on keywords or use hardcoded structure for the demo

    const categories = {
        "Essentials": ["Free Wi-Fi", "AC/heating", "Luggage Storage", "24/7 Check-in"],
        "Wellness": ["Quiet Hours", "Blackout curtains", "Organic Toiletries"],
        "Food & Drink": ["Breakfast Included", "Coffee Bar", "Room Service"],
        "Sustainability": ["Solar Power", "Plastic-Free", "Local Sourcing"]
    };

    // Use passed amenities to filter/populate, fallback to hardcoded for "Brooklyn" vibe if sparse
    const displayAmenities = amenities && amenities.length > 0 ? amenities : [];

    return (
        <div className="py-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(categories).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                            {category === "Essentials" && "✨"}
                            {category === "Wellness" && "🧘"}
                            {category === "Food & Drink" && "☕"}
                            {category === "Sustainability" && "🌱"}
                            <span className="ml-2">{category}</span>
                        </h3>
                        <ul className="space-y-2">
                            {items.map(item => (
                                <li key={item} className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <button className="mt-6 text-primary font-medium hover:underline text-sm">
                View all 24 amenities
            </button>
        </div>
    );
};

export default AmenitiesSection;

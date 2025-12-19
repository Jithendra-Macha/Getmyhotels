import React from 'react';

const BrandHighlights = () => {
    return (
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100 relative overflow-hidden">
            <div className="md:flex gap-8 items-start">
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className="text-red-500 mr-2">♥</span> Why We Love This Hotel
                    </h2>
                    <ul className="grid grid-cols-1 gap-3 mb-6">
                        <li className="flex items-start">
                            <span className="mt-1 mr-2 text-green-500">✔</span>
                            <span className="text-gray-700 text-sm">Run by Lena & Tom since 2010 — they personally greet every guest.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mt-1 mr-2 text-green-500">✔</span>
                            <span className="text-gray-700 text-sm">90% of the staff live within 1 mile of the property.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mt-1 mr-2 text-green-500">✔</span>
                            <span className="text-gray-700 text-sm">Partners with Brooklyn Grange for rooftop herbs used in breakfast.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mt-1 mr-2 text-green-500">✔</span>
                            <span className="text-gray-700 text-sm">Donates 5% of winter bookings to local shelter.</span>
                        </li>
                    </ul>
                </div>

                {/* Owner Profile */}
                <div className="md:w-1/3 bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <img
                        src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                        alt="Lena & Tom"
                        className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-primary/20"
                    />
                    <p className="text-gray-900 font-bold text-sm">Lena & Tom</p>
                    <p className="text-xs text-gray-500 mb-2">Owners since 2010</p>
                    <p className="text-gray-600 text-xs italic">
                        "We want you to feel like a neighbor — not a guest. Ask us about the secret garden!"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BrandHighlights;

import React, { useState } from 'react';

const RoomCard = ({ room }) => {
    const [selectedRate, setSelectedRate] = useState(room.ratePlans?.[0]?.id || 'flex');

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow mb-6">
            <div className="flex flex-col md:flex-row">
                {/* Image & Quick Info */}
                <div className="md:w-1/3 relative">
                    <img
                        src={room.image_url || "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt={room.name}
                        className="w-full h-full object-cover min-h-[200px]"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {room.accessibilityFeatures?.includes("Step-free entrance") && (
                            <span className="bg-white/90 backdrop-blur text-gray-800 text-xs px-2 py-1 rounded font-medium shadow-sm">
                                ♿ Step-free
                            </span>
                        )}
                        {/* Honest Note Tag */}
                        <span className="bg-blue-50/90 backdrop-blur text-blue-800 text-xs px-2 py-1 rounded font-medium shadow-sm">
                            Best Light ☀️
                        </span>
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-5">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {room.size} • Max {room.capacity} Guests • {room.capacity > 2 ? "2 Queen Beds" : "Queen Bed"}
                            </p>
                        </div>
                    </div>

                    {/* Honest Note */}
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-4 border border-gray-100">
                        <span className="font-semibold text-gray-900">Honest Note:</span> {room.honestNote}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {room.ratePlans?.map((plan) => (
                            <label
                                key={plan.id}
                                className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedRate === plan.id
                                    ? 'border-primary ring-1 ring-primary bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setSelectedRate(plan.id)}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-gray-900">{plan.name}</span>
                                    <input
                                        type="radio"
                                        name={`rate-${room.id}`}
                                        checked={selectedRate === plan.id}
                                        onChange={() => setSelectedRate(plan.id)}
                                        className="text-primary focus:ring-primary"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mb-2">{plan.description}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {plan.features.map((feat, i) => (
                                        <span key={i} className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600">
                                            {feat}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-gray-900">${plan.totalPrice}</div>
                                    <div className="text-xs text-gray-500">Total price</div>
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-colors">
                            Select Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;

import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room, hotelId }) => {
    return (
        <div className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-center hover:bg-gray-50 transition-colors">
            <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-bold text-gray-900">{room.name}</h4>
                <p className="text-sm text-gray-600">Capacity: {room.capacity} Guests</p>
                <div className="flex items-center mt-2">
                    {room.available ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Available</span>
                    ) : (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Sold Out</span>
                    )}
                </div>
            </div>
            <div className="text-right">
                <div className="text-xl font-bold text-primary mb-2">${room.price} <span className="text-sm text-gray-500 font-normal">/ night</span></div>
                {room.available ? (
                    <Link
                        to={`/booking?hotelId=${hotelId}&roomId=${room.id}`}
                        className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors inline-block"
                    >
                        Book Now
                    </Link>
                ) : (
                    <button disabled className="bg-gray-300 text-gray-500 px-6 py-2 rounded-md font-medium cursor-not-allowed">
                        Unavailable
                    </button>
                )}
            </div>
        </div>
    );
};

export default RoomCard;

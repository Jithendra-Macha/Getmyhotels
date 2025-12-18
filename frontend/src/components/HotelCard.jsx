import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
            <div className="md:w-1/3 h-48 md:h-auto relative">
                <img
                    src={hotel.image_url || 'https://via.placeholder.com/300x200'}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                    {hotel.rating} ★
                </div>
            </div>
            <div className="p-4 md:w-2/3 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                    <p className="text-gray-500 text-sm line-clamp-2">{hotel.description}</p>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <span className="text-xs text-gray-500">Starting from</span>
                        <div className="text-2xl font-bold text-primary">${hotel.price_per_night}</div>
                        <span className="text-xs text-gray-500">per night</span>
                    </div>
                    <Link
                        to={`/hotels/${hotel.id}`}
                        className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;

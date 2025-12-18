import React from 'react';

const DealCard = ({ image, title, location, rating, price, originalPrice }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="relative h-48">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                {/* Discount Badge (Mock) */}
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                    50% OFF
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-2">{location}</p>

                <div className="flex items-center mb-3">
                    <span className="bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded mr-2">
                        {rating}
                    </span>
                    <span className="text-sm text-gray-600">Excellent</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div>
                        {originalPrice && (
                            <p className="text-xs text-gray-400 line-through">${originalPrice}</p>
                        )}
                        <p className="text-lg font-bold text-primary">${price}<span className="text-xs text-gray-500 font-normal">/Night</span></p>
                    </div>
                </div>

                <button className="w-full bg-primary/10 text-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Reveal Deal
                </button>
            </div>
        </div>
    );
};

export default DealCard;

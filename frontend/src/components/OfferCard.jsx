import React from 'react';

const OfferCard = ({ title, description, image, discount }) => {
    return (
        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discount} OFF
            </div>
            <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
                <button className="mt-3 text-primary text-sm font-semibold hover:underline">
                    Book Now &rarr;
                </button>
            </div>
        </div>
    );
};

export default OfferCard;

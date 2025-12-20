import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const mockDeals = [
    {
        id: 1,
        name: "Grand Resort",
        location: "Miami, FL",
        price: 120,
        originalPrice: 200,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.8
    },
    {
        id: 2,
        name: "The Plaza",
        location: "New York, NY",
        price: 340,
        originalPrice: 450,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.9
    },
    {
        id: 3,
        name: "Ocean View",
        location: "Cancun, MX",
        price: 180,
        originalPrice: 280,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.7
    },
    {
        id: 4,
        name: "Mountain Lodge",
        location: "Aspen, CO",
        price: 250,
        originalPrice: 380,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.6
    },
    {
        id: 5,
        name: "Desert Oasis",
        location: "Scottsdale, AZ",
        price: 150,
        originalPrice: 220,
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.5
    },
    {
        id: 6,
        name: "Lakeside Cabin",
        location: "Lake Tahoe, CA",
        price: 190,
        originalPrice: 260,
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.8
    }
];

const DealsOfTheDay = () => {
    const [deals] = useState(mockDeals);
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 320; // Slightly wider for cards
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Deals of the Day</h2>
                    <p className="text-gray-500 text-sm mt-1">Limited time offers for unplanned getaways</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 bg-white hover:bg-gray-50 shadow-sm transition-all text-gray-600">
                        ←
                    </button>
                    <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 bg-white hover:bg-gray-50 shadow-sm transition-all text-gray-600">
                        →
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-2 snap-x"
            >
                {deals.map((deal) => (
                    <Link to={`/search?location=${deal.location}`} key={deal.id} className="flex-none w-72 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group snap-center cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={deal.image}
                                alt={deal.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% OFF
                            </div>
                            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md flex items-center">
                                <span className="text-yellow-400 mr-1">★</span> {deal.rating}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">{deal.name}</h3>
                            <p className="text-gray-500 text-sm mb-3 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {deal.location}
                            </p>

                            <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-3">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs line-through decoration-red-400">${deal.originalPrice}</span>
                                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">${deal.price}</span>
                                </div>
                                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    Book Now
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default DealsOfTheDay;

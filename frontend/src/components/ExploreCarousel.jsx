import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const fallbackDestinations = [
    { name: "Orlando", "properties": "5k+ stays", image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Las Vegas", "properties": "1.7k+ stays", image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "New York", "properties": "3k+ stays", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Atlanta", "properties": "2k+ stays", image: "https://images.unsplash.com/photo-1594902194883-9b9aa5ee5d92?auto=format&fit=crop&w=600&q=80" },
    { name: "Myrtle Beach", "properties": "6k+ stays", "image": "https://images.unsplash.com/photo-1579782540608-aa866f81df68?auto=format&fit=crop&w=600&q=80" },
    { name: "Los Angeles", "properties": "4k+ stays", "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80" },
    { name: "Chicago", "properties": "2.5k+ stays", "image": "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "San Francisco", "properties": "1.8k+ stays", "image": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
];

const ExploreCarousel = () => {
    // Initialize with fallback data so it's never empty
    const [destinations, setDestinations] = useState(fallbackDestinations);
    const scrollRef = useRef(null);

    useEffect(() => {
        // Try to fetch dynamic data from backend
        fetch('http://localhost:8000/destinations')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setDestinations(data);
                }
            })
            .catch(err => {
                console.log("Using fallback destinations (backend offline or on prod)");
                // No action needed, already showing fallback
            });
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Explore by City</h2>
                    <p className="text-gray-500 text-sm mt-1">Discover local favorites across the US</p>
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
                className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide px-2 snap-x"
            >
                {destinations.map((dest, idx) => (
                    <Link to={`/search?location=${dest.name}`} key={idx} className="flex flex-col items-center group min-w-[100px] snap-center cursor-pointer">
                        {/* Story/Avatar Ring Animation */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3">
                            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 animate-spin-slow p-[2px]">
                                <div className="w-full h-full bg-white rounded-full"></div> {/* Mask */}
                            </div>
                            <img
                                src={dest.image}
                                alt={dest.name}
                                className="absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full border-2 border-white shadow-sm transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-purple-600 transition-colors text-center">{dest.name}</h3>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mt-1 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                            {dest.properties}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ExploreCarousel;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const cities = [
    {
        id: 1,
        name: "Orlando",
        country: "USA",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        desc: "Theme park capital of the world."
    },
    {
        id: 2,
        name: "Las Vegas",
        country: "USA",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        desc: "Entertainment, nightlife, and 24-hour excitement."
    },
    {
        id: 3,
        name: "New York",
        country: "USA",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        desc: "The city that never sleeps."
    },
    {
        id: 4,
        name: "Tokyo",
        country: "Japan",
        flag: "🇯🇵",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        desc: "Where tradition meets the future."
    },
    {
        id: 5,
        name: "Atlanta",
        country: "USA",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1575917649705-5b59cd12219c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        desc: "Southern charm with a modern twist."
    }
];

const TrendingDestinations = () => {
    // Default active card is the first one
    const [activeId, setActiveId] = useState(1);

    return (
        <section className="py-12">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Trending Now</h2>
                    <p className="text-gray-500 mt-2">Top picked destinations by travelers like you</p>
                </div>
            </div>

            {/* Desktop Expanding Accordion */}
            <div className="hidden md:flex h-[500px] w-full gap-4">
                {cities.map((city) => (
                    <div
                        key={city.id}
                        onMouseEnter={() => setActiveId(city.id)}
                        className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out shadow-lg ${activeId === city.id ? 'flex-grow-[3]' : 'flex-grow-[1]'
                            }`}
                    >
                        <img
                            src={city.image}
                            alt={city.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                        />
                        <div className={`absolute inset-0 bg-black/30 transition-opacity ${activeId === city.id ? 'opacity-0' : 'opacity-40'}`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className={`transition-all duration-500 transform ${activeId === city.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className={`font-bold text-white ${activeId === city.id ? 'text-4xl' : 'text-xl rotate-0 md:-rotate-90 md:origin-bottom-left md:mb-12 md:ml-4 whitespace-nowrap'}`}>
                                        {city.name} {activeId === city.id && <span className="text-2xl align-middle">{city.flag}</span>}
                                    </h3>
                                </div>

                                {activeId === city.id && (
                                    <div className="animate-fade-in-up">
                                        <p className="text-gray-200 text-lg mb-4 line-clamp-2">{city.desc}</p>
                                        <Link
                                            to={`/search?location=${city.name}`}
                                            className="inline-block bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-purple-50 transition-colors shadow-lg"
                                        >
                                            Explore Deals
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Vertical Stack (since accordion is hard on small screens) */}
            <div className="md:hidden space-y-4">
                {cities.map((city) => (
                    <Link to={`/search?location=${city.name}`} key={city.id} className="block relative h-48 rounded-2xl overflow-hidden shadow-md">
                        <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                            <h3 className="text-2xl font-bold text-white">{city.name} <span className="text-sm">{city.flag}</span></h3>
                            <p className="text-gray-300 text-sm">{city.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default TrendingDestinations;

import React, { useState, useEffect } from 'react';

const StickySubNav = ({ hotelName, price }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = 600; // Approx height where nav should stick
            setIsSticky(window.scrollY > heroHeight);

            // Simple scroll spy logic
            const sections = ['overview', 'rooms', 'amenities', 'reviews', 'location'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= (element.offsetTop - 150)) {
                    setActiveSection(section);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`sticky top-0 z-40 bg-white border-b border-gray-100 transition-all duration-300 ${isSticky ? 'shadow-md py-2' : 'py-4 relative'}`}>
            <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
                <nav className="flex space-x-6 overflow-x-auto scrollbar-hide">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'rooms', label: 'Rooms' },
                        { id: 'amenities', label: 'Amenities' },
                        { id: 'reviews', label: 'Reviews' },
                        { id: 'location', label: 'Location' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className={`whitespace-nowrap text-sm font-bold pb-2 border-b-2 transition-colors ${activeSection === item.id
                                    ? 'text-primary border-primary'
                                    : 'text-gray-500 border-transparent hover:text-gray-800'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Show Mini Booking Action when sticky */}
                <div className={`hidden md:flex items-center gap-4 transition-opacity duration-300 ${isSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">From</p>
                        <p className="font-bold text-gray-900">${price}<span className="text-xs font-normal text-gray-500">/night</span></p>
                    </div>
                    <button
                        onClick={() => scrollTo('rooms')}
                        className="bg-primary hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-sm"
                    >
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StickySubNav;

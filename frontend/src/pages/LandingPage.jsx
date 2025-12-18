import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeroSearch from '../components/Search/HeroSearch';
import InteractiveMap from '../components/Map/InteractiveMap';
import Navbar from '../components/Navbar';
// Switched to "Traveler Journey" image to connect with users (OTA vibe)
const heroBg = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"; // Traveler overlooking view
// import heroBg from '../assets/hero_bg.png';

const LandingPage = () => {
    // Scroll animation state
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-purple-100 selection:text-purple-900">
            {/* Navbar */}
            {/* Navbar rendered in App.jsx */}

            {/* Hero Section - FIFA 2026 Theme */}
            <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 pb-28 sm:pb-36 overflow-hidden">
                {/* Abstract Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        <path d="M0 0 L 100 0 L 100 20 Z" fill="white" />
                    </svg>
                </div>

                {/* Glow Effects */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Left Text Content */}
                    <div className="space-y-6 max-w-2xl z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                            Official Hospitality Partners
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
                            Experience <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">FIFA World Cup 2026™</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-blue-100 max-w-lg leading-relaxed shadow-black drop-shadow-md">
                            Book your stay for the biggest sporting event in history. Exclusive hotels across USA, Canada, and Mexico.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2 justify-center sm:justify-start">
                            <Link to="/search?q=fifa" className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-xl shadow-xl shadow-yellow-400/20 transition-all transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2">
                                <span>Exploit Deals</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-md border border-white/20 transition-all">
                                View Host Cities
                            </button>
                        </div>
                    </div>

                    {/* Right Image Content - Trophy/Logo */}
                    <div className="relative z-0 mt-8 md:mt-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 blur-[80px] opacity-40 rounded-full"></div>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/FIFA_World_Cup_2026_logo.svg/800px-FIFA_World_Cup_2026_logo.svg.png"
                            alt="FIFA World Cup 2026"
                            className="relative w-64 md:w-80 lg:w-96 drop-shadow-2xl animate-float"
                        />
                    </div>
                </div>
            </div>

            {/* Search Component - Overlapping */}
            <HeroSearch />

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">


                {/* FIFA World Cup 2026 Promo Banner Removed - Moved to Top */}


                {/* Trending Destinations Grid */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Trending Bookings</h2>
                            <p className="text-gray-500 mt-1">Most popular choices for travelers from your area</p>
                        </div>
                        <Link to="/search" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold hover:underline">See all &rarr;</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="aspect-w-3 aspect-h-4 h-80">
                                <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Paris" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                                Avg. $128
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-bold">Paris</h3>
                                <p className="text-sm opacity-90">France</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="aspect-w-3 aspect-h-4 h-80">
                                <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Tokyo" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                                Avg. $165
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-bold">Tokyo</h3>
                                <p className="text-sm opacity-90">Japan</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="aspect-w-3 aspect-h-4 h-80">
                                <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="New York" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                                Avg. $240
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-bold">New York</h3>
                                <p className="text-sm opacity-90">USA</p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="aspect-w-3 aspect-h-4 h-80">
                                <img src="https://images.unsplash.com/photo-1528642474493-1df432ea022e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Amsterdam" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                                Avg. $185
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-bold">Amsterdam</h3>
                                <p className="text-sm opacity-90">Netherlands</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive Map Section */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore the World</h2>
                        <p className="text-gray-600">Click on any destination to discover hotels and pricing</p>
                    </div>
                    <InteractiveMap />
                </section>

                {/* Deal of the Day (Horizontal List) */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Deals of the Weekend</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Deal 1 */}
                        <div className="flex bg-gray-50 rounded-lg p-4 transition hover:bg-white hover:shadow-md cursor-pointer border border-gray-100">
                            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60" className="w-24 h-24 rounded-lg object-cover" alt="Hotel" />
                            <div className="ml-4 flex flex-col justify-center">
                                <h4 className="font-bold text-gray-900">Grand Resort</h4>
                                <p className="text-xs text-gray-500 mb-2">Miami, FL</p>
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-lg">$120 <span className="text-gray-400 font-normal text-xs line-through">$200</span></div>
                            </div>
                        </div>
                        {/* Deal 2 */}
                        <div className="flex bg-gray-50 rounded-lg p-4 transition hover:bg-white hover:shadow-md cursor-pointer border border-gray-100">
                            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60" className="w-24 h-24 rounded-lg object-cover" alt="Hotel" />
                            <div className="ml-4 flex flex-col justify-center">
                                <h4 className="font-bold text-gray-900">The Plaza</h4>
                                <p className="text-xs text-gray-500 mb-2">New York, NY</p>
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-lg">$340 <span className="text-gray-400 font-normal text-xs line-through">$450</span></div>
                            </div>
                        </div>
                        {/* Deal 3 */}
                        <div className="flex bg-gray-50 rounded-lg p-4 transition hover:bg-white hover:shadow-md cursor-pointer border border-gray-100">
                            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60" className="w-24 h-24 rounded-lg object-cover" alt="Hotel" />
                            <div className="ml-4 flex flex-col justify-center">
                                <h4 className="font-bold text-gray-900">Ocean View</h4>
                                <p className="text-xs text-gray-500 mb-2">Cancun, MX</p>
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-lg">$180 <span className="text-gray-400 font-normal text-xs line-through">$280</span></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default LandingPage;

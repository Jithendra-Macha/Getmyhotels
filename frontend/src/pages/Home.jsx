import React from 'react';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import OfferCard from '../components/OfferCard';
import DealCard from '../components/DealCard';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Luxury travel resort"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center pb-20">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-lg">
                        Find Your <span className="text-orange-400">Perfect Stay</span>
                    </h1>
                    <div className="mt-6 flex flex-wrap justify-center gap-6 text-white text-sm font-medium drop-shadow-md">
                        <div className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Secure Payment</div>
                        <div className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Customer Service in Seconds</div>
                        <div className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Best Price</div>
                        <div className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Instant Booking</div>
                    </div>
                </div>
            </div>

            {/* Search Bar Section - Overlapping Hero */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 z-20">
                <SearchBar />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

                {/* Quick Links / Recently Viewed Placeholder */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-100 p-6 rounded-xl flex items-center space-x-4 cursor-pointer hover:bg-blue-200 transition-colors">
                        <div className="bg-white p-3 rounded-full text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">My Trips</h3>
                            <p className="text-sm text-gray-600">Quickly Find your Booking Reservations</p>
                        </div>
                    </div>
                    <div className="bg-blue-100 p-6 rounded-xl flex items-center space-x-4 cursor-pointer hover:bg-blue-200 transition-colors">
                        <div className="bg-white p-3 rounded-full text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Help Center</h3>
                            <p className="text-sm text-gray-600">We are always here for you. Reach us 24/7</p>
                        </div>
                    </div>
                </section>

                {/* Deals of the Day */}
                <section>
                    <div className="flex items-center space-x-2 mb-6">
                        <span className="bg-primary text-white p-2 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                        </span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Deals of the Day</h2>
                            <p className="text-gray-500 text-sm">Limited-time offers on premium hotels near you.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <DealCard
                            title="The Pierre, A Taj Hotel"
                            location="New York, NY"
                            rating="5"
                            price="914.36"
                            originalPrice="1200"
                            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                        />
                        <DealCard
                            title="The Langham, New York"
                            location="New York, NY"
                            rating="5"
                            price="1030.91"
                            originalPrice="1400"
                            image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                        />
                        <DealCard
                            title="Baccarat Hotel"
                            location="New York, NY"
                            rating="5"
                            price="1703.42"
                            originalPrice="2000"
                            image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                        />
                        <DealCard
                            title="Virgin Hotels NYC"
                            location="New York, NY"
                            rating="5"
                            price="485.71"
                            originalPrice="650"
                            image="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                        />
                    </div>
                </section>

                {/* Trending Destinations */}
                <section>
                    <div className="flex items-center space-x-2 mb-6">
                        <span className="bg-primary text-white p-2 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900">Trending Destinations</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1496417263034-38ec4f0d665a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="New York" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white font-bold text-lg">New York</h3>
                                    <p className="text-gray-300 text-xs">United States</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="London" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white font-bold text-lg">London</h3>
                                    <p className="text-gray-300 text-xs">United Kingdom</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Paris" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white font-bold text-lg">Paris</h3>
                                    <p className="text-gray-300 text-xs">France</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1512453979798-5ea904ac66de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Dubai" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white font-bold text-lg">Dubai</h3>
                                    <p className="text-gray-300 text-xs">UAE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Explore Unique Stays */}
                <section>
                    <div className="flex items-center space-x-2 mb-6">
                        <span className="bg-primary text-white p-2 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900">Explore Unique Locations</h2>
                    </div>

                    {/* Tabs (Visual Only for now) */}
                    <div className="flex space-x-8 mb-8 border-b overflow-x-auto">
                        <button className="pb-2 border-b-2 border-primary text-primary font-bold whitespace-nowrap">Featured Cities</button>
                        <button className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap">NYC Boroughs</button>
                        <button className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap">Coastal Areas</button>
                        <button className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap">Budget Friendly</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="New York" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                <h3 className="text-xl font-bold text-white">New York</h3>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="London" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                <h3 className="text-xl font-bold text-white">London</h3>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Toronto" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                <h3 className="text-xl font-bold text-white">Toronto</h3>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Berlin" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                <h3 className="text-xl font-bold text-white">Berlin</h3>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Paris" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                <h3 className="text-xl font-bold text-white">Paris</h3>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tokyo" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                <h3 className="text-xl font-bold text-white">Tokyo</h3>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1523482580638-016775bc2522?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sydney" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                <h3 className="text-xl font-bold text-white">Sydney</h3>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1512453979798-5ea904ac66de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Dubai" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                <h3 className="text-xl font-bold text-white">Dubai</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mobile App Banner */}
                <section className="bg-blue-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="md:flex items-center">
                        <div className="md:w-1/2 p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Upcoming Mobile App</h2>
                            <p className="text-blue-100 mb-6 text-lg">
                                Get ready to explore the world with the all-new GetMyHotel Mobile App!
                                Coming this December - book hotels faster, smarter, and at the best rates.
                            </p>
                            <p className="text-blue-200 mb-8">
                                Discover personalized hotel recommendations wherever you are. Stay tuned for exclusive launch offers!
                            </p>
                            <div className="flex space-x-4">
                                <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center hover:bg-gray-900 transition-colors">
                                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm13.63 10.186L5.473 23.766a.996.996 0 001.076.014l12.72-7.276-2.03-2.504zm2.03-2.504l2.03-2.504-12.72-7.276a.996.996 0 00-1.076.014L17.24 12zm-2.03 2.504l2.03 2.504 3.63-2.076a.996.996 0 000-1.732l-3.63-2.076-2.03 2.504z" /></svg>
                                    <div>
                                        <div className="text-xs">GET IT ON</div>
                                        <div className="text-lg font-bold">Google Play</div>
                                    </div>
                                </button>
                                <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center hover:bg-gray-900 transition-colors">
                                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99 1.01-3.15-1.02.05-2.26.68-3 1.54-.68.81-1.28 2.12-1.12 3.15 1.13.09 2.29-.64 3.11-1.54z" /></svg>
                                    <div>
                                        <div className="text-xs">Download on the</div>
                                        <div className="text-lg font-bold">App Store</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <img src="https://images.unsplash.com/photo-1512453979798-5ea904ac66de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Mobile App" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Home;

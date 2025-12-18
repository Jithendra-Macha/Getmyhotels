import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import the new logo

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white text-gray-900 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            {/* Increased height to h-16 for better visibility, verified transparent bg */}
                            <img className="h-16 w-auto object-contain" src={logo} alt="GetMyHotels" />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className="hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors">Home</Link>
                            <Link to="/bookings" className="hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors">My Bookings</Link>
                            <Link to="/support" className="hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors">Customer Support</Link>
                            <div className="flex items-center gap-4 ml-4">
                                <Link to="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all transform hover:scale-105">Sign In</Link>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-xl">
                        <Link to="/" className="hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium text-gray-900">Home</Link>
                        <Link to="/bookings" className="hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium text-gray-900">My Bookings</Link>
                        <Link to="/support" className="hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium text-gray-900">Customer Support</Link>
                        <Link to="/login" className="bg-primary text-white hover:bg-primary/90 block px-3 py-2 rounded-md text-base font-bold mt-4 text-center mx-2">Sign In</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

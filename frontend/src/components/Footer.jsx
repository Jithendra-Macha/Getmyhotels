import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Getmyhotels.com</h3>
                        <p className="text-blue-100 text-sm">
                            Your trusted companion for finding the best stays worldwide. Experience comfort and luxury at unbeatable prices.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><Link to="#" className="hover:text-white">About Us</Link></li>
                            <li><Link to="#" className="hover:text-white">Careers</Link></li>
                            <li><Link to="#" className="hover:text-white">Press</Link></li>
                            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><Link to="#" className="hover:text-white">Contact Us</Link></li>
                            <li><Link to="#" className="hover:text-white">FAQs</Link></li>
                            <li><Link to="#" className="hover:text-white">Terms of Service</Link></li>
                            <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Get the App</h4>
                        <p className="text-sm text-blue-100 mb-4">Save more with our mobile app.</p>
                        <div className="flex space-x-2">
                            <button className="bg-black text-white px-3 py-2 rounded-md text-xs flex items-center border border-gray-600 hover:bg-gray-900">
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m11.4045-6.02l1.328-2.3546c.191-.3386.074-.7676-.2605-.9586-.3345-.191-.7631-.0785-.9541.2605l-1.353 2.3986c-1.2265-.5566-2.637-.8996-4.1415-.8996-1.5045 0-2.915.343-4.1415.8996l-1.353-2.3986c-.191-.339-.6196-.4515-.9541-.2605-.3345.191-.4515.62-.2605.9586l1.328 2.3546c-2.4395 1.341-4.1205 3.766-4.444 6.659h19.6505c-.3235-2.893-2.0045-5.318-4.444-6.659" /></svg>
                                Google Play
                            </button>
                            <button className="bg-black text-white px-3 py-2 rounded-md text-xs flex items-center border border-gray-600 hover:bg-gray-900">
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.48-.69.7-1.24 1.85-1.06 2.98 1.16.09 2.32-.5 3.05-1.35" /></svg>
                                App Store
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-200">
                    &copy; {new Date().getFullYear()} Getmyhotels.com. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

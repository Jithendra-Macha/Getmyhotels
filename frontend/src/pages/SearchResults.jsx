import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdvancedHotelCard from '../components/Hotel/AdvancedHotelCard';
import FilterSidebar from '../components/Search/FilterSidebar';
import SearchContextBar from '../components/Search/SearchContextBar';
import { hotelData } from '../mocks/hotelData'; // Use Mock Data for Rich UI

const SearchResults = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                let url = `https://getmyhotels-backend.vercel.app/hotels?guests=${guests}`;
                if (lat && lng) {
                    url += `&lat=${lat}&lng=${lng}`;
                } else if (locationQuery) {
                    url += `&location=${encodeURIComponent(locationQuery)}`;
                }

                if (checkIn) url += `&check_in=${checkIn}`;
                if (checkOut) url += `&check_out=${checkOut}`;

                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setHotels(data);
                    } else {
                        // Fallback to mock if no real results found for demo purposes
                        // or just show empty. Let's keep mock for robustness if backend is offline
                        console.log("No backend results, using backup mock.");
                        setHotels(hotelData);
                    }
                } else {
                    console.error("Fetch failed");
                    setHotels(hotelData); // Fallback on error
                }
            } catch (err) {
                console.error("Error fetching hotels:", err);
                setHotels(hotelData); // Fallback on error
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();

        // Scroll to top
        window.scrollTo(0, 0);
    }, [locationQuery, lat, lng, checkIn, checkOut, guests]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

            {/* 1. Context Bar (Sticky) */}
            <SearchContextBar
                locationQuery={locationQuery}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
            />

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* 2. Sidebar (Filters) */}
                    <div className="lg:w-1/4 flex-shrink-0">
                        <div className="sticky top-[150px]">
                            <FilterSidebar />
                        </div>
                    </div>

                    {/* 3. Main Content (Hotel Grid) */}
                    <div className="flex-1">

                        {/* Status Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                {locationQuery ? `Properties in ${locationQuery}` : 'Top Recommend Properties'}
                                <span className="ml-2 text-gray-500 text-base font-normal">{hotels.length} results found</span>
                            </h2>
                        </div>

                        {/* Loading State */}
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-64 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse flex">
                                        <div className="w-1/3 bg-gray-200"></div>
                                        <div className="flex-1 p-6 space-y-4">
                                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            <div className="h-20 bg-gray-200 rounded w-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Map through hotels */}
                                {hotels.map(hotel => (
                                    <AdvancedHotelCard key={hotel.id} hotel={hotel} />
                                ))}

                                {/* Pagination / Load More */}
                                <div className="pt-8 flex justify-center">
                                    <button className="bg-white border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
                                        Show more results
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* FairRank Transparency Footer */}
                        <div className="mt-12 p-6 bg-blue-50/50 border border-blue-100 rounded-xl text-center">
                            <h5 className="font-bold text-blue-900 mb-2">How we rank properties (FairRank™)</h5>
                            <p className="text-sm text-blue-800 max-w-2xl mx-auto">
                                Unlike other booking sites, we don't let hotels pay to appear on top. Our AI ranks properties based on
                                <strong> quality, unique character (boutique factor)</strong>, and <strong>sustainability efforts</strong>
                                to surface true hidden gems.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import AdvancedHotelCard from '../components/Hotel/AdvancedHotelCard';
import FilterSidebar from '../components/Search/FilterSidebar';
import SearchContextBar from '../components/Search/SearchContextBar';
import { hotelData } from '../mocks/hotelData'; // Use Mock Data for Rich UI

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '16px'
};

const SearchResults = () => {
    // Search Params
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const locationQuery = searchParams.get('location');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    // State
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMap, setShowMap] = useState(true); // Default to showing map
    const [sortBy, setSortBy] = useState('recommended');

    // Filters State
    const [filters, setFilters] = useState({
        maxPrice: 1000,
        amenities: [],
        types: [],
        paymentOptions: []
    });

    // Handle Filter Change from Sidebar
    const handleFilterChange = (category, value) => {
        setFilters(prev => ({ ...prev, [category]: value }));
    };

    // Fetch Logic
    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                let url = `https://getmyhotels-backend.vercel.app/hotels?guests=${guests || 1}`;
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
                        console.log("No backend results, using backup mock.");
                        setHotels(hotelData);
                    }
                } else {
                    console.error("Fetch failed");
                    setHotels(hotelData);
                }
            } catch (err) {
                console.error("Error fetching hotels:", err);
                setHotels(hotelData);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
        window.scrollTo(0, 0);
    }, [locationQuery, lat, lng, checkIn, checkOut, guests]);

    // Filtering Logic
    const filteredHotels = useMemo(() => {
        return hotels.filter(hotel => {
            // Price Filter
            if (hotel.price_per_night > filters.maxPrice) return false;

            // Amenities Filter
            if (filters.amenities.length > 0) {
                const hotelAmenities = (hotel.amenities || []).map(a => a.toLowerCase());
                const missing = filters.amenities.some(filter =>
                    !hotelAmenities.includes(filter.toLowerCase()) &&
                    !hotelAmenities.includes(filter.replace('Free ', '').toLowerCase()) // Fuzzy match common terms
                );
                if (missing) return false;
            }

            // Payment Option Filter (Mock logic: check amenities/tags or ratePlans)
            if (filters.paymentOptions.length > 0) {
                // Check if hotel has matching payment option in its tags or payment_options field
                const opts = (hotel.payment_options || []).concat(hotel.deal_tag || []);
                const hasOption = filters.paymentOptions.some(opt => opts.includes(opt));
                // If filters selected but no match found
                if (!hasOption) return false;
            }

            // Property Type Filter (fuzzy match on description or name or is_boutique)
            if (filters.types.length > 0) {
                const typeMatches = filters.types.some(type => {
                    if (type === 'Boutique' && hotel.is_boutique) return true;
                    if (type === 'Hotel') return true; // Assume all are hotels if not specific
                    return (hotel.name + hotel.description).toLowerCase().includes(type.toLowerCase());
                });
                if (!typeMatches) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'price_asc') return a.price_per_night - b.price_per_night;
            if (sortBy === 'price_desc') return b.price_per_night - a.price_per_night;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0; // recommended
        });
    }, [hotels, filters, sortBy]);

    // Map Center Logic
    const mapCenter = useMemo(() => {
        if (filteredHotels.length > 0 && filteredHotels[0].coordinates) {
            return filteredHotels[0].coordinates;
        }
        // Fallback or use lat/lng from search
        if (lat && lng) return { lat: parseFloat(lat), lng: parseFloat(lng) };
        return { lat: 40.7128, lng: -74.0060 }; // NYC Default
    }, [filteredHotels, lat, lng]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <SearchContextBar locationQuery={locationQuery} checkIn={checkIn} checkOut={checkOut} guests={guests} />

            <div className={`max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 ${showMap ? 'h-[calc(100vh-140px)] overflow-hidden' : ''}`}>
                <div className="flex flex-col lg:flex-row gap-6 h-full">

                    {/* Sidebar Filters - Scrollable if map is open */}
                    <div className={`lg:w-64 flex-shrink-0 ${showMap ? 'overflow-y-auto pr-2 scrollbar-thin' : ''}`}>
                        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col h-full">

                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-4 flex-shrink-0 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">
                                    {locationQuery || 'Stays'}
                                    <span className="text-gray-500 font-normal ml-2">({filteredHotels.length} places)</span>
                                </h1>
                            </div>

                            <div className="flex gap-3">
                                <select
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="recommended">Recommended</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>

                                <button
                                    onClick={() => setShowMap(!showMap)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${showMap ? 'bg-purple-600 text-white shadow-md' : 'bg-white border text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {showMap ? 'Hide Map' : 'Show Map'}
                                </button>
                            </div>
                        </div>

                        {/* Split View Content */}
                        <div className={`flex gap-6 ${showMap ? 'h-full overflow-hidden' : ''}`}>

                            {/* Hotel List */}
                            <div className={`flex-1 space-y-4 ${showMap ? 'overflow-y-auto pb-20 scrollbar-hide' : ''}`}>
                                {loading ? (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-64 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse"></div>
                                        ))}
                                    </div>
                                ) : (
                                    filteredHotels.map(hotel => (
                                        <AdvancedHotelCard key={hotel.id} hotel={hotel} compact={showMap} />
                                    ))
                                )}
                                {!loading && filteredHotels.length === 0 && (
                                    <div className="text-center py-20 text-gray-500">
                                        No hotels match your filters. Try adjusting them.
                                    </div>
                                )}
                            </div>

                            {/* Map View */}
                            {showMap && (
                                <div className="hidden xl:block w-[45%] h-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative">
                                    <GoogleMap
                                        mapContainerStyle={mapContainerStyle}
                                        center={mapCenter}
                                        zoom={13}
                                        options={{
                                            disableDefaultUI: false,
                                            zoomControl: true,
                                            streetViewControl: false,
                                            mapTypeControl: false,
                                        }}
                                    >
                                        {filteredHotels.map(hotel => hotel.coordinates && (
                                            <Marker
                                                key={hotel.id}
                                                position={hotel.coordinates}
                                                title={hotel.name}
                                                label={{
                                                    text: `$${Math.round(hotel.price_per_night)}`,
                                                    className: "bg-white text-xs font-bold px-1 py-0.5 rounded shadow-sm border border-gray-300"
                                                }}
                                            />
                                        ))}
                                    </GoogleMap>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;

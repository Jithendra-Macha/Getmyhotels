import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Calendar } from "@/components/ui/calendar" // Shadcn Calendar

const HeroSearch = () => {

    const [searchType, setSearchType] = useState('traditional');
    const [activeCategory, setActiveCategory] = useState('stays');
    const dpRef = useRef(null);

    // Calendar Visibility State
    const [showCalendar, setShowCalendar] = useState(false);

    // Click Outside listener
    const calendarRef = useOnclickOutside(() => {
        if (showCalendar) {
            setShowCalendar(false);
            // Optional: Reset temp state on close?
            // setTempDateRange(dateRange); 
        }
    });

    const navigate = useNavigate();

    // Date Picker State
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    // Temp state for keying calendar interaction without live updates
    const [tempDateRange, setTempDateRange] = useState(dateRange);
    const [tempStartDate, tempEndDate] = tempDateRange;
    const [calendarTab, setCalendarTab] = useState('calendar'); // 'calendar' or 'flexible'
    const [quickSelectDays, setQuickSelectDays] = useState(null);

    // AI Search State
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiResult, setAiResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Coordinate State
    const [coords, setCoords] = useState({ lat: null, lng: null });

    // Google Places Autocomplete
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Removing 'types' restriction to show EVERYTHING (Boroughs, Cities, Areas) */
        },
        debounce: 300,
    });

    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the search suggestions by calling this method
        clearSuggestions();
    });

    const handleSelect = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            console.log("📍 Coordinates: ", { lat, lng });
            setCoords({ lat, lng });
        });
    };

    // ... existing Quick Date and Categories code ...
    // Note: Implicitly preserving lines 58-212 via ...

    // Quick date selection handler
    const handleQuickSelect = (days) => {
        const today = new Date();
        const checkout = new Date(today);
        checkout.setDate(today.getDate() + days);
        setDateRange([today, checkout]);
        setQuickSelectDays(days);
    };

    const categories = [
        { id: 'stays', label: 'Stays', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> },
        { id: 'flights', label: 'Flights', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /> },
        { id: 'cars', label: 'Cars', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /> },
        { id: 'packages', label: 'Packages', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /> },
    ];

    const handleSearch = async () => {
        // 1. Construct Search Object
        const searchData = {
            id: Date.now(),
            location: value,
            check_in: startDate?.toISOString() || new Date().toISOString(),
            check_out: endDate?.toISOString() || new Date(Date.now() + 86400000).toISOString(),
            guests: 2,
            lat: coords.lat,
            lng: coords.lng
        };

        // 2. Save to LocalStorage
        try {
            const existingSearches = JSON.parse(localStorage.getItem('recent_searches') || '[]');
            const filteredSearches = existingSearches.filter(s => s.location !== value);
            filteredSearches.unshift(searchData);
            const limitedSearches = filteredSearches.slice(0, 5);
            localStorage.setItem('recent_searches', JSON.stringify(limitedSearches));
        } catch (e) {
            console.error("Local storage error:", e);
        }

        // 3. Save to Backend
        const token = localStorage.getItem('token');
        if (token && startDate && endDate) {
            try {
                await fetch('https://getmyhotels-backend.vercel.app/recent-searches', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        location: value,
                        check_in: startDate.toISOString(),
                        check_out: endDate.toISOString(),
                        guests: 2
                    })
                });
            } catch (err) {
                console.error("Failed to save to backend", err);
            }
        }

        // Navigate
        const params = new URLSearchParams({
            location: value,
            checkIn: startDate?.toISOString(),
            checkOut: endDate?.toISOString(),
            guests: 2,
        });
        if (coords.lat && coords.lng) {
            params.append('lat', coords.lat);
            params.append('lng', coords.lng);
        }

        navigate(`/search?${params.toString()}`);
    };

    const handleAiSearch = async () => {
        if (!aiPrompt.trim()) return;
        setLoading(true);
        setAiResult(null);
        try {
            // Auto-detect environment: Use localhost if on localhost, otherwise prod or env var
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiUrl = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:8000' : 'https://getmyhotels-com.onrender.com');

            const response = await fetch(`${apiUrl}/ai-plan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: aiPrompt })
            });
            const data = await response.json();
            setAiResult(data.plan);
        } catch (error) {
            console.error(error);
            // Fallback for demo purposes if backend is not running
            setAiResult(`**Demo Plan (Backend Unavailable)**\n\nHere is a simulated itinerary for "${aiPrompt}" powered by Qwen LM Max:\n\n1. **Morning**: Arrive at the destination and check into your hotel. Enjoy a local breakfast.\n2. **Afternoon**: Take a guided tour of the historic district.\n3. **Evening**: Dinner at a top-rated rooftop restaurant.\n\n*(Please start the Python backend to use the real Qwen model)*`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto -mt-16 relative z-10 px-4 sm:px-6">
            pass

            {/* Category Navigation - Minimal & Clean */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${activeCategory === cat.id
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-800/60 text-white hover:bg-gray-800/80 backdrop-blur-sm'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{cat.icon}</svg>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Main Search Container - Removed overflow-hidden to allow dropdowns to show */}
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100">
                {console.log("Places API Status:", status, "Data:", data)}
                {/* Search Type Tabs (Traditional vs AI) */}
                <div className="flex border-b border-gray-200 bg-gray-50/50">
                    <button
                        onClick={() => setSearchType('traditional')}
                        className={`px-8 py-4 text-sm font-bold transition-colors relative ${searchType === 'traditional'
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Traditional Search
                        {searchType === 'traditional' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600"></div>}
                    </button>
                    <button
                        onClick={() => setSearchType('ai')}
                        className={`px-8 py-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${searchType === 'ai'
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        AI Search
                        {searchType === 'ai' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600"></div>}
                    </button>
                </div>

                <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-b-lg">
                    {searchType === 'traditional' ? (
                        <div className="flex flex-col lg:flex-row gap-2">
                            {/* Location - Places Autocomplete */}
                            <div className="flex-grow-[2] bg-gray-50 rounded-md hover:bg-gray-100 transition-colors relative group" ref={ref}>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    disabled={!ready}
                                    className="block w-full pl-10 pr-3 py-4 bg-transparent border-none focus:ring-0 text-gray-900 font-semibold placeholder-gray-500"
                                    placeholder="Enter the city, Airport..."
                                />
                                {/* Suggestions Dropdown */}
                                {status === "OK" && (
                                    <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-xl mt-2 overflow-hidden z-[100] border border-gray-100">
                                        {data.map((suggestion) => {
                                            const {
                                                place_id,
                                                structured_formatting: { main_text, secondary_text },
                                            } = suggestion;

                                            return (
                                                <div
                                                    key={place_id}
                                                    onClick={handleSelect(suggestion)}
                                                    className="px-4 py-3 hover:bg-purple-50 cursor-pointer flex items-center transition-colors border-b border-gray-50 last:border-none"
                                                >
                                                    <svg className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{main_text}</p>
                                                        <p className="text-xs text-gray-500">{secondary_text}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Dates - With Shadcn Calendar */}
                            <div className="flex-grow-[1] bg-gray-50 rounded-md hover:bg-gray-100 transition-colors relative group z-50" ref={calendarRef}>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                {/* Custom Details for Shadcn Calendar Integration */}
                                <div className="relative w-full" ref={calendarRef}>
                                    {/* Input Trigger */}
                                    <div
                                        className="w-full flex items-center cursor-pointer"
                                        onClick={() => {
                                            if (!showCalendar) setTempDateRange(dateRange);
                                            setShowCalendar(true);
                                        }}
                                    >
                                        <input
                                            readOnly
                                            value={startDate && endDate
                                                ? `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                                                : "Check-in - Check-out"
                                            }
                                            className="w-full bg-transparent border-none focus:ring-0 text-gray-900 font-semibold placeholder-gray-500 cursor-pointer pl-10 pr-3 py-4"
                                            onClick={() => setShowCalendar(true)}
                                        />
                                    </div>

                                    {/* Dropdown Popover */}
                                    {showCalendar && (
                                        <div
                                            className="absolute top-full left-0 mt-4 bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden flex flex-col font-sans z-[60]"
                                            style={{ minWidth: '660px' }}
                                        >
                                            <div className="p-6 flex justify-center">
                                                <Calendar
                                                    mode="range"
                                                    defaultMonth={tempStartDate || new Date()}
                                                    selected={{
                                                        from: tempStartDate,
                                                        to: tempEndDate
                                                    }}
                                                    onSelect={(range) => {
                                                        if (range) {
                                                            setTempDateRange([range.from, range.to]);
                                                        } else {
                                                            setTempDateRange([null, null]);
                                                        }
                                                    }}
                                                    numberOfMonths={2}
                                                    initialFocus
                                                    classNames={{
                                                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-8 sm:space-y-0",
                                                        month: "space-y-4",
                                                        caption: "flex justify-center pt-1 relative items-center text-gray-900",
                                                        caption_label: "text-lg font-bold",
                                                        nav: "space-x-1 flex items-center bg-white",
                                                        nav_button: "h-8 w-8 bg-white border border-gray-200 text-gray-600 p-0 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center shadow-sm",
                                                        table: "w-full border-collapse space-y-1",
                                                        head_row: "flex mb-2",
                                                        head_cell: "text-gray-500 rounded-md w-10 font-medium text-[0.875rem]",
                                                        row: "flex w-full mt-2",
                                                        cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-range-start)]:rounded-l-full [&:has([aria-selected].day-outside)]:bg-blue-50/50 [&:has([aria-selected])]:bg-blue-50 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20",
                                                        day: "h-10 w-10 p-0 font-medium text-gray-900 hover:bg-gray-100 rounded-full transition-all flex items-center justify-center cursor-pointer data-[selected]:bg-blue-600 data-[selected]:text-white",
                                                        day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white font-bold shadow-md",
                                                        day_today: "bg-gray-100 text-gray-900 font-bold border border-gray-200",
                                                        day_outside: "text-gray-300 opacity-50",
                                                        day_disabled: "text-gray-300 opacity-50",
                                                        day_range_middle: "aria-selected:bg-blue-50 aria-selected:text-blue-700 rounded-none",
                                                        day_hidden: "invisible",
                                                    }}
                                                />
                                            </div>

                                            {/* Footer: Done Button */}
                                            <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 bg-white">
                                                <button
                                                    type="button"
                                                    disabled={!tempStartDate || !tempEndDate}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (tempStartDate && tempEndDate) {
                                                            // Safely check for 1 night minimum
                                                            if (tempStartDate instanceof Date && tempEndDate instanceof Date && !isNaN(tempStartDate) && !isNaN(tempEndDate) && tempStartDate.getTime() === tempEndDate.getTime()) {
                                                                setDateRange([tempStartDate, null]); // Start over if same day selected
                                                            } else {
                                                                setDateRange([tempStartDate, tempEndDate]);
                                                            }
                                                            setShowCalendar(false);
                                                        }
                                                    }}
                                                    className={`px-8 py-2.5 font-bold rounded-full text-sm transition-all shadow-md ${(!tempStartDate || !tempEndDate)
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform active:scale-95'
                                                        }`}
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Guests */}
                            <div className="flex-grow-[1] bg-gray-50 rounded-md hover:bg-gray-100 transition-colors relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-4 bg-transparent border-none focus:ring-0 text-gray-900 font-semibold placeholder-gray-500"
                                    placeholder="2 adults, 1 room"
                                />
                            </div>

                            {/* Search Button */}
                            <div className="flex-none">
                                <button
                                    onClick={handleSearch}
                                    className="w-full h-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <textarea
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    className="block w-full p-4 bg-gray-50 border border-gray-200 rounded-lg leading-snug text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-base resize-none shadow-inner"
                                    rows="3"
                                    placeholder="Tell us about your dream trip... (e.g. 'Family friendly resort in Hawaii with a pool under $400/night')"
                                ></textarea>
                                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    AI Powered
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleAiSearch}
                                    disabled={loading}
                                    className={`flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating...
                                        </>
                                    ) : (
                                        'Generate Itinerary'
                                    )}
                                </button>
                            </div>

                            {/* AI Result Display */}
                            {aiResult && (
                                <div className="mt-4 p-6 bg-purple-50 border border-purple-100 rounded-lg animate-fadeIn">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                        Your Personalized Plan
                                    </h4>
                                    <div className="prose prose-purple max-w-none text-gray-700 whitespace-pre-line">
                                        {aiResult}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroSearch;
